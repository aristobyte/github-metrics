type Theme = "dark" | "light";

type SvgOptions = {
  title: string;
  lines: Array<{ label: string; value: string }>;
  theme: Theme;
  accent: string;
  width?: number;
};

type Palette = {
  bg: string;
  fg: string;
  sub: string;
  border: string;
};

const DEFAULT_ACCENT = "#22c55e";

const THEMES: Record<Theme, Palette> = {
  dark: {
    bg: "#0b1020",
    fg: "#e6e9f2",
    sub: "#a7b0c3",
    border: "#1f2a44",
  },
  light: {
    bg: "#ffffff",
    fg: "#0f172a",
    sub: "#475569",
    border: "#e2e8f0",
  },
};

function clampWidth(width: number) {
  if (Number.isNaN(width)) return 620;
  return Math.max(360, Math.min(860, width));
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function parseTheme(value: string | null): Theme {
  if (!value) return "dark";
  return value.toLowerCase() === "light" ? "light" : "dark";
}

export function parseAccent(value: string | null): string {
  if (!value) return DEFAULT_ACCENT;
  const cleaned = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) return cleaned;
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) return `#${cleaned}`;
  return DEFAULT_ACCENT;
}

export function renderCardSvg(options: SvgOptions) {
  const width = clampWidth(options.width ?? 620);
  const lineHeight = 22;
  const padding = 28;
  const titleHeight = 26;
  const lines = options.lines.slice(0, 10);
  const height = padding * 2 + titleHeight + lines.length * lineHeight + 6;
  const palette = THEMES[options.theme];
  const accent = options.accent;

  const lineItems = lines
    .map((line, index) => {
      const y = padding + titleHeight + index * lineHeight + 6;
      return `
        <text x="${padding}" y="${y}" class="label">${escapeXml(
          line.label,
        )}</text>
        <text x="${width - padding}" y="${y}" class="value">${escapeXml(
          line.value,
        )}</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(
    options.title,
  )}">
  <style>
    .title { font: 600 18px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; fill: ${palette.fg}; }
    .label { font: 500 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; fill: ${palette.sub}; }
    .value { font: 600 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; fill: ${palette.fg}; text-anchor: end; }
  </style>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="14" fill="${palette.bg}" stroke="${palette.border}" />
  <rect x="1" y="1" width="6" height="${height - 2}" rx="14" fill="${accent}" />
  <text x="${padding}" y="${padding}" class="title">${escapeXml(
    options.title,
  )}</text>
  ${lineItems}
</svg>`;
}

export function renderErrorSvg(message: string, theme: Theme, accent: string) {
  return renderCardSvg({
    title: "Badges error",
    lines: [{ label: "error", value: message }],
    theme,
    accent,
    width: 620,
  });
}
