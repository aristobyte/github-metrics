jest.mock("../svg-utils", () => {
  const actual = jest.requireActual("../svg-utils");
  return {
    ...actual,
    loadTemplate: () =>
      "<svg width=\"{{WIDTH}}\" height=\"{{HEIGHT}}\">{{PACKAGE}} {{VERSION}} {{DOWNLOADS}}</svg>",
  };
});

import { renderNpmSvg, renderNpmErrorSvg } from "../npm-svg";

describe("npm-svg", () => {
  it("renders npm svg with replacements", () => {
    const svg = renderNpmSvg({
      packageName: "@aristo/spinner",
      version: "1.2.3",
      downloads: "1000",
      width: 400,
    });

    expect(svg).toMatchSnapshot();
  });

  it("renders npm error svg", () => {
    const svg = renderNpmErrorSvg("Missing package");
    expect(svg).toMatchSnapshot();
  });
});
