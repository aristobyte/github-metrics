import { renderWithProviders } from "../../../tests/test-utils";
import { Icons } from "@aristobyte-ui/utils";
import { CopyButton } from "../index";

describe("CopyButton", () => {
  it("renders action variant", () => {
    const { container } = renderWithProviders(
      <CopyButton
        label="Copy"
        icon={Icons.Copy}
        onClick={() => undefined}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
