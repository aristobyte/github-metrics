/** @jest-environment node */

import { getOrgStats, getRepoStats } from "../github";

function mockResponse(data: unknown, init?: { status?: number; link?: string }) {
  const status = init?.status ?? 200;
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    headers: {
      get: (name: string) => {
        if (name.toLowerCase() !== "link") return null;
        return init?.link ?? null;
      },
    },
  };
}

describe("github utils", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns repo stats", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockImplementation((url: string) => {
      if (url.includes("search/issues") && url.includes("type%3Apr")) {
        return Promise.resolve(mockResponse({ total_count: 5 }));
      }
      if (url.includes("search/issues") && url.includes("type%3Aissue")) {
        return Promise.resolve(mockResponse({ total_count: 7 }));
      }
      if (url.includes("/contributors")) {
        return Promise.resolve(
          mockResponse([], {
            link:
              '<https://api.github.com/repos/acme/widgets/contributors?page=3>; rel="last"',
          }),
        );
      }
      if (url.includes("/commits?since=")) {
        return Promise.resolve(
          mockResponse([], {
            link:
              '<https://api.github.com/repos/acme/widgets/commits?page=4>; rel="last"',
          }),
        );
      }
      if (url.includes("/commits?per_page=1")) {
        return Promise.resolve(
          mockResponse([
            { commit: { committer: { date: "2024-01-02T00:00:00Z" } } },
          ]),
        );
      }
      if (url.endsWith("/releases/latest")) {
        return Promise.resolve(mockResponse({ tag_name: "v1.2.3" }));
      }
      if (url.includes("/releases?per_page=1")) {
        return Promise.resolve(
          mockResponse([], {
            link:
              '<https://api.github.com/repos/acme/widgets/releases?page=2>; rel="last"',
          }),
        );
      }
      if (url.endsWith("/repos/acme/widgets")) {
        return Promise.resolve(
          mockResponse({
            full_name: "acme/widgets",
            open_issues_count: 11,
            stargazers_count: 42,
          }),
        );
      }
      return Promise.resolve(mockResponse({}, { status: 404 }));
    });

    const result = await getRepoStats("acme", "widgets", {});

    expect(result).toEqual({
      fullName: "acme/widgets",
      stars: 42,
      openIssues: 7,
      openPulls: 5,
      contributors: 3,
      monthlyCommits: 4,
      lastCommitAt: "2024-01-02",
      latestReleaseTag: "v1.2.3",
      totalReleases: 2,
    });
  });

  it("returns org stats", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockImplementation((url: string) => {
      if (url.includes("/orgs/acme/repos")) {
        return Promise.resolve(
          mockResponse([
            {
              stargazers_count: 4,
              forks_count: 1,
              pushed_at: new Date().toISOString(),
              name: "alpha",
            },
            {
              stargazers_count: 10,
              forks_count: 2,
              pushed_at: new Date().toISOString(),
              name: "beta",
            },
          ]),
        );
      }
      if (url.includes("/public_members")) {
        return Promise.resolve(
          mockResponse([], {
            link:
              '<https://api.github.com/orgs/acme/public_members?page=2>; rel="last"',
          }),
        );
      }
      if (url.endsWith("/orgs/acme")) {
        return Promise.resolve(mockResponse({ public_repos: 2 }));
      }
      if (url.includes("search/issues") && url.includes("type%3Aissue")) {
        return Promise.resolve(mockResponse({ total_count: 12 }));
      }
      if (url.includes("search/issues") && url.includes("type%3Apr")) {
        return Promise.resolve(mockResponse({ total_count: 3 }));
      }
      return Promise.resolve(mockResponse({}, { status: 404 }));
    });

    const result = await getOrgStats("acme", {});

    expect(result).toEqual({
      org: "acme",
      publicRepos: 2,
      totalStars: 14,
      totalForks: 3,
      publicMembers: 2,
      reposUpdated30d: 2,
      openIssues: 12,
      openPulls: 3,
      topRepoName: "beta",
    });
  });
});
