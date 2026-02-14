import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [text, setText] = useState("Preparing something special...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setText("Just for Keyla 💗");
    }, 2000);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fff1f2] text-rose-900 overflow-hidden"
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1.5 }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-rose-100 opacity-80" />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Icon */}
        <motion.div
          className="relative mb-8 text-6xl sm:text-7xl filter drop-shadow-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🌹
          <motion.div 
            className="absolute inset-0 bg-rose-400/30 blur-2xl rounded-full -z-10"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Text Transition */}
        <div className="h-12 relative flex items-center justify-center overflow-hidden w-full max-w-md px-4">
          <motion.h2
            key={text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="font-serif text-xl sm:text-2xl text-rose-800 tracking-wide text-center absolute w-full"
          >
            {text}
          </motion.h2>
        </div>

        {/* Loading Bar */}
        <div className="mt-10 w-48 sm:w-64 h-1 bg-rose-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-rose-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;