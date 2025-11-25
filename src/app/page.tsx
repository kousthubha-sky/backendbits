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
import StructuredData from '../components/StructuredData';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });
const Skiper30 = dynamic(() => import('../components/ui/skiper30'), { ssr: false });

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent text-black font-sans selection:bg-gray-200">
      <StructuredData />
      {/* Navbar */}
      <Navbar />

      <main className='w-md md:w-full lg:w-full lg:ml-0' >
        <Hero />
        <Skiper30 />
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