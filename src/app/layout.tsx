import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOCHA Lab 鼠鼠特派員",
  description: "探索日常，發現知識。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant-TW" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
