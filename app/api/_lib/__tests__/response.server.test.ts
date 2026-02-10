/** @jest-environment node */

import { svgResponse } from "../response";

describe("response utils", () => {
  it("creates svg response with headers", async () => {
    const response = svgResponse("<svg/>", 201);
    expect(response.status).toBe(201);
    expect(response.headers.get("Content-Type")).toBe(
      "image/svg+xml; charset=utf-8",
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(await response.text()).toBe("<svg/>");
  });
});
