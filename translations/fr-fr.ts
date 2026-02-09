export const frFr = {
  site: {
    name: "AristoBadges",
    tagline: "Badges SVG minimalistes pour tableaux README.",
  },
  locales: {
    labels: {
      "en-gb": "Anglais (R.-U.)",
      "en-us": "Anglais (É.-U.)",
      "es-es": "Espagnol",
      "fr-fr": "Français",
      "de-de": "Allemand",
      "it-it": "Italien",
      "pt-br": "Portugais (Brésil)",
      "ru-ru": "Russe",
      "zh-cn": "Chinois (Simplifié)",
      "ja-jp": "Japonais",
    },
  },
  links: {
    "aristobyte-ui": "AristoByte UI",
    source: "Code source",
    instagram: "Instagram",
    website: "AristoByte",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "Conçu pour les badges README.",
    title: "Maintenu par",
    ownerName: "AristoByte",
    description:
      "AristoBadges génère des cartes SVG rapides et mises en cache pour les repos, organisations et paquets NPM.",
  },
  quickLinks: {
    title: "Générez des badges SVG pour README en quelques secondes.",
    badge: "Outil open-source",
    description:
      "Choisissez une URL modèle, ajoutez vos valeurs et insérez-la dans n'importe quel README.",
    labels: {
      repo: "Dépôt",
      org: "Organisation",
      npm: "Paquet NPM",
    },
  },
  builder: {
    title: "Générer des URLs SVG",
    description:
      "Renseignez les champs, puis rendez et copiez l'URL ou les extraits d'intégration.",
    previewAlt: "Aperçu du badge Aristo",
    previewEmpty: "L’aperçu s’affichera ici",
    buttons: {
      generate: "Générer",
      copyUrl: "Copier l’URL",
      copyMarkdown: "Copier Markdown",
      copyHtml: "Copier HTML",
    },
    placeholders: {
      owner: "Par exemple : aristobyte-ui",
      repo: "Par exemple : aristobyte-ui",
      org: "Par exemple : aristobyte-ui",
      namespace: "Par exemple : @aristobyte-ui",
      pkg: "Par exemple : spinner",
    },
    cards: {
      repo: {
        title: "Dépôt",
        description: "Activité, versions et engagement pour un dépôt.",
        fields: {
          owner: "Utilisateur ou organisation",
          repo: "Dépôt",
        },
      },
      org: {
        title: "Organisation",
        description:
          "Étoiles, dépôts, forks, PRs, issues et activité de l’org.",
        fields: {
          org: "Organisation",
        },
      },
      npm: {
        title: "Paquet NPM",
        description: "Version et téléchargements d’un paquet NPM.",
        fields: {
          namespace: "Namespace (Optionnel)",
          pkg: "Paquet",
        },
      },
    },
  },
  footer: {
    note: "Ajoutez GITHUB_TOKEN dans Netlify pour augmenter les limites. Tous les endpoints sont mis en cache via CDN avec stale-while-revalidate.",
  },
};
