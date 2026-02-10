import { NextResponse } from "next/server";

export function svgResponse(svg: string, status = 200) {
  return new NextResponse(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
