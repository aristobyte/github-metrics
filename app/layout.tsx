import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "AristoBadges",
  description: "Minimal SVG badges for README dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
