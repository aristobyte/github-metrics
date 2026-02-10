/** @jest-environment node */

import { getNpmStats } from "../npm";

function mockResponse(data: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  };
}

describe("npm utils", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns npm stats", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockImplementation((url: string) => {
      if (url.includes("registry.npmjs.org")) {
        return Promise.resolve(
          mockResponse({
            name: "@acme/pkg",
            "dist-tags": { latest: "2.3.4" },
          }),
        );
      }
      if (url.includes("api.npmjs.org")) {
        return Promise.resolve(mockResponse({ downloads: 12345 }));
      }
      return Promise.resolve(mockResponse({}, 404));
    });

    const result = await getNpmStats("@acme/pkg", {});
    expect(result).toEqual({
      name: "@acme/pkg",
      latestVersion: "2.3.4",
      monthlyDownloads: 12345,
    });
  });

  it("returns null on registry failure", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue(mockResponse({}, 404));

    const result = await getNpmStats("@acme/pkg", {});
    expect(result).toBeNull();
  });
});
