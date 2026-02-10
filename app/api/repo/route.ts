import { NextRequest } from "next/server";
import { GitHubData } from "../_lib/data-sources";
import { parseRepoRequest } from "../_lib/request";
import { svgResponse } from "../_lib/response";
import { mapRepoSvg } from "../_lib/svg-mappers";
import { renderRepoErrorSvg, renderRepoSvg } from "../_lib/repo-svg";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const REVALIDATE_SECONDS = 60 * 30;

export async function GET(request: NextRequest) {
  const { owner, repo, width } = parseRepoRequest(request);

  if (!owner || !repo) {
    const svg = renderRepoErrorSvg("Missing owner/repo");
    return svgResponse(svg, 400);
  }

  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
    const stats = await GitHubData.repo(owner, repo, {
      token,
      revalidateSeconds: REVALIDATE_SECONDS,
    });

    if (!stats) {
      const svg = renderRepoErrorSvg("GitHub repo not found");
      return svgResponse(svg, 404);
    }

    const svg = renderRepoSvg(mapRepoSvg(stats, owner, repo, width));

    return svgResponse(svg, 200);
  } catch (error) {
    console.error(error);
    const svg = renderRepoErrorSvg("Failed to load GitHub data");
    return svgResponse(svg, 500);
  }
}
