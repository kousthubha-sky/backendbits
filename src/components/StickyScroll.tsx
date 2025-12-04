"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';



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
        <svg className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-blue-500 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          {/* Tech Stack Layers */}
          <rect x="3" y="3" width="18" height="3" rx="1" strokeWidth="1.5" className="animate-pulse" />
          <rect x="5" y="7" width="14" height="3" rx="1" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <rect x="7" y="11" width="10" height="3" rx="1" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <rect x="9" y="15" width="6" height="3" rx="1" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          {/* Tech icons on layers */}
          <circle cx="6" cy="4.5" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="9" cy="8.5" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="12.5" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="15" cy="16.5" r="1" fill="currentColor" opacity="0.6" />
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
        <svg className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-yellow-500 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          {/* Template/Layout Icon */}
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
          <rect x="7" y="7" width="10" height="2" rx="1" fill="currentColor" opacity="0.6" className="animate-pulse" />
          <rect x="7" y="11" width="6" height="2" rx="1" fill="currentColor" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <rect x="7" y="15" width="8" height="2" rx="1" fill="currentColor" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          {/* Design elements */}
          <circle cx="16" cy="12" r="1.5" fill="currentColor" opacity="0.4" className="animate-bounce" />
          <rect x="14" y="16" width="4" height="1" rx="0.5" fill="currentColor" opacity="0.4" className="animate-bounce" style={{ animationDelay: '0.5s' }} />
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
        <svg className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 text-green-500 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          {/* Collaboration/Contribution Icon */}
          <circle cx="12" cy="8" r="3" strokeWidth="1.5" />
          <path d="M12 14c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z" strokeWidth="1.5" />
          {/* Contribution arrows */}
          <path d="M16 10l3-3m0 0l-3-3m3 3h-6" strokeWidth="1.5" className="animate-pulse" />
          <path d="M8 10l-3-3m0 0l3-3m-3 3h6" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          {/* Plus signs for contributions */}
          <circle cx="18" cy="16" r="1" fill="currentColor" opacity="0.6" className="animate-bounce" />
          <circle cx="6" cy="16" r="1" fill="currentColor" opacity="0.6" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
          <path d="M18 16h2m-1-1v2" strokeWidth="1.5" className="animate-bounce" />
          <path d="M6 16h2m-1-1v2" strokeWidth="1.5" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
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
    <div ref={ref} className="relative h-[250vh] md:h-[200vh] lg:h-[300vh] bg-transparent">
      <div className="sticky top-0 min-h-screen flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8 lg:py-0">
        {/* Mobile: Cards First (Centered) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative h-72 sm:h-80 md:h-96 lg:h-full order-1 lg:order-2 mb-8 lg:mb-0">
          {contentData.map((item, index) => (
            <motion.div
              key={index}
              className={`absolute w-full aspect-square max-w-xs sm:max-w-sm lg:max-w-md rounded-3xl flex items-center justify-center ${item.bg}`}
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

        {/* Mobile: Text Below Cards */}
        <div className="w-full lg:w-1/2 lg:pr-20 order-2 lg:order-1">
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
              className="text-center lg:text-left px-4 lg:px-0"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-black">
                {item.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyScroll;