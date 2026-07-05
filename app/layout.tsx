import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Self-hosted Inter Variable (rsms build — carries the opsz axis for
// Inter Display optical sizing at large sizes). See DESIGN.md §3.1.
const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  style: "normal",
  preload: true,
});

const SITE_URL = "https://redpxl.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "REDPXL UGC — AI UGC Video Ads That Convert",
  description:
    "Done-for-you, hyper-realistic AI UGC video ads. Scripted with proven direct-response hooks, delivered in 48 hours, ready for TikTok, Meta and YouTube. A Redpxl company, London.",
  keywords: [
    "AI UGC",
    "UGC video ads",
    "AI video ads",
    "TikTok ads",
    "Meta ads",
    "direct response",
    "Redpxl",
  ],
  authors: [{ name: "Redpxl" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "REDPXL UGC",
    title: "REDPXL UGC — AI UGC Video Ads That Convert",
    description:
      "Hyper-realistic AI-generated UGC videos for your brand. Proven direct-response hooks, delivered in 48 hours.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDPXL UGC — AI UGC Video Ads That Convert",
    description:
      "Hyper-realistic AI-generated UGC videos for your brand. Delivered in 48 hours.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.webp", type: "image/webp" }],
    shortcut: [{ url: "/favicon.webp", type: "image/webp" }],
    apple: [{ url: "/favicon.webp", type: "image/webp" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
