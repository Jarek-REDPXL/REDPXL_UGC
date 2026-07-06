import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "REDPXL UGC — AI UGC ads that convert",
  description:
    "15–30 fresh, scroll-stopping UGC ads a month, delivered in 72 hours. Done-for-you AI UGC video and static ads for TikTok, Meta and YouTube. A Redpxl company, London.",
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
    siteName: "REDPXL",
    title: "REDPXL UGC — AI UGC ads that convert",
    description:
      "15–30 fresh, scroll-stopping UGC ads a month, delivered in 72 hours.",
    locale: "en_GB",
    images: [
      {
        // ?v=2 busts the old cached preview on platforms that key by URL
        url: "/og.png?v=2",
        width: 1200,
        height: 630,
        alt: "REDPXL UGC — never run a tired ad again.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REDPXL UGC — AI UGC ads that convert",
    description:
      "15–30 fresh, scroll-stopping UGC ads a month, delivered in 72 hours.",
    images: ["/og.png?v=2"],
  },
  robots: { index: true, follow: true },
  // favicon + apple-touch icon are provided by app/icon.png and
  // app/apple-icon.png (Next file convention), generated from favicon.webp.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
