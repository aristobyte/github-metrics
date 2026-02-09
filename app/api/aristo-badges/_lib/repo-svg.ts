import { escapeXml, getScaledDimensions, loadTemplate } from "./svg-utils";

type RepoSvgOptions = {
  org: string;
  repo: string;
  monthlyCommits: string;
  lastCommit: string;
  latestRelease: string;
  totalReleases: string;
  contributors: string;
  openPrs: string;
  openIssues: string;
  stars: string;
  width?: number;
};

const BASE_WIDTH = 896.6;
const BASE_HEIGHT = 290.44;

export function renderRepoSvg(options: RepoSvgOptions) {
  const { width, height } = getScaledDimensions(BASE_WIDTH, BASE_HEIGHT, options.width);

  return loadTemplate("./templates/repo.svg")
    .replace(/\{\{WIDTH\}\}/g, width.toFixed(2))
    .replace(/\{\{HEIGHT\}\}/g, height.toFixed(2))
    .replace(/\{\{ORG\}\}/g, escapeXml(options.org))
    .replace(/\{\{REPO\}\}/g, escapeXml(options.repo))
    .replace(/\{\{MONTHLY_COMMITS_AMOUNT\}\}/g, escapeXml(options.monthlyCommits))
    .replace(/\{\{LAST_COMMIT_DATE\}\}/g, escapeXml(options.lastCommit))
    .replace(/\{\{LATEST_RELEASE_VERSION\}\}/g, escapeXml(options.latestRelease))
    .replace(/\{\{TOTAL_RELEASES_AMOUNT\}\}/g, escapeXml(options.totalReleases))
    .replace(/\{\{CONTRIBUTORS_AMOUNT\}\}/g, escapeXml(options.contributors))
    .replace(/\{\{OPEN_PRS_AMOUNT\}\}/g, escapeXml(options.openPrs))
    .replace(/\{\{OPEN_ISSUES_AMOUNT\}\}/g, escapeXml(options.openIssues))
    .replace(/\{\{STARS_AMOUNT\}\}/g, escapeXml(options.stars));
}

export function renderRepoErrorSvg(message: string) {
  return loadTemplate("./templates/repo-error.svg").replace(
    /\{\{ERROR_DESCRIPTION\}\}/g,
    escapeXml(message),
  );
}
