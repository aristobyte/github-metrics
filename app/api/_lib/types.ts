export type GithubRepoStats = {
  fullName: string;
  stars: number;
  openIssues: number;
  openPulls: number;
  contributors: number;
  monthlyCommits: number;
  lastCommitAt: string;
  latestReleaseTag: string | null;
  totalReleases: number;
};

export type GithubOrgStats = {
  org: string;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  publicMembers: number;
  reposUpdated30d: number;
  openIssues: number;
  openPulls: number;
  topRepoName: string | null;
};

export type NpmStats = {
  name: string;
  latestVersion: string;
  monthlyDownloads: number;
};
