import React from 'react';
import { motion } from 'framer-motion';
import { BloomStage } from '../types';

interface RoseProps {
  stage: BloomStage;
  onClick: (e: React.MouseEvent) => void;
  isClickable: boolean;
}

const Rose: React.FC<RoseProps> = ({ stage, onClick, isClickable }) => {
  return (
    <motion.div
      // Responsive sizing: w-60 (mobile) -> w-72 (tablet) -> w-96 (desktop)
      // Added touch-manipulation to prevent double-tap zoom delay on mobile
      className={`relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 touch-manipulation ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? onClick : undefined}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      whileHover={isClickable ? { scale: 1.02 } : {}}
    >
        {/* Glow effect */}
        <motion.div 
            className="absolute inset-0 bg-rose-500/30 rounded-full blur-[40px] sm:blur-[60px]"
            animate={{ 
                opacity: stage > 0 ? 0.3 + (stage/10) : 0,
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Pulse Ring on Click Hint */}
        {isClickable && stage < 7 && (
            <motion.div 
                className="absolute inset-0 border-2 border-rose-300 rounded-full opacity-0"
                animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        )}

      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-2xl">
        {/* Stem */}
        <motion.path 
            d="M100 180 Q100 250 80 320" 
            stroke="#166534" 
            strokeWidth="3" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
        />

        {/* Sepals */}
        <g transform="translate(100, 160)">
             {[0, 1, 2].map((i) => (
                 <motion.path
                    key={`sepal-${i}`}
                    d="M0 0 Q-8 20 0 40 Q8 20 0 0"
                    fill="#15803d"
                    initial={{ scale: 0 }}
                    animate={{ scale: stage > 0 ? 1 : 0, rotate: (i-1) * 50 }}
                    transition={{ duration: 1 }}
                 />
             ))}
        </g>

        {/* Petals Container */}
        <g transform="translate(100, 100)">
            
            {/* Outer Most Layers (Stage 6-7) - The grand bloom */}
            <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: stage >= 6 ? 1 : 0.5, opacity: stage >= 6 ? 1 : 0 }}
                transition={{ duration: 1.5, type: "spring" }}
            >
                <path d="M0 -80 C-45 -90 -100 -20 -60 50 C-25 80 25 80 60 50 C100 -20 45 -90 0 -80" fill="#9f1239" fillOpacity="0.9" transform="rotate(180)" />
            </motion.g>

            {/* Outer Petals (Stage 5) */}
            <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: stage >= 5 ? 1 : 0.4, opacity: stage >= 4 ? 1 : 0 }}
                transition={{ duration: 1.4, type: "spring" }}
            >
                 {[0, 120, 240].map((deg, i) => (
                     <path key={i} d="M0 -70 C-40 -80 -90 -20 -50 40 C-20 70 20 70 50 40 C90 -20 40 -80 0 -70" fill="#be123c" fillOpacity="0.9" transform={`rotate(${deg})`} />
                 ))}
            </motion.g>

            {/* Mid Petals (Stage 3-4) */}
            <motion.g
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: stage >= 3 ? 0.9 : 0.3, opacity: stage >= 2 ? 1 : 0 }}
                transition={{ duration: 1.2, type: "spring" }}
            >
                 {[30, 150, 270].map((deg, i) => (
                    <path key={i} d="M0 -55 C-35 -65 -75 -15 -45 35 C-25 55 25 55 45 35 C75 -15 35 -65 0 -55" fill="#e11d48" transform={`rotate(${deg})`} />
                 ))}
            </motion.g>

             {/* Inner Petals (Stage 1-2) */}
             <motion.g
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: stage >= 1 ? 0.8 : 0.4, opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 1, type: "spring" }}
            >
                 {[60, 180, 300].map((deg, i) => (
                    <path key={i} d="M0 -40 C-25 -50 -55 -5 -35 30 C-15 45 15 45 35 30 C55 -5 25 -50 0 -40" fill="#f43f5e" transform={`rotate(${deg})`} />
                 ))}
            </motion.g>

             {/* Core Bud (Always Visible) */}
             <motion.g
                animate={{ 
                    scale: stage === 0 ? 1 : 0.2,
                    opacity: stage > 6 ? 0 : 1
                }}
            >
                <circle cx="0" cy="0" r="25" fill="#881337" />
                <path d="M0 -25 C-20 -25 -25 15 0 25 C25 15 20 -25 0 -25" fill="#9f1239" />
                <path d="M0 -20 C-15 -20 -20 10 0 20 C20 10 15 -20 0 -20" fill="#be123c" transform="rotate(60)" />
            </motion.g>
        </g>
      </svg>
    </motion.div>
  );
};

export default Rose;
