import { renderWithProviders } from "../../../tests/test-utils";
import { FooterNote } from "../index";

describe("FooterNote", () => {
  it("renders footer note", () => {
    const { container } = renderWithProviders(<FooterNote />);
    expect(container).toMatchSnapshot();
  });
});
