"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
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
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I submit a new template?",
      answer: "To submit a template, first create a GitHub account if you don't have one. Create a public repository with your template code, ensuring it includes a comprehensive README.md with setup instructions. Then visit our Contribute page, fill out the submission form with your repository URL, and our team will review it within 1-3 business days."
    },
    {
      question: "Can I monetize my contributions?",
      answer: "Currently, all templates on our platform are free and open-source. While you cannot directly monetize templates through our platform, you can include links to your own services, consulting, or premium versions in your template's documentation. We encourage community contributions and focus on building a valuable resource for developers."
    },
    {
      question: "Do I need an account to browse templates?",
      answer: "No, you can browse and view all templates without creating an account. However, to submit templates, contribute to discussions, or access certain premium features, you'll need to create a free account. Guest users can still download templates and view documentation without registration."
    }
  ];

  return (
    <section className="py-24 px-6 max-w-2xl mx-auto">
      <div className="bg-gray-50/50 rounded-3xl p-2 md:p-8">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;