import Link from "next/link";
import type { MDXComponents } from "next-mdx-remote-client/rsc";
import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "./Callout";

// MDX 內文的元件對照表。樣式主要寫在 globals.css 的 .prose-bocha 裡。

function A({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  // 站內連結用 next/link，站外連結開新分頁
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only">（另開新視窗）</span>
    </a>
  );
}

function Img({ alt, ...rest }: ComponentPropsWithoutRef<"img">) {
  // 靜態網站用一般 <img>；alt 一定要寫（CLAUDE.md §6）
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt ?? ""} loading="lazy" decoding="async" {...rest} />;
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  // 表格太寬時可以左右滑動，不會撐破手機版面
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="表格">
      <table {...props} />
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  // 每頁只能有一個 h1（文章標題），內文的 # 自動降成 h2
  h1: (props) => <h2 {...props} />,
  a: A,
  img: Img,
  table: Table,
  Callout,
};
