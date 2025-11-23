"use client";

import React from 'react';
import { Square, Triangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6">
             <div className="flex items-center -space-x-1">
               <Square size={12} className="text-black fill-black" />
               <Triangle size={12} className="text-gray-400 fill-gray-400 rotate-180" />
             </div>
             <span>Stacks</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Templates</h4>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li className="hover:text-black cursor-pointer">React</li>
            <li className="hover:text-black cursor-pointer">Vue</li>
            <li className="hover:text-black cursor-pointer">Svelte</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li className="hover:text-black cursor-pointer">Pricing</li>
            <li className="hover:text-black cursor-pointer">FAQ</li>
            <li className="hover:text-black cursor-pointer">Docs</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Community</h4>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li className="hover:text-black cursor-pointer">GitHub</li>
            <li className="hover:text-black cursor-pointer">Discord</li>
            <li className="hover:text-black cursor-pointer">Contribute</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;