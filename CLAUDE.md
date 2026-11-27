# BOCHA Lab（鼠鼠特派員）官方網站：專案交接說明

> 這份文件是給 Claude Code 的專案說明。請放在 repo 根目錄，檔名維持 `CLAUDE.md`，Claude Code 每次開工時會自動讀取。
> 最後更新：2026-11-27

---

## 1. 這是什麼專案

**BOCHA Lab** 是一個以天竺鼠角色為主角的**個人知識內容品牌**，中文名稱是「鼠鼠特派員」。品牌透過插畫、知識圖卡和文章，分享日常生活中值得探索的知識。

這個 repo 是品牌的**官方網站**，用途是長期存放完整的知識文章，也是品牌的基地。社群平台（Instagram、Threads）負責曝光，網站負責累積內容與搜尋流量。

- 品牌標語：**探索日常，發現知識。**（*Curious about the world, one little discovery at a time.*）
- 網域：**bochalab.com**（在 Cloudflare 註冊，DNS 也在 Cloudflare）
- 品牌信箱：hello@bochalab.com（Cloudflare Email Routing 轉寄，只能收信）
- 主要語言：繁體中文（`lang="zh-Hant-TW"`），之後可能延伸英文
- 經營者：一個人，有正職，時間有限，所以**第一版要簡單、好維護**

### 品牌命名結構

| 層級 | 名稱 | 用途 |
|---|---|---|
| 英文品牌 | BOCHA Lab | 網站、Logo、網域 |
| 中文品牌 | 鼠鼠特派員 | 中文品牌名、專欄與節目名稱 |
| 角色 | 波波（Bobo）與茶茶（Cha Cha） | 兩隻天竺鼠特派員，原型是創作者家裡真實的天竺鼠 |

> BOCHA = **BO**（波波）+ **CHA**（茶茶）。網址和帳號一律用小寫 `bochalab`，大寫 `BOCHA` 只用在 Logo 與視覺。

---

## 2. 技術架構（已決定）

| 項目 | 選擇 | 備註 |
|---|---|---|
| 框架 | Next.js（App Router，目前的穩定版） | 必須使用**靜態輸出** |
| 樣式 | Tailwind CSS | |
| 文章 | MDX，放在 repo 內的 `content/` | 用 frontmatter 管理文章資訊 |
| 版本控制 | GitHub | |
| 部署 | **GitHub Pages**，透過 GitHub Actions 部署 | 第一階段使用，之後可能搬家，見 §2.2 |
| 網域 | bochalab.com，在 Cloudflare 設定 DNS | |
| 分析 | Google Analytics 4 + Google Search Console | 上線前設定 |

### 2.1 GitHub Pages 的限制（必須遵守）

GitHub Pages 只能放靜態檔案，所以：

- `next.config` 要設定 `output: 'export'`，build 出來的檔案放在 `out/`
- **不能用**：API Routes、Server Actions、Middleware、ISR、會在執行時才算的動態路由，以及 `cookies()`、`headers()` 這類動態函式
- 動態路由（例如 `[slug]`）要用 `generateStaticParams` 在 build 時產生所有頁面
- `next/image` 要設定 `images: { unoptimized: true }`，圖片請先自行壓縮（建議 WebP）
- 建議設定 `trailingSlash: true`，避免 GitHub Pages 出現 404
- 因為使用自訂網域，**不需要**設定 `basePath`
- `public/CNAME` 檔案內容寫 `bochalab.com`
- 使用 GitHub Actions workflow 部署（官方的 `actions/upload-pages-artifact` 和 `actions/deploy-pages`）
- 網站大小上限 1 GB，每月頻寬軟上限 100 GB，純文章網站通常遠低於這些限制

### 2.2 之後可能搬家

GitHub Pages 的條款不允許用來經營線上商店或以商業交易為主的網站。品牌第二階段計畫販售數位產品（Notion 模板、PDF 等），到時候會搬到允許商業使用的主機。所以：

- **不要**把任何程式碼綁死在 GitHub Pages 特有的功能上
- 保持標準的 Next.js 靜態輸出，之後才能直接搬到其他主機

### 2.3 Cloudflare DNS 設定（給創作者參考，不是程式碼工作）

- 根網域 `bochalab.com` 設 A 記錄，指向 GitHub Pages 的 IP（`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`，設定前請到 GitHub 官方文件再確認一次）
- `www` 設 CNAME，指向 `<GitHub帳號>.github.io`
- 這些記錄一開始設成 **DNS only（灰色雲朵）**，讓 GitHub 能順利發 HTTPS 憑證
- 在 GitHub 帳號設定裡**驗證網域**，防止別人把這個網域接到他的 repo
- **不要動**已經存在的 Email Routing 記錄（MX、SPF `v=spf1 include:_spf.mx.cloudflare.net ~all`、DKIM `cf2024-1._domainkey`）

---

## 3. 網站架構

### 3.1 頁面與路徑

