
'use client'
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Home/Hero';
import { About } from './components/Home/About';
import { Experience } from './components/Home/Experience';
import { FeaturedProjects } from './components/Home/FeaturedProjects';
import { Contact } from './components/Home/Contact';
import { CustomCursor } from './components/Home/CustomCursor';
import { Loader } from './components/Loader';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading time for the loader animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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

      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <main className="relative w-full z-10">
          <Hero />
          <About />
          <Experience />
          <FeaturedProjects />
          <Contact />
        </main>
      )}
    </div>
  );
};

export default App;