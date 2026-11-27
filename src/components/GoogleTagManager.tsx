import Script from "next/script";
import { site } from "@/lib/site";

// Google Tag Manager（官方安裝碼）。只在正式 build 載入，本機 npm run dev 不會記錄流量。
// GA4 的設定（評估 ID G-XXXX）在 GTM 後台新增「Google 代碼」完成，不用改程式。
const enabled = process.env.NODE_ENV === "production" && Boolean(site.gtmId);

export function GoogleTagManagerScript() {
  if (!enabled) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}
    </Script>
  );
}

// 瀏覽器關閉 JavaScript 時的備用方案（放在 body 最前面）
export function GoogleTagManagerNoScript() {
  if (!enabled) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
