import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  message?: string;
};

/** 還沒完成的頁面先用這個佔位，之後的步驟會換成正式內容。 */
export function ComingSoon({ title, message = "鼠鼠特派員正在努力整理中，敬請期待！" }: Props) {
  return (
    <section className="container-page flex flex-col items-center py-20 text-center">
      <Image
        src="/images/characters/bobo-notes.webp"
        alt="波波戴著報童帽，坐著在筆記本上寫字"
        width={640}
        height={677}
        className="h-auto w-56"
      />
      <h1 className="mt-6 text-3xl font-bold tracking-wide">{title}</h1>
      <p className="mt-3 text-ink-muted">{message}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand px-6 py-3 font-bold text-paper transition-opacity hover:opacity-90"
      >
        回到首頁
      </Link>
    </section>
  );
}
