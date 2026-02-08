"use client";

import { Icons } from "@aristobyte-ui/utils";
import { useEffect, useState } from "react";

import { useCopyFeedback } from "./useCopyFeedback";
import styles from "../page.module.scss";
import { Card } from "@aristobyte-ui/card";

type RepoForm = {
  owner: string;
  repo: string;
  theme: string;
  accent: string;
  width: string;
};

type OrgForm = {
  org: string;
  theme: string;
  accent: string;
  width: string;
};

type NpmForm = {
  namespace: string;
  pkg: string;
  theme: string;
  accent: string;
  width: string;
};

type CopyButtonPropsType = {
  id: "npm" | "org" | "repo";
  url: string;
};

function getBaseUrl() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

function buildQuery(params: Record<string, string>) {
  const filtered = Object.entries(params).filter(
    ([, value]) => value.trim().length > 0,
  );
  if (filtered.length === 0) return "";
  const search = new URLSearchParams(filtered).toString();
  return `?${search}`;
}

const CopyButtons = ({ id, url }: CopyButtonPropsType) => {
  const { state, handleCopy } = useCopyFeedback();

  return (
    <div className={styles.previewBlock}>
      {/* eslint-disable-next-line */}
      <img src={url} alt="Aristo-badge preview" />
      <div className={styles.copyRow}>
        <button
          className={styles.copyRowButton}
          type="button"
          onClick={() => handleCopy(`${id}-url`, url)}
        >
          {state[`${id}-url`] ? (
            <span className={styles.checked}>
              <Icons.Success size={14} />
            </span>
          ) : (
            <Icons.Link size={14} />
          )}
          Copy URL
        </button>
        <button
          className={styles.copyRowButton}
          type="button"
          onClick={() => handleCopy(`${id}-md`, `![${id}](${url})`)}
        >
          {state[`${id}-md`] ? (
            <span className={styles.checked}>
              <Icons.Success size={14} />
            </span>
          ) : (
            <Icons.PaperCode size={14} />
          )}
          Copy Markdown
        </button>
        <button
          className={styles.copyRowButton}
          type="button"
          onClick={() => handleCopy(`${id}-html`, `<img src=\"${url}\" />`)}
        >
          {state[`${id}-html`] ? (
            <span className={styles.checked}>
              <Icons.Success size={14} />
            </span>
          ) : (
            <Icons.Code size={14} />
          )}
          Copy HTML
        </button>
      </div>
    </div>
  );
};

