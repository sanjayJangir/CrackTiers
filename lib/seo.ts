import type { Metadata } from "next";
import { APP_NAME, APP_TAGLINE, SITE_URL, SUBJECT_META } from "./constants";

export const siteConfig = {
  name: APP_NAME,
  tagline: APP_TAGLINE,
  url: SITE_URL,
  locale: "en_IN",
  keywords: [
    "government exam questions",
    "SSC question bank",
    "UPSC MCQ",
    "railway exam preparation",
    "banking exam questions",
    "state PSC practice",
    "reasoning questions Hindi English",
    "quantitative aptitude",
    "current affairs 2025 2026",
    "CrackTiers",
    "सरकारी परीक्षा प्रश्न",
    "SSC प्रश्न बैंक",
    "करंट अफेयर्स",
  ],
};

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
      languages: {
        en: url,
        hi: `${url}?lang=hi`,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    inLanguage: ["en", "hi"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/question-bank?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    areaServed: "IN",
  };
}

export function subjectCourseJsonLd(slug: keyof typeof SUBJECT_META) {
  const subject = SUBJECT_META[slug];
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: subject.name,
    description: subject.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: ["en", "hi"],
    url: `${siteConfig.url}/subject/${slug}`,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
