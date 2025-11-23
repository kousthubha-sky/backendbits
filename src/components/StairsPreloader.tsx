import { motion } from 'framer-motion';

const StairsPreloader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        The first-ever AGI. Period
      </motion.h1>
      <div className="relative">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-sm"
            style={{
              width: '40px',
              height: '20px',
              left: `${i * 40}px`,
              top: `${i * 20}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.5, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
};

export default StairsPreloader;