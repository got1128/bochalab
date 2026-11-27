import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// RSS 訂閱（/feed.xml）：build 時產生成靜態檔案，不需要伺服器
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const abs = (path: string) => new URL(path, site.url).toString();

// 文章日期只有年月日，以台灣時間 00:00 計算
const rfc822 = (date: string) => new Date(`${date}T00:00:00+08:00`).toUTCString();

export function GET() {
  const posts = getAllPosts().slice(0, 30);
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${abs(p.url)}</link>
      <guid isPermaLink="true">${abs(p.url)}</guid>
      <description>${escape(p.description)}</description>
      <category>${escape(p.categoryInfo.name)}</category>
      <pubDate>${rfc822(p.date)}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${site.name} ${site.nameZh}`)}</title>
    <link>${site.url}/</link>
    <description>${escape(site.tagline)}</description>
    <language>zh-TW</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${posts.length ? `    <lastBuildDate>${rfc822(posts[0].updated ?? posts[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
