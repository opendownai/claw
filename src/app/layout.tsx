import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "DownClaw - opendown.ai",
  description: "开源的个人 AI 助手，在自己电脑上运行，数据本地存储，支持多渠道接入",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f5f5f7] text-[#1d1d1f] font-sans">
      <Header />
      <main>{children}</main>
      </body>
    </html>
  );
}