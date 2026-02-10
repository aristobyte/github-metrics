/** @jest-environment node */

describe("svg-utils", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("escapes XML entities", async () => {
    const { escapeXml } = await import("../svg-utils");
    const input = `Tom & Jerry <tag> "quote" 'apostrophe'`;
    expect(escapeXml(input)).toBe(
      "Tom &amp; Jerry &lt;tag&gt; &quot;quote&quot; &apos;apostrophe&apos;",
    );
  });

  it("scales dimensions with optional width", async () => {
    const { getScaledDimensions } = await import("../svg-utils");
    const { width, height } = getScaledDimensions(100, 50, 200);
    expect(width).toBe(200);
    expect(height).toBe(100);
  });

  it("loads template and caches it", async () => {
    jest.doMock("node:fs", () => ({
      readFileSync: jest.fn(() => "<svg/>"),
    }));

    const { loadTemplate } = await import("../svg-utils");
    const fs = await import("node:fs");

    const first = loadTemplate("./templates/repo.svg");
    const second = loadTemplate("./templates/repo.svg");

    expect(first).toBe("<svg/>");
    expect(second).toBe("<svg/>");
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  });
});
