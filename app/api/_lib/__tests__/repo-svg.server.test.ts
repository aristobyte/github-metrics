jest.mock("../svg-utils", () => {
  const actual = jest.requireActual("../svg-utils");
  return {
    ...actual,
    loadTemplate: () =>
      "<svg width=\"{{WIDTH}}\" height=\"{{HEIGHT}}\">{{ORG}}/{{REPO}} {{MONTHLY_COMMITS_AMOUNT}} {{LAST_COMMIT_DATE}} {{LATEST_RELEASE_VERSION}} {{TOTAL_RELEASES_AMOUNT}} {{CONTRIBUTORS_AMOUNT}} {{OPEN_PRS_AMOUNT}} {{OPEN_ISSUES_AMOUNT}} {{STARS_AMOUNT}}</svg>",
  };
});

import { renderRepoSvg, renderRepoErrorSvg } from "../repo-svg";

describe("repo-svg", () => {
  it("renders repo svg with replacements", () => {
    const svg = renderRepoSvg({
      org: "aristo",
      repo: "badges",
      monthlyCommits: "12",
      lastCommit: "2024-01-01",
      latestRelease: "v1.0.0",
      totalReleases: "4",
      contributors: "3",
      openPrs: "2",
      openIssues: "1",
      stars: "99",
      width: 500,
    });

    expect(svg).toMatchSnapshot();
  });

  it("renders repo error svg", () => {
    const svg = renderRepoErrorSvg("Missing owner/repo");
    expect(svg).toMatchSnapshot();
  });
});
