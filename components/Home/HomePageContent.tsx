'use client'

import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero } from './Hero'
import { About } from './About'
import { ExperienceComponent } from './Experience'
import { FeaturedProjects } from './FeaturedProjects'
import { Skills } from './Skills'
import { CustomCursor } from './CustomCursor'
import { Project } from '@/type/project'
import { Experience } from '@/type/experience'
import { SkillSet } from '@/type/skillSet'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

interface HomePageContentProps {
  projects: Project[],
  experience: Experience[],
  skillSet: SkillSet[]
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  projects, experience, skillSet
}) => {
  return (
    <div className="w-full relative min-h-screen text-custom-black font-sans overflow-hidden selection:bg-custom-orange selection:text-white">

      {/* Ambient Background Light (Fixed behind content) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-custom-blue/15 rounded-full blur-[120px] opacity-60 mix-blend-screen animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-custom-orange/10 rounded-full blur-[120px] opacity-60 mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
      </div>

      <CustomCursor />

      <main className="relative w-full z-10">
        <Hero />
        <About />
        <ExperienceComponent experience={experience} />
        <FeaturedProjects projects={projects} />
        <Skills skillSet={skillSet} />
      </main>
    </div>
  )
}