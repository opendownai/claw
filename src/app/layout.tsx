import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { I18nProvider } from "@/lib/i18n-context";

export const metadata: Metadata = {
  title: "DownClaw - opendown.ai",
  description: "Open source personal AI assistant, runs locally, supports multiple messaging channels",
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#f5f5f7] text-[#1d1d1f] font-sans">
        <I18nProvider>
          <Header />
          <main>{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}