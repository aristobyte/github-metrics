export const deDe = {
  site: {
    name: "AristoBadges",
    tagline: "Minimalistische SVG-Badges für README-Dashboards.",
  },
  locales: {
    labels: {
      "en-gb": "Englisch (UK)",
      "en-us": "Englisch (USA)",
      "es-es": "Spanisch",
      "fr-fr": "Französisch",
      "de-de": "Deutsch",
      "it-it": "Italienisch",
      "pt-br": "Portugiesisch (Brasilien)",
      "ru-ru": "Russisch",
      "zh-cn": "Chinesisch (Vereinfacht)",
      "ja-jp": "Japanisch",
    },
  },
  links: {
    "aristobyte-ui": "AristoByte UI",
    source: "Quellcode",
    instagram: "Instagram",
    website: "AristoByte",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "Für README-Badges entwickelt.",
    title: "Betreut von",
    ownerName: "AristoByte",
    description:
      "AristoBadges erstellt schnelle, cache-freundliche SVG-Karten für Repos, Organisationen und NPM-Pakete.",
  },
  quickLinks: {
    title: "Erzeuge README-fähige SVG-Badges in Sekunden.",
    badge: "Open-Source-Tooling",
    description:
      "Wähle eine Template-URL, füge deine Werte hinzu und nutze sie in jedem README.",
    labels: {
      repo: "Repository",
      org: "Organisation",
      npm: "NPM-Paket",
    },
  },
  builder: {
    title: "SVG-URLs generieren",
    description:
      "Fülle die Felder aus, rendere und kopiere die URL oder Einbettungs-Snippets.",
    previewAlt: "Vorschau des Aristo-Badges",
    previewEmpty: "Die Vorschau erscheint hier",
    buttons: {
      generate: "Generieren",
      copyUrl: "URL kopieren",
      copyMarkdown: "Markdown kopieren",
      copyHtml: "HTML kopieren",
    },
    placeholders: {
      owner: "Zum Beispiel: aristobyte-ui",
      repo: "Zum Beispiel: aristobyte-ui",
      org: "Zum Beispiel: aristobyte-ui",
      namespace: "Zum Beispiel: @aristobyte-ui",
      pkg: "Zum Beispiel: spinner",
    },
    cards: {
      repo: {
        title: "Repository",
        description: "Aktivität, Releases und Engagement für ein Repo.",
        fields: {
          owner: "Benutzer oder Organisation",
          repo: "Repository",
        },
      },
      org: {
        title: "Organisation",
        description:
          "Stars, Repos, Forks, PRs, Issues und Aktivität der Organisation.",
        fields: {
          org: "Organisation",
        },
      },
      npm: {
        title: "NPM-Paket",
        description: "Version und Downloads eines NPM-Pakets.",
        fields: {
          namespace: "Namespace (Optional)",
          pkg: "Paket",
        },
      },
    },
  },
  footer: {
    note: "Füge GITHUB_TOKEN in Netlify hinzu, um höhere Limits zu erhalten. Alle Endpoints sind per CDN mit stale-while-revalidate gecacht.",
  },
};
