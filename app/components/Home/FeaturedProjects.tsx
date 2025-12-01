'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ArrowUpRight } from 'lucide-react';

import { FaLocationArrow } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "INTERACTIVE PSYCH TEST",
    category: "Brand Campaign / Next.js",
    image: "https://picsum.photos/id/42/1200/800",
    description: "Developed a branded interactive psychological test website. Increased user engagement through smooth animations and seamless frontend logic."
  },
  {
    id: 2,
    title: "TRAVEL AGENCY PORTAL",
    category: "Web Optimization / Maintenance",
    image: "https://picsum.photos/id/28/1200/800",
    description: "Maintained and optimized the official website for a travel agency, ensuring high performance and implementing new feature requests."
  },
  {
    id: 3,
    title: "ONLINE LEARNING SYSTEM",
    category: "React / Full Stack Project",
    image: "https://picsum.photos/id/20/1200/800",
    description: "A comprehensive course platform built with React. Features student management, course playback, and a robust backend integration."
  }
];

export const FeaturedProjects: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      projectRefs.current.forEach((el, index) => {
        if (!el) return;
        const img = el.querySelector('img');

        // Parallax Effect for Image
        gsap.fromTo(img,
          { yPercent: -10, scale: 1.1 },
          {
            yPercent: 10,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );

        // Text Reveal
        const text = el.querySelector('.project-info');
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          onEnter: () => gsap.fromTo(text,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
          )
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="w-full py-24 px-6 md:px-12 lg:px-24 bg-products-bg text-custom-black">
      <div className="flex justify-between items-end mb-24 border-b border-custom-black/10 pb-6">
        <h2 className="text-3xl md:text-5xl font-serif">專案作品</h2>
        <span className="hidden md:block text-xs font-mono text-custom-gray">(Featured Projects)</span>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => { projectRefs.current[index] = el; }}
            className="group flex flex-col md:flex-row gap-10 lg:gap-20 items-center md:even:flex-row-reverse"
          >
            {/* Image Container */}
            <div className="w-full md:w-3/5 aspect-[16/10] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-out border border-custom-black/5 shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover will-change-transform"
              />
            </div>

            {/* Info */}
            <div className="project-info w-full md:w-2/5 space-y-6">
              <span className="text-custom-blue text-xs tracking-widest uppercase font-medium">{project.category}</span>
              <h3 className="text-4xl md:text-5xl font-serif leading-none">{project.title}</h3>
              <p className="text-custom-gray text-sm leading-relaxed max-w-sm">
                {project.description}
              </p>
              <button className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-custom-orange transition-colors group/btn interactive">
                View Project
                <FaLocationArrow />
                {/* <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> */}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 flex justify-center">
        <button
          onClick={() => router.push('/project')}
          className="px-8 py-4 border border-custom-black/20 rounded-full text-xs tracking-widest hover:bg-custom-black hover:text-white transition-all duration-300 interactive"
        >
          View All Projects
        </button>
      </div>
    </section>
  );
};