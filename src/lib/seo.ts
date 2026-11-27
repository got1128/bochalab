import type { Metadata } from "next";
import type { Post } from "./posts";
import { site } from "./site";

// SEO 共用工具（CLAUDE.md §6）
// Next.js 的 openGraph／twitter 設定不會跟 layout 合併，而是整個覆蓋，
// 所以每一頁都透過 pageMetadata() 產生一份完整的設定。

export const defaultOgImage = {
  url: "/images/og/default.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} ${site.nameZh}：${site.tagline}`,
};

export const siteTitle = `${site.name} ${site.nameZh}｜${site.tagline}`;

type PageMetaInput = {
  /** 頁面標題（不含品牌後綴）；首頁不填 */
  title?: string;
  description: string;
  /** 以 / 開頭、/ 結尾的路徑，例如 "/journal/digital/" */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  article?: { publishedTime: string; modifiedTime?: string; section: string; tags: string[] };
};

export function pageMetadata({ title, description, path, image = defaultOgImage, article }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title}｜${site.name} ${site.nameZh}` : siteTitle;
  return {
    title: title ?? { absolute: siteTitle },
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: `${site.name} ${site.nameZh}`,
      locale: "zh_TW",
      images: [image],
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            section: article.section,
            tags: article.tags,
          }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

/* ---------- JSON-LD ---------- */

const abs = (path: string) => new URL(path, site.url).toString();

const organization = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.nameZh,
  url: `${site.url}/`,
  logo: abs("/images/brand/logo-badge.webp"),
  email: site.email,
  sameAs: site.social.map((s) => s.url),
};

/** 首頁：WebSite + Organization */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: `${site.name} ${site.nameZh}`,
        alternateName: [site.name, site.nameZh],
        url: `${site.url}/`,
        description: site.tagline,
        inLanguage: "zh-Hant-TW",
        publisher: { "@id": organization["@id"] },
      },
      organization,
    ],
  };
}

/** 文章頁：Article + 麵包屑 */
export function articleJsonLd(post: Post) {
  const url = abs(post.url);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        image: [abs(post.cover ?? defaultOgImage.url)],
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "zh-Hant-TW",
        articleSection: post.categoryInfo.name,
        keywords: post.tags.join(", "),
        mainEntityOfPage: url,
        url,
        author: organization,
        publisher: organization,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "調查報告", item: abs("/journal/") },
          { "@type": "ListItem", position: 2, name: post.categoryInfo.name, item: abs(`/journal/${post.category}/`) },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

/** 把 JSON-LD 安全地放進 <script>（避免內容裡的 < 提前結束標籤） */
export function jsonLdHtml(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
