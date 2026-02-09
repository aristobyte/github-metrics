import { LocaleType } from "@/translations";

export const CONFIG = {
  site: {
    ownerUrl: "https://aristobyte.com",
  },
  urls: {
    defaultBaseUrl: "https://<netlify-site>.netlify.app",
    apiBasePath: "/api/aristo-badges",
  },
  externalLinks: [
    {
      id: "docs",
      labelKey: "links.docs",
      href: "https://ui.aristobyte.com",
      icon: "OpenedBook",
    },
    {
      id: "github",
      labelKey: "links.source",
      href: "https://github.com/aristobyte-ui/aristo-badges",
      icon: "Github",
    },
    {
      id: "instagram",
      labelKey: "links.instagram",
      href: "https://www.instagram.com/aristo_byte",
      icon: "Instagram",
    },
    {
      id: "linkedin",
      labelKey: "links.linkedin",
      href: "https://www.linkedin.com/company/aristobyte",
      icon: "LinkedIn",
    },
  ],
  quickLinks: [
    {
      id: "repo" as const,
      labelKey: "quickLinks.labels.repo",
      template:
        "/api/aristo-badges/repo?owner=<USERNAME_OR_ORGANISATION>&repo=<REPOSITORY>",
    },
    {
      id: "org" as const,
      labelKey: "quickLinks.labels.org",
      template: "/api/aristo-badges/org?org=<ORGANISATION>",
    },
    {
      id: "npm",
      labelKey: "quickLinks.labels.npm",
      template: "/api/aristo-badges/npm?namespace=<NAMESPACE>&pkg=<PACKAGE>",
    },
  ],
  builder: {
    cards: [
      {
        id: "repo" as const,
        iconName: "Branching" as const,
        iconColor: "#51a2ff",
        titleKey: "builder.cards.repo.title",
        descriptionKey: "builder.cards.repo.description",
        fields: [
          {
            id: "owner" as const,
            labelKey: "builder.cards.repo.fields.owner",
            placeholderKey: "builder.placeholders.owner",
          },
          {
            id: "repo" as const,
            labelKey: "builder.cards.repo.fields.repo",
            placeholderKey: "builder.placeholders.repo",
          },
        ],
      },
      {
        id: "org" as const,
        iconName: "UserGroup" as const,
        iconColor: "#49e184",
        titleKey: "builder.cards.org.title",
        descriptionKey: "builder.cards.org.description",
        fields: [
          {
            id: "org" as const,
            labelKey: "builder.cards.org.fields.org",
            placeholderKey: "builder.placeholders.org",
          },
        ],
      },
      {
        id: "npm" as const,
        iconName: "Package" as const,
        iconColor: "#ce5151",
        titleKey: "builder.cards.npm.title",
        descriptionKey: "builder.cards.npm.description",
        fields: [
          {
            id: "namespace" as const,
            labelKey: "builder.cards.npm.fields.namespace",
            placeholderKey: "builder.placeholders.namespace",
          },
          {
            id: "pkg" as const,
            labelKey: "builder.cards.npm.fields.pkg",
            placeholderKey: "builder.placeholders.pkg",
          },
        ],
      },
    ],
  },
  locales: {
    fallback: "en-gb" as LocaleType,
    supported: [
      "en-gb",
      "en-us",
      "es-es",
      "fr-fr",
      "de-de",
      "it-it",
      "pt-br",
      "ru-ru",
      "zh-cn",
      "ja-jp",
    ] as LocaleType[],
  },
};
