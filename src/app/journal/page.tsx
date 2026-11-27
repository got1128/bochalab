import type { Metadata } from "next";
import { CategoryNav } from "@/components/CategoryNav";
import { EmptyState } from "@/components/EmptyState";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "調查報告",
  description: "鼠鼠特派員的所有調查報告：數位、文學、冷知識、成長日記、生活觀察與大人知識。",
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <div className="container-page py-12 md:py-16">
      <header className="rule-double pb-6">
        <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">JOURNAL</p>
        <h1 className="mt-1 text-3xl font-bold tracking-wide md:text-4xl">調查報告</h1>
        <p className="mt-3 text-ink-muted">鼠鼠特派員出門調查回來的所有報告，新的在最前面。</p>
      </header>

      <div className="mt-6">
        <CategoryNav />
      </div>

      <div className="mt-10 max-w-3xl">
        {posts.length ? posts.map((p) => <PostCard key={p.url} post={p} />) : <EmptyState />}
      </div>
    </div>
  );
}
