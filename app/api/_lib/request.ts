import type { NextRequest } from "next/server";

function parseWidth(raw: string | null) {
  const width = Number.parseInt(raw ?? "", 10);
  return Number.isNaN(width) ? undefined : width;
}

export function parseRepoRequest(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    owner:
      searchParams.get("owner") ??
      searchParams.get("org") ??
      searchParams.get("user"),
    repo: searchParams.get("repo") ?? searchParams.get("repository"),
    width: parseWidth(searchParams.get("width")),
  };
}

export function parseOrgRequest(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    org: searchParams.get("org") ?? searchParams.get("owner"),
    width: parseWidth(searchParams.get("width")),
  };
}

export function parseNpmRequest(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    namespace: searchParams.get("namespace") ?? searchParams.get("scope"),
    pkg: searchParams.get("pkg") ?? searchParams.get("package"),
    width: parseWidth(searchParams.get("width")),
  };
}
