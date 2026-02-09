export const zhCn = {
  site: {
    name: "AristoBadges",
    tagline: "面向 README 面板的极简 SVG 徽章。",
  },
  locales: {
    labels: {
      "en-gb": "英语（英国）",
      "en-us": "英语（美国）",
      "es-es": "西班牙语",
      "fr-fr": "法语",
      "de-de": "德语",
      "it-it": "意大利语",
      "pt-br": "葡萄牙语（巴西）",
      "ru-ru": "俄语",
      "zh-cn": "中文（简体）",
      "ja-jp": "日语",
    },
  },
  links: {
    docs: "文档",
    source: "源代码",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "为 README 徽章打造。",
    title: "由",
    ownerName: "AristoByte",
    description: "AristoBadges 为仓库、组织和 NPM 包生成快速可缓存的 SVG 卡片。",
  },
  quickLinks: {
    title: "几秒内生成可用于 README 的 SVG 徽章。",
    badge: "开源工具",
    description: "选择模板 URL，填入数值并放入任何 README。",
    labels: {
      repo: "仓库",
      org: "组织",
      npm: "NPM 包",
    },
  },
  builder: {
    title: "生成 SVG URL",
    description: "填写字段，然后渲染并复制 URL 或嵌入代码。",
    previewAlt: "Aristo 徽章预览",
    buttons: {
      generate: "生成",
      copyUrl: "复制 URL",
      copyMarkdown: "复制 Markdown",
      copyHtml: "复制 HTML",
    },
    placeholders: {
      owner: "例如：aristobyte-ui",
      repo: "例如：aristobyte-ui",
      org: "例如：aristobyte-ui",
      namespace: "例如：@aristobyte-ui",
      pkg: "例如：spinner",
    },
    cards: {
      repo: {
        title: "仓库",
        description: "单个仓库的活跃度、发行版和参与度。",
        fields: {
          owner: "用户或组织",
          repo: "仓库",
        },
      },
      org: {
        title: "组织",
        description: "组织的星标、仓库、分叉、PR、Issue 与活跃度。",
        fields: {
          org: "组织",
        },
      },
      npm: {
        title: "NPM 包",
        description: "NPM 包的版本与下载量。",
        fields: {
          namespace: "命名空间（可选）",
          pkg: "包名",
        },
      },
    },
  },
  footer: {
    note: "在 Netlify 中添加 GITHUB_TOKEN 以获得更高限额。所有端点均使用 CDN 缓存并启用 stale-while-revalidate。",
  },
};
