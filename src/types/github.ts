export interface GitHubConfig {
  pat: string;
  owner: string;
  repo: string;
  branch: string;
  isConfigured: boolean;
}

export type InsertionMode = 'overwrite' | 'append' | 'custom-position';

export interface RemoteFileCheckResult {
  exists: boolean;
  sha?: string;
  content?: string;
  size?: number;
  encoding?: string;
}

export interface CommitResult {
  success: boolean;
  commitSha?: string;
  commitUrl?: string;
  fileUrl?: string;
  errorMessage?: string;
}
