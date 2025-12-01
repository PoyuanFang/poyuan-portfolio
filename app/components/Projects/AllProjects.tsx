'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from '@/components/Home/CustomCursor'
import { FaArrowRight } from "react-icons/fa";
import { urlFor } from '../../../sanity/client';

interface Project {
  _id: string
  title: string
  image: any
  description: string
  link: string
  category: string
}

interface ProjectListProps {
  projects: Project[]
}

export const AllProjects: React.FC<ProjectListProps> = ({ projects }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      projectRefs.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-24 px-6 md:px-12 lg:px-24 bg-products-bg text-custom-black">
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">所有專案</h1>
          <p className="text-custom-gray text-sm">(All Projects)</p>
        </div>

        <CustomCursor />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project, index) => (
            <div
              key={project._id}
              ref={el => { projectRefs.current[index] = el; }}
              className="group flex flex-col gap-6 cursor-pointer"
              onClick={() => router.push(`/project/${project._id}`)}
            >
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden relative border border-custom-black/5 shadow-lg">
                {project.image && (
                  <img
                    src={urlFor(project.image).width(800).url()}
                    alt={project.title}
                    className="w-full h-full object-cover will-change-transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col items-start space-y-2">
                <span className="text-custom-blue text-xs tracking-widest uppercase font-medium">{project.category}</span>
                <h3 className="text-2xl font-serif leading-none">{project.title}</h3>
                <p className="text-custom-gray text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};