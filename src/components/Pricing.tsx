"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  btnText: string;
  highlight: boolean;
}

const Pricing: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: "Free Starter",
      price: "$0",
      features: ["Browse all free templates", "Community support", "Basic stock filter"],
      btnText: "Start Free",
      highlight: false
    },
    {
      name: "Designer",
      price: "$19",
      features: ["Premium templates", "Pro design assets", "Advanced filters"],
      btnText: "Get Designer",
      highlight: true
    },
    {
      name: "Contributor Pro",
      price: "$39",
      features: ["Monetize contributions", "Unrestricted submissions", "Priority curation"],
      btnText: "Join as Contributor",
      highlight: false
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-2">Pricing</h2>
          <p className="text-xl text-gray-500">Simple & clear.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-3xl flex flex-col h-full ${plan.highlight ? 'bg-white shadow-xl shadow-gray-200/50 border border-gray-100' : 'bg-transparent hover:bg-white hover:shadow-lg transition-all duration-300'}`}
            >
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold">{plan.price}</div>
              </div>

              <ul className="space-y-4 mb-8 flex grow">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-gray-600 text-sm">
                    <Check size={16} className="text-black" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-medium transition-all ${
                plan.highlight
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.btnText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;