'use client'

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animation
    const counterInterval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(counterInterval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut"
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut"
        }, "-=0.2");
      });

      return () => ctx.revert();
    }
  }, [count, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-custom-black flex items-center justify-center text-white"
    >
      <div ref={textRef} className="text-9xl font-bold font-serif tabular-nums text-custom-orange">
        {count}%
      </div>
    </div>
  );
};