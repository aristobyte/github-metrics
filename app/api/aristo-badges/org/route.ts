import { NextRequest, NextResponse } from "next/server";
import { getOrgStats } from "../_lib/github";
import { renderOrgSvg } from "../_lib/org-svg";
import { parseAccent, parseTheme, renderErrorSvg } from "../_lib/svg";

export const dynamic = "force-dynamic";

const REVALIDATE_SECONDS = 60 * 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const org = searchParams.get("org");
  const theme = parseTheme(searchParams.get("theme"));
  const accent = parseAccent(searchParams.get("accent"));
  const width = Number.parseInt(searchParams.get("width") ?? "", 10);

  if (!org) {
    const svg = renderErrorSvg("Missing org", theme, accent);
    return svgResponse(svg);
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
  const stats = await getOrgStats(org, {
    token,
    revalidateSeconds: REVALIDATE_SECONDS,
  });

  if (!stats) {
    const svg = renderErrorSvg("GitHub org not found", theme, accent);
    return svgResponse(svg, 404);
  }

  const svg = renderOrgSvg({
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
    width: Number.isNaN(width) ? undefined : width,
  });

  return svgResponse(svg);
}

function svgResponse(svg: string, status = 200) {
  return new NextResponse(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=172800",
    },
  });
}
