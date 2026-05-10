import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CS Notes",
    template: "%s | CS Notes",
  },
  description: "공부한 것을 오래 남기기 위한 기술 노트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen">
          <SiteHeader />
          {children}
          <footer className="mx-auto w-[min(calc(100%_-_32px),960px)] border-t border-border py-7 text-sm text-muted">
            오늘 이해한 것을 내일 다시 설명할 수 있도록 기록합니다.
          </footer>
        </div>
      </body>
    </html>
  );
}
