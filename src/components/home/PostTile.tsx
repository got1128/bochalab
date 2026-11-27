import Image from "next/image";
import Link from "next/link";
import { categoryIcon } from "@/lib/categories";
import { formatDate, type Post } from "@/lib/posts";

/** 首頁用的直式文章卡片：封面（沒有封面就用專欄圖示）＋專欄＋標題＋日期 */
export function PostTile({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper transition-colors hover:border-brand">
      {post.cover ? (
        <Image
          src={post.cover}
          alt=""
          width={1200}
          height={800}
          sizes="(min-width: 768px) 340px, 100vw"
          className="aspect-[3/2] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[3/2] items-center justify-center bg-paper-deep">
          <Image src={categoryIcon(post.category)} alt="" width={320} height={320} className="h-3/4 w-auto" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex flex-wrap items-center gap-x-3 text-sm text-ink-muted">
          <span className="font-bold text-brand">{post.categoryInfo.shortName}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.draft && <span className="rounded bg-caramel px-1.5 text-xs font-bold text-paper">草稿</span>}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug tracking-wide">
          <Link href={post.url} className="after:absolute after:inset-0 group-hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-muted">{post.description}</p>
      </div>
    </article>
  );
}
