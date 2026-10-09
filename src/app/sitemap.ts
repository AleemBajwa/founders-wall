import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://founders-wall.vercel.app";
  const now = new Date();

  const categories = [
    "ai",
    "devtools",
    "saas",
    "productivity",
    "infrastructure",
    "other",
  ];

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  for (const cat of categories) {
    routes.push({
      url: `${baseUrl}/category/${cat}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  return routes;
}
