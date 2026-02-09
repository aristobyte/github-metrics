import { NextRequest, NextResponse } from "next/server";
import { getRepoStats } from "../_lib/github";
import { renderRepoErrorSvg, renderRepoSvg } from "../_lib/repo-svg";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const REVALIDATE_SECONDS = 60 * 30;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const owner =
    searchParams.get("owner") ??
    searchParams.get("org") ??
    searchParams.get("user");
  const repo = searchParams.get("repo") ?? searchParams.get("repository");
  const cacheEnabled = searchParams.get("cache") === "true";
  const width = Number.parseInt(searchParams.get("width") ?? "", 10);

  if (!owner || !repo) {
    const svg = renderRepoErrorSvg("Missing owner/repo");
    return svgResponse(svg, 400, cacheEnabled);
  }

  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
    const stats = await getRepoStats(owner, repo, {
      token,
      revalidateSeconds: REVALIDATE_SECONDS,
    });

    if (!stats) {
      const svg = renderRepoErrorSvg("GitHub repo not found");
      return svgResponse(svg, 404, cacheEnabled);
    }

    const [orgName, repoName] = stats.fullName.split("/");

    const svg = renderRepoSvg({
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
      width: Number.isNaN(width) ? undefined : width,
    });

    return svgResponse(svg, 200, cacheEnabled);
  } catch (error) {
    console.error(error);
    const svg = renderRepoErrorSvg("Failed to load GitHub data");
    return svgResponse(svg, 500, cacheEnabled);
  }
}

function svgResponse(svg: string, status = 200, cacheEnabled = false) {
  const cacheControl =
    cacheEnabled
      ? "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400"
      : "no-store";
  return new NextResponse(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": cacheControl,
    },
  });
}
