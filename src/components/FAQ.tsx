"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:text-gray-600 transition-colors group"
      >
        <span className="text-lg font-medium text-gray-800 group-hover:text-black">{question}</span>
        <span className={`p-2 bg-gray-100 rounded-lg transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const questions: string[] = [
    "How do I submit a new template?",
    "Can I monetize my contributions?",
    "Do I need an account to browse templates?"
  ];

  return (
    <section className="py-24 px-6 max-w-2xl mx-auto">
      <div className="bg-gray-50/50 rounded-3xl p-2 md:p-8">
        {questions.map((q, i) => (
          <AccordionItem
            key={i}
            question={q}
            isOpen={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;