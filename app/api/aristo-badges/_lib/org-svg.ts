import { escapeXml, getScaledDimensions, loadTemplate } from "./svg-utils";

type OrgSvgOptions = {
  org: string;
  subtitle: string;
  reposUpdated30d: string;
  openIssues: string;
  openPrs: string;
  totalForks: string;
  publicMembers: string;
  publicRepos: string;
  orgStars: string;
  topRepoName: string;
  width?: number;
};

const BASE_WIDTH = 890;
const BASE_HEIGHT = 290;

export function renderOrgSvg(options: OrgSvgOptions) {
  const { width, height } = getScaledDimensions(BASE_WIDTH, BASE_HEIGHT, options.width);

  return loadTemplate("./templates/org.svg")
    .replace(/\{\{WIDTH\}\}/g, width.toFixed(2))
    .replace(/\{\{HEIGHT\}\}/g, height.toFixed(2))
    .replace(/\{\{ORG\}\}/g, escapeXml(options.org))
    .replace(/\{\{SUBTITLE\}\}/g, escapeXml(options.subtitle))
    .replace(/\{\{REPO_AMOUNT\}\}/g, escapeXml(options.reposUpdated30d))
    .replace(/\{\{OPEN_ISSUES_AMOUNT\}\}/g, escapeXml(options.openIssues))
    .replace(/\{\{OPEN_PRS_AMOUNT\}\}/g, escapeXml(options.openPrs))
    .replace(/\{\{TOTAL_FORKS\}\}/g, escapeXml(options.totalForks))
    .replace(/\{\{PUBLIC_MEMBERS_MEMBERS\}\}/g, escapeXml(options.publicMembers))
    .replace(/\{\{PUBLIC_REPOS_AMOUNT\}\}/g, escapeXml(options.publicRepos))
    .replace(/\{\{ORGANISATION_STARS_AMOUNT\}\}/g, escapeXml(options.orgStars))
    .replace(/\{\{TOP_REPO_NAME\}\}/g, escapeXml(options.topRepoName));
}
