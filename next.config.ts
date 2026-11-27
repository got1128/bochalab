import type { NextConfig } from "next";

// 靜態輸出設定：build 後所有檔案會放在 out/，可以部署到任何靜態主機。
// 限制說明見 CLAUDE.md §2.1。
const nextConfig: NextConfig = {
  output: "export",
  // /about → /about/index.html，避免 GitHub Pages 出現 404
  trailingSlash: true,
  // 靜態輸出無法使用 Next.js 內建的圖片最佳化，圖片請先自行壓縮成 WebP
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
