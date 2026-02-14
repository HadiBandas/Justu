import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlyingEnvelopeProps {
  onClick: () => void;
}

const FlyingEnvelope: React.FC<FlyingEnvelopeProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Delay transition slightly to allow animation to start
    setTimeout(onClick, 800);
  };

  return (
    <motion.div
      className="relative cursor-pointer z-50 group"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      onClick={handleClick}
    >
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-40 h-28 md:w-56 md:h-40">
          {/* Shadow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/10 blur-xl rounded-full" />
          
          {/* Envelope Body */}
          <svg viewBox="0 0 200 140" className="w-full h-full drop-shadow-2xl">
             {/* Back Flap */}
             <path d="M0 0 L100 70 L200 0 L200 140 L0 140 Z" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
             
             {/* Paper Inside */}
             <motion.rect 
                x="20" y="20" width="160" height="100" fill="white" 
                initial={{ y: 20 }}
                animate={isOpen ? { y: -60 } : { y: 20 }}
                transition={{ duration: 0.5 }}
             />
             <motion.rect 
                x="40" y="40" width="120" height="4" fill="#fb7185" opacity="0.5" 
                animate={isOpen ? { y: -60 } : { y: 20 }}
                transition={{ duration: 0.5 }}
             />
             <motion.rect 
                x="40" y="55" width="80" height="4" fill="#fb7185" opacity="0.3" 
                animate={isOpen ? { y: -60 } : { y: 20 }}
                transition={{ duration: 0.5 }}
             />

             {/* Bottom/Side Flaps */}
             <path d="M0 140 L100 80 L200 140" fill="#fecdd3" stroke="#fda4af" strokeWidth="1" />
             <path d="M0 0 L0 140 L100 80 Z" fill="#ffe4e6" stroke="#fda4af" strokeWidth="1" />
             <path d="M200 0 L200 140 L100 80 Z" fill="#ffe4e6" stroke="#fda4af" strokeWidth="1" />

             {/* Top Flap (The one that opens) */}
             <motion.path 
                d="M0 0 L100 70 L200 0" 
                fill="#f43f5e" 
                stroke="#be123c" 
                strokeWidth="1"
                style={{ originY: 0 }}
                initial={{ rotateX: 0 }}
                animate={isOpen ? { rotateX: 180, fill: "#e11d48" } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
             />
          </svg>
          
          {/* Heart Seal */}
          <motion.div 
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          >
             <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
                <span className="text-white text-xs md:text-sm">K</span>
             </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Instruction */}
      {!isOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 text-center pointer-events-none"
        >
            <p className="font-serif text-rose-800 text-sm md:text-base bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                A letter is waiting… tap the envelope 💌
            </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FlyingEnvelope;
