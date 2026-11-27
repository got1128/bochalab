import Image from "next/image";
import Link from "next/link";
import { categoryIcon } from "@/lib/categories";
import { formatDate, type Post } from "@/lib/posts";

type Props = {
  post: Post;
  /** 在專欄頁裡不需要重複顯示專欄名稱 */
  showCategory?: boolean;
  /** 標題層級：列表頁的 h1 下面用 h2，首頁等區塊標題下面用 h3 */
  headingLevel?: "h2" | "h3";
};

export function PostCard({ post, showCategory = true, headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex gap-5 border-b border-ink/10 py-7 first:pt-0 last:border-b-0">
      <div className="hidden shrink-0 sm:block">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            width={240}
            height={160}
            sizes="160px"
            className="h-28 w-40 rounded-lg border border-ink/10 object-cover"
          />
        ) : (
          <div className="flex h-28 w-40 items-center justify-center rounded-lg bg-paper-deep">
            <Image src={categoryIcon(post.category)} alt="" width={320} height={320} sizes="96px" className="h-24 w-24" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          {showCategory && (
            <span className="relative z-10 font-bold text-brand">{post.categoryInfo.name}</span>
          )}
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span>約 {post.readingMinutes} 分鐘</span>
          {post.draft && (
            <span className="rounded bg-caramel px-1.5 py-0.5 text-xs font-bold text-paper">草稿</span>
          )}
        </p>
        <Heading className="mt-2 text-xl font-bold leading-snug tracking-wide text-ink">
          {/* 整張卡片都可以點：連結的偽元素蓋住整個卡片 */}
          <Link href={post.url} className="after:absolute after:inset-0 group-hover:text-brand">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-2 leading-relaxed text-ink-muted">{post.description}</p>
      </div>
    </article>
  );
}
