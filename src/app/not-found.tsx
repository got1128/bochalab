import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "找不到這一頁" };

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-20 text-center">
      <Image
        src="/images/characters/bobo-magnifier.webp"
        alt="波波拿著放大鏡四處尋找"
        width={640}
        height={696}
        className="h-auto w-56"
      />
      <p className="mt-6 font-mono text-sm tracking-widest text-ink-muted">404 NOT FOUND</p>
      <h1 className="mt-2 text-3xl font-bold tracking-wide">鼠鼠找不到這一頁</h1>
      <p className="mt-3 text-ink-muted">特派員拿著放大鏡找遍了，這個網址好像不存在。</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand px-6 py-3 font-bold text-paper transition-opacity hover:opacity-90"
      >
        回到首頁
      </Link>
    </section>
  );
}
