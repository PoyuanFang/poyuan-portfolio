'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

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

        <div className="mt-12 flex items-start gap-6 max-w-xl mx-auto p-4 rounded-lg">
          <div className="w-12 h-[1px] bg-custom-orange mt-3 hidden md:block"></div>
          <p ref={subtitleRef} className="text-sm md:text-base font-light tracking-wide text-custom-black md:text-custom-white leading-relaxed">
            Hi! 我是柏元<br />
            我喜歡接收新的知識，也願意投入學習，現階段目標轉職成前端工程師，未來會朝全端工程師邁進。</p>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-4 text-xs tracking-widest opacity-60 text-custom-white">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-16 h-[1px] bg-custom-black/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-custom-orange animate-[progress_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};