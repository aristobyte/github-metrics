"use client";

import Link from "next/link";
import { Icons } from "@aristobyte-ui/utils";
import { useTranslation } from "../../hooks/useTranslation";
import { CONFIG } from "../../config";

export function NotFoundView() {
  const { t } = useTranslation();

  return (
    <main className="not-found">
      <div className="not-found__panel">
        <span className="not-found__icon">
          <Icons.AristoBadges size={70} />
        </span>
        <h1>
          <span>
            <Icons.Warning size={32} />
          </span>
          {t("notFound.code")}
        </h1>
        <p>{t("notFound.message")}</p>
        <Link
          className="not-found__link"
          href={`/${CONFIG.locales.fallback}`}
        >
          {t("notFound.back")}
          <Icons.ArrowRight size={20} />
        </Link>
      </div>
    </main>
  );
}