| 頁面 | 路徑 | 功能 |
|---|---|---|
| 首頁 | `/` | 品牌介紹、最新文章 |
| 所有文章 | `/journal` | 所有內容列表 |
| 數位研究所 | `/journal/digital` | 網站製作、科技、AI |
| 文學通信 | `/journal/literature` | 文學與閱讀 |
| 冷知識調查局 | `/journal/curiosity` | 科學、心理學、歷史 |
| 成長日記 | `/journal/diary` | 學習與創作歷程 |
| 生活觀察室 | `/journal/lifestyle` | 設計、工具、生活觀察 |
| 鼠鼠大人研究所 | `/journal/adulting` | 初級大人可能不知道的生活知識（新專欄） |
| 文章頁 | `/journal/[category]/[slug]` | 單篇文章 |
| 知識資料庫 | `/knowledge` | 知識分類與索引（第一版可先不做） |
| 文學書架 | `/library` | 書籍與閱讀紀錄（第一版可先不做） |
| 關於 | `/about` | 品牌故事、波波與茶茶 |
| 聯絡 | `/contact` | 合作聯絡，直接用 `mailto:hello@bochalab.com`，**不做表單** |

### 3.2 首頁六大區塊

1. **Hero**：角色主視覺加上品牌標語
2. **最新調查報告**：最新的 3～6 篇文章
3. **六大專欄**：每個專欄的入口卡片
4. **閱讀書架**：近期閱讀（第一版可以先用靜態資料）
5. **成長日記**：幕後學習與創作的最新文章
6. **鼠鼠通信**：電子報入口。第一版只放「即將推出」，**不要串接任何電子報服務**

### 3.3 第一版範圍（MVP）

**要做**：首頁、`/journal`、六個專欄頁、文章頁、`/about`、`/contact`、404 頁、手機版、基本 SEO、sitemap、RSS（可選）

**先不做**：會員、留言、購物車、搜尋功能、資料庫、後台、電子報串接、`/knowledge`、`/library`

---

## 4. 內容格式（MDX）

### 4.1 檔案位置

```
content/
  digital/dns-what-is-it.mdx
  adulting/water-leak-downstairs.mdx
  ...
```

slug 一律用**英文小寫加連字號**，網址不要出現中文。

### 4.2 Frontmatter 欄位

```yaml
---
title: "DNS 是什麼？用生活例子理解"
description: "用查電話簿的比喻，三分鐘看懂 DNS 怎麼把網址變成 IP。"   # 用在 meta description，約 80～120 個中文字
category: "digital"        # digital | literature | curiosity | diary | lifestyle | adulting
date: "2026-12-05"
updated: "2026-12-05"      # 選填
tags: ["網站", "DNS"]
cover: "/images/journal/dns-cover.webp"   # 選填
coverAlt: "波波拿著放大鏡看著一本電話簿"     # 有 cover 時必填
draft: false               # true 時不輸出到正式網站
sources:                   # 參考來源，文章底部自動列出
  - title: "來源標題"
    url: "https://..."
---
```

### 4.3 專欄對照表（程式裡集中管理一份）

| slug | 中文名 | 英文名 | 第一季內容比例 |
|---|---|---|---|
| `digital` | 鼠鼠數位研究所 | Digital Lab | 35% |
| `literature` | 鼠鼠文學通信 | Literary Notes | 20% |
| `curiosity` | 鼠鼠冷知識調查局 | Curiosity Bureau | 20% |
| `diary` | 鼠鼠的成長日記 | Learning Journal | 15% |
| `lifestyle` | 鼠鼠生活觀察室 | Daily Observation | 10% |
| `adulting` | 鼠鼠大人研究所 | Adulting Lab | 新增，比例待定 |

---

## 5. 視覺規範

### 5.1 整體風格

**復古手繪加上文青知識筆記**，像一本復古的知識刊物。**避免**過度幼稚的卡通感。

### 5.2 色彩：波茶本色

色彩直接取自波波（黑色較多）和茶茶（白色較多）的毛色。對比度是在背景色 `#F5EFE3` 上，依 WCAG 計算。

| 名稱 | HEX | Tailwind 名稱 | 用途 | 對比度 |
|---|---|---|---|---|
| 奶茶米（茶茶的白毛） | `#F5EFE3` | `paper` | 頁面背景 | — |
| 波波墨黑 | `#2B2522` | `ink` | 內文、標題 | 13.19 ✅ |
| 研究所深青 | `#1F5560` | `brand` | 品牌主色、連結、按鈕 | 7.26 ✅ |
| 臉頰焦糖 | `#A8612A` | `caramel` | 強調、大標題、印章 | 4.16，只能用在大字（≥ 24px 或粗體 ≥ 18.66px） |
| 鼻頭粉 | `#D98C8A` | `blush` | 小點綴、插畫、裝飾 | 2.27，**不能當文字** |

- 請寫進 Tailwind theme，使用上表的語意化名稱，不要在元件裡直接寫 HEX
- 次要文字（日期、說明文字）請另外定義 `ink-muted: #68625C`（對比度 5.25 ✅）。**不要用 `caramel` 或 `blush`**；`ink` 的透明度也不要低於 70%（60% 只有 3.92，不合格）
- 白色字放在深色底上時，用 `brand` 或 `ink` 當底色

