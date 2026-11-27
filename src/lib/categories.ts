// 六大專欄對照表（CLAUDE.md §4.3）。全站只在這裡維護一份。
export const categories = [
  {
    slug: "digital",
    name: "鼠鼠數位研究所",
    shortName: "數位研究所",
    nameEn: "Digital Lab",
    description: "網站製作、科技、AI",
  },
  {
    slug: "literature",
    name: "鼠鼠文學通信",
    shortName: "文學通信",
    nameEn: "Literary Notes",
    description: "文學與閱讀",
  },
  {
    slug: "curiosity",
    name: "鼠鼠冷知識調查局",
    shortName: "冷知識調查局",
    nameEn: "Curiosity Bureau",
    description: "科學、心理學、歷史",
  },
  {
    slug: "diary",
    name: "鼠鼠的成長日記",
    shortName: "成長日記",
    nameEn: "Learning Journal",
    description: "學習與創作歷程",
  },
  {
    slug: "lifestyle",
    name: "鼠鼠生活觀察室",
    shortName: "生活觀察室",
    nameEn: "Daily Observation",
    description: "設計、工具、生活觀察",
  },
  {
    slug: "adulting",
    name: "鼠鼠大人研究所",
    shortName: "大人研究所",
    nameEn: "Adulting Lab",
    description: "初級大人可能不知道的生活知識",
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** 專欄圖示路徑（public/images/columns/） */
export function categoryIcon(slug: CategorySlug): string {
  return `/images/columns/${slug}.webp`;
}
