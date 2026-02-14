import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickPetalsProps {
  bursts: Array<{ id: number; x: number; y: number }>;
}

const ClickPetals: React.FC<ClickPetalsProps> = ({ bursts }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <BurstGroup key={burst.id} x={burst.x} y={burst.y} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const BurstGroup: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  // Fix: Memoize particles generation so they don't regenerate (and reset animation) 
  // when the parent component re-renders due to state changes (like adding a new burst).
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      angle: (i / 14) * 360 + Math.random() * 20, // Add randomness to angle
      distance: 60 + Math.random() * 80,
      scale: 0.5 + Math.random() * 0.8,
      delay: Math.random() * 0.1,
    }));
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x, y, opacity: 1, scale: 0 }}
          animate={{
            x: x + Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: y + Math.sin((p.angle * Math.PI) / 180) * p.distance + 20, // Slight gravity
            opacity: 0,
            scale: p.scale,
            rotate: Math.random() * 360, // Random rotation for hearts
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-6 h-6 sm:w-8 sm:h-8"
        >
           {/* Heart Shape SVG */}
           <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#fb7185" // Lovely pink
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
};

export default ClickPetals;