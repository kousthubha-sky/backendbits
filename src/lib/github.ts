import { TemplateDefinition } from '../data/templates';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }
    
    return headers;
  }

  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub user "${username}" not found`);
      } else if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later or authenticate with a GitHub token');
      } else if (response.status === 422) {
        throw new Error('Invalid username format');
      } else {
        throw new Error(`Failed to fetch user: ${response.status} ${response.statusText || 'Unknown error'}`);
      }
    }

    return response.json();
  }

  async getUserRepos(username: string, page = 1, perPage = 30): Promise<GitHubRepo[]> {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub user "${username}" not found or has no public repositories`);
      } else if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later or authenticate with a GitHub token');
      } else if (response.status === 422) {
        throw new Error('Invalid username format');
      } else {
        throw new Error(`Failed to fetch repos: ${response.status} ${response.statusText || 'Unknown error'}`);
      }
    }

    return response.json();
  }

  async getOrgRepos(orgName: string, page = 1, perPage = 30): Promise<GitHubRepo[]> {
    const response = await fetch(
      `${GITHUB_API_BASE}/orgs/${orgName}/repos?page=${page}&per_page=${perPage}&sort=updated`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub organization "${orgName}" not found or has no public repositories`);
      } else if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later or authenticate with a GitHub token');
      } else if (response.status === 422) {
        throw new Error('Invalid organization name format');
      } else {
        throw new Error(`Failed to fetch org repos: ${response.status} ${response.statusText || 'Unknown error'}`);
      }
    }

    return response.json();
  }

  async getRepoLanguages(languagesUrl: string): Promise<{ [key: string]: number }> {
    const response = await fetch(languagesUrl, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      // Don't throw error for languages, just return empty object
      // This is not critical information
      console.warn(`Failed to fetch languages: ${response.status} ${response.statusText || 'Unknown error'}`);
      return {};
    }

    return response.json();
  }

  async searchRepositories(query: string, page = 1, perPage = 30): Promise<{ items: GitHubRepo[]; total_count: number }> {
    const response = await fetch(
      `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=stars`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error('Invalid search query. Please try a different search term');
      } else if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later or authenticate with a GitHub token');
      } else if (response.status === 503) {
        throw new Error('GitHub API is temporarily unavailable. Please try again later');
      } else {
        throw new Error(`Failed to search repositories: ${response.status} ${response.statusText || 'Unknown error'}`);
      }
    }

    return response.json();
  }

  async mapRepoToTemplate(repo: GitHubRepo): Promise<TemplateDefinition> {
    let languages: string[] = [];
    
    try {
      const languagesData = await this.getRepoLanguages(repo.languages_url);
      languages = Object.keys(languagesData);
    } catch (error) {
      console.warn(`Failed to fetch languages for ${repo.name}:`, error);
      if (repo.language) {
        languages = [repo.language];
      }
    }

    const techStack = [...languages, ...repo.topics.map(topic => 
      topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    )];

    return {
      slug: repo.full_name.replace('/', '-'),
      name: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      status: 'GitHub',
      category: 'github',
      summary: repo.description || 'No description available',
      description: repo.description || 'No description available',
      techStack: techStack.length > 0 ? techStack : ['GitHub Repository'],
      features: [
        `⭐ ${repo.stargazers_count} stars`,
        `🍴 ${repo.forks_count} forks`,
        `Created by ${repo.owner.login}`,
        `Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`,
      ],
      demoUrl: repo.homepage,
      codeUrl: repo.html_url,
      deployment: {
        headline: 'View on GitHub',
        providers: ['GitHub'],
        env: [],
        notes: [`Repository: ${repo.full_name}`],
      },
      useCases: [],
    };
  }

  async getUserReposAsTemplates(username: string): Promise<TemplateDefinition[]> {
    const repos = await this.getUserRepos(username);
    const templates = await Promise.all(
      repos.map(repo => this.mapRepoToTemplate(repo))
    );
    return templates;
  }

  async getOrgReposAsTemplates(orgName: string): Promise<TemplateDefinition[]> {
    const repos = await this.getOrgRepos(orgName);
    const templates = await Promise.all(
      repos.map(repo => this.mapRepoToTemplate(repo))
    );
    return templates;
  }

  async searchReposAsTemplates(query: string): Promise<TemplateDefinition[]> {
    const { items } = await this.searchRepositories(query);
    const templates = await Promise.all(
      items.map(repo => this.mapRepoToTemplate(repo))
    );
    return templates;
  }
}

export const githubService = new GitHubService(
  typeof window !== 'undefined' ? undefined : process.env.GITHUB_TOKEN
);
