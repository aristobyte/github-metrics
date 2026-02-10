import { renderWithProviders } from "../../../tests/test-utils";
import { SiteHeader } from "../index";

describe("SiteHeader", () => {
  it("renders header", () => {
    const { container } = renderWithProviders(<SiteHeader />);
    expect(container).toMatchSnapshot();
  });
});
