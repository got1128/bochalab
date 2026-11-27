import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { categories, getCategory } from "@/lib/categories";

// 專欄頁（佔位版）。§8 第 3 步會換成文章列表。

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  return c ? { title: c.name, description: `${c.name}：${c.description}` } : {};
}

export default async function CategoryPage({ params }: PageProps<"/journal/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return <ComingSoon title={c.name} message={`${c.description}。第一批調查報告整理中，敬請期待！`} />;
}
