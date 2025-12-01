'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isHoveringInteractive = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Center the cursor elements on the mouse
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, target } = e;

      // Immediate movement for the small dot
      gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1 });

      // Smooth movement for the large circle
      gsap.to(follower, { x: clientX, y: clientY, duration: 0.6, ease: "power2.out" });

      // Check if hovering over an interactive element using event delegation
      const isInteractive = (target as HTMLElement).closest('a, button, .interactive');

      if (isInteractive && !isHoveringInteractive.current) {
        isHoveringInteractive.current = true;
        gsap.to(follower, { scale: 3, opacity: 0.3, backgroundColor: '#f04933', borderColor: 'transparent', duration: 0.3 });
      } else if (!isInteractive && isHoveringInteractive.current) {
        isHoveringInteractive.current = false;
        gsap.to(follower, { scale: 1, opacity: 0.6, backgroundColor: 'transparent', borderColor: '#f04933', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Only render on desktop to avoid issues on touch devices
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;
  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-custom-orange rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-custom-orange rounded-full pointer-events-none z-[9998] mix-blend-exclusion"
      />
    </>
  );
};