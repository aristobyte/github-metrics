/** @jest-environment node */

import { mapNpmSvg, mapOrgSvg, mapRepoSvg } from "../svg-mappers";

describe("svg-mappers", () => {
  it("maps repo svg data", () => {
    const mapped = mapRepoSvg(
      {
        fullName: "acme/tools",
        stars: 10,
        openIssues: 2,
        openPulls: 3,
        contributors: 4,
        monthlyCommits: 5,
        lastCommitAt: "2024-01-01",
        latestReleaseTag: "v1.0.0",
        totalReleases: 2,
      },
      "acme",
      "tools",
      500,
    );

    expect(mapped).toEqual({
      org: "acme",
      repo: "tools",
      monthlyCommits: "5",
      lastCommit: "2024-01-01",
      latestRelease: "v1.0.0",
      totalReleases: "2",
      contributors: "4",
      openPrs: "3",
      openIssues: "2",
      stars: "10",
      width: 500,
    });
  });

  it("maps org svg data", () => {
    const mapped = mapOrgSvg(
      {
        org: "acme",
        publicRepos: 2,
        totalStars: 3,
        totalForks: 4,
        publicMembers: 5,
        reposUpdated30d: 6,
        openIssues: 7,
        openPulls: 8,
        topRepoName: "top",
      },
      640,
    );

    expect(mapped).toEqual({
      org: "acme",
      subtitle: "github/acme",
      reposUpdated30d: "6",
      openIssues: "7",
      openPrs: "8",
      totalForks: "4",
      publicMembers: "5",
      publicRepos: "2",
      orgStars: "3",
      topRepoName: "top",
      width: 640,
    });
  });

  it("maps npm svg data", () => {
    const mapped = mapNpmSvg(
      {
        name: "@acme/pkg",
        latestVersion: "1.2.3",
        monthlyDownloads: 1200,
      },
      360,
    );

    expect(mapped).toEqual({
      packageName: "@acme/pkg",
      version: "1.2.3",
      downloads: "1,200",
      width: 360,
    });
  });
});
