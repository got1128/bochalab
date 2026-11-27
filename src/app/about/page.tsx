import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "關於鼠鼠特派員",
  description:
    "BOCHA Lab 鼠鼠特派員是以兩隻天竺鼠波波與茶茶為主角的知識內容品牌，用插畫、知識圖卡和文章，分享日常生活中值得探索的知識。",
  path: "/about/",
});

// 兩位特派員的介紹。
// 【待補】個性、喜歡的食物、口頭禪等，請創作者補上真實的內容（不要用猜的）。
const reporters = [
  {
    name: "波波",
    nameEn: "Bobo",
    avatar: "/images/characters/bobo-avatar.webp",
    avatarAlt: "波波的頭像：戴著報童帽，黑白毛色，臉頰有一塊焦糖色",
    looks: "黑色的毛比較多，臉頰有一塊焦糖色，鼻樑上有一條白色的線。",
    // 【待補】例如：「最喜歡拿著放大鏡到處調查」
    traits: ["是一隻大隻鼠","對吃的很主動","帥氣的乖乖鼠"] as string[],
  },
  {
    name: "茶茶",
    nameEn: "Cha Cha",
    avatar: "/images/characters/chacha-avatar.webp",
    avatarAlt: "茶茶的頭像：戴著報童帽，白色的毛比較多，一側眼睛周圍是深咖啡色",
    looks: "白色的毛比較多，身上帶著橘咖啡色和黑色的花紋。",
    // 【待補】
    traits: ["是一隻英俊鼠","瀏海看起來很有戲","優雅的內向鼠"] as string[],
  },
];

// 調查守則：來自內容原則（CLAUDE.md §7），讓讀者知道鼠鼠怎麼做功課
const principles = [
  { title: "每篇都附資料來源", body: "調查報告的最後都會列出參考來源，你可以自己點進去確認。" },
  { title: "認真查證，不裝懂", body: "不確定的事情會直接說不確定，查到新資料就更新文章。" },
  { title: "用生活的例子說明", body: "把看起來很難的知識，換成每天都會遇到的情境。" },
];

export default function AboutPage() {
  return (
    <>
      {/* 開頭 */}
      <section className="container-page pt-12 md:pt-16">
        <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">ABOUT US</p>
        <h1 className="mt-1 text-3xl font-bold tracking-wide md:text-4xl">關於鼠鼠特派員</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {`Wheek！我們是 ${site.name}，中文叫「${site.nameZh}」。兩隻戴著報童帽的天竺鼠，每天出門調查生活裡值得好奇的小事。`}
        </p>
        <Image
          src="/images/about/bobo-chacha-desk.webp"
          alt="波波和茶茶戴著報童帽坐在書桌前，波波拿著筆開心地說話，茶茶托著下巴聽，桌上攤著調查筆記和放大鏡"
          width={1600}
          height={900}
          priority
          sizes="(min-width: 1080px) 1016px, 100vw"
          className="mt-10 h-auto w-full rounded-2xl border border-ink/10"
        />
      </section>

      {/* 品牌故事 */}
      <section className="container-page mt-16 md:mt-24" aria-labelledby="story-title">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_340px]">
          <div className="max-w-[40em] text-[1.0625rem] leading-[1.85]">
            <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">OUR STORY</p>
            <h2 id="story-title" className="mt-1 text-2xl font-bold tracking-wide">
              探索日常，發現知識。
            </h2>
            <p className="mt-5">
              {site.name} 是一個用插畫、知識圖卡和文章分享知識的小品牌。我們相信，日常生活裡藏著很多值得好奇的事：網址是怎麼找到網站的？書裡那句話為什麼讓人記這麼久？家裡漏水到樓下該怎麼辦？
            </p>
            <p className="mt-4">
              社群平台上的圖卡是我們的「快報」，這個網站則是鼠鼠特派員的總部，存放每一份完整的調查報告。
            </p>
            <p className="mt-4 font-script text-2xl text-caramel">{site.taglineEn}</p>
          </div>
          <Image
            src="/images/about/brand-intro.webp"
            alt="波波拿著筆記本和筆，茶茶從郵差包裡探出頭，兩隻都戴著報童帽，桌上有地圖、放大鏡和筆電"
            width={960}
            height={1200}
            sizes="340px"
            className="mx-auto h-auto w-full max-w-xs rounded-2xl border border-ink/10 md:max-w-none"
          />
        </div>
      </section>

      {/* 兩位特派員 */}
      <section className="container-page mt-16 md:mt-24" aria-labelledby="reporters-title">
        <div className="rule-double pb-3">
          <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">THE REPORTERS</p>
          <h2 id="reporters-title" className="mt-1 text-2xl font-bold tracking-wide">
            兩位特派員
          </h2>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {reporters.map((r) => (
            <li key={r.name} className="flex gap-5 rounded-2xl border border-ink/10 bg-paper-deep/50 p-6">
              <Image src={r.avatar} alt={r.avatarAlt} width={320} height={320} className="h-24 w-24 shrink-0 md:h-28 md:w-28" />
              <div>
                <h3 className="text-xl font-bold">
                  {r.name}
                  <span className="ml-2 font-serif text-base font-normal text-ink-muted">{r.nameEn}</span>
                </h3>
                <p className="mt-2 leading-relaxed">{r.looks}</p>
                {r.traits.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-muted">
                    {r.traits.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 p-6">
            <h3 className="font-bold">名字的由來</h3>
            <p className="mt-2 leading-relaxed text-ink-muted">
              <span className="font-serif font-bold text-ink">BO</span>（波波）＋
              <span className="font-serif font-bold text-ink">CHA</span>（茶茶）＝{" "}
              <span className="font-serif font-bold text-ink">BOCHA</span>。兩隻特派員的原型，是住在創作者家裡的真實天竺鼠。
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 p-6">
            <h3 className="font-bold">是天竺鼠，不是倉鼠</h3>
            <p className="mt-2 leading-relaxed text-ink-muted">
              天竺鼠（guinea pig）沒有尾巴、沒有頰囊，腳短短的，身體圓滾滾。
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 p-6">
            <h3 className="font-bold">Wheek wheek！</h3>
            <p className="mt-2 leading-relaxed text-ink-muted">
              這是天竺鼠的叫聲。開心的時候，牠們還會原地彈跳，叫做「popcorning」。
            </p>
          </div>
        </div>
      </section>

      {/* 調查守則 */}
      <section className="container-page mt-16 md:mt-24" aria-labelledby="principles-title">
        <div className="rule-double pb-3">
          <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">OUR PROMISE</p>
          <h2 id="principles-title" className="mt-1 text-2xl font-bold tracking-wide">
            鼠鼠的調查守則
          </h2>
        </div>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title}>
              <p className="font-serif text-3xl font-bold text-caramel">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-bold">{p.title}</h3>
              <p className="mt-1 leading-relaxed text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-ink-muted">
          發現文章有錯？歡迎寫信告訴鼠鼠：
          <a href={`mailto:${site.email}`} className="font-mono text-brand underline underline-offset-4">
            {site.email}
          </a>
        </p>
      </section>

      {/* 專欄入口 */}
      <section className="container-page mt-16 md:mt-24" aria-labelledby="explore-title">
        <div className="rounded-2xl bg-ink px-6 py-10 text-center text-paper md:px-10">
          <h2 id="explore-title" className="text-2xl font-bold tracking-wide">
            從哪一份調查開始讀？
          </h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/journal/${c.slug}/`}
                  className="inline-block rounded-full border border-paper/40 px-4 py-2 font-bold transition-colors hover:bg-paper hover:text-ink"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
