import { NextRequest, NextResponse } from "next/server";
import { getRepoStats } from "../_lib/github";
import { renderRepoSvg } from "../_lib/repo-svg";
import { parseAccent, parseTheme, renderErrorSvg } from "../_lib/svg";

export const dynamic = "force-dynamic";

const REVALIDATE_SECONDS = 60 * 30;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const theme = parseTheme(searchParams.get("theme"));
  const accent = parseAccent(searchParams.get("accent"));
  const width = Number.parseInt(searchParams.get("width") ?? "", 10);

  if (!owner || !repo) {
    const svg = renderErrorSvg("Missing owner/repo", theme, accent);
    return svgResponse(svg);
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
  const stats = await getRepoStats(owner, repo, {
    token,
    revalidateSeconds: REVALIDATE_SECONDS,
  });

  if (!stats) {
    const svg = renderErrorSvg("GitHub repo not found", theme, accent);
    return svgResponse(svg, 404);
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

  return svgResponse(svg);
}

function svgResponse(svg: string, status = 200) {
  return new NextResponse(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
