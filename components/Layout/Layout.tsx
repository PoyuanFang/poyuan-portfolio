'use client';

import React from 'react'
import { usePathname } from 'next/navigation';

import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // 檢查當前路徑是否為 Sanity Studio 路由
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');
  // Sanity Studio 是一個全螢幕應用，有自己的導覽。
  // 為了避免版面衝突並提供乾淨的編輯體驗，在這些路由上完全不渲染網站的導覽列。
  if (isStudioRoute) {
    // 對於 Studio 路由，只渲染頁面內容本身（即 Sanity Studio），
    // 而不包含網站的導覽列和頁尾。
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex">{children}</main>
      <Footer />
    </>
  )
}
