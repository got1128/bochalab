import Script from "next/script";
import { site } from "@/lib/site";

// Google Analytics 4（官方 gtag.js 安裝碼）。只在正式 build 載入，本機 npm run dev 不會記錄流量。
// 站內換頁不會重新載入整頁，由 GA4「加強型評估」的「根據瀏覽記錄事件變更網頁」自動計算瀏覽量（預設開啟）。
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production" || !site.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
      </Script>
    </>
  );
}
