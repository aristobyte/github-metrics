import { renderWithProviders } from "../../../tests/test-utils";
import { Accordion } from "../index";

describe("Accordion", () => {
  it("renders the accordion open", () => {
    const { container } = renderWithProviders(
      <Accordion id="repo" title="Repository" open onToggle={() => undefined}>
        <div>Content</div>
      </Accordion>,
    );

    expect(container).toMatchSnapshot();
  });
});
