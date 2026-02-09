"use client";

import { Icons } from "@aristobyte-ui/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { useTranslation } from "../../hooks/useTranslation";

export function SiteHeader() {
  const { t, tLocale } = useTranslation();
  const config = useConfig();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const segments = pathname?.split("/") ?? [];
  const currentLocale = segments[1] || config.locales.fallback;

  const handleLocaleChange = (locale: string) => {
    const next = [`/${locale}`, ...segments.slice(2)].join("/");
    router.replace(next);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__logo">
        <Icons.AristoByteUI size={36} />
      </div>
      <div className="site-header__text">
        <p className="site-header__brand">{t("site.name")}</p>
        <span className="site-header__tagline">{t("site.tagline")}</span>
      </div>
      <div
        className={`site-header__locale${open ? " site-header__locale--open" : ""}`}
      >
        <button
          type="button"
          className="site-header__locale-btn"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Icons.Palette size={16} />
          <span>{tLocale("en-gb", `locales.labels.${currentLocale}`)}</span>
          <Icons.ArrowRight size={14} />
        </button>
        <div className="site-header__locale-menu">
          {config.locales.supported.map((locale) => (
            <button
              type="button"
              key={locale}
              className={`site-header__locale-item${
                locale === currentLocale ? " site-header__locale-item--active" : ""
              }`}
              onClick={() => handleLocaleChange(locale)}
            >
              <span>{tLocale("en-gb", `locales.labels.${locale}`)}</span>
              <em>{locale.toUpperCase()}</em>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
