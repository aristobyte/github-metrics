import { NextRequest, NextResponse } from "next/server";
import { getNpmStats } from "../_lib/npm";
import { renderNpmSvg } from "../_lib/npm-svg";
import { parseAccent, parseTheme, renderErrorSvg } from "../_lib/svg";

export const dynamic = "force-dynamic";

const REVALIDATE_SECONDS = 60 * 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const namespace = searchParams.get("namespace");
  const pkg = searchParams.get("pkg");
  const theme = parseTheme(searchParams.get("theme"));
  const accent = parseAccent(searchParams.get("accent"));
  const width = Number.parseInt(searchParams.get("width") ?? "", 10);

  if (!pkg) {
    const svg = renderErrorSvg("Missing pkg", theme, accent);
    return svgResponse(svg);
  }

  const name = namespace ? `${namespace}/${pkg}` : pkg;
  const stats = await getNpmStats(name, {
    revalidateSeconds: REVALIDATE_SECONDS,
  });

  if (!stats) {
    const svg = renderErrorSvg("NPM package not found", theme, accent);
    return svgResponse(svg, 404);
  }

  const svg = renderNpmSvg({
    packageName: stats.name,
    version: stats.latestVersion,
    downloads: stats.monthlyDownloads.toLocaleString(),
    width: Number.isNaN(width) ? undefined : width,
  });

  return svgResponse(svg);
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
