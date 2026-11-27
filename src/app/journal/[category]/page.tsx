import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/CategoryNav";
import { EmptyState } from "@/components/EmptyState";
import { PostCard } from "@/components/PostCard";
import { categories, categoryIcon, getCategory } from "@/lib/categories";
import { pageMetadata } from "@/lib/seo";
import { getPostsByCategory } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({
    title: c.name,
    description: `${c.name}（${c.nameEn}）：${c.description}。`,
    path: `/journal/${c.slug}/`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/journal/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const posts = getPostsByCategory(c.slug);

  return (
    <div className="container-page py-12 md:py-16">
      <header className="rule-double flex items-center gap-5 pb-6">
        <Image src={categoryIcon(c.slug)} alt="" width={320} height={320} sizes="112px" className="h-20 w-20 shrink-0 md:h-28 md:w-28" />
        <div>
          <p className="font-serif text-sm tracking-[0.2em] text-ink-muted">{c.nameEn.toUpperCase()}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-wide md:text-4xl">{c.name}</h1>
          <p className="mt-2 text-ink-muted">{c.description}</p>
        </div>
      </header>

      <div className="mt-6">
        <CategoryNav current={c.slug} />
      </div>

      <div className="mt-10 max-w-3xl">
        {posts.length ? (
          posts.map((p) => <PostCard key={p.url} post={p} showCategory={false} />)
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
