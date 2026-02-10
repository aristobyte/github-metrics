import { NextRequest } from "next/server";
import { GitHubData } from "../_lib/data-sources";
import { parseOrgRequest } from "../_lib/request";
import { svgResponse } from "../_lib/response";
import { mapOrgSvg } from "../_lib/svg-mappers";
import { renderOrgErrorSvg, renderOrgSvg } from "../_lib/org-svg";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const REVALIDATE_SECONDS = 60 * 60;

export async function GET(request: NextRequest) {
  const { org, width } = parseOrgRequest(request);

  if (!org) {
    const svg = renderOrgErrorSvg("Missing org");
    return svgResponse(svg, 400);
  }

  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
    const stats = await GitHubData.org(org, {
      token,
      revalidateSeconds: REVALIDATE_SECONDS,
    });

    if (!stats) {
      const svg = renderOrgErrorSvg("GitHub org not found");
      return svgResponse(svg, 404);
    }

    const svg = renderOrgSvg(mapOrgSvg(stats, width));

    return svgResponse(svg, 200);
  } catch (error) {
    console.error(error);
    const svg = renderOrgErrorSvg("Failed to load GitHub data");
    return svgResponse(svg, 500);
  }
}
