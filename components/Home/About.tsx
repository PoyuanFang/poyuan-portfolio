'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pinning the text section while background shifts
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        },
        onLeaveBack: () => {
          gsap.to(textRef.current, { opacity: 0.5, y: 50, duration: 1 });
        }
      });

      // Highlight text animation
      gsap.to(highlightRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
        color: "#f04933", // custom-orange
        textShadow: "0 0 10px rgba(240,73,51,0.3)",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full py-32 px-6 md:px-24 bg-custom-gradient-navyToBlack text-custom-white min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <span className="block text-xs text-custom-orange tracking-[0.2em] mb-12 uppercase font-medium">Cross-Domain Thinking</span>
        <div ref={textRef} className="opacity-0 translate-y-12">
          <p className="text-xl md:text-2xl leading-[1.3] font-light text-custom-white/90 max-w-6xl">
            <span ref={highlightRef} className="text-xl leading-loose font-semibold lg:text-4xl text-white transition-colors duration-300">-將行銷與美編轉化為工程師優勢：</span>
            <br />
            我的工作經歷雖然多元，但都為工程師職涯打下了獨特的基礎
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 border-t border-white/10 pt-12">
            <div>
              <h3 className="text-lg font-medium text-custom-white mb-4">溝通技巧</h3>
              <p className="text-sm text-custom-white/60 leading-relaxed">
                行銷經驗讓我懂得釐清核心需求，消弭客戶、設計師與後端工程師之間的溝通落差。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-custom-white mb-4">美編排版</h3>
              <p className="text-sm text-custom-white/60 leading-relaxed">
                擁有整合素材與文案的經驗，讓我具備敏銳的內容佈局能力，專注於透過程式碼實現最佳化的使用者體驗。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-custom-white mb-4">網頁開發</h3>
              <p className="text-sm text-custom-white/60 leading-relaxed">
                運用 Next.js、TypeScript 與 Git 協作流程，建構出高效能、安全且易於維護擴充的現代化網頁。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};