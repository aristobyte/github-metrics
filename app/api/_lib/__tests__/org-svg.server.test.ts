jest.mock("../svg-utils", () => {
  const actual = jest.requireActual("../svg-utils");
  return {
    ...actual,
    loadTemplate: () =>
      "<svg width=\"{{WIDTH}}\" height=\"{{HEIGHT}}\">{{ORG}} {{SUBTITLE}} {{REPO_AMOUNT}} {{OPEN_ISSUES_AMOUNT}} {{OPEN_PRS_AMOUNT}} {{TOTAL_FORKS}} {{PUBLIC_MEMBERS_MEMBERS}} {{PUBLIC_REPOS_AMOUNT}} {{ORGANISATION_STARS_AMOUNT}} {{TOP_REPO_NAME}}</svg>",
  };
});

import { renderOrgSvg, renderOrgErrorSvg } from "../org-svg";

describe("org-svg", () => {
  it("renders org svg with replacements", () => {
    const svg = renderOrgSvg({
      org: "aristo",
      subtitle: "Org stats",
      reposUpdated30d: "7",
      openIssues: "8",
      openPrs: "9",
      totalForks: "4",
      publicMembers: "2",
      publicRepos: "10",
      orgStars: "120",
      topRepoName: "top",
      width: 600,
    });

    expect(svg).toMatchSnapshot();
  });

  it("renders org error svg", () => {
    const svg = renderOrgErrorSvg("Missing org");
    expect(svg).toMatchSnapshot();
  });
});
