'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

const NAV_ITEMS = [
  { label: 'ABOUT', targetId: 'about' },
  { label: 'EXPERTISE', targetId: 'expertise' },
  { label: 'WORK', targetId: 'work' },
  { label: 'SKILLS', targetId: 'skills' },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .5 });

      tl.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
        .from(linksRef.current?.children || [], {
          y: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.5");
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      // Open Animation
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.fromTo(mobileLinksRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    } else {
      // Close Animation
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-[60] text-white mix-blend-difference backdrop-blur-lg border-b border-white/5 bg-custom-black/5"
      >
        <div
          ref={logoRef}
          onClick={() => router.push('/')}
          className="text-2xl font-bold tracking-tighter interactive cursor-pointer hover:text-custom-orange transition-colors duration-300"
        >
          Poyuan
        </div>

        {/* Desktop Menu */}
        <div ref={linksRef} className="hidden md:flex gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.targetId)}
              className="text-xs tracking-[0.2em] font-medium hover:text-custom-orange transition-colors relative group interactive"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-custom-orange transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-xs tracking-widest interactive z-[70] relative hover:text-custom-orange transition-colors"
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-custom-navy/95 backdrop-blur-xl z-[55] flex flex-col justify-center items-center opacity-0 pointer-events-none text-white"
      >
        <div ref={mobileLinksRef} className="flex flex-col items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.targetId)}
              className="text-4xl font-serif italic hover:text-custom-orange transition-colors interactive"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};