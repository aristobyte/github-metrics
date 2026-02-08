import { NextRequest, NextResponse } from "next/server";
import { getOrgStats, getRepoStats } from "../_lib/github";
import { getNpmStats } from "../_lib/npm";
import { renderNpmSvg } from "../_lib/npm-svg";
import { renderOrgSvg } from "../_lib/org-svg";
import { renderRepoSvg } from "../_lib/repo-svg";
import { parseAccent, parseTheme, renderErrorSvg } from "../_lib/svg";

export const dynamic = "force-dynamic";

const REVALIDATE_REPO = 60 * 30;
const REVALIDATE_ORG = 60 * 60;
const REVALIDATE_NPM = 60 * 60;

type RouteResult = { svg: string; status?: number; cache: string };

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } },
) {
  const { searchParams } = new URL(request.url);
  const theme = parseTheme(searchParams.get("theme"));
  const accent = parseAccent(searchParams.get("accent"));
  const width = Number.parseInt(searchParams.get("width") ?? "", 10);
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;

  const parts = (context.params.path || []).map(decodeURIComponent);
  if (parts.length === 0) {
    return svgResponse(renderErrorSvg("Missing path", theme, accent));
  }

  const kind = parts[0];
  const rest = parts.slice(1);
  const parsedWidth = Number.isNaN(width) ? undefined : width;

  let result: RouteResult;
  if (kind === "repo") {
    result = await handleRepo(rest, token, theme, accent, parsedWidth);
  } else if (kind === "org") {
    result = await handleOrg(rest, token, theme, accent, parsedWidth);
  } else if (kind === "npm") {
    result = await handleNpm(rest, theme, accent, parsedWidth);
  } else {
    result = {
      svg: renderErrorSvg("Unknown aristo-badge type", theme, accent),
      status: 404,
      cache: "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    };
  }

  return svgResponse(result.svg, result.status ?? 200, result.cache);
}

function stripSvgSegment(value: string | undefined) {
  if (!value) return "";
  return value.endsWith(".svg") ? value.slice(0, -4) : value;
}

async function handleRepo(
  rest: string[],
  token: string | null,
  theme: "dark" | "light",
  accent: string,
  width?: number,
): Promise<RouteResult> {
  const owner = rest[0];
  const repo = stripSvgSegment(rest[1]);
  if (!owner || !repo) {
    return {
      svg: renderErrorSvg("Missing owner/repo", theme, accent),
      cache: "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    };
  }

  const stats = await getRepoStats(owner, repo, {
    token,
    revalidateSeconds: REVALIDATE_REPO,
  });
  if (!stats) {
    return {
      svg: renderErrorSvg("GitHub repo not found", theme, accent),
      status: 404,
      cache: "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    };
  }

  const [orgName, repoName] = stats.fullName.split("/");

  return {
    svg: renderRepoSvg({
      org: orgName ?? owner,
      repo: repoName ?? repo,
      monthlyCommits: stats.monthlyCommits.toLocaleString(),
      lastCommit: stats.lastCommitAt,
      latestRelease: stats.latestReleaseTag ?? "-",
      totalReleases: stats.totalReleases.toLocaleString(),
      contributors: stats.contributors.toLocaleString(),
      openPrs: stats.openPulls.toLocaleString(),
      openIssues: stats.openIssues.toLocaleString(),
      stars: stats.stars.toLocaleString(),
      width,
    }),
    cache: "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400",
  };
}

async function handleOrg(
  rest: string[],
  token: string | null,
  theme: "dark" | "light",
  accent: string,
  width?: number,
): Promise<RouteResult> {
  const org = stripSvgSegment(rest[0]);
  if (!org) {
    return {
      svg: renderErrorSvg("Missing org", theme, accent),
      cache: "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    };
  }

  const stats = await getOrgStats(org, {
    token,
    revalidateSeconds: REVALIDATE_ORG,
  });
  if (!stats) {
    return {
      svg: renderErrorSvg("GitHub org not found", theme, accent),
      status: 404,
      cache: "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    };
  }

  return {
    svg: renderOrgSvg({
      org: stats.org,
      subtitle: `github/${stats.org}`,
      reposUpdated30d: stats.reposUpdated30d.toLocaleString(),
      openIssues: stats.openIssues.toLocaleString(),
      openPrs: stats.openPulls.toLocaleString(),
      totalForks: stats.totalForks.toLocaleString(),
      publicMembers: stats.publicMembers.toLocaleString(),
      publicRepos: stats.publicRepos.toLocaleString(),
      orgStars: stats.totalStars.toLocaleString(),
      topRepoName: stats.topRepoName ?? "-",
      width,
    }),
    cache: "public, max-age=0, s-maxage=3600, stale-while-revalidate=172800",
  };
}

async function handleNpm(
  rest: string[],
  theme: "dark" | "light",
  accent: string,
  width?: number,
): Promise<RouteResult> {
  const maybeScope = rest.length > 1 ? rest[0] : null;
  const pkgSegment = rest.length > 1 ? rest[1] : rest[0];
  const pkg = stripSvgSegment(pkgSegment);

  if (!pkg) {
    return {
      svg: renderErrorSvg("Missing pkg", theme, accent),
      cache: "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    };
  }

  const name = maybeScope ? `@${maybeScope}/${pkg}` : pkg;
  const stats = await getNpmStats(name, {
    revalidateSeconds: REVALIDATE_NPM,
  });
  if (!stats) {
    return {
      svg: renderErrorSvg("NPM package not found", theme, accent),
      status: 404,
      cache: "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    };
  }

  return {
    svg: renderNpmSvg({
      packageName: stats.name,
      version: stats.latestVersion,
      downloads: stats.monthlyDownloads.toLocaleString(),
      width,
    }),
    cache: "public, max-age=0, s-maxage=3600, stale-while-revalidate=172800",
  };
}

function svgResponse(
  svg: string,
  status = 200,
  cache = "public, max-age=0, s-maxage=600",
) {
  return new NextResponse(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": cache,
    },
  });
}
