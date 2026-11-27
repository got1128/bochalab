import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "聯絡" };

export default function ContactPage() {
  return <ComingSoon title="聯絡鼠鼠特派員" message={`合作邀約請寫信到 ${site.email}`} />;
}
