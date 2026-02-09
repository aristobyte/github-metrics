import type { Metadata } from "next";
import "./globals.scss";
import { TranslationProvider } from "../hooks/useTranslation";
import { ConfigProvider } from "../hooks/useConfig";

export const metadata: Metadata = {
  metadataBase: new URL("https://badges.aristobyte.com"),
  title: {
    default: "AristoBadges",
    template: "%s · AristoBadges",
  },
  description: "Minimal SVG badges for README dashboards.",
  applicationName: "AristoBadges",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Aristobyte UI" }],
  creator: "Aristobyte UI",
  publisher: "Aristobyte UI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Aristobyte",
    "AristoBadges",
    "SVG badges",
    "GitHub badges",
    "NPM badges",
    "README",
    "open-source",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "AristoBadges",
    description: "Minimal SVG badges for README dashboards.",
    siteName: "AristoBadges",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "AristoBadges preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AristoBadges",
    description: "Minimal SVG badges for README dashboards.",
    images: ["/twitter-image-1200x600.png", "/twitter-image-800x418.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      // { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#0c101a",
    "msapplication-TileColor": "#0c101a",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
