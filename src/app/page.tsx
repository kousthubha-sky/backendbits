"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import StickyScroll from '../components/StickyScroll';
import MobileScroll from '../components/MobileScroll';
import Newsletter from '../components/Newsletter';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });





const App: React.FC = () => {

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-gray-200">
      {/* Navbar */}
      <Navbar />

      <main>
        <Hero />
        <StickyScroll />
        <MobileScroll />
        <Newsletter />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;