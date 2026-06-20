import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import JsonLd from "@/components/seo/JsonLd";
import { APP_NAME, APP_TAGLINE, SITE_URL } from "@/lib/constants";
import {
  organizationJsonLd,
  siteConfig,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${APP_NAME} — SSC, UPSC, Railway & Banking Question Bank (Hindi + English)`,
    template: `%s | ${APP_NAME}`,
  },
  description: `${APP_TAGLINE}. 10,000+ MCQs in Hindi & English for Reasoning, Maths, English & GK/Current Affairs 2025–2026.`,
  keywords: siteConfig.keywords,
  authors: [{ name: APP_NAME, url: SITE_URL }],
  creator: APP_NAME,
  publisher: APP_NAME,
  formatDetection: { email: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
    languages: { en: SITE_URL, hi: `${SITE_URL}?lang=hi` },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: SITE_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Government Exam Question Bank`,
    description: APP_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Government Exam Question Bank`,
    description: APP_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      </head>
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
