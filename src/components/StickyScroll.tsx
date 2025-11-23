"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Square, Circle, Triangle } from 'lucide-react';

interface ContentItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  bg: string;
}

const contentData: ContentItem[] = [
  {
    title: "Custom tech stacks.",
    description: "Filter and discover portfolios built for React, Vue, Svelte, and more.",
    icon: <Square className="w-20 h-20 text-white opacity-50" fill="currentColor" />,
    bg: "bg-gray-100"
  },
  {
    title: "Beautiful templates.",
    description: "Curated selection for clean code and modern, flexible design.",
    icon: <Circle className="w-20 h-20 text-white opacity-50" fill="currentColor" />,
    bg: "bg-gray-100"
  },
  {
    title: "Open to contributions.",
    description: "Submit your frontend, backend, or full stack components—free or paid.",
    icon: <Triangle className="w-20 h-20 text-white opacity-50" fill="currentColor" />,
    bg: "bg-gray-100"
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