import { renderWithProviders } from "../../../tests/test-utils";
import { QuickLinks } from "../index";

describe("QuickLinks", () => {
  it("renders quick links", () => {
    const { container } = renderWithProviders(<QuickLinks />);
    expect(container).toMatchSnapshot();
  });
});
