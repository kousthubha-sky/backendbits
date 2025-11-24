import { NextRequest, NextResponse } from "next/server";
import { GithubRepositorySummary } from "@/types/github";

interface RestRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  topics?: string[];
  language: string | null;
  languages_url: string;
  fork: boolean;
  owner: {
    login: string;
  };
  updated_at: string;
}

const GITHUB_OWNER = process.env.GITHUB_OWNER
  ?? process.env.GITHUB_USERNAME
  ?? process.env.NEXT_PUBLIC_GITHUB_OWNER
  ?? process.env.GITHUB_ORG;

const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN ?? process.env.GITHUB_TOKEN;

const BASE_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "stacks-dashboard",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

const TOPIC_HEADERS: HeadersInit = {
  ...BASE_HEADERS,
  Accept: "application/vnd.github.mercy-preview+json",
};

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const missingConfigResponse = NextResponse.json(
  { error: "GitHub API credentials are not configured. Set GITHUB_OWNER and GITHUB_ACCESS_TOKEN." },
  { status: 500 },
);

function normalizeRepo(repo: RestRepository, languages: string[], topics: string[]): GithubRepositorySummary {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    htmlUrl: repo.html_url,
    homepage: repo.homepage,
    stars: repo.stargazers_count,
    topics,
    languages: languages.length ? languages : repo.language ? [repo.language] : [],
    updatedAt: repo.updated_at,
  };
}

async function fetchLanguages(url: string): Promise<string[]> {
  try {
    const response = await fetch(url, {
      headers: BASE_HEADERS,
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return Object.keys(payload ?? {});
  } catch (error) {
    console.error("Failed to load GitHub languages", error);
    return [];
  }
}

async function fetchTopics(fullName: string): Promise<string[]> {
  const endpoint = `https://api.github.com/repos/${fullName}/topics`;
  try {
    const response = await fetch(endpoint, {
      headers: TOPIC_HEADERS,
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    if (Array.isArray(payload?.names)) {
      return payload.names as string[];
    }

    return [];
  } catch (error) {
    console.error("Failed to load GitHub topics", error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const owner = GITHUB_OWNER;

  if (!owner || !GITHUB_TOKEN) {
    return missingConfigResponse;
  }

  try {
    const searchParams = new URL(request.url).searchParams;
    const limitParam = Number(searchParams.get("per_page"));
    const limit = Number.isFinite(limitParam) && limitParam > 0
      ? Math.min(limitParam, MAX_LIMIT)
      : DEFAULT_LIMIT;

    const repoResponse = await fetch(
      `https://api.github.com/users/${owner}/repos?per_page=${limit}&sort=updated&direction=desc`,
      {
        headers: BASE_HEADERS,
        cache: "no-store",
      },
    );

    if (!repoResponse.ok) {
      const errorBody = await repoResponse.json().catch(() => ({}));
      const message = typeof errorBody?.message === "string"
        ? errorBody.message
        : "Failed to fetch repositories from GitHub";
      return NextResponse.json({ error: message }, { status: repoResponse.status });
    }

    const repoPayload = (await repoResponse.json()) as RestRepository[];

    const relevantRepos = repoPayload
      .filter((repo) => !repo.fork && repo.owner?.login?.toLowerCase() === owner.toLowerCase())
      .slice(0, limit);

    const repositories: GithubRepositorySummary[] = await Promise.all(
      relevantRepos.map(async (repo) => {
        const [languages, topics] = await Promise.all([
          fetchLanguages(repo.languages_url),
          fetchTopics(repo.full_name),
        ]);

        return normalizeRepo(repo, languages, topics);
      }),
    );

    return NextResponse.json({ repositories });
  } catch (error) {
    console.error("GitHub repository fetch failed", error);
    return NextResponse.json({ error: "Unable to fetch repositories from GitHub" }, { status: 500 });
  }
}
