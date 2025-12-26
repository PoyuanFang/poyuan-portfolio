'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Experience } from '@/type/experience';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoIosArrowDown } from "react-icons/io";

import { PortableText } from '@portabletext/react'
import PortableTextComponents from '@/components/Utils/PortableTextComponents'
interface ExperienceComponentProps {
  experience: Experience[];
}

export const ExperienceComponent: React.FC<ExperienceComponentProps> = ({ experience }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    const newActiveIndex = activeIndex === index ? null : index;

    // Close the currently open item
    if (activeIndex !== null) {
      const content = itemRefs.current[activeIndex]?.querySelector('.accordion-content');
      if (content) {
        gsap.to(content, { height: 0, duration: 0.4, ease: 'power2.inOut' });
      }
    }

    // Open the new item
    if (newActiveIndex !== null) {
      const content = itemRefs.current[newActiveIndex]?.querySelector('.accordion-content');
      if (content) {
        gsap.to(content, { height: 'auto', duration: 0.6, ease: 'expo.out' });
      }
    }

    setActiveIndex(newActiveIndex);
  };

  return (
    <section id="experience" ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-24 bg-custom-black text-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <h2 className="text-3xl md:text-5xl font-serif text-white">個人經歷</h2>
        <span className="text-xs text-custom-orange tracking-widest uppercase mt-4 md:mt-0 font-medium">Experience & Education</span>
      </div>

      <div className="flex flex-col border-t border-custom-border/20">
        {experience.map((item, index) => (
          <div
            key={index}
            ref={el => { itemRefs.current[index] = el; }}
            className="accordion-item border-b border-custom-border/20 group"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center py-8 text-left gap-4 interactive"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 w-full items-center">
                <div className="col-span-3 text-sm md:text-base text-custom-gray group-hover:text-custom-orange transition-colors duration-300 font-mono">{item.year}</div>
                <div className="col-span-5 text-xl md:text-2xl font-serif group-hover:text-white transition-colors duration-300">{item.role}</div>
                <div className="col-span-4 text-left md:text-right text-xs md:text-sm tracking-widest text-custom-gray group-hover:text-white transition-colors duration-300">{item.company}</div>
              </div>
              <div className="flex-shrink-0 text-custom-gray group-hover:text-custom-orange transition-colors duration-300">
                <IoIosArrowDown
                  size={20}
                  className={`transition-transform duration-500 ease-out ${activeIndex === index ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            <div className="accordion-content h-0 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 w-full">
                <div className="md:col-start-4 md:col-span-9 pb-8 text-custom-white/70 text-sm leading-relaxed">
                  <PortableText value={item.description} components={PortableTextComponents} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};