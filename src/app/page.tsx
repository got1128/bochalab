import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { PostTile } from "@/components/home/PostTile";
import { SectionHeader } from "@/components/home/SectionHeader";
import { books } from "@/data/bookshelf";
import { categories, categoryIcon } from "@/lib/categories";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { site } from "@/lib/site";

// 首頁六大區塊（CLAUDE.md §3.2）：
// 1 Hero／2 最新調查報告／3 六大專欄／4 閱讀書架／5 成長日記／6 鼠鼠通信

/* ---------- 1. Hero ---------- */

function Hero() {
  return (
    <section className="relative" aria-labelledby="hero-title">
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
        {/* 桌機：文字疊在插畫左側的空白相框裡 */}
        <div className="hidden md:absolute md:inset-y-0 md:left-[4%] md:flex md:w-[34%] md:flex-col md:justify-center">
          <HeroText id="hero-title" />
        </div>
      </div>
      {/* 手機：文字放在插畫下方 */}
      <div className="container-page py-10 md:hidden">
        <HeroText id="hero-title-mobile" />
      </div>
    </section>
  );
}

function HeroText({ id }: { id: string }) {
  // 桌機和手機各有一份文字，但每頁只能有一個 h1：桌機版用 h1，手機版用 p 呈現同樣樣式
  const Title = id === "hero-title" ? "h1" : "p";
  return (
    <div>
      <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">{site.name.toUpperCase()}</p>
      <Title id={id} className="mt-3 text-4xl font-bold leading-tight tracking-wide text-ink lg:text-5xl">
        探索日常，
        <br />
        發現知識。
      </Title>
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

/* ---------- 2. 最新調查報告 ---------- */

function LatestPosts() {
  const posts = getAllPosts().slice(0, 6);
  return (
    <section className="container-page mt-16 md:mt-24" aria-labelledby="latest-title">
      <SectionHeader
        id="latest-title"
        eyebrow="LATEST REPORTS"
        title="最新調查報告"
        link={posts.length ? { href: "/journal/", label: "看全部報告" } : undefined}
      />
      {posts.length ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.url}>
              <PostTile post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState message="第一篇調查報告即將出爐，鼠鼠正在努力查資料中！" />
      )}
    </section>
  );
}

/* ---------- 3. 六大專欄 ---------- */

function Columns() {
  return (
    <section className="container-page mt-16 md:mt-24" aria-labelledby="columns-title">
      <SectionHeader id="columns-title" eyebrow="COLUMNS" title="六大專欄" />
      <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/journal/${c.slug}/`}
              className="group flex h-full flex-col items-center rounded-xl border border-ink/10 bg-paper-deep/50 p-5 text-center transition-colors hover:border-brand hover:bg-paper-deep"
            >
              <Image src={categoryIcon(c.slug)} alt="" width={320} height={320} className="h-auto w-28 md:w-36" />
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

/* ---------- 4. 閱讀書架 ---------- */

function Bookshelf() {
  const shelf = books.slice(0, 4);
  return (
    <section className="container-page mt-16 md:mt-24" aria-labelledby="bookshelf-title">
      <SectionHeader
        id="bookshelf-title"
        eyebrow="BOOKSHELF"
        title="閱讀書架"
        description="鼠鼠最近在讀的書"
        link={{ href: "/journal/literature/", label: "文學通信" }}
      />
      <div className="mt-8 grid items-center gap-8 md:grid-cols-[220px_1fr]">
        <Image
          src="/images/characters/bobo-reading.webp"
          alt="波波戴著報童帽，坐著專心看一本藍色封面的書"
          width={640}
          height={658}
          className="mx-auto h-auto w-44 md:w-full"
        />
        {shelf.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {shelf.map((b) => (
              <li key={b.title} className="relative rounded-xl border border-ink/10 bg-paper-deep/50 p-5">
                <p className="text-sm font-bold text-ink-muted">{b.status === "reading" ? "正在讀" : "讀完了"}</p>
                <h3 className="mt-1 text-lg font-bold">
                  {b.article ? (
                    <Link href={b.article} className="after:absolute after:inset-0 hover:text-brand">
                      《{b.title}》
                    </Link>
                  ) : (
                    <>《{b.title}》</>
                  )}
                </h3>
                <p className="text-sm text-ink-muted">{b.author}</p>
                {b.note && <p className="mt-3 leading-relaxed">{b.note}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-ink/25 p-6 text-center text-ink-muted md:text-left">
            書架還空空的，波波正在挑第一本要分享的書。
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- 5. 成長日記 ---------- */

function Diary() {
  const posts = getPostsByCategory("diary").slice(0, 3);
  return (
    <section className="container-page mt-16 md:mt-24" aria-labelledby="diary-title">
      <SectionHeader
        id="diary-title"
        eyebrow="LEARNING JOURNAL"
        title="成長日記"
        description="幕後的學習與創作歷程"
        link={{ href: "/journal/diary/", label: "看全部日記" }}
      />
      {posts.length ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.url}>
              <PostTile post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-ink/25 p-6 text-center text-ink-muted">
          第一篇日記還在筆記本裡，整理好就會放上來。
        </p>
      )}
    </section>
  );
}

/* ---------- 6. 鼠鼠通信（電子報：第一版只放「即將推出」，不串接任何服務） ---------- */

function Newsletter() {
  return (
    <section className="container-page mt-16 md:mt-24" aria-labelledby="newsletter-title">
      <div className="grid items-center overflow-hidden rounded-2xl border border-ink/10 bg-paper-deep md:grid-cols-2">
        <Image
          src="/images/home/newsletter.webp"
          alt="茶茶揹著郵差包，開心地拿著一封蓋了封蠟的信，走向紅色信箱"
          width={960}
          height={720}
          sizes="(min-width: 768px) 540px, 100vw"
          className="h-full w-full object-cover"
        />
        <div className="p-8 md:p-10">
          <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">NEWSLETTER</p>
          <h2 id="newsletter-title" className="mt-1 text-2xl font-bold tracking-wide">
            鼠鼠通信
          </h2>
          <p className="mt-4 leading-relaxed">
            茶茶正在準備一份定期寄出的調查報告，把最新的發現直接送到你的信箱。
          </p>
          <p className="mt-6 inline-block rounded-full border-2 border-dashed border-brand px-5 py-2 font-bold text-brand">
            即將推出，敬請期待
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            想先跟鼠鼠打招呼？寫信到{" "}
            <a href={`mailto:${site.email}`} className="font-mono text-brand underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <LatestPosts />
      <Columns />
      <Bookshelf />
      <Diary />
      <Newsletter />
    </>
  );
}
