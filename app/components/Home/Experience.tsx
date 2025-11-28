'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const history = [
  { year: '2024', role: '前端實習工程師', company: '綠擊掌數位' },
  { year: '2023', role: '前端工程師培訓養成班', company: 'ISPAN 資展國際' },
  { year: '2022 - 2023', role: '品保工程師', company: '鑫惟科技' },
  { year: '2021 - 2022', role: '活動企劃', company: '銓蔚整合行銷' },
  { year: '2018 - 2020', role: '美編企劃工讀', company: '台灣芝寶' },
  { year: '2016 - 2020', role: '資訊傳播學士', company: '淡江大學' },
];

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        const line = row.querySelector('.separator');
        const textItems = row.querySelectorAll('.text-reveal');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        });

        // Animate line width
        tl.fromTo(line,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1, ease: "expo.out" }
        );

        // Animate text elements
        tl.fromTo(textItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          "-=0.6"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-24 bg-custom-black text-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <h2 className="text-3xl md:text-5xl font-serif text-white">個人經歷</h2>
        <span className="text-xs text-custom-orange tracking-widest uppercase mt-4 md:mt-0 font-medium">Experience & Education</span>
      </div>

      <div className="flex flex-col">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 text-xs tracking-widest text-custom-gray uppercase border-b border-custom-border/20 mb-8">
          <div className="col-span-3">Year</div>
          <div className="col-span-5">Role</div>
          <div className="col-span-4 text-right">Company</div>
        </div>

        {/* Data Rows */}
        {history.map((item, index) => (
          <div
            key={index}
            ref={el => { rowsRef.current[index] = el; }}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-8 items-center interactive cursor-default transition-colors duration-300"
          >
            {/* Animated Separator Line */}
            <div className="separator absolute top-0 left-0 w-full h-[1px] bg-custom-border/20 group-hover:bg-custom-orange transition-colors duration-300"></div>

            <div className="col-span-3 text-sm md:text-base text-custom-gray group-hover:text-custom-orange transition-colors duration-300 font-mono overflow-hidden">
              <div className="text-reveal">{item.year}</div>
            </div>

            <div className="col-span-5 text-xl md:text-2xl font-serif overflow-hidden">
              <div className="text-reveal">{item.role}</div>
            </div>

            <div className="col-span-4 text-left md:text-right text-xs md:text-sm tracking-widest text-custom-gray group-hover:text-white transition-colors duration-300 overflow-hidden">
              <div className="text-reveal">{item.company}</div>
            </div>
          </div>
        ))}

        {/* Bottom Line */}
        <div className="w-full h-[1px] bg-custom-border/20"></div>
      </div>
    </section>
  );
};