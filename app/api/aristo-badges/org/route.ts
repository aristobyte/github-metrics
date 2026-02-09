import { NextRequest, NextResponse } from "next/server";
import { getOrgStats } from "../_lib/github";
import { renderOrgErrorSvg, renderOrgSvg } from "../_lib/org-svg";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const REVALIDATE_SECONDS = 60 * 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const org = searchParams.get("org");
  const width = Number.parseInt(searchParams.get("width") ?? "", 10);

  if (!org) {
    const svg = renderOrgErrorSvg("Missing org");
    return svgResponse(svg);
  }

  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
    const stats = await getOrgStats(org, {
      token,
      revalidateSeconds: REVALIDATE_SECONDS,
    });

    if (!stats) {
      const svg = renderOrgErrorSvg("GitHub org not found");
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
  } catch (error) {
    console.error(error);
    const svg = renderOrgErrorSvg("Failed to load GitHub data");
    return svgResponse(svg, 500);
  }
}

function svgResponse(svg: string, status = 200) {
  return new NextResponse(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=172800",
    },
  });
}
