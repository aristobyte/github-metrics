"use client";

import * as React from "react";
import { Icons } from "@aristobyte-ui/utils";
import { Label } from "@aristobyte-ui/label";

import { CopyButton } from "../CopyButton";
import { useConfig } from "../../hooks/useConfig";
import { useCopyFeedback } from "../../hooks/useCopyFeedback";
import { useTranslation } from "../../hooks/useTranslation";
import { getBaseUrl } from "../../utils/url";

export function QuickLinks() {
  const [baseUrl, setBaseUrl] = React.useState(getBaseUrl());
  const { state, handleCopy } = useCopyFeedback();
  const { t } = useTranslation();
  const config = useConfig();

  React.useEffect(() => {
    setBaseUrl(getBaseUrl());
  }, []);

  const urls = React.useMemo(
    () =>
      config.quickLinks.map((link) => ({
        ...link,
        value: `${baseUrl}${link.template}`,
      })),
    [baseUrl, config.quickLinks],
  );

  return (
    <section className="quick-links">
      <div className="quick-links__header">
        <div>
          <h2 className="quick-links__title">
            <span>{t("quickLinks.title")}</span>
            <Label
              text={t("quickLinks.badge")}
              backgroundColor="#a8803a53"
              color="#fdac56"
              borderColor="#fdac56"
              size="xsm"
              radius="full"
            />
          </h2>
          <p className="quick-links__description">
            {t("quickLinks.description")}
          </p>
        </div>
        <div className="quick-links__icon">
          <Icons.Stars size={18} />
        </div>
      </div>

      <div className="quick-links__list">
        {urls.map((item) => (
          <label key={item.id} className="quick-links__item">
            <span className="quick-links__label">{t(item.labelKey)}</span>
            <div className="quick-links__row">
              <input
                className="quick-links__input"
                readOnly
                value={item.value}
                onFocus={(event) => event.target.select()}
              />
              <CopyButton
                variant="icon"
                icon={Icons.Copy}
                active={state[`quick-${item.id}`]}
                onClick={() => handleCopy(`quick-${item.id}`, item.value)}
              />
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
