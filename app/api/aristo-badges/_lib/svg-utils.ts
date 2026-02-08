import fs from "node:fs";

const templateCache = new Map<string, string>();

export function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function loadTemplate(relativePath: string) {
  const url = new URL(relativePath, import.meta.url);
  const key = url.toString();
  const cached = templateCache.get(key);
  if (cached) return cached;
  const content = fs.readFileSync(url, "utf8");
  templateCache.set(key, content);
  return content;
}

export function getScaledDimensions(
  baseWidth: number,
  baseHeight: number,
  width?: number
) {
  const resolvedWidth = width && width > 0 ? width : baseWidth;
  const height = (resolvedWidth * baseHeight) / baseWidth;
  return { width: resolvedWidth, height };
}
