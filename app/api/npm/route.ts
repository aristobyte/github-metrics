import { NextRequest } from "next/server";
import { NpmData } from "../_lib/data-sources";
import { parseNpmRequest } from "../_lib/request";
import { svgResponse } from "../_lib/response";
import { mapNpmSvg } from "../_lib/svg-mappers";
import { renderNpmErrorSvg, renderNpmSvg } from "../_lib/npm-svg";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const REVALIDATE_SECONDS = 60 * 60;

export async function GET(request: NextRequest) {
  const { namespace, pkg, width } = parseNpmRequest(request);

  if (!pkg) {
    const svg = renderNpmErrorSvg("Missing pkg");
    return svgResponse(svg, 400);
  }

  try {
    const name = namespace ? `${namespace}/${pkg}` : pkg;
    const stats = await NpmData.package(name, {
      revalidateSeconds: REVALIDATE_SECONDS,
    });

    if (!stats) {
      const svg = renderNpmErrorSvg("NPM package not found");
      return svgResponse(svg, 404);
    }

    const svg = renderNpmSvg(mapNpmSvg(stats, width));

    return svgResponse(svg, 200);
  } catch (error) {
    console.error(error);
    const svg = renderNpmErrorSvg("Failed to load NPM data");
    return svgResponse(svg, 500);
  }
}
