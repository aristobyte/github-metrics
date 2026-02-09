import { CONFIG } from "../config";

export type RepoFormType = {
  owner: string;
  repo: string;
};

export type OrgFormType = {
  org: string;
};

export type NpmFormType = {
  namespace: string;
  pkg: string;
};
export function getBaseUrl() {
  if (typeof window === "undefined") return CONFIG.urls.defaultBaseUrl;
  return window.location.origin;
}

export function buildQuery(params: Record<string, string>) {
  const filtered = Object.entries(params).filter(
    ([, value]) => value.trim().length > 0,
  );
  if (filtered.length === 0) return "";
  const search = new URLSearchParams(filtered).toString();
  return `?${search}`;
}

export function buildRepoUrl(baseUrl: string, params: RepoFormType) {
  return `${baseUrl}${CONFIG.urls.apiBasePath}/repo${buildQuery(params)}`;
}

export function buildOrgUrl(baseUrl: string, params: OrgFormType) {
  return `${baseUrl}${CONFIG.urls.apiBasePath}/org${buildQuery(params)}`;
}

export function buildNpmUrl(baseUrl: string, params: NpmFormType) {
  return `${baseUrl}${CONFIG.urls.apiBasePath}/npm${buildQuery(params)}`;
}
