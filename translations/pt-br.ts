export const ptBr = {
  site: {
    name: "AristoBadges",
    tagline: "Badges SVG minimalistas para painéis README.",
  },
  locales: {
    labels: {
      "en-gb": "Inglês (UK)",
      "en-us": "Inglês (EUA)",
      "es-es": "Espanhol",
      "fr-fr": "Francês",
      "de-de": "Alemão",
      "it-it": "Italiano",
      "pt-br": "Português (Brasil)",
      "ru-ru": "Russo",
      "zh-cn": "Chinês (Simplificado)",
      "ja-jp": "Japonês",
    },
  },
  links: {
    "aristobyte-ui": "AristoByte UI",
    source: "Código-fonte",
    instagram: "Instagram",
    website: "AristoByte",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "Feito para badges README.",
    title: "Mantido pela",
    ownerName: "AristoByte",
    description:
      "AristoBadges gera cartões SVG rápidos e com cache para repos, organizações e pacotes NPM.",
  },
  quickLinks: {
    title: "Gere badges SVG prontos para README em segundos.",
    badge: "Ferramenta open-source",
    description:
      "Escolha uma URL modelo, adicione seus valores e use em qualquer README.",
    labels: {
      repo: "Repositório",
      org: "Organização",
      npm: "Pacote NPM",
    },
  },
  builder: {
    title: "Gerar URLs SVG",
    description:
      "Preencha os campos, renderize e copie a URL ou os trechos de incorporação.",
    previewAlt: "Prévia do badge Aristo",
    buttons: {
      generate: "Gerar",
      copyUrl: "Copiar URL",
      copyMarkdown: "Copiar Markdown",
      copyHtml: "Copiar HTML",
    },
    placeholders: {
      owner: "Por exemplo: aristobyte-ui",
      repo: "Por exemplo: aristobyte-ui",
      org: "Por exemplo: aristobyte-ui",
      namespace: "Por exemplo: @aristobyte-ui",
      pkg: "Por exemplo: spinner",
    },
    cards: {
      repo: {
        title: "Repositório",
        description: "Atividade, releases e engajamento de um repositório.",
        fields: {
          owner: "Usuário ou organização",
          repo: "Repositório",
        },
      },
      org: {
        title: "Organização",
        description:
          "Estrelas, repos, forks, PRs, issues e atividade da organização.",
        fields: {
          org: "Organização",
        },
      },
      npm: {
        title: "Pacote NPM",
        description: "Versão e downloads de um pacote NPM.",
        fields: {
          namespace: "Namespace (Opcional)",
          pkg: "Pacote",
        },
      },
    },
  },
  footer: {
    note: "Adicione GITHUB_TOKEN no Netlify para limites maiores. Todos os endpoints são cacheados no CDN com stale-while-revalidate.",
  },
};
