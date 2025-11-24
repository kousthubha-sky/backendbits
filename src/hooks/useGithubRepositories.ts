"use client";

import { useEffect, useState } from "react";
import { TemplateDefinition } from "@/data/templates";
import { GithubRepositorySummary } from "@/types/github";

interface GithubApiResponse {
  repositories: GithubRepositorySummary[];
}

interface UseGithubRepositoriesResult {
  templates: TemplateDefinition[];
  loading: boolean;
  error: string | null;
}

const formatDescription = (value: string | null) => {
  if (!value) {
    return "No description provided.";
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "No description provided.";
};

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
  } catch {
    return value;
  }
};

const mapRepositoryToTemplate = (repo: GithubRepositorySummary): TemplateDefinition => {
  const description = formatDescription(repo.description);
  const languages = repo.languages.length ? repo.languages : ["Not specified"];
  const topics = repo.topics.length ? repo.topics : ["open-source"];

  return {
    slug: repo.name,
    name: repo.name,
    status: "Production-ready",
    category: "personal",
    summary: description,
    description,
    techStack: languages,
    features: topics,
    demoUrl: repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : null,
    codeUrl: repo.htmlUrl,
    deployment: {
      headline: `GitHub repository — updated ${formatDate(repo.updatedAt)}`,
      providers: ["GitHub"],
      env: [],
      notes: [`⭐ ${repo.stars.toLocaleString()} stars`],
    },
    useCases: [],
  };
};

export function useGithubRepositories(): UseGithubRepositoriesResult {
  const [templates, setTemplates] = useState<TemplateDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRepositories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/github/repos", { cache: "no-store" });
        const payload = (await response.json()) as GithubApiResponse & { error?: string };

        if (!response.ok) {
          throw new Error(payload.error || "Failed to fetch repositories");
        }

        if (!isMounted) {
          return;
        }

        const mapped = (payload.repositories ?? []).map(mapRepositoryToTemplate);
        setTemplates(mapped);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch repositories");
        setTemplates([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRepositories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { templates, loading, error };
}
