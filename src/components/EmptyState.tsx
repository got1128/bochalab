import Image from "next/image";

/** 專欄還沒有文章時顯示 */
export function EmptyState({ message = "第一批調查報告整理中，敬請期待！" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <Image
        src="/images/characters/bobo-notes.webp"
        alt="波波戴著報童帽，坐著在筆記本上寫字"
        width={640}
        height={677}
        sizes="160px"
        className="h-auto w-40"
      />
      <p className="mt-4 text-ink-muted">{message}</p>
    </div>
  );
}
