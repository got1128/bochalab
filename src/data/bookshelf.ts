// 首頁「閱讀書架」的資料（CLAUDE.md §3.2，第一版用靜態資料）
// 新增一本書：在 books 陣列裡加一筆，最新的放最上面。首頁會顯示前 4 本。
//
// 範例：
// {
//   title: "書名",
//   author: "作者",
//   status: "reading",            // reading＝正在讀，finished＝讀完了
//   note: "一句話心得（選填）",
//   article: "/journal/literature/xxx/",  // 有寫成文章的話放連結（選填）
// },

export type Book = {
  title: string;
  author: string;
  status: "reading" | "finished";
  note?: string;
  article?: string;
};

export const books: Book[] = [];