export default function BadgesBuilder() {
  const [baseUrl, setBaseUrl] = useState("https://<netlify-site>.netlify.app");
  const { state, handleCopy } = useCopyFeedback();
  const [repoForm, setRepoForm] = useState<RepoForm>({
    theme: "dark",
    owner: "",
    repo: "",
    accent: "",
    width: "",
  });
  const [orgForm, setOrgForm] = useState<OrgForm>({
    theme: "dark",
    org: "",
    accent: "",
    width: "",
  });
  const [npmForm, setNpmForm] = useState<NpmForm>({
    theme: "dark",
    namespace: "",
    pkg: "",
    accent: "",
    width: "",
  });
  const [repoUrl, setRepoUrl] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const [npmUrl, setNpmUrl] = useState("");

  useEffect(() => {
    const resolved = getBaseUrl();
    // eslint-disable-next-line
    if (resolved) setBaseUrl(resolved);
  }, []);

  const buildRepoUrl = () => {
    const query = buildQuery({
      owner: repoForm.owner,
      repo: repoForm.repo,
      theme: repoForm.theme,
      accent: repoForm.accent,
      width: repoForm.width,
    });
    return `${baseUrl}/api/aristo-badges/repo${query}`;
  };

  const buildOrgUrl = () => {
    const query = buildQuery({
      org: orgForm.org,
      theme: orgForm.theme,
      accent: orgForm.accent,
      width: orgForm.width,
    });
    return `${baseUrl}/api/aristo-badges/org${query}`;
  };

  const buildNpmUrl = () => {
    const query = buildQuery({
      namespace: npmForm.namespace,
      pkg: npmForm.pkg,
      theme: npmForm.theme,
      accent: npmForm.accent,
      width: npmForm.width,
    });
    return `${baseUrl}/api/aristo-badges/npm${query}`;
  };

  return (
    <section className={styles.builderSection}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>Generate SVG URLs</h2>
          <p>
            Fill the inputs, then render and copy the URL or embed snippets.
          </p>
        </div>
        <div className={styles.headerIcon}>
          <Icons.Link size={18} />
        </div>
      </div>
      <div className={styles.builderGrid}>
        <Card
          icon={{ component: Icons.Branching, size: 26, color: "#51a2ff" }}
          title="Repository"
          description="Activity, releases, and engagement for a single repo."
        >
          <form
            className={styles.builderCard}
            onSubmit={(event) => {
              event.preventDefault();
              setRepoUrl(buildRepoUrl());
            }}
          >
            <div className={styles.fieldGrid}>
              <label>
                <span>Username or Organisation</span>
                <input
                  value={repoForm.owner}
                  onChange={(event) =>
                    setRepoForm((prev) => ({
                      ...prev,
                      owner: event.target.value,
                    }))
                  }
                  placeholder="For example: aristobyte-ui"
                />
              </label>
              <label>
                <span>Repostiroy</span>
                <input
                  value={repoForm.repo}
                  onChange={(event) =>
                    setRepoForm((prev) => ({
                      ...prev,
                      repo: event.target.value,
                    }))
                  }
                  placeholder="For example: aristobyte-ui"
                />
              </label>
            </div>

            {repoUrl && <CopyButtons id="repo" url={repoUrl} />}

            <button
              className={[
                styles.copyRowButton,
                styles.primaryButton,
                styles.primaryButtonRepo,
              ]
                .filter(Boolean)
                .join(" ")}
              type="submit"
              onClick={() => handleCopy("repo-url", repoUrl)}
            >
              <Icons.BashCursor size={16} />
              Generate
              {state["repo-url"] ? (
                <span className={styles.checked}>
                  <Icons.Success size={14} />
                </span>
              ) : (
                <Icons.Stars size={16} />
              )}
            </button>
          </form>
        </Card>

        <Card
          icon={{ component: Icons.UserGroup, size: 26, color: "#49e184" }}
          title="Organization"
          description="Org-wide stars, repos, forks, PRs, issues and activity."
        >
          <form
            className={styles.builderCard}
            onSubmit={(event) => {
              event.preventDefault();
              setOrgUrl(buildOrgUrl());
            }}
          >
            <div className={styles.fieldGrid}>
              <label>
                <span>Organisation</span>
                <input
                  value={orgForm.org}
                  onChange={(event) =>
                    setOrgForm((prev) => ({ ...prev, org: event.target.value }))
                  }
                  placeholder="For example: aristobyte-ui"
                />
              </label>
            </div>

            {orgUrl && <CopyButtons id="org" url={orgUrl} />}

            <button
              className={[
                styles.copyRowButton,
                styles.primaryButton,
                styles.primaryButtonOrg,
              ]
                .filter(Boolean)
                .join(" ")}
              type="submit"
              onClick={() => handleCopy("org-url", orgUrl)}
            >
              <Icons.BashCursor size={16} />
              Generate
              {state["org-url"] ? (
                <span className={styles.checked}>
                  <Icons.Success size={16} />
                </span>
              ) : (
                <Icons.Stars size={16} />
              )}
            </button>
          </form>
        </Card>

        <Card
          icon={{ component: Icons.Package, size: 26, color: "#ce5151" }}
          title="NPM Package"
          description="Version and downloads for an NPM package."
        >
          <form
            className={styles.builderCard}
            onSubmit={(event) => {
              event.preventDefault();
              setNpmUrl(buildNpmUrl());
            }}
          >
            <div className={styles.fieldGrid}>
              <label>
                <span>Namespace (Optional)</span>
                <input
                  value={npmForm.namespace}
                  onChange={(event) =>
                    setNpmForm((prev) => ({
                      ...prev,
                      namespace: event.target.value,
                    }))
                  }
                  placeholder="For example: @aristobyte-ui"
                />
              </label>
              <label>
                <span>Package</span>
                <input
                  value={npmForm.pkg}
                  onChange={(event) =>
                    setNpmForm((prev) => ({ ...prev, pkg: event.target.value }))
                  }
                  placeholder="For example: spinner"
                />
              </label>
            </div>

            {npmUrl && <CopyButtons id="npm" url={npmUrl} />}

            <button
              type="submit"
              className={[
                styles.primaryButton,
                styles.primaryButtonNpm,
                styles.copyRowButton,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleCopy("npm-url", npmUrl)}
            >
              <Icons.BashCursor size={16} />
              Generate
              {state["npm-url"] ? (
                <span className={styles.checked}>
                  <Icons.Success size={14} />
                </span>
              ) : (
                <Icons.Stars size={16} />
              )}
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
}
