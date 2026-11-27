// next/image 的自訂 loader（靜態輸出也能用，不需要伺服器）
// 把 /images/home/hero.webp 對應到 build 前產生好的 /resized/800/images/home/hero.webp
// 對應的檔案由 scripts/resize-images.mjs 產生。
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/images/")) return src;
  return `/resized/${width}${src}`;
}
