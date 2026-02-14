import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PETAL_COUNT = 18; // Balanced for mobile

const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate static random values on mount to avoid hydration mismatch
    const newPetals = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -50, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: [0, 20, -20, 0], // Drift effect
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
          }}
          style={{
            left: `${petal.left}%`,
            position: 'absolute',
            width: '20px',
            height: '20px',
          }}
        >
          {/* Simple Vector Petal Shape */}
          <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            <path
              d="M15 0C15 0 25 10 25 20C25 25.5228 20.5228 30 15 30C9.47715 30 5 25.5228 5 20C5 10 15 0 15 0Z"
              fill="rgba(255, 228, 230, 0.7)"
              stroke="rgba(253, 164, 175, 0.4)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;
