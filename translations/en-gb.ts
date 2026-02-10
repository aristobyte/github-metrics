export const enGb = {
  site: {
    name: "AristoBadges",
    tagline: "Minimal SVG badges for README dashboards.",
  },
  locales: {
    labels: {
      "en-gb": "English (UK)",
      "en-us": "English (US)",
      "es-es": "Spanish",
      "fr-fr": "French",
      "de-de": "German",
      "it-it": "Italian",
      "pt-br": "Portuguese (Brazil)",
      "ru-ru": "Russian",
      "zh-cn": "Chinese (Simplified)",
      "ja-jp": "Japanese",
    },
  },
  links: {
    "aristobyte-ui": "AristoByte UI",
    source: "Source code",
    instagram: "Instagram",
    website: "AristoByte",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "Built for README badges.",
    title: "Maintained by the",
    ownerName: "AristoByte",
    description:
      "AristoBadges produces fast, cache-friendly SVG cards for repos, organisations, and NPM packages.",
  },
  quickLinks: {
    title: "Generate README-ready SVG badges in seconds.",
    badge: "Open-source tooling",
    description:
      "Pick a template URL, add your values, and drop the SVG into any README.",
    labels: {
      repo: "Repository",
      org: "Organisation",
      npm: "NPM Package",
    },
  },
  builder: {
    title: "Generate SVG URLs",
    description:
      "Fill the inputs, then render and copy the URL or embed snippets.",
    previewAlt: "Aristo-badge preview",
    previewEmpty: "Preview will appear here",
    buttons: {
      generate: "Generate",
      copyUrl: "Copy URL",
      copyMarkdown: "Copy Markdown",
      copyHtml: "Copy HTML",
    },
    placeholders: {
      owner: "For example: aristobyte-ui",
      repo: "For example: aristobyte-ui",
      org: "For example: aristobyte-ui",
      namespace: "For example: @aristobyte-ui",
      pkg: "For example: spinner",
    },
    cards: {
      repo: {
        title: "Repository",
        description: "Activity, releases, and engagement for a single repo.",
        fields: {
          owner: "Username or Organisation",
          repo: "Repository",
        },
      },
      org: {
        title: "Organization",
        description: "Org-wide stars, repos, forks, PRs, issues and activity.",
        fields: {
          org: "Organisation",
        },
      },
      npm: {
        title: "NPM Package",
        description: "Version and downloads for an NPM package.",
        fields: {
          namespace: "Namespace (Optional)",
          pkg: "Package",
        },
      },
    },
  },
  notFound: {
    code: "404",
    message: "This page doesn't exist. The URL may be wrong or moved.",
    back: "Back",
  },
  footer: {
    note: "Add GITHUB_TOKEN to your Netlify env for higher rate limits. All endpoints are CDN cached with stale-while-revalidate.",
  },
};
