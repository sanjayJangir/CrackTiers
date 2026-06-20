import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { examTestSeries } from "@/data/test-series";
import { SITE_URL, SUBJECT_META } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/question-bank`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/online-test-series`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/dashboard`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
  ];

  const testSeriesPages: MetadataRoute.Sitemap = examTestSeries.map((exam) => ({
    url: `${base}/online-test-series/${exam.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const subjectPages: MetadataRoute.Sitemap = Object.values(SUBJECT_META).map(
    (sub) => ({
      url: `${base}/subject/${sub.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })
  );

  return [...staticPages, ...testSeriesPages, ...categoryPages, ...subjectPages];
}
