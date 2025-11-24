export interface GithubRepositorySummary {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  topics: string[];
  languages: string[];
  updatedAt: string;
}
