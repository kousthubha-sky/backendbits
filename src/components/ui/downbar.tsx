"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]",
  },
  {
    name: "Components",
    href: "/components",
    description: "[1]",
  },
  {
    name: "Docs",
    href: "/pricing",
    description: "[2]",
  },
  {
    name: "How to use",
    href: "/docs/quick-start",
    description: "[3]",
  },
  {
    name: "Account",
    href: "/user",
    description: "[4]",
  },
  {
    name: "Login",
    href: "/login",
    description: "[7]",
  },
];

export const Skiper58 = () => {
  return (
    <ul className="bg-white/10 flex min-h-full w-full flex-1 flex-col items-stretch justify-center gap-0 rounded-2xl p-4 border border-white/20 shadow-2xl backdrop-blur-3xl">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center justify-center flex-1"
          key={index}
        >
          <div className="relative flex items-center justify-center w-full h-full bg-white backdrop-blur-md">
            <TextRoll
              center
              className="text-[8vw] font-extrabold uppercase leading-none tracking-[-0.03em] transition-colors"
              style={{ fontSize: 'clamp(2rem, 8vw, 6rem)' }}
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  style?: React.CSSProperties;
}> = ({ children, className, center = false, style }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
        ...style,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export { TextRoll };
