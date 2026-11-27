import Link from "next/link";
import { categories } from "@/lib/categories";
import { mainNav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl font-bold tracking-wide">{site.name}</p>
          <p className="mt-1 tracking-[0.3em] text-paper/80">{site.nameZh}</p>
          <p className="mt-5 leading-relaxed">{site.tagline}</p>
          <p className="font-script text-xl text-paper/80">{site.taglineEn}</p>
        </div>

        <nav aria-label="專欄">
          <h2 className="text-sm font-bold tracking-widest text-paper/80">六大專欄</h2>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/journal/${c.slug}/`} className="hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="網站資訊">
          <h2 className="text-sm font-bold tracking-widest text-paper/80">特派員總部</h2>
          <ul className="mt-4 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="font-mono text-sm hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-paper/20">
        <p className="container-page py-5 text-sm text-paper/80">
          © {year} {site.name} {site.nameZh}. Wheek wheek!
        </p>
      </div>
    </footer>
  );
}
