'use client';

import React from 'react';
import { Shield, CreditCard } from 'lucide-react';
import { TemplateDefinition } from '../data/templates';

interface TemplateHoverCardProps {
  template: TemplateDefinition;
  onClick: () => void;
}

const TemplateHoverCard: React.FC<TemplateHoverCardProps> = ({ template, onClick }) => {
  const getCategoryIcon = () => {
    switch (template.category) {
      case 'auth':
        return <Shield className="text-blue-600 text-lg" />;
      case 'payment':
        return <CreditCard className="text-blue-600 text-lg" />;
      default:
        return <Shield className="text-blue-600 text-lg" />;
    }
  };

  const getHoverIcons = () => {
    switch (template.category) {
      case 'auth':
        return <Shield className="text-6xl text-blue-500 animate-[spin_10s_linear_infinite]" />;
      case 'payment':
        return <CreditCard className="text-6xl text-blue-500 animate-[spin_10s_linear_infinite]" />;
      default:
        return <Shield className="text-6xl text-blue-500 animate-[spin_10s_linear_infinite]" />;
    }
  };

  return (
    <div
      className="
        group relative
        w-[320px] h-[200px]
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-md
        overflow-hidden
        cursor-pointer
        transition-all duration-500 ease-in-out
        hover:shadow-[inset_0_10px_30px_rgba(0,0,0,0.1)]
      "
      onClick={onClick}
    >
      {/* Stable State */}
      <div className="
        absolute inset-0
        p-5 flex flex-col justify-between
        transition-all duration-500 ease-in-out
        group-hover:translate-y-[120%] group-hover:opacity-50
      ">
        {/* Header Row */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="p-1.5 bg-gray-50 rounded-md border border-gray-100">
              {getCategoryIcon()}
            </div>
            <div className="flex gap-2 opacity-60 grayscale group-hover:grayscale-0 transition-all">
              {/* Tech stack icons can be added here if needed */}
            </div>
          </div>

          {/* Title Text */}
          <h3 className="font-bold text-gray-800 text-[17px] leading-tight">
            {template.name}
          </h3>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center gap-3">
          <button className="flex-1 h-9 text-xs font-bold bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Check Docs
          </button>
          <button className="h-9 px-4 text-xs font-bold bg-black border border-black rounded-lg text-white hover:bg-gray-800 transition-colors">
            Open
          </button>
        </div>
      </div>

      {/* Hover State */}
      <div className="
        absolute inset-0
        flex items-center justify-center gap-6
        translate-y-[100%] opacity-0
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        group-hover:translate-y-0 group-hover:opacity-100
      ">
        {getHoverIcons()}
      </div>
    </div>
  );
};

export default TemplateHoverCard;