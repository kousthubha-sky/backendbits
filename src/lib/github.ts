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

// Rate limiting implementation
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs = 60 * 1000; // 1 minute
  private readonly maxRequests = 30; // 30 requests per minute

  isAllowed(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.requests.has(key)) {
      this.requests.set(key, [now]);
      return true;
    }

    const timestamps = this.requests.get(key)!;
    const recentRequests = timestamps.filter(ts => ts > windowStart);

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }

  cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    for (const [key, timestamps] of this.requests.entries()) {
      const recentRequests = timestamps.filter(ts => ts > windowStart);
      if (recentRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, recentRequests);
      }
    }
  }
}

const rateLimiter = new RateLimiter();

// Cleanup rate limiter every 5 minutes
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

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
    // Rate limiting check
    if (!rateLimiter.isAllowed(`github_user_${username}`)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Input validation
    if (!username || typeof username !== 'string' || username.length === 0 || username.length > 39) {
      throw new Error('Invalid username format');
    }

    // Sanitize username - only allow alphanumeric, hyphens, and underscores
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9-_]/g, '');
    if (sanitizedUsername !== username) {
      throw new Error('Username contains invalid characters');
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${sanitizedUsername}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub user "${sanitizedUsername}" not found`);
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
    // Rate limiting check
    if (!rateLimiter.isAllowed(`github_repos_${username}`)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Input validation
    if (!username || typeof username !== 'string' || username.length === 0 || username.length > 39) {
      throw new Error('Invalid username format');
    }

    // Sanitize username
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9-_]/g, '');
    if (sanitizedUsername !== username) {
      throw new Error('Username contains invalid characters');
    }

    // Validate pagination parameters
    if (page < 1 || page > 100) {
      throw new Error('Page must be between 1 and 100');
    }
    if (perPage < 1 || perPage > 100) {
      throw new Error('Per page must be between 1 and 100');
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${sanitizedUsername}/repos?page=${page}&per_page=${perPage}&sort=updated`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub user "${sanitizedUsername}" not found or has no public repositories`);
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
    // Rate limiting check
    if (!rateLimiter.isAllowed(`github_search_${query.substring(0, 10)}`)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Input validation
    if (!query || typeof query !== 'string' || query.length === 0 || query.length > 256) {
      throw new Error('Invalid search query');
    }

    // Sanitize query - remove potentially dangerous characters
    const sanitizedQuery = query.replace(/[<>]/g, '').trim();
    if (sanitizedQuery !== query.trim()) {
      throw new Error('Search query contains invalid characters');
    }

    // Validate pagination parameters
    if (page < 1 || page > 100) {
      throw new Error('Page must be between 1 and 100');
    }
    if (perPage < 1 || perPage > 100) {
      throw new Error('Per page must be between 1 and 100');
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(sanitizedQuery)}&page=${page}&per_page=${perPage}&sort=stars`,
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
      status: 'Preview',
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
