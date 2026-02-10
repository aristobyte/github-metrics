import { renderWithProviders } from "../../../tests/test-utils";
import { BadgesBuilder } from "../index";

describe("BadgesBuilder", () => {
  it("renders the builder layout", () => {
    const { container } = renderWithProviders(<BadgesBuilder />);
    expect(container).toMatchSnapshot();
  });
});
