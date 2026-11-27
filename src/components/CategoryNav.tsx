import Link from "next/link";
import { categories, type CategorySlug } from "@/lib/categories";

/** 文章列表上方的專欄切換列 */
export function CategoryNav({ current }: { current?: CategorySlug }) {
  const base = "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-bold transition-colors";
  const active = "border-brand bg-brand text-paper";
  const idle = "border-ink/20 text-ink hover:border-brand hover:text-brand";

  return (
    <nav aria-label="專欄分類" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <ul className="flex gap-2 pb-1 md:flex-wrap">
        <li>
          <Link href="/journal/" className={`${base} ${current ? idle : active}`} aria-current={current ? undefined : "page"}>
            全部
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/journal/${c.slug}/`}
              className={`${base} ${current === c.slug ? active : idle}`}
              aria-current={current === c.slug ? "page" : undefined}
            >
              {c.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
