"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, BookOpen } from "lucide-react"
import { TemplateDefinition } from '../data/templates';

interface TemplateStackCardProps {
  template: TemplateDefinition;
  onClick: () => void;
}

const CONFIG = {
  containerWidth: 300,
  containerHeight: 200,
  div1Height: 48,
}

function getItems(template: TemplateDefinition) {
  const techs = template.techStack.slice(0, 3);
  const positions = [
    {
      start: { x: -50, y: 24 },
      end: { x: -80, y: -30 },
      control: { x: -90, y: 10 },
      delay: 0,
    },
    {
      start: { x: 0, y: 24 },
      end: { x: 0, y: -50 },
      control: { x: 20, y: -10 },
      delay: 0.1,
    },
    {
      start: { x: 50, y: 24 },
      end: { x: 80, y: -30 },
      control: { x: 90, y: 10 },
      delay: 0.2,
    },
  ];

  return techs.map((tech, idx) => ({
    id: tech,
    icon: <i className={`${getDeviconClass(tech)} colored text-2xl`} title={tech} />,
    color: "text-blue-500", // or vary
    ...positions[idx],
  }));
}

function getDeviconClass(tech: string) {
  const techMap: { [key: string]: string } = {
    'Next.js': 'devicon-nextjs-original',
    'TypeScript': 'devicon-typescript-original',
    'Tailwind CSS': 'devicon-tailwindcss-plain',
    'React Router': 'devicon-react-original',
    'Auth0': 'devicon-auth0-plain',
    'TanStack Query': 'devicon-react-original',
    'Vite': 'devicon-vitejs-plain',
    'Better Auth': 'devicon-nodejs-plain',
    'MongoDB Atlas': 'devicon-mongodb-plain',
    'MongoDB': 'devicon-mongodb-plain',
    'MySQL': 'devicon-mysql-plain',
    'Vue.js': 'devicon-vuejs-plain',
    'Vue': 'devicon-vuejs-plain',
    'Zod': 'devicon-nodejs-plain',
    'Resend': 'devicon-nodejs-plain',
    'Google Gemini API': 'devicon-google-plain',
    'Lucide React': 'devicon-react-original',
    'shadcn/ui': 'devicon-react-original',
    'Framer Motion': 'devicon-react-original',
    'Geist': 'devicon-fontawesome-plain',
    'FastAPI': 'devicon-python-plain',
    'React': 'devicon-react-original',
    'Supabase': 'devicon-postgresql-plain',
    'Redis': 'devicon-redis-plain',
    'Razorpay': 'devicon-nodejs-plain',
  };
  return techMap[tech] || 'devicon-code-plain';
}

export function TemplateStackCard({ template, onClick }: TemplateStackCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const items = getItems(template);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className="absolute left-1/2 top-[-48px] z-40 -translate-x-1/2 overflow-visible pointer-events-none"
        style={{ width: CONFIG.containerWidth, height: CONFIG.containerHeight }}
      >
        <svg className="absolute left-0 top-0 h-full w-full overflow-visible">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>
          <g transform={`translate(${CONFIG.containerWidth / 2}, 0)`}>
            {items.map((item) => (
              <ArrowPath
                key={`arrow-${item.id}`}
                isHovered={isHovered}
                startX={item.start.x}
                startY={item.start.y}
                endX={item.end.x}
                endY={item.end.y}
                controlX={item.control.x}
                controlY={item.control.y}
              />
            ))}
          </g>
        </svg>

        {items.map((item) => (
          <FloatingIcon
            key={`icon-${item.id}`}
            isHovered={isHovered}
            icon={item.icon}
            delay={item.delay}
            x={item.end.x}
            y={item.end.y}
            initialX={item.start.x}
            initialY={item.start.y}
          />
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-12 z-20 flex items-center justify-center gap-6 rounded-t-xl border border-b-0 bg-background px-8 shadow-sm flex-row h-12 w-full"
        animate={{
          opacity: isHovered ? 0 : 1,
          y: isHovered ? 10 : 0,
          scale: isHovered ? 0.95 : 1,
        }}
        transition={{ duration: 0.2 }}
      ></motion.div>

      <motion.div
        className="relative z-30 overflow-hidden rounded-xl border bg-white p-6 text-black shadow-lg transition-all cursor-pointer"
        animate={{
          boxShadow: isHovered ? "inset 0px 4px 20px rgba(0, 0, 0, 0.05)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold leading-tight tracking-tight">
            {template.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            {template.summary}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button className="w-full flex items-center justify-center gap-2 h-9 text-xs font-bold bg-black border border-black rounded-lg text-white hover:bg-gray-800 transition-colors">
              <ExternalLink className="h-4 w-4" /> Open
            </button>
            <button className="w-full flex items-center justify-center gap-2 h-9 text-xs font-bold bg-transparent border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <BookOpen className="h-4 w-4" /> Docs
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FloatingIcon({
  isHovered,
  icon,
  x,
  y,
  initialX,
  initialY,
  delay,
}: {
  isHovered: boolean
  icon: React.ReactNode
  x: number
  y: number
  initialX: number
  initialY: number
  delay: number
}) {
  return (
    <motion.div
      className="absolute top-0 left-1/2 z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: "50%", top: 0 }}
      initial={{ x: initialX, y: initialY, scale: 1, opacity: 1 }}
      animate={{
        x: isHovered ? x : initialX,
        y: isHovered ? y : initialY,
        scale: isHovered ? 1.2 : 1,
        zIndex: isHovered ? 50 : 30,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: isHovered ? delay : 0,
      }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center">{icon}</div>
    </motion.div>
  )
}

function ArrowPath({
  isHovered,
  startX,
  startY,
  endX,
  endY,
  controlX,
  controlY,
}: {
  isHovered: boolean
  startX: number
  startY: number
  endX: number
  endY: number
  controlX: number
  controlY: number
}) {
  const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`

  return (
    <motion.path
      d={path}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      className="text-muted-foreground/60"
      markerEnd="url(#arrowhead)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: isHovered ? 1 : 0,
        opacity: isHovered ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    />
  )
}