// 全站共用的品牌資訊（CLAUDE.md §1）
export const site = {
  name: "BOCHA Lab",
  nameZh: "鼠鼠特派員",
  tagline: "探索日常，發現知識。",
  taglineEn: "Curious about the world, one little discovery at a time.",
  url: "https://bochalab.com",
  email: "hello@bochalab.com",
} as const;

// Header 主選單
export const mainNav = [
  { href: "/journal/", label: "調查報告" },
  { href: "/about/", label: "關於鼠鼠" },
  { href: "/contact/", label: "聯絡" },
] as const;
