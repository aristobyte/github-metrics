export const ruRu = {
  site: {
    name: "AristoBadges",
    tagline: "Минималистичные SVG-бейджи для README-дашбордов.",
  },
  locales: {
    labels: {
      "en-gb": "Английский (Великобритания)",
      "en-us": "Английский (США)",
      "es-es": "Испанский",
      "fr-fr": "Французский",
      "de-de": "Немецкий",
      "it-it": "Итальянский",
      "pt-br": "Португальский (Бразилия)",
      "ru-ru": "Русский",
      "zh-cn": "Китайский (упр.)",
      "ja-jp": "Японский",
    },
  },
  links: {
    "aristobyte-ui": "AristoByte UI",
    source: "Исходный код",
    instagram: "Instagram",
    website: "AristoByte",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "Создано для README-бейджей.",
    title: "Поддерживается",
    ownerName: "AristoByte",
    description:
      "AristoBadges генерирует быстрые SVG-карточки с кэшированием для репозиториев, организаций и пакетов NPM.",
  },
  quickLinks: {
    title: "Создавайте SVG-бейджи для README за секунды.",
    badge: "Инструмент с открытым исходным кодом",
    description:
      "Выберите шаблон URL, добавьте значения и вставьте в любой README.",
    labels: {
      repo: "Репозиторий",
      org: "Организация",
      npm: "Пакет NPM",
    },
  },
  builder: {
    title: "Сгенерировать SVG-URL",
    description:
      "Заполните поля, затем отрендерьте и скопируйте URL или фрагменты для вставки.",
    previewAlt: "Предпросмотр бейджа Aristo",
    previewEmpty: "Предпросмотр появится здесь",
    buttons: {
      generate: "Сгенерировать",
      copyUrl: "Копировать URL",
      copyMarkdown: "Копировать Markdown",
      copyHtml: "Копировать HTML",
    },
    placeholders: {
      owner: "Например: aristobyte-ui",
      repo: "Например: aristobyte-ui",
      org: "Например: aristobyte-ui",
      namespace: "Например: @aristobyte-ui",
      pkg: "Например: spinner",
    },
    cards: {
      repo: {
        title: "Репозиторий",
        description: "Активность, релизы и вовлеченность для репо.",
        fields: {
          owner: "Пользователь или организация",
          repo: "Репозиторий",
        },
      },
      org: {
        title: "Организация",
        description:
          "Звезды, репозитории, форки, PR, issues и активность организации.",
        fields: {
          org: "Организация",
        },
      },
      npm: {
        title: "Пакет NPM",
        description: "Версия и загрузки пакета NPM.",
        fields: {
          namespace: "Namespace (необязательно)",
          pkg: "Пакет",
        },
      },
    },
  },
  footer: {
    note: "Добавьте GITHUB_TOKEN в Netlify для более высоких лимитов. Все эндпоинты кешируются CDN с stale-while-revalidate.",
  },
};
