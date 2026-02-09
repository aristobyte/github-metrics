"use client";

import { useTranslation } from "../../hooks/useTranslation";

export function FooterNote() {
  const { t } = useTranslation();
  return (
    <section className="footer-note">
      <p>{t("footer.note")}</p>
    </section>
  );
}
