import { escapeXml, getScaledDimensions, loadTemplate } from "./svg-utils";

type NpmSvgOptions = {
  packageName: string;
  version: string;
  downloads: string;
  width?: number;
};

const BASE_WIDTH = 651.74;
const BASE_HEIGHT = 88.32;

export function renderNpmSvg(options: NpmSvgOptions) {
  const { width, height } = getScaledDimensions(
    BASE_WIDTH,
    BASE_HEIGHT,
    options.width,
  );

  return loadTemplate("./templates/npm.svg")
    .replace(/\{\{WIDTH\}\}/g, width.toFixed(2))
    .replace(/\{\{HEIGHT\}\}/g, height.toFixed(2))
    .replace(/\{\{PACKAGE\}\}/g, escapeXml(options.packageName))
    .replace(/\{\{VERSION\}\}/g, escapeXml(options.version))
    .replace(/\{\{DOWNLOADS\}\}/g, escapeXml(options.downloads));
}

export function renderNpmErrorSvg(message: string) {
  return loadTemplate("./templates/npm-error.svg").replace(
    /\{\{ERROR_DESCRIPTION\}\}/g,
    escapeXml(message),
  );
}
