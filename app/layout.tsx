import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Layout/Navbar";
import { Footer } from "./components/Layout/Footer";

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
      <body>
        <div className="main-container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}