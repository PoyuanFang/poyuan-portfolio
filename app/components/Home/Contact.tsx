'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const skillSet = [
  { name: "React / Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "HTML / CSS / Tailwind", level: 95 },
  { name: "GSAP / Animations", level: 80 },
  { name: "Git / GitHub", level: 85 },
  { name: "Node.js / SQL", level: 70 },
  { name: "跨部門溝通 (Communication)", level: 90 },
  { name: "品質保證 (QA/Testing)", level: 95 },
];

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col items-center text-center">
          <p className="text-custom-white mb-6 text-sm">歡迎與我聯繫</p>
          <a
            href="mailto:example@email.com"
            className="text-2xl md:text-4xl font-serif hover:text-custom-orange transition-colors duration-300 interactive"
          >
            poyuan510214@gmail.com
            <br />
            0972096129
          </a>
        </div>
      </div>
    </section>
  );
};