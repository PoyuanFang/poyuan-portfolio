'use client'

import React from 'react';

import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[12px] tracking-widest text-custom-gray bg-custom-black border-t border-white/5 uppercase">
      <div className="mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Poyuan Fang
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-1">
          <FaGithub /><a href="https://github.com/PoyuanFang/portfolio" target="blank" className="hover:text-white transition-colors interactive">GITHUB</a>
        </div>
        <div className="flex items-center gap-1">
          <FaInstagram /><a href="https://www.instagram.com/poyuan__" target="blank" className="hover:text-white transition-colors interactive">INSTAGRAM</a>
        </div>
      </div>
    </footer>
  );
};