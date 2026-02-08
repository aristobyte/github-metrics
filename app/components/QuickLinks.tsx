"use client";

import { Icons } from "@aristobyte-ui/utils";
import { useEffect, useMemo, useState } from "react";

import { useCopyFeedback } from "./useCopyFeedback";
import styles from "../page.module.scss";
import { Label } from "@aristobyte-ui/label";

const DEFAULT_BASE = "https://<netlify-site>.netlify.app";

function getBaseUrl() {
  if (typeof window === "undefined") return DEFAULT_BASE;
  return window.location.origin;
}

export default function QuickLinks() {
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE);
  const { state, handleCopy } = useCopyFeedback();

  useEffect(() => {
    // eslint-disable-next-line
    setBaseUrl(getBaseUrl());
  }, []);

  const urls = useMemo(
    () => ({
      repo: `${baseUrl}/api/aristo-badges/repo?owner=<USERNAME_OR_ORGANISATION>&repo=<REPOSITORY>`,
      org: `${baseUrl}/api/aristo-badges/org?org=<ORGANISATION>`,
      npm: `${baseUrl}/api/aristo-badges/npm?scope=<NAMESPACE>&pkg=<PACKAGE>`,
    }),
    [baseUrl],
  );

  return (
    <section className={styles.summary}>
      <div className={styles.summaryHeader}>
        <div>
          <h2>
            <span>Generate README-ready SVG Badges in seconds.</span>
            <Label
              text="Open-source tooling"
              backgroundColor="#a8803a53"
              color="#fdac56"
              borderColor="#fdac56"
              size="xsm"
              radius="full"
            />
          </h2>
          <p>
            AristoBadges produces fast, cache-friendly SVG cards for repos,
            organizations, and NPM packages. Use the builder below to create
            copy-paste URLs.
          </p>
        </div>
        <div className={styles.summaryIcon}>
          <Icons.Stars size={18} />
        </div>
      </div>

      <div className={styles.quickLinks}>
        {(
          [
            { id: "repo", label: "Repository", value: urls.repo },
            { id: "org", label: "Organisation", value: urls.org },
            { id: "npm", label: "NPM Package", value: urls.npm },
          ] as const
        ).map((item) => (
          <label key={item.id} className={styles.quickLink}>
            <span>{item.label}</span>
            <div className={styles.quickLinkRow}>
              <input
                readOnly
                value={item.value}
                onFocus={(e) => e.target.select()}
              />
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => handleCopy(`quick-${item.id}`, item.value)}
              >
                {state[`quick-${item.id}`] ? (
                  <Icons.Success size={16} />
                ) : (
                  <Icons.Copy size={16} />
                )}
              </button>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
