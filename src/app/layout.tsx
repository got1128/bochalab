import type { Metadata } from "next";
import { GoogleTagManagerNoScript, GoogleTagManagerScript } from "@/components/GoogleTagManager";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { defaultOgImage, siteTitle } from "@/lib/seo";
import { site } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.nameZh}｜${site.tagline}`,
    template: `%s｜${site.name} ${site.nameZh}`,
  },
  description:
    "鼠鼠特派員波波與茶茶，用插畫、知識圖卡和文章，分享日常生活中值得探索的知識。",
  openGraph: {
    siteName: `${site.name} ${site.nameZh}`,
    locale: "zh_TW",
    type: "website",
    title: siteTitle,
    images: [defaultOgImage],
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant-TW" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <GoogleTagManagerNoScript />
        <GoogleTagManagerScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-paper"
        >
          跳到主要內容
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
