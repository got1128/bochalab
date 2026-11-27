import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "關於鼠鼠" };

export default function AboutPage() {
  return <ComingSoon title="關於鼠鼠" />;
}
