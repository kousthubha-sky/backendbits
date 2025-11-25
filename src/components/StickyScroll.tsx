"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { getRandomContentIcon } from './CodingIcons';


interface ContentItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  bg: string;
}

const contentData: ContentItem[] = [
  {
    title: "Custom tech stack-end.",
    description: "Filter and discover portfolios built for React, Vue, Svelte, and more.",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
        <svg className="w-20 h-20 text-blue-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          <circle cx="12" cy="12" r="8" className="animate-ping" opacity="0.3" />
          <circle cx="12" cy="12" r="3" className="animate-pulse" />
        </svg>
      </div>
    ),
    bg: "bg-gradient-to-br from-blue-50 to-purple-50"
  },
  {
    title: "Beautiful templates.",
    description: "Curated selection for clean code and modern, flexible design.",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
        <svg className="w-20 h-20 text-yellow-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          <circle cx="12" cy="12" r="6" className="animate-spin" style={{ animationDuration: '3s' }} opacity="0.2" />
        </svg>
      </div>
    ),
    bg: "bg-gradient-to-br from-yellow-50 to-orange-50"
  },
  {
    title: "Open to contributions.",
    description: "Submit your frontend, backend, or full stack components—free or paid.",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-xl"></div>
        <svg className="w-20 h-20 text-green-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          <rect x="2" y="8" width="20" height="8" rx="2" className="animate-pulse" opacity="0.1" />
        </svg>
      </div>
    ),
    bg: "bg-gradient-to-br from-green-50 to-teal-50"
  }
];

const StickyScroll: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = contentData.length;

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const index = Math.min(
      Math.max(Math.floor(latest * cardLength), 0),
      cardLength - 1
    );
    setActiveCard(index);
  });

  return (
    <div ref={ref} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 h-screen flex items-center max-w-6xl mx-auto px-6">
        {/* Left Content - Text */}
        <div className="w-1/2 pr-20">
          {contentData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeCard === index ? 1 : 0,
                y: activeCard === index ? 0 : 20,
                display: activeCard === index ? "block" : "none"
              }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-black">
                {item.title}
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right Content - Cards */}
        <div className="w-1/2 flex items-center justify-center relative h-full">
          {contentData.map((item, index) => (
            <motion.div
              key={index}
              className={`absolute w-full aspect-square max-w-md rounded-3xl flex items-center justify-center ${item.bg}`}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{
                opacity: activeCard === index ? 1 : activeCard > index ? 0 : 0,
                y: activeCard === index ? 0 : activeCard > index ? -100 : 100,
                scale: activeCard === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
               {item.icon}
               
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyScroll;