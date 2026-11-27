import fs from "node:fs";
import path from "node:path";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { categories, getCategory, type Category, type CategorySlug } from "@/lib/categories";

// 文章系統（CLAUDE.md §4）
// 文章放在 content/<專欄>/<slug>.mdx，build 時讀取。

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Source = { title: string; url: string };

export type PostFrontmatter = {
  title: string;
  description: string;
  category: CategorySlug;
  date: string;
  updated?: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  draft: boolean;
  sources: Source[];
};

export type Post = PostFrontmatter & {
  slug: string;
  categoryInfo: Category;
  /** 文章網址，例如 /journal/digital/dns-what-is-it/ */
  url: string;
  /** 預估閱讀分鐘數 */
  readingMinutes: number;
  /** 去掉 frontmatter 後的 MDX 內文 */
  body: string;
};

/**
 * 草稿只在本機開發（npm run dev）時顯示。
 * 想在 build 時也看到草稿，可以用 SHOW_DRAFTS=1 npm run build。
 */
const showDrafts = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** frontmatter 有錯就讓 build 失敗，並清楚說明哪一篇、哪個欄位有問題。 */
function validate(file: string, folder: string, slug: string, fm: Record<string, unknown>): PostFrontmatter {
  const errors: string[] = [];
  const str = (key: string) => (typeof fm[key] === "string" && (fm[key] as string).trim() ? (fm[key] as string) : undefined);

  if (!SLUG_PATTERN.test(slug)) errors.push(`檔名「${slug}」只能用英文小寫、數字和連字號`);
  if (!str("title")) errors.push("缺少 title");
  if (!str("description")) errors.push("缺少 description");

  const category = str("category");
  if (!category || !getCategory(category)) {
    errors.push(`category 必須是 ${categories.map((c) => c.slug).join(" | ")}`);
  } else if (category !== folder) {
    errors.push(`category 是「${category}」，但檔案放在 content/${folder}/`);
  }

  const date = str("date");
  if (!date || !DATE_PATTERN.test(date)) errors.push("date 格式要是 YYYY-MM-DD");
  const updated = str("updated");
  if (fm.updated !== undefined && (!updated || !DATE_PATTERN.test(updated))) errors.push("updated 格式要是 YYYY-MM-DD");

  const cover = str("cover");
  if (cover && !str("coverAlt")) errors.push("有 cover 時必須填 coverAlt");

  const tags = fm.tags ?? [];
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) errors.push("tags 必須是文字陣列");

  const sources = fm.sources ?? [];
  if (!Array.isArray(sources) || sources.some((s) => !s || typeof s.title !== "string" || typeof s.url !== "string")) {
    errors.push("sources 每一項都要有 title 和 url");
  }

  if (errors.length) {
    throw new Error(`文章 ${file} 的 frontmatter 有問題：\n  - ${errors.join("\n  - ")}`);
  }

  return {
    title: str("title")!,
    description: str("description")!,
    category: category as CategorySlug,
    date: date!,
    updated,
    tags: tags as string[],
    cover,
    coverAlt: str("coverAlt"),
    draft: fm.draft === true,
    sources: sources as Source[],
  };
}

/** 中文約每分鐘 400 字，英文單字約每分鐘 200 個 */
function estimateReadingMinutes(body: string): number {
  const text = body.replace(/```[\s\S]*?```/g, "").replace(/<[^>]+>/g, "");
  const cjk = (text.match(/[㐀-鿿豈-﫿]/g) ?? []).length;
  const words = (text.replace(/[㐀-鿿豈-﫿]/g, " ").match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

let cache: Post[] | undefined;

/** 所有文章，新的在前。草稿只在開發模式出現。 */
export function getAllPosts(): Post[] {
  if (cache) return cache;

  const posts: Post[] = [];
  for (const c of categories) {
    const dir = path.join(CONTENT_DIR, c.slug);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".mdx")) continue;
      const file = path.join("content", c.slug, name);
      const slug = name.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      const { frontmatter, strippedSource } = getFrontmatter<Record<string, unknown>>(raw);
      const fm = validate(file, c.slug, slug, frontmatter);
      if (fm.draft && !showDrafts) continue;
      posts.push({
        ...fm,
        slug,
        categoryInfo: c,
        url: `/journal/${c.slug}/${slug}/`,
        readingMinutes: estimateReadingMinutes(strippedSource),
        body: strippedSource,
      });
    }
  }

  // 新的在前；同一天的依標題排序，讓順序固定
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "zh-Hant"));
  cache = posts;
  return posts;
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPost(category: string, slug: string): Post | undefined {
  return getAllPosts().find((p) => p.category === category && p.slug === slug);
}

/** 同專欄的其他文章（最多 3 篇），共同標籤多的排前面 */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** 2026-12-05 → 2026 年 12 月 5 日（直接拆字串，不受時區影響） */
export function formatDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${y} 年 ${m} 月 ${d} 日`;
}
