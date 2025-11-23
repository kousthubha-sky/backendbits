"use client";

import React from 'react';
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

const MobileScroll: React.FC = () => {
  return (
    <div className="hidden px-6 space-y-12 pb-20">
      {contentData.map((item, index) => (
        <div key={index} className="flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-black">
              {item.title}
            </h2>
            <p className="text-lg text-gray-500">
              {item.description}
            </p>
          </div>
          <div className={`w-full aspect-square rounded-3xl flex items-center justify-center ${item.bg}`}>
             {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileScroll;