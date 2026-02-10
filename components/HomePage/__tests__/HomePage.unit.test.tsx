import { renderWithProviders } from "../../../tests/test-utils";
import { HomePage } from "../index";

describe("HomePage", () => {
  it("renders the landing page", () => {
    const { container } = renderWithProviders(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
