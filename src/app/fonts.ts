import {
  Dancing_Script,
  Libre_Baskerville,
  Noto_Sans_TC,
  Roboto_Mono,
} from "next/font/google";

// 字體規範見 CLAUDE.md §5.3。build 時會下載並放進網站，靜態輸出也能用。

// 中文：只載入 400、700，檔案才不會太大。
// 中文字體會被 Google 自動切成很多小檔案，所以不預先載入（preload: false），瀏覽器用到哪些字才下載哪些。
export const notoSansTC = Noto_Sans_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-noto-sans-tc",
});

// 英文標題
export const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-baskerville",
});

// 英文裝飾（少量使用）
export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
});

// 數字、程式碼
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const fontVariables = [
  notoSansTC.variable,
  libreBaskerville.variable,
  dancingScript.variable,
  robotoMono.variable,
].join(" ");
