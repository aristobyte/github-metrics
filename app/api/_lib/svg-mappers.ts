import type { GithubRepoStats, GithubOrgStats } from "./types";
import type { NpmStats } from "./types";
import { DataFormatter } from "./formatters";

export function mapRepoSvg(
  stats: GithubRepoStats,
  owner: string,
  repo: string,
  width?: number,
) {
  const { org, repo: repoName } = DataFormatter.splitRepo(
    stats.fullName,
    owner,
    repo,
  );

  return {
    org,
    repo: repoName,
    monthlyCommits: DataFormatter.number(stats.monthlyCommits),
    lastCommit: stats.lastCommitAt,
    latestRelease: DataFormatter.text(stats.latestReleaseTag),
    totalReleases: DataFormatter.number(stats.totalReleases),
    contributors: DataFormatter.number(stats.contributors),
    openPrs: DataFormatter.number(stats.openPulls),
    openIssues: DataFormatter.number(stats.openIssues),
    stars: DataFormatter.number(stats.stars),
    width,
  };
}

export function mapOrgSvg(stats: GithubOrgStats, width?: number) {
  return {
    org: stats.org,
    subtitle: DataFormatter.orgSubtitle(stats.org),
    reposUpdated30d: DataFormatter.number(stats.reposUpdated30d),
    openIssues: DataFormatter.number(stats.openIssues),
    openPrs: DataFormatter.number(stats.openPulls),
    totalForks: DataFormatter.number(stats.totalForks),
    publicMembers: DataFormatter.number(stats.publicMembers),
    publicRepos: DataFormatter.number(stats.publicRepos),
    orgStars: DataFormatter.number(stats.totalStars),
    topRepoName: DataFormatter.text(stats.topRepoName),
    width,
  };
}

export function mapNpmSvg(stats: NpmStats, width?: number) {
  return {
    packageName: stats.name,
    version: stats.latestVersion,
    downloads: DataFormatter.number(stats.monthlyDownloads),
    width,
  };
}
