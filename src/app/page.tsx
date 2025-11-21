"use client";

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TemplatesShowcase from '../components/TemplatesShowcase';
import StickyScroll from '../components/StickyScroll';
import MobileScroll from '../components/MobileScroll';
import Newsletter from '../components/Newsletter';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-gray-200">
      <Navbar />
      <main>
        <Hero />
        <TemplatesShowcase sectionId="templates" />
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