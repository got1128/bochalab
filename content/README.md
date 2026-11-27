# 文章怎麼放

## 1. 檔案位置

```
content/<專欄>/<網址名稱>.mdx
```

- 專欄：`digital`、`literature`、`curiosity`、`diary`、`lifestyle`、`adulting`
- 網址名稱只能用**英文小寫、數字、連字號**，例如 `dns-what-is-it.mdx`，網址會是 `bochalab.com/journal/digital/dns-what-is-it/`

## 2. 檔案開頭（frontmatter）

複製這段，改成你的內容：

```yaml
---
title: "文章標題"
description: "一兩句話的摘要，會出現在列表和搜尋結果，約 80～120 字"
category: "digital"
date: "2026-12-05"
updated: "2026-12-10"          # 選填：有修改再寫
tags: ["標籤一", "標籤二"]
cover: "/images/journal/xxx.webp"   # 選填：封面圖
coverAlt: "封面圖的文字描述"         # 有 cover 時必填
draft: true                    # true＝草稿，只在 npm run dev 看得到；要發布改成 false
sources:
  - title: "來源標題"
    url: "https://..."
---
```

寫錯的話，`npm run build` 會直接告訴你哪一篇、哪個欄位有問題。

## 3. 內文寫法

一般 Markdown 都可以用：`## 小標題`、`**粗體**`、清單、表格、`> 引用`、程式碼區塊、`[連結](網址)`。

- 內文的標題從 `##` 開始（文章標題本身就是最大的標題）
- 圖片：`![圖片描述](/images/journal/xxx.webp)`，圖片描述一定要寫

### 提示框

```mdx
<Callout>
預設是「鼠鼠小補充」
</Callout>

<Callout type="warning">
「鼠鼠提醒」：要注意的事、常見誤解
</Callout>

<Callout type="discovery">
「Wheek！鼠鼠發現」：重點或有趣的發現
</Callout>

<Callout title="自訂標題">
任何一種都可以自訂標題
</Callout>
```

## 4. 預覽

```bash
npm run dev
```

打開 http://localhost:3000/journal/ ，草稿會有「草稿」標籤。
