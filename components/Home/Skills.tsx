'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SkillSet } from '@/type/skillSet';

interface SkillsProps {
  skillSet: SkillSet[];
}

export const Skills: React.FC<SkillsProps> = ({ skillSet }) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Bars Animation
      barsRef.current.forEach((bar, index) => {
        if (!bar) return;
        const fill = bar.querySelector('.progress-fill');
        const percent = bar.getAttribute('data-percent');

        gsap.fromTo(fill,
          { width: "0%" },
          {
            width: `${percent}%`,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="min-h-screen w-full py-32 px-6 md:px-24 bg-custom-navy text-white flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-serif leading-none">
            專業技能
          </h2>
          <p className="text-custom-white/60 text-sm mt-6 md:mt-0 max-w-xs text-right">
            結合行銷思維與工程邏輯<br />持續精進的全端技術棧
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {skillSet.map((skill, index) => (
            <div
              key={skill.name}
              ref={el => { barsRef.current[index] = el; }}
              data-percent={skill.level}
              className="group"
            >
              <div className="flex justify-between items-end mb-3 text-sm tracking-widest uppercase font-medium">
                <span className="group-hover:text-custom-orange transition-colors duration-300">{skill.name}</span>
                <span className="font-mono text-custom-gray">{skill.level}%</span>
              </div>

              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                <div className="progress-fill absolute top-0 left-0 h-full bg-custom-orange w-0"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col gap-5 items-center text-center">
          <p className="text-custom-white mb-6 text-base">歡迎與我聯繫</p>
          <a
            href="mailTo:poyuan510214@gmail.com"
            className="text-2xl md:text-3xl font-serif hover:text-custom-orange transition-colors duration-300 interactive"
          >
            poyuan510214@gmail.com
          </a>
          <div className="text-2xl md:text-3xl font-serif hover:text-custom-orange transition-colors duration-300 interactive">
            0972096129
          </div>
        </div>
      </div>
    </section>
  );
};