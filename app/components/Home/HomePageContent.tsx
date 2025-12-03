'use client'

import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero } from './Hero'
import { About } from './About'
import { Experience } from './Experience'
import { FeaturedProjects } from './FeaturedProjects'
import { Contact } from './Contact'
import { CustomCursor } from './CustomCursor'
import { Project } from '../../../type/project'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

interface HomePageContentProps {
  projects: Project[]
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  projects,
}) => {
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
        <Hero />
        <About />
        <Experience />
        <FeaturedProjects projects={projects} />
        <Contact />
      </main>
    </div>
  )
}