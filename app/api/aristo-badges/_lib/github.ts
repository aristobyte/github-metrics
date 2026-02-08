type GithubFetchOptions = {
  token?: string | null;
  revalidateSeconds?: number;
};

type GithubRepoStats = {
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

type GithubOrgStats = {
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

const GITHUB_API = "https://api.github.com";

function authHeaders(token?: string | null) {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

function getRevalidate(revalidateSeconds?: number) {
  if (!revalidateSeconds) return undefined;
  return { revalidate: revalidateSeconds };
}

function getPageCountFromLink(linkHeader: string | null) {
  if (!linkHeader) return null;
  const parts = linkHeader.split(",");
  const lastPart = parts.find((part) => part.includes('rel="last"'));
  if (!lastPart) return null;
  const match = lastPart.match(/page=(\d+)/);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

function formatIsoDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toISOString().slice(0, 10);
}

async function githubFetchJson<T>(
  url: string,
  options: GithubFetchOptions,
): Promise<{ data: T; link: string | null } | null> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "aristo-badges",
      ...authHeaders(options.token),
    },
    next: getRevalidate(options.revalidateSeconds),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as T;
  return { data, link: response.headers.get("link") };
}

async function getOpenPulls(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
) {
  const query = encodeURIComponent(`repo:${owner}/${repo} type:pr state:open`);
  const url = `${GITHUB_API}/search/issues?q=${query}`;
  const result = await githubFetchJson<{ total_count: number }>(url, options);
  return result?.data.total_count ?? 0;
}

async function getOpenIssues(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
) {
  const query = encodeURIComponent(
    `repo:${owner}/${repo} type:issue state:open`,
  );
  const url = `${GITHUB_API}/search/issues?q=${query}`;
  const result = await githubFetchJson<{ total_count: number }>(url, options);
  return result?.data.total_count ?? 0;
}

async function getContributorsCount(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contributors?per_page=1&anon=1`;
  const result = await githubFetchJson<unknown[]>(url, options);
  if (!result) return 0;
  const lastPage = getPageCountFromLink(result.link);
  if (lastPage) return lastPage;
  return result.data.length;
}

async function getTotalReleases(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/releases?per_page=1`;
  const result = await githubFetchJson<unknown[]>(url, options);
  if (!result) return 0;
  const lastPage = getPageCountFromLink(result.link);
  if (lastPage) return lastPage;
  return result.data.length;
}

async function getMonthlyCommits(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
) {
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const url = `${GITHUB_API}/repos/${owner}/${repo}/commits?since=${since.toISOString()}&per_page=1`;
  const result = await githubFetchJson<unknown[]>(url, options);
  if (!result) return 0;
  const lastPage = getPageCountFromLink(result.link);
  if (lastPage) return lastPage;
  return result.data.length;
}

async function getLastCommitDate(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=1`;
  const result = await githubFetchJson<
    Array<{ commit: { committer: { date: string } } }>
  >(url, options);
  if (!result || result.data.length === 0) return "-";
  return formatIsoDate(result.data[0].commit.committer.date);
}

async function getLatestReleaseTag(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/releases/latest`;
  const result = await githubFetchJson<{ tag_name?: string }>(url, options);
  if (!result) return null;
  return result.data.tag_name ?? null;
}

export async function getRepoStats(
  owner: string,
  repo: string,
  options: GithubFetchOptions,
): Promise<GithubRepoStats | null> {
  const repoUrl = `${GITHUB_API}/repos/${owner}/${repo}`;
  const repoResult = await githubFetchJson<{
    full_name: string;
    open_issues_count: number;
    stargazers_count: number;
  }>(repoUrl, options);
  if (!repoResult) return null;

  const [
    openPulls,
    openIssues,
    contributors,
    monthlyCommits,
    lastCommitAt,
    latestReleaseTag,
    totalReleases,
  ] = await Promise.all([
    getOpenPulls(owner, repo, options),
    getOpenIssues(owner, repo, options),
    getContributorsCount(owner, repo, options),
    getMonthlyCommits(owner, repo, options),
    getLastCommitDate(owner, repo, options),
    getLatestReleaseTag(owner, repo, options),
    getTotalReleases(owner, repo, options),
  ]);

  return {
    fullName: repoResult.data.full_name,
    stars: repoResult.data.stargazers_count ?? 0,
    openIssues,
    openPulls,
    contributors,
    monthlyCommits,
    lastCommitAt,
    latestReleaseTag,
    totalReleases,
  };
}

async function listOrgRepos(org: string, options: GithubFetchOptions) {
  const perPage = 100;
  let page = 1;
  let totalStars = 0;
  let totalForks = 0;
  let reposUpdated30d = 0;
  let topRepoName: string | null = null;
  let topRepoStars = -1;
  let finished = false;

  while (!finished && page <= 20) {
    const url = `${GITHUB_API}/orgs/${org}/repos?per_page=${perPage}&page=${page}&type=public`;
    const result = await githubFetchJson<
      Array<{
        stargazers_count: number;
        forks_count: number;
        pushed_at: string;
        name: string;
      }>
    >(url, options);
    if (!result) break;
    for (const repo of result.data) {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      if (repo.stargazers_count > topRepoStars) {
        topRepoStars = repo.stargazers_count;
        topRepoName = repo.name;
      }
      if (repo.pushed_at) {
        const pushedDate = new Date(repo.pushed_at);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 30);
        if (pushedDate >= cutoff) reposUpdated30d += 1;
      }
    }
    if (result.data.length < perPage) {
      finished = true;
    } else {
      page += 1;
    }
  }

  return { totalStars, totalForks, reposUpdated30d, topRepoName };
}

async function getPublicMembersCount(org: string, options: GithubFetchOptions) {
  const url = `${GITHUB_API}/orgs/${org}/public_members?per_page=1`;
  const result = await githubFetchJson<unknown[]>(url, options);
  if (!result) return 0;
  const lastPage = getPageCountFromLink(result.link);
  if (lastPage) return lastPage;
  return result.data.length;
}

async function getOrgIssueCounts(org: string, options: GithubFetchOptions) {
  const issueQuery = encodeURIComponent(`org:${org} type:issue state:open`);
  const prQuery = encodeURIComponent(`org:${org} type:pr state:open`);
  const [issues, prs] = await Promise.all([
    githubFetchJson<{ total_count: number }>(
      `${GITHUB_API}/search/issues?q=${issueQuery}`,
      options,
    ),
    githubFetchJson<{ total_count: number }>(
      `${GITHUB_API}/search/issues?q=${prQuery}`,
      options,
    ),
  ]);
  return {
    openIssues: issues?.data.total_count ?? 0,
    openPulls: prs?.data.total_count ?? 0,
  };
}

export async function getOrgStats(
  org: string,
  options: GithubFetchOptions,
): Promise<GithubOrgStats | null> {
  const url = `${GITHUB_API}/orgs/${org}`;
  const result = await githubFetchJson<{ public_repos: number }>(url, options);
  if (!result) return null;

  const [
    { totalStars, totalForks, reposUpdated30d, topRepoName },
    publicMembers,
    issues,
  ] = await Promise.all([
    listOrgRepos(org, options),
    getPublicMembersCount(org, options),
    getOrgIssueCounts(org, options),
  ]);

  return {
    org,
    publicRepos: result.data.public_repos,
    totalStars,
    totalForks,
    publicMembers,
    reposUpdated30d,
    openIssues: issues.openIssues,
    openPulls: issues.openPulls,
    topRepoName,
  };
}
