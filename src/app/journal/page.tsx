import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "調查報告" };

export default function JournalPage() {
  return <ComingSoon title="調查報告" />;
}
