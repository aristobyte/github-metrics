import { NextRequest, NextResponse } from "next/server";
import { getNpmStats } from "../_lib/npm";
import { renderNpmErrorSvg, renderNpmSvg } from "../_lib/npm-svg";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const REVALIDATE_SECONDS = 60 * 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const namespace = searchParams.get("namespace") ?? searchParams.get("scope");
  const pkg = searchParams.get("pkg") ?? searchParams.get("package");
  const cacheEnabled = searchParams.get("cache") === "true";
  const width = Number.parseInt(searchParams.get("width") ?? "", 10);

  if (!pkg) {
    const svg = renderNpmErrorSvg("Missing pkg");
    return svgResponse(svg, 400, cacheEnabled);
  }

  try {
    const name = namespace ? `${namespace}/${pkg}` : pkg;
    const stats = await getNpmStats(name, {
      revalidateSeconds: REVALIDATE_SECONDS,
    });

    if (!stats) {
      const svg = renderNpmErrorSvg("NPM package not found");
      return svgResponse(svg, 404, cacheEnabled);
    }

    const svg = renderNpmSvg({
      packageName: stats.name,
      version: stats.latestVersion,
      downloads: stats.monthlyDownloads.toLocaleString(),
      width: Number.isNaN(width) ? undefined : width,
    });

    return svgResponse(svg, 200, cacheEnabled);
  } catch (error) {
    console.error(error);
    const svg = renderNpmErrorSvg("Failed to load NPM data");
    return svgResponse(svg, 500, cacheEnabled);
  }
}

function svgResponse(svg: string, status = 200, cacheEnabled = false) {
  const cacheControl =
    cacheEnabled
      ? "public, max-age=0, s-maxage=3600, stale-while-revalidate=172800"
      : "no-store";
  return new NextResponse(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": cacheControl,
    },
  });
}
