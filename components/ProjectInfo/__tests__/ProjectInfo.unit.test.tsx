import { renderWithProviders } from "../../../tests/test-utils";
import { ProjectInfo } from "../index";

describe("ProjectInfo", () => {
  it("renders the project info", () => {
    const { container } = renderWithProviders(<ProjectInfo />);
    expect(container).toMatchSnapshot();
  });
});
