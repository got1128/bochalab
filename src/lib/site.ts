// 全站共用的品牌資訊（CLAUDE.md §1）
export const site = {
  name: "BOCHA Lab",
  nameZh: "鼠鼠特派員",
  tagline: "探索日常，發現知識。",
  taglineEn: "Curious about the world, one little discovery at a time.",
  url: "https://bochalab.com",
  email: "hello@bochalab.com",
  // Google Tag Manager 容器 ID（GA4 在 GTM 後台設定）
  gtmId: "GTM-NQFRKSD6",
  // 社群帳號（網址一律小寫）
  social: [
    { name: "Instagram", handle: "@bocha222", url: "https://www.instagram.com/bocha222/" },
    { name: "Threads", handle: "@bocha222", url: "https://www.threads.com/@bocha222" },
  ],
} as const;

// Header 主選單
export const mainNav = [
  { href: "/journal/", label: "調查報告" },
  { href: "/about/", label: "關於鼠鼠" },
  { href: "/contact/", label: "聯絡" },
] as const;
