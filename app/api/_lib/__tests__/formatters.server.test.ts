/** @jest-environment node */

import { DataFormatter } from "../formatters";

describe("formatters", () => {
  it("formats numbers safely", () => {
    expect(DataFormatter.number(1200)).toBe("1,200");
    expect(DataFormatter.number(undefined)).toBe("0");
  });

  it("formats text with fallback", () => {
    expect(DataFormatter.text("value")).toBe("value");
    expect(DataFormatter.text("")).toBe("-");
  });

  it("splits repo full name with fallback", () => {
    const result = DataFormatter.splitRepo("org/repo", "fallbackOrg", "fallbackRepo");
    expect(result).toEqual({ org: "org", repo: "repo" });
  });

  it("builds org subtitle", () => {
    expect(DataFormatter.orgSubtitle("acme")).toBe("github/acme");
  });
});
