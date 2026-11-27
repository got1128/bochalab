import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "找不到這一頁" };

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-14 text-center md:py-20">
      <Image
        src="/images/characters/bobo-lost.webp"
        alt="波波戴著報童帽站在岔路口，攤開地圖一臉困惑，頭上冒出問號"
        width={960}
        height={720}
        className="h-auto w-full max-w-md rounded-2xl border border-ink/10 shadow-sm"
      />
      <p className="mt-8 font-mono text-sm tracking-widest text-ink-muted">404 NOT FOUND</p>
      <h1 className="mt-2 text-3xl font-bold tracking-wide">鼠鼠迷路了</h1>
      <p className="mt-3 text-ink-muted">特派員翻遍了地圖，還是找不到這一頁。可能是網址打錯，或是這篇報告搬家了。</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand px-6 py-3 font-bold text-paper transition-opacity hover:opacity-90"
        >
          回到首頁
        </Link>
        <Link
          href="/journal/"
          className="rounded-full border-2 border-brand px-6 py-3 font-bold text-brand transition-colors hover:bg-brand hover:text-paper"
        >
          看看調查報告
        </Link>
      </div>
    </section>
  );
}
