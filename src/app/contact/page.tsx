import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "聯絡鼠鼠特派員",
  description: `合作邀約、內容勘誤或想跟鼠鼠說說話，都歡迎寫信到 ${site.email}，也可以在 Instagram 和 Threads 找到我們。`,
  path: "/contact/",
});

// 聯絡頁：直接用 mailto，不做表單（CLAUDE.md §3.1）

const topics = [
  { title: "合作邀約", body: "插畫、知識圖卡、文章或其他合作想法，請簡單說明需求和時程。" },
  { title: "內容勘誤", body: "發現文章有錯誤或資料過期，請告訴鼠鼠是哪一篇、哪一段，最好附上資料來源。" },
  { title: "讀者來信", body: "想推薦調查主題、分享你的發現，或只是想打聲招呼，都很歡迎。" },
];

export default function ContactPage() {
  const mailto = `mailto:${site.email}`;

  return (
    <div className="container-page py-12 md:py-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">CONTACT</p>
          <h1 className="mt-1 text-3xl font-bold tracking-wide md:text-4xl">聯絡鼠鼠特派員</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            有任何想法，都可以寫信給特派員總部。茶茶會把信送到，鼠鼠會盡快回覆。
          </p>

          <a
            href={mailto}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand px-6 py-4 font-bold text-paper transition-opacity hover:opacity-90"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            寫信給鼠鼠
          </a>
          <p className="mt-4 text-ink-muted">
            或直接寄到 <span className="select-all font-mono text-ink">{site.email}</span>
          </p>
          <p className="mt-6 text-ink-muted">也可以在社群找到鼠鼠：</p>
          <ul className="mt-2 flex flex-wrap gap-3">
            {site.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border-2 border-brand px-4 py-1.5 font-bold text-brand transition-colors hover:bg-brand hover:text-paper"
                >
                  {s.name} <span className="font-mono font-normal">{s.handle}</span>
                  <span className="sr-only">（另開新視窗）</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Image
          src="/images/home/newsletter.webp"
          alt="茶茶揹著郵差包，開心地拿著一封蓋了封蠟的信，走向紅色信箱"
          width={960}
          height={720}
          priority
          sizes="(min-width: 768px) 500px, 100vw"
          className="h-auto w-full rounded-2xl border border-ink/10"
        />
      </div>

      <section className="mt-16 md:mt-20" aria-labelledby="topics-title">
        <h2 id="topics-title" className="rule-double pb-3 text-2xl font-bold tracking-wide">
          可以寫信聊這些
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {topics.map((t) => (
            <li key={t.title} className="rounded-2xl border border-ink/10 bg-paper-deep/50 p-6">
              <h3 className="font-bold">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
