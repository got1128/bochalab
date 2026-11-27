import Image from "next/image";
import Link from "next/link";
import { mainNav, site } from "@/lib/site";

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} ${site.nameZh} 首頁`}>
      <Image
        src="/images/brand/logo-mark.webp"
        alt=""
        width={192}
        height={134}
        priority
        className="h-10 w-auto md:h-12"
      />
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg font-bold tracking-wide text-ink md:text-xl">
          {site.name}
        </span>
        <span className="text-xs tracking-[0.3em] text-ink-muted">{site.nameZh}</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="rule-double bg-paper">
      <div className="container-page flex h-18 items-center justify-between md:h-20">
        <Logo />

        {/* 桌機版選單 */}
        <nav aria-label="主選單" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] font-bold tracking-wider text-ink underline-offset-8 transition-colors hover:text-brand hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 手機版選單：用 <details> 做開合，不需要 JavaScript */}
        <details className="group relative md:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full text-ink hover:bg-paper-deep [&::-webkit-details-marker]:hidden">
            <span className="sr-only">開啟選單</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="group-open:hidden">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="hidden group-open:block">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </summary>
          <nav
            aria-label="主選單"
            className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-ink/15 bg-paper p-2 shadow-lg"
          >
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-4 py-3 font-bold text-ink hover:bg-paper-deep hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