### 5.3 字體

| 用途 | 字體 |
|---|---|
| 中文 | Noto Sans TC |
| 英文標題 | Libre Baskerville |
| 英文裝飾 | Dancing Script（少量使用） |
| 數字、程式碼 | Roboto Mono |

用 `next/font/google` 載入，build 時會把字體放進網站裡，靜態輸出也能用。Noto Sans TC 檔案很大，只載入需要的字重（例如 400、700）。

### 5.4 角色

- 主角是**天竺鼠**（guinea pig），**不是倉鼠也不是老鼠**：沒有尾巴、沒有頰囊、腳短、身體圓滾滾
- 毛色是**三色**（黑、白、橘咖啡），臉上有**白色鼻樑線**，鼻子粉色
- 配件：記者帽、郵差包、筆記本、放大鏡、筆電
- 招牌動作：開心時會原地彈跳（popcorning），叫聲是「wheek wheek」
- 角色插畫由創作者提供。還沒有插畫時，用**簡單的佔位圖**，**不要**自己生成或下載其他天竺鼠圖片

### 5.5 文章閱讀體驗

- 內文行高寬鬆（中文建議 1.8 左右），每行不要太寬（約 36～42 個中文字）
- 設計標題層級、引用、callout（例如「鼠鼠小補充」）、程式碼區塊、表格的樣式
- 文章底部固定放：參考來源、同專欄的相關文章、回到專欄的連結

---

## 6. SEO 要求

每一頁都要有：

- 獨立的 `<title>` 和 meta description（從 frontmatter 讀取）
- canonical URL（`https://bochalab.com/...`）
- Open Graph 和 Twitter card
- 清楚的標題層級：每頁只有一個 `<h1>`，內文從 `<h2>` 開始
- 所有圖片都有 `alt`
- 文章頁加上 `Article` JSON-LD，首頁加上 `Organization` 或 `WebSite` JSON-LD
- `sitemap.xml` 和 `robots.txt`，build 時自動產生
- 文章之間要有內部連結

**優先製作的 SEO 文章**（有明確搜尋需求）：DNS 是什麼？、HTML／CSS／JavaScript 的差異、HTTPS 是什麼？、如何建立自己的網站？、Sitemap 是什麼？、《小王子》閱讀心得、卡夫卡《變形記》解析、家裡漏水到樓下怎麼辦？

---

## 7. 內容原則（寫文章或範例內容時必須遵守）

- 每篇知識內容都要附**資料來源**，不要只依賴 AI 產出的資訊
- 科學、心理學、健康類內容特別注意證據品質
- 文學作品**不要大段引用**原文，要注意著作權
- 寫範例文章時，**不要捏造事實、數據或引用**。不確定的地方標註「待查證」，留給創作者確認
- 語氣：好奇、友善、認真查證，不裝懂。可以使用角色口吻，例如「鼠鼠今天調查了……」、「Wheek！鼠鼠發現了一件事！」
- 品牌與創作者的正職工作完全分開，**不要**放任何跟創作者公司有關的內容

---

## 8. 工作流程與分工

- **內容管理在 Notion**（「鼠鼠特派員 HQ」），裡面有內容、研究、任務、素材、成效五個資料庫。Claude Code 不一定能讀到 Notion，文章完成後，由創作者把定稿貼進 `content/` 的 MDX
- 內容流程：靈感收集 → 待研究 → 研究中 → 草稿完成 → 設計中 → 待發布 → 已發布
- 網站開發排在 90 天計畫的第 9～12 週（2027/1/15～2/11），預計 **2027/2/12～2/16 上線**
- 每週只有幾小時可以開發，請把工作切成**小而完整**的步驟，每一步都能預覽，也能單獨 commit

### 建議的開發順序

1. 建立 Next.js、Tailwind、靜態輸出設定，以及 GitHub Actions 部署，先讓一個 Hello World 部署到 bochalab.com
2. 設計系統：色彩、字體、版面骨架（Header、Footer、容器）
3. MDX 文章系統：讀取 frontmatter、文章頁、專欄頁、`/journal` 列表
4. 首頁六大區塊
5. `/about`、`/contact`、404
6. SEO：metadata、sitemap、robots、JSON-LD
7. 手機版與效能檢查（Lighthouse）
8. 放進 3～5 篇真實文章，正式上線

---

## 9. 給 Claude Code 的工作習慣

- 動手前先說明打算怎麼做，改動大的時候先確認
- 每完成一個步驟，說明怎麼在本機預覽（`npm run dev`），以及怎麼確認靜態輸出正常（`npm run build` 後檢查 `out/`）
- 盡量少裝套件，裝之前說明理由
- commit 訊息用中文或英文都可以，但要清楚描述改了什麼
- 遇到第 2.1 節限制裡做不到的功能，先告訴創作者，不要自己繞路改用伺服器功能
