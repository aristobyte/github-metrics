export const esEs = {
  site: {
    name: "AristoBadges",
    tagline: "Insignias SVG minimalistas para paneles README.",
  },
  locales: {
    labels: {
      "en-gb": "Inglés (Reino Unido)",
      "en-us": "Inglés (EE. UU.)",
      "es-es": "Español",
      "fr-fr": "Francés",
      "de-de": "Alemán",
      "it-it": "Italiano",
      "pt-br": "Portugués (Brasil)",
      "ru-ru": "Ruso",
      "zh-cn": "Chino (Simplificado)",
      "ja-jp": "Japonés",
    },
  },
  links: {
    docs: "Documentación",
    source: "Código fuente",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "Creado para insignias README.",
    title: "Mantenido por el",
    ownerName: "AristoByte",
    description:
      "AristoBadges genera tarjetas SVG rápidas y con caché para repos, organizaciones y paquetes de NPM.",
  },
  quickLinks: {
    title: "Genera insignias SVG para README en segundos.",
    badge: "Herramienta de código abierto",
    description:
      "Elige una URL plantilla, añade tus valores y colócala en cualquier README.",
    labels: {
      repo: "Repositorio",
      org: "Organización",
      npm: "Paquete NPM",
    },
  },
  builder: {
    title: "Generar URLs SVG",
    description:
      "Completa los campos, renderiza y copia la URL o fragmentos de inserción.",
    previewAlt: "Vista previa del badge de Aristo",
    buttons: {
      generate: "Generar",
      copyUrl: "Copiar URL",
      copyMarkdown: "Copiar Markdown",
      copyHtml: "Copiar HTML",
    },
    placeholders: {
      owner: "Por ejemplo: aristobyte-ui",
      repo: "Por ejemplo: aristobyte-ui",
      org: "Por ejemplo: aristobyte-ui",
      namespace: "Por ejemplo: @aristobyte-ui",
      pkg: "Por ejemplo: spinner",
    },
    cards: {
      repo: {
        title: "Repositorio",
        description:
          "Actividad, lanzamientos y participación para un repositorio.",
        fields: {
          owner: "Usuario u organización",
          repo: "Repositorio",
        },
      },
      org: {
        title: "Organización",
        description:
          "Estrellas, repos, forks, PRs, issues y actividad de la org.",
        fields: {
          org: "Organización",
        },
      },
      npm: {
        title: "Paquete NPM",
        description: "Versión y descargas de un paquete NPM.",
        fields: {
          namespace: "Namespace (Opcional)",
          pkg: "Paquete",
        },
      },
    },
  },
  footer: {
    note: "Añade GITHUB_TOKEN en Netlify para mayor límite de peticiones. Todos los endpoints están en caché CDN con stale-while-revalidate.",
  },
};
