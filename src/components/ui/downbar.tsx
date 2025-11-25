"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]",
  },
  {
    name: "Templates",
    href: "/",
    description: "[1]",
  },
    {
    name: "Docs",
    href: "/docs",
    description: "[7]",
  },
  {
    name: "HOW TO use",
    href: "/docs/quick-start",
    description: "[3]",
  },
  {
    name: "Account",
    href: "/profile",
    description: "[4]",
  },

   {
    name: "Guidelines",
    href: "/guidelines",
    description: "[2]",
  },
];

export const Skiper58 = () => {
  return (
    <ul className="bg-white/10 flex min-h-full w-screen lg:w-full flex-1 flex-col items-stretch justify-start gap-0 rounded-2xl p-4 border border-white/20 shadow-2xl backdrop-blur-3xl">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center justify-center flex-1 "
          key={index}
        >
          <Link href={item.href} className="relative flex items-center justify-center w-full h-full bg-white backdrop-blur-md">
            <TextRoll
              center
              className="text-[8vw] font-extrabold uppercase leading-none tracking-[-0.03em] transition-colors"
              style={{ fontSize: 'clamp(2rem, 8vw, 6rem)' }}
            >
              {item.name}
            </TextRoll>
          </Link>
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
        lineHeight: 0.85,
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
