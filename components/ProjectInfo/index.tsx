"use client";

import { Icons } from "@aristobyte-ui/utils";
import { useConfig } from "../../hooks/useConfig";
import { useTranslation } from "../../hooks/useTranslation";

export function ProjectInfo() {
  const { t } = useTranslation();
  const config = useConfig();
  return (
    <section className="project-info">
      <span className="project-info__logo">
        <Icons.AristoBadges size={96} />
      </span>
      <p className="project-info__subtitle">{t("projectInfo.subtitle")}</p>
      <h2 className="project-info__title">
        {t("projectInfo.title")}{" "}
        <span>
          <a href={config.site.ownerUrl} target="_blank" rel="noreferrer">
            {t("projectInfo.ownerName")}
          </a>
        </span>
        .
      </h2>
      <p className="project-info__description">{t("projectInfo.description")}</p>
      <ul className="project-info__links">
        {config.externalLinks.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons];
          return (
            <li key={item.id}>
              <a
                className="project-info__link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={16} />
                <span>{t(item.labelKey)}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
