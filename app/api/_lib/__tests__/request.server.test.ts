/** @jest-environment node */

import { NextRequest } from "next/server";
import {
  parseRepoRequest,
  parseOrgRequest,
  parseNpmRequest,
} from "../request";

function makeRequest(url: string) {
  return new NextRequest(new URL(url));
}

describe("request utils", () => {
  it("parses repo request params", () => {
    const req = makeRequest(
      "https://example.com/api/repo?owner=org&repo=repo&width=420",
    );
    expect(parseRepoRequest(req)).toEqual({
      owner: "org",
      repo: "repo",
      width: 420,
    });
  });

  it("parses org request params", () => {
    const req = makeRequest("https://example.com/api/org?org=acme");
    expect(parseOrgRequest(req)).toEqual({
      org: "acme",
      width: undefined,
    });
  });

  it("parses npm request params", () => {
    const req = makeRequest(
      "https://example.com/api/npm?namespace=@acme&pkg=lib&width=180",
    );
    expect(parseNpmRequest(req)).toEqual({
      namespace: "@acme",
      pkg: "lib",
      width: 180,
    });
  });
});
