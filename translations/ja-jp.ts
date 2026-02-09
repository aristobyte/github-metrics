export const jaJp = {
  site: {
    name: "AristoBadges",
    tagline: "READMEダッシュボード向けのミニマルSVGバッジ。",
  },
  locales: {
    labels: {
      "en-gb": "英語（英国）",
      "en-us": "英語（米国）",
      "es-es": "スペイン語",
      "fr-fr": "フランス語",
      "de-de": "ドイツ語",
      "it-it": "イタリア語",
      "pt-br": "ポルトガル語（ブラジル）",
      "ru-ru": "ロシア語",
      "zh-cn": "中国語（簡体）",
      "ja-jp": "日本語",
    },
  },
  links: {
    "aristobyte-ui": "AristoByte UI",
    source: "ソースコード",
    instagram: "Instagram",
    website: "AristoByte",
    linkedin: "LinkedIn",
  },
  projectInfo: {
    subtitle: "READMEバッジ向けに設計。",
    title: "提供",
    ownerName: "AristoByte",
    description:
      "AristoBadgesは、リポジトリ・組織・NPMパッケージ向けに高速でキャッシュ可能なSVGカードを生成します。",
  },
  quickLinks: {
    title: "README向けSVGバッジを数秒で生成。",
    badge: "オープンソースツール",
    description: "テンプレートURLを選び、値を入れてREADMEに貼り付けます。",
    labels: {
      repo: "リポジトリ",
      org: "組織",
      npm: "NPMパッケージ",
    },
  },
  builder: {
    title: "SVG URLを生成",
    description: "入力してレンダリングし、URLや埋め込みをコピー。",
    previewAlt: "Aristoバッジのプレビュー",
    buttons: {
      generate: "生成",
      copyUrl: "URLをコピー",
      copyMarkdown: "Markdownをコピー",
      copyHtml: "HTMLをコピー",
    },
    placeholders: {
      owner: "例: aristobyte-ui",
      repo: "例: aristobyte-ui",
      org: "例: aristobyte-ui",
      namespace: "例: @aristobyte-ui",
      pkg: "例: spinner",
    },
    cards: {
      repo: {
        title: "リポジトリ",
        description: "単一リポジトリの活動・リリース・反応。",
        fields: {
          owner: "ユーザーまたは組織",
          repo: "リポジトリ",
        },
      },
      org: {
        title: "組織",
        description: "組織のスター、リポジトリ、フォーク、PR、Issue、活動。",
        fields: {
          org: "組織",
        },
      },
      npm: {
        title: "NPMパッケージ",
        description: "NPMパッケージのバージョンとダウンロード数。",
        fields: {
          namespace: "Namespace（任意）",
          pkg: "パッケージ",
        },
      },
    },
  },
  footer: {
    note: "Netlifyの環境変数にGITHUB_TOKENを追加すると上限が増えます。全エンドポイントはCDNでstale-while-revalidateキャッシュ。",
  },
};
