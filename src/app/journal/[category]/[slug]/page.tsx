import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/components";
import { PostCard } from "@/components/PostCard";
import { formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";

export const dynamicParams = false;

// 佔位參數：還沒有任何已發布文章時，靜態輸出不允許回傳空陣列，
// 所以先產生一個不存在的頁面（會顯示 404），有文章後就不會用到。
const PLACEHOLDER = { category: "digital", slug: "__no-posts-yet" };

export function generateStaticParams() {
  const params = getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
  return params.length ? params : [PLACEHOLDER];
}

export async function generateMetadata({ params }: PageProps<"/journal/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: PageProps<"/journal/[category]/[slug]">) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const c = post.categoryInfo;

  return (
    <article className="container-page py-10 md:py-16">
      <div className="mx-auto max-w-[42.5rem]">
      {/* 麵包屑 */}
      <nav aria-label="麵包屑" className="text-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/journal/" className="hover:text-brand hover:underline">
              調查報告
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/journal/${c.slug}/`} className="hover:text-brand hover:underline">
              {c.name}
            </Link>
          </li>
        </ol>
      </nav>

      <header className="mt-6 max-w-[40em] text-[1.0625rem]">
        {post.draft && (
          <p className="mb-4 inline-block rounded bg-caramel px-2 py-1 text-sm font-bold text-paper">
            草稿：只在本機預覽出現，不會發布到正式網站
          </p>
        )}
        <h1 className="text-3xl font-bold leading-snug tracking-wide md:text-4xl md:leading-snug">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{post.description}</p>
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
          <span>
            發布於{" "}
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </span>
          {post.updated && post.updated !== post.date && (
            <span>
              更新於{" "}
              <time dateTime={post.updated}>
                {formatDate(post.updated)}
              </time>
            </span>
          )}
          <span>閱讀時間約 {post.readingMinutes} 分鐘</span>
        </p>
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="標籤">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full bg-paper-deep px-3 py-1 text-sm text-ink-muted">
                #{t}
              </li>
            ))}
          </ul>
        )}
      </header>

      {post.cover && (
        <Image
          src={post.cover}
          alt={post.coverAlt ?? ""}
          width={1600}
          height={900}
          priority
          className="mt-8 h-auto w-full max-w-[40em] rounded-xl border border-ink/10 text-[1.0625rem]"
        />
      )}

      <div className="prose-bocha mt-10 border-t border-ink/15 pt-8">
        <MDXRemote source={post.body} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      <footer className="mt-16 max-w-[40em] space-y-12 text-[1.0625rem]">
        {post.sources.length > 0 && (
          <section aria-labelledby="sources-title" className="rounded-xl bg-paper-deep/60 p-6">
            <h2 id="sources-title" className="font-bold">
              參考來源
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.9375rem] leading-relaxed">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-brand underline underline-offset-4 hover:decoration-2"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related-title">
            <h2 id="related-title" className="rule-double pb-2 text-xl font-bold">
              同專欄的其他報告
            </h2>
            <div className="mt-6">
              {related.map((p) => (
                <PostCard key={p.url} post={p} showCategory={false} headingLevel="h3" />
              ))}
            </div>
          </section>
        )}

        <Link
          href={`/journal/${c.slug}/`}
          className="inline-block rounded-full border-2 border-brand px-6 py-3 font-bold text-brand transition-colors hover:bg-brand hover:text-paper"
        >
          ← 回到{c.name}
        </Link>
      </footer>
      </div>
    </article>
  );
}
