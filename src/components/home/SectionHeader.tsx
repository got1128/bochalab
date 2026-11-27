import Link from "next/link";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
};

/** 首頁各區塊的標題列：英文小標＋中文標題＋右側「看全部」連結 */
export function SectionHeader({ id, eyebrow, title, description, link }: Props) {
  return (
    <div className="rule-double flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-3">
      <div>
        <p className="font-serif text-sm tracking-[0.25em] text-ink-muted">{eyebrow}</p>
        <h2 id={id} className="mt-1 text-2xl font-bold tracking-wide">
          {title}
        </h2>
        {description && <p className="mt-1 text-ink-muted">{description}</p>}
      </div>
      {link && (
        <Link href={link.href} className="pb-1 font-bold text-brand underline-offset-4 hover:underline">
          {link.label} →
        </Link>
      )}
    </div>
  );
}
