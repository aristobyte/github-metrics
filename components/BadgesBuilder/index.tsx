"use client";

import * as React from "react";
import { Icons } from "@aristobyte-ui/utils";
import { Accordion } from "../Accordion";

import { CopyButton } from "../CopyButton";
import { useCopyFeedback } from "../../hooks/useCopyFeedback";
import { useConfig } from "../../hooks/useConfig";
import {
  buildNpmUrl,
  buildOrgUrl,
  buildRepoUrl,
  getBaseUrl,
  type NpmFormType,
  type OrgFormType,
  type RepoFormType,
} from "../../utils/url";
import { useTranslation } from "../../hooks/useTranslation";

export type BadgeType = "repo" | "org" | "npm";

export type FieldType = "repo" | "org" | "owner" | "namespace" | "pkg";

type FieldConfig = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

type BadgeCardProps = {
  id: BadgeType;
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  iconColor?: string;
  fields: FieldConfig[];
  previewUrl: string;
  onGenerate: () => void;
  onCopy: (key: string, value: string) => void;
  copyState: Record<string, boolean>;
  open: boolean;
  onToggle: (id: BadgeType) => void;
};

function BadgeCard({
  id,
  title,
  description,
  iconName,
  iconColor,
  fields,
  previewUrl,
  onGenerate,
  onCopy,
  copyState,
  open,
  onToggle,
}: BadgeCardProps) {
  const { t } = useTranslation();
  const copyUrlKey = `${id}-url`;
  const copyMdKey = `${id}-md`;
  const copyHtmlKey = `${id}-html`;

  return (
    <Accordion
      id={id}
      title={title}
      description={description}
      iconName={iconName}
      iconColor={iconColor}
      open={open}
      onToggle={() => onToggle(id)}
    >
      <form
        className="builder__form"
        onSubmit={(event) => {
          event.preventDefault();
          onGenerate();
        }}
      >
        <div className="builder__fields">
          {fields.map(({ id, label, value, placeholder, onChange }) => (
            <label key={id} className="builder__field">
              <span className="builder__label">{label}</span>
              <input
                className="builder__input"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>

        {previewUrl && (
          <div className="builder__preview">
            <div className="builder__preview-img">
              <img src={previewUrl} alt={t("builder.previewAlt")} />
            </div>
            <div className="builder__actions">
              <CopyButton
                icon={Icons.Link}
                label={t("builder.buttons.copyUrl")}
                active={copyState[copyUrlKey]}
                onClick={() => onCopy(copyUrlKey, previewUrl)}
              />
              <CopyButton
                icon={Icons.PaperCode}
                label={t("builder.buttons.copyMarkdown")}
                active={copyState[copyMdKey]}
                onClick={() => onCopy(copyMdKey, `![${id}](${previewUrl})`)}
              />
              <CopyButton
                icon={Icons.Code}
                label={t("builder.buttons.copyHtml")}
                active={copyState[copyHtmlKey]}
                onClick={() =>
                  onCopy(copyHtmlKey, `<img src=\"${previewUrl}\" />`)
                }
              />
            </div>
          </div>
        )}

        <button
          className={`builder__submit builder__submit--${id}`}
          type="submit"
        >
          <Icons.BashCursor size={16} />
          {t("builder.buttons.generate")}
          {copyState[copyUrlKey] ? (
            <span className="builder__check">
              <Icons.Success size={14} />
            </span>
          ) : (
            <Icons.Stars size={16} />
          )}
        </button>
      </form>
    </Accordion>
  );
}

export function BadgesBuilder() {
  const [baseUrl, setBaseUrl] = React.useState(getBaseUrl());
  const [repoUrl, setRepoUrl] = React.useState("");
  const [orgUrl, setOrgUrl] = React.useState("");
  const [npmUrl, setNpmUrl] = React.useState("");
  const [openId, setOpenId] = React.useState<BadgeType>("repo");
  const [repoForm, setRepoForm] = React.useState<RepoFormType>({
    owner: "",
    repo: "",
  });
  const [orgForm, setOrgForm] = React.useState<OrgFormType>({
    org: "",
  });
  const [npmForm, setNpmForm] = React.useState<NpmFormType>({
    namespace: "",
    pkg: "",
  });
  const { state, handleCopy } = useCopyFeedback();

  const getValue = (id: BadgeType, field: FieldType) => {
    if (id === "repo") return repoForm[field as keyof RepoFormType] ?? "";
    if (id === "org") return orgForm[field as keyof OrgFormType] ?? "";
    return npmForm[field as keyof NpmFormType] ?? "";
  };

  const setForm = (id: BadgeType, field: FieldType, value: string) => {
    if (id === "repo") {
      setRepoForm((prev) => ({ ...prev, [field]: value }));
      return;
    }
    if (id === "org") {
      setOrgForm((prev) => ({ ...prev, [field]: value }));
      return;
    }
    setNpmForm((prev) => ({ ...prev, [field]: value }));
  };

  const getPreviewUrl = (id: BadgeType) => {
    if (id === "repo") return repoUrl;
    if (id === "org") return orgUrl;
    return npmUrl;
  };

  const generatePreviewUrl = (id: BadgeType) => {
    if (id === "repo") {
      setRepoUrl(buildRepoUrl(baseUrl, repoForm));
      return;
    }
    if (id === "org") {
      setOrgUrl(buildOrgUrl(baseUrl, orgForm));
      return;
    }
    setNpmUrl(buildNpmUrl(baseUrl, npmForm));
  };

  React.useEffect(() => {
    const resolved = getBaseUrl();
    if (resolved) setBaseUrl(resolved);
  }, []);

  const { t } = useTranslation();
  const {
    builder: { cards },
  } = useConfig();

  return (
    <section className="builder">
      <div className="builder__header">
        <div>
          <h2 className="builder__title">{t("builder.title")}</h2>
          <p className="builder__description">{t("builder.description")}</p>
        </div>
        <div className="builder__icon">
          <Icons.Link size={18} />
        </div>
      </div>
      <div className="builder__cards">
        {cards.map(
          ({ id, titleKey, descriptionKey, iconName, iconColor, fields }) => (
            <BadgeCard
              key={id}
              id={id}
              title={t(titleKey)}
              description={t(descriptionKey)}
              iconName={iconName}
              iconColor={iconColor}
              fields={fields.map(
                ({ id: fieldId, labelKey, placeholderKey }) => ({
                  id: fieldId,
                  label: t(labelKey),
                  placeholder: t(placeholderKey),
                  value: getValue(id, fieldId),
                  onChange: (value: string) => setForm(id, fieldId, value),
                }),
              )}
              previewUrl={getPreviewUrl(id)}
              onGenerate={() => generatePreviewUrl(id)}
              onCopy={handleCopy}
              copyState={state}
              open={openId === id}
              onToggle={(id) => setOpenId(id)}
            />
          ),
        )}
      </div>
    </section>
  );
}
