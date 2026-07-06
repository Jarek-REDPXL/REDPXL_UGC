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
  title: "REDPXL UGC — AI UGC Video Ads That Convert",
  description:
    "Done-for-you, hyper-realistic AI UGC video and static ads. Scripted with proven direct-response hooks, delivered in 72 hours, ready for TikTok, Meta and YouTube. A Redpxl company, London.",
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
      "Hyper-realistic AI-generated UGC video and static ads for your brand. Proven direct-response hooks, delivered in 72 hours.",
    locale: "en_GB",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "REDPXL UGC — AI UGC ads engineered to convert.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REDPXL UGC — AI UGC Video Ads That Convert",
    description:
      "Hyper-realistic AI-generated UGC video and static ads for your brand. Delivered in 72 hours.",
    images: ["/og.png"],
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
