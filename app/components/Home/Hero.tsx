'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const circleRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .5 });

      // Background Image Zoom Animation
      tl.fromTo(bgImageRef.current,
        { scale: 1.1 }, // Start slightly zoomed in
        { scale: 1, duration: 10, ease: "power1.inOut" }, // Zoom out slowly over 10 seconds
        "start"
      );

      tl.fromTo(circleRef.current, { y: -20 }, {
        y: 50, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut",
      },
        "start"
      )

      // Text Reveal
      tl.fromTo([titleLine1Ref.current, titleLine2Ref.current],
        { y: 100, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" },
        "start"
      );

      tl.fromTo(subtitleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=1"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden text-custom-black bg-products-bg">

      {/* Animated Background Image */}
      <Image
        ref={bgImageRef}
        src="/image/gradient_blue.webp"
        alt="Abstract background"
        fill
        sizes="100vw"
        className="object-cover absolute inset-0 z-0"
        priority
      />

      <Image
        ref={circleRef}
        src="/image/circle.png"
        alt="circle animate"
        className="absolute inset-0 z-1"
        width={200}
        height={200}
      />

      <div className="relative z-10 flex flex-col items-center px-4">
        <div>
          <h1 ref={titleLine1Ref} className="text-[15vw] lg:text-[10vw] leading-[0.85] font-serif font-medium tracking-tighter text-custom-black">
            POYUAN's
          </h1>
        </div>
        <div>
          <h1 ref={titleLine2Ref} className="text-[15vw] lg:text-[10vw] leading-[0.85] font-serif font-medium tracking-tighter text-custom-black ml-[15vw]">
            Portfolio
          </h1>
        </div>
        <div className="w-full mt-5 flex justify-end gap-3">
          <div className="flex items-center gap-1">
            <a href="https://github.com/PoyuanFang/poyuan-portfolio" target="blank" className="flex items-center gap-1 hover:text-custom-orange hover:scale-105 transition-all duration-300 interactive"><FaGithub />GITHUB</a>
          </div>
          <div className="flex items-center gap-1">
            <a href="https://www.instagram.com/poyuan__" target="blank" className="flex items-center gap-1 hover:text-custom-orange hover:scale-105 transition-all duration-300 interactive"> <FaInstagram />INSTAGRAM</a>
          </div>
        </div>
      </div>

      <div className="w-full px-10 absolute bottom-20 flex items-center gap-4 text-xs tracking-widest text-custom-white">
        <div ref={subtitleRef} className="w-full flex gap-3 md:w-3/5 lg:w-2/5 text-sm md:text-base font-light tracking-wide text-custom-white leading-relaxed">
          <div className="w-16 mt-3 h-[1px] bg-custom-black/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-custom-orange animate-[progress_2s_infinite]"></div>
          </div>
          Hi! 我是柏元<br />
          我喜歡接收新的知識，也願意投入學習，現階段目標轉職成前端工程師，未來會朝全端工程師邁進。</div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" aria-label="Scroll to next section" className="interactive">
          <MdOutlineKeyboardDoubleArrowDown size={40} className="text-custom-orange/80 animate-bounce interactive" />
        </a>
      </div>
    </section>
  );
};