import { renderWithProviders } from "../../../tests/test-utils";
import { NotFoundView } from "../index";

describe("NotFoundView", () => {
  it("renders 404 layout", () => {
    const { container } = renderWithProviders(<NotFoundView />);
    expect(container).toMatchSnapshot();
  });
});
