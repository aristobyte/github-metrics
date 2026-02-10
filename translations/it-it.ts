export const itIt = {
  site: {
    name: "AristoBadges",
    tagline: "Badge SVG minimalisti per dashboard README.",
  },
  locales: {
    labels: {
      "en-gb": "Inglese (UK)",
      "en-us": "Inglese (USA)",
      "es-es": "Spagnolo",
      "fr-fr": "Francese",
      "de-de": "Tedesco",
      "it-it": "Italiano",
      "pt-br": "Portoghese (Brasile)",
      "ru-ru": "Russo",
      "zh-cn": "Cinese (Semplificato)",
      "ja-jp": "Giapponese",
    },
  },
  links: {
    "aristobyte-ui": "AristoByte UI",
    source: "Codice sorgente",
    instagram: "Instagram",
    website: "AristoByte",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "Creato per badge README.",
    title: "Gestito da",
    ownerName: "AristoByte",
    description:
      "AristoBadges genera schede SVG veloci e con cache per repo, organizzazioni e pacchetti NPM.",
  },
  quickLinks: {
    title: "Genera badge SVG pronti per README in pochi secondi.",
    badge: "Tool open-source",
    description:
      "Scegli un URL modello, aggiungi i tuoi valori e inseriscilo in qualsiasi README.",
    labels: {
      repo: "Repository",
      org: "Organizzazione",
      npm: "Pacchetto NPM",
    },
  },
  builder: {
    title: "Genera URL SVG",
    description:
      "Compila i campi, poi renderizza e copia l’URL o gli snippet di integrazione.",
    previewAlt: "Anteprima del badge Aristo",
    previewEmpty: "L’anteprima apparirà qui",
    buttons: {
      generate: "Genera",
      copyUrl: "Copia URL",
      copyMarkdown: "Copia Markdown",
      copyHtml: "Copia HTML",
    },
    placeholders: {
      owner: "Per esempio: aristobyte-ui",
      repo: "Per esempio: aristobyte-ui",
      org: "Per esempio: aristobyte-ui",
      namespace: "Per esempio: @aristobyte-ui",
      pkg: "Per esempio: spinner",
    },
    cards: {
      repo: {
        title: "Repository",
        description: "Attività, release e coinvolgimento per un repo.",
        fields: {
          owner: "Utente o organizzazione",
          repo: "Repository",
        },
      },
      org: {
        title: "Organizzazione",
        description:
          "Stelle, repo, fork, PR, issue e attività dell’organizzazione.",
        fields: {
          org: "Organizzazione",
        },
      },
      npm: {
        title: "Pacchetto NPM",
        description: "Versione e download di un pacchetto NPM.",
        fields: {
          namespace: "Namespace (Opzionale)",
          pkg: "Pacchetto",
        },
      },
    },
  },
  notFound: {
    code: "404",
    message:
      "Questa pagina non esiste. L'URL potrebbe essere errato o spostato.",
    back: "Indietro",
  },
  footer: {
    note: "Aggiungi GITHUB_TOKEN in Netlify per limiti più alti. Tutti gli endpoint sono in cache CDN con stale-while-revalidate.",
  },
};
