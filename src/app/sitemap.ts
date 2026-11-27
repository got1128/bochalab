import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { site } from "@/lib/site";

// sitemap.xml：build 時自動產生（只列出已發布的文章，草稿不會出現）
export const dynamic = "force-static";

const abs = (path: string) => new URL(path, site.url).toString();
const latest = (dates: string[]) => (dates.length ? dates.sort().at(-1) : undefined);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = latest(posts.map((p) => p.updated ?? p.date));

  return [
    { url: abs("/"), lastModified: newest, priority: 1 },
    { url: abs("/journal/"), lastModified: newest, priority: 0.8 },
    ...categories.map((c) => ({
      url: abs(`/journal/${c.slug}/`),
      lastModified: latest(getPostsByCategory(c.slug).map((p) => p.updated ?? p.date)),
      priority: 0.7,
    })),
    ...posts.map((p) => ({ url: abs(p.url), lastModified: p.updated ?? p.date, priority: 0.9 })),
    { url: abs("/about/"), priority: 0.5 },
    { url: abs("/contact/"), priority: 0.3 },
  ];
}
