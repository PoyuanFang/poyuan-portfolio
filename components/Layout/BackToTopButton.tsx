'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import gsap from 'gsap';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 根據滾動位置顯示或隱藏按鈕
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 按鈕出現/消失的動畫
  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        pointerEvents: 'none',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isVisible]);

  // 滾動到頂部的功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-15 right-5 bg-custom-orange text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 opacity-0 pointer-events-none interactive"
      aria-label="Go to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
};