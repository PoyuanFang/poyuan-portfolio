'use client'

import React from 'react'
import { CustomCursor } from '@/components/Home/CustomCursor';
import { AllProjects } from '@/components/Projects/AllProjects';


export default function project() {
  return (
    <div className="relative min-h-screen text-custom-black font-sans overflow-hidden selection:bg-custom-orange selection:text-white">
      {/* Global Grain Texture */}
      <div className="noise-overlay" />

      {/* Ambient Background Light (Fixed behind content) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-custom-blue/15 rounded-full blur-[120px] opacity-60 mix-blend-screen animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-custom-orange/10 rounded-full blur-[120px] opacity-60 mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
      </div>

      <CustomCursor />

      <main className="relative w-full z-10">
        <AllProjects />
      </main>
    </div>
  )
}
