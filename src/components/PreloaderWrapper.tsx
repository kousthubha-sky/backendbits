'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StairsPreloader from './StairsPreloader';

const PreloaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StairsPreloader />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default PreloaderWrapper;