import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://priceofme.vercel.app";

export const metadata: Metadata = {
  title: "PriceOfMe — How much does the internet make from YOU?",
  description:
    "Calculate your personal data value. See how much Google, Meta, TikTok, and Amazon earn from YOUR data every year — and how much you receive: $0.",
  keywords: [
    "data value",
    "personal data",
    "ARPU",
    "privacy",
    "data economy",
    "google revenue per user",
    "how much is my data worth",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "PriceOfMe — How much does the internet make from YOU?",
    description:
      "Google makes $342/yr from you. Meta $217. TikTok $112. You receive: $0. Calculate your real data price tag.",
    url: siteUrl,
    siteName: "PriceOfMe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PriceOfMe — Your data has a price tag. You just never see it.",
    description:
      "The internet makes $700+/year from the average US user. Find out YOUR number.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
