/** @jest-environment node */

import { fetchJson } from "../http";

describe("http utils", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns data and response on success", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
      headers: new Headers({ "x-test": "1" }),
    });

    const result = await fetchJson("https://example.com/data");
    expect(result?.data).toEqual({ ok: true });
    expect(result?.response.headers.get("x-test")).toBe("1");
  });

  it("returns null on non-ok response", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
      headers: new Headers(),
    });

    const result = await fetchJson("https://example.com/error");
    expect(result).toBeNull();
  });

  it("returns null on fetch error", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockRejectedValue(new Error("boom"));

    const result = await fetchJson("https://example.com/fail");
    expect(result).toBeNull();
  });
});
