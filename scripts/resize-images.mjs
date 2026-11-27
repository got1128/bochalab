// 圖片多尺寸：把 public/images 裡的圖片縮成幾種寬度，放進 public/resized/<寬度>/images/...
// 手機只會下載小張的圖，桌機才下載大圖（next/image 透過 src/lib/image-loader.ts 選擇）。
// 會在 npm run dev／npm run build 前自動執行；已經產生過、而且原圖沒改的會跳過。
// public/resized 不進 git，每次部署時重新產生。
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import widths from "../image-widths.json" with { type: "json" };

const SRC = "public/images";
const OUT = "public/resized";
const EXTS = new Set([".webp", ".png", ".jpg", ".jpeg"]);
const sizes = [...widths.imageSizes, ...widths.deviceSizes];

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXTS.has(path.extname(e.name).toLowerCase())) yield p;
  }
}

let made = 0;
let skipped = 0;
for (const file of walk(SRC)) {
  const rel = path.relative("public", file); // images/home/hero.webp
  const srcTime = fs.statSync(file).mtimeMs;
  const { width: srcWidth = 0 } = await sharp(file).metadata();
  for (const w of sizes) {
    const out = path.join(OUT, String(w), rel);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) {
      skipped++;
      continue;
    }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    if (w >= srcWidth) {
      // 原圖不夠寬：直接複製原圖（不放大，也不重新壓縮）
      fs.copyFileSync(file, out);
    } else {
      await sharp(file).resize({ width: w }).toFile(out);
    }
    made++;
  }
}
console.log(`resize-images: 產生 ${made} 張，略過 ${skipped} 張`);
