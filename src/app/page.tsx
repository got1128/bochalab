import Image from "next/image";
import Link from "next/link";
import { categories, categoryIcon } from "@/lib/categories";
import { site } from "@/lib/site";

// 首頁初版：Hero + 六大專欄入口。其他區塊在 §8 第 4 步補上。

function Hero() {
  return (
    <section className="relative">
      {/* 桌機：文字疊在插畫左側的空白相框裡 */}
      <div className="relative mx-auto max-w-[1600px]">
        <Image
          src="/images/home/hero.webp"
          alt="波波拿著放大鏡研究桌上的葉子標本，茶茶在一旁看書，兩隻天竺鼠都戴著報童帽，身後是書架和窗戶"
          width={1600}
          height={900}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
        <div className="hidden md:absolute md:inset-y-0 md:left-[4%] md:flex md:w-[34%] md:flex-col md:justify-center">
          <HeroText />
        </div>
      </div>
      {/* 手機：文字放在插畫下方 */}
      <div className="container-page py-10 md:hidden">
        <HeroText />
      </div>
    </section>
  );
}

function HeroText() {
  return (
    <div>
      <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">{site.name.toUpperCase()}</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight tracking-wide text-ink lg:text-5xl">
        探索日常，
        <br />
        發現知識。
      </h1>
      {/* caramel 只能用在 ≥24px 的字（text-2xl） */}
      <p className="mt-4 font-script text-2xl text-caramel">{site.taglineEn}</p>
      <p className="mt-5 leading-relaxed text-ink lg:text-lg">
        Wheek！我們是鼠鼠特派員波波與茶茶，每天出門調查生活裡值得好奇的小事。
      </p>
      <Link
        href="/journal/"
        className="mt-7 inline-block rounded-full bg-brand px-6 py-3 font-bold text-paper transition-opacity hover:opacity-90"
      >
        閱讀調查報告
      </Link>
    </div>
  );
}

function Columns() {
  return (
    <section className="container-page mt-16 md:mt-24" aria-labelledby="columns-title">
      <div className="rule-double pb-3">
        <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">COLUMNS</p>
        <h2 id="columns-title" className="mt-1 text-2xl font-bold tracking-wide">
          六大專欄
        </h2>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/journal/${c.slug}/`}
              className="group flex h-full flex-col items-center rounded-xl border border-ink/10 bg-paper-deep/50 p-5 text-center transition-colors hover:border-brand hover:bg-paper-deep"
            >
              <Image
                src={categoryIcon(c.slug)}
                alt=""
                width={320}
                height={320}
                className="h-auto w-28 md:w-36"
              />
              <span className="mt-3 font-serif text-xs tracking-widest text-ink-muted">{c.nameEn}</span>
              <span className="mt-1 font-bold text-ink group-hover:text-brand md:text-lg">{c.name}</span>
              <span className="mt-1 text-sm text-ink-muted">{c.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Columns />
    </>
  );
}
