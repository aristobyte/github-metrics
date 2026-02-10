import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { TranslationProvider } from "../hooks/useTranslation";
import { ConfigProvider } from "../hooks/useConfig";

export function renderWithProviders(ui: ReactElement) {
  return render(
    <ConfigProvider>
      <TranslationProvider>{ui}</TranslationProvider>
    </ConfigProvider>,
  );
}
