import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/Layout/Layout";
import { BackToTopButton } from "@/components/Layout/BackToTopButton";

export const metadata: Metadata = {
  title: "Poyuan",
  description: "Poyuan's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen flex flex-col">
        <div className="noise-overlay" />
        <Layout>
          {children}
        </Layout>
        <BackToTopButton />
      </body>
    </html>
  );
}