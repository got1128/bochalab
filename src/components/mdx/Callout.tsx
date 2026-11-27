import type { ReactNode } from "react";

const variants = {
  // 鼠鼠小補充：補充知識、延伸說明
  note: { label: "鼠鼠小補充", icon: "✎", box: "border-brand bg-brand/5", title: "text-brand" },
  // 鼠鼠提醒：要注意的事、常見誤解
  warning: { label: "鼠鼠提醒", icon: "!", box: "border-caramel bg-caramel/10", title: "text-ink" },
  // Wheek！鼠鼠發現：重點結論、有趣發現
  discovery: { label: "Wheek！鼠鼠發現", icon: "★", box: "border-blush bg-blush/15", title: "text-ink" },
} as const;

type Props = {
  type?: keyof typeof variants;
  title?: string;
  children: ReactNode;
};

/**
 * 文章裡的提示框。MDX 寫法：
 *
 * <Callout>預設是「鼠鼠小補充」</Callout>
 * <Callout type="warning">鼠鼠提醒</Callout>
 * <Callout type="discovery" title="自訂標題">……</Callout>
 */
export function Callout({ type = "note", title, children }: Props) {
  const v = variants[type] ?? variants.note;
  return (
    <aside className={`callout my-8 rounded-r-lg border-l-4 px-5 py-4 ${v.box}`}>
      <p className={`flex items-start gap-2 font-bold ${v.title}`}>
        <span aria-hidden="true" className="font-mono">
          {v.icon}
        </span>
        {title ?? v.label}
      </p>
      <div className="callout-body mt-2">{children}</div>
    </aside>
  );
}
