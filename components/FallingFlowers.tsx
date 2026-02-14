import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FallingFlowersProps {
  stage: number; // 0 to 7
}

const FallingFlowers: React.FC<FallingFlowersProps> = ({ stage }) => {
  // Logic: Base count + (stage * multiplier)
  // Stage 0: 12 petals
  // Stage 7: 12 + (7 * 6) = 54 petals (Heavier rain of love)
  const count = 12 + (stage * 6);

  const [flowers, setFlowers] = useState<Array<{ 
    id: number; 
    left: number; 
    delay: number; 
    duration: number;
    scale: number;
    layer: 'near' | 'mid' | 'far'; 
  }>>([]);

  useEffect(() => {
    setFlowers(prev => {
      const currentCount = prev.length;

      // Case 1: Reset (e.g. Replay button pressed)
      // If the target count is significantly lower than current, it means we reset.
      // We regenerate the initial batch to ensure a fresh start.
      if (count < currentCount) {
         return generateNewBatch(count, 0);
      }

      // Case 2: No change needed
      if (currentCount === count) return prev;

      // Case 3: Add more flowers (Progressing stages)
      // We only generate the difference so existing flowers continue falling smoothly
      const needed = count - currentCount;
      // Start IDs from currentCount to ensure uniqueness
      const newBatch = generateNewBatch(needed, currentCount);
      
      return [...prev, ...newBatch];
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {flowers.map((flower) => (
          // Use stable key and memoized component
          <MemoizedFlower key={flower.id} data={flower} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Helper function to generate flower data
const generateNewBatch = (qty: number, startIndex: number) => {
  return Array.from({ length: qty }).map((_, i) => {
    const id = startIndex + i;
    const layerRandom = Math.random();
    let layer: 'near' | 'mid' | 'far' = 'mid';
    let scale = 0.8;
    let duration = 15;

    if (layerRandom < 0.3) {
      layer = 'far';
      scale = 0.5;
      duration = 20 + Math.random() * 10;
    } else if (layerRandom > 0.7) {
      layer = 'near';
      scale = 1.2;
      duration = 10 + Math.random() * 8;
    } else {
      duration = 14 + Math.random() * 8;
    }

    return {
      id,
      left: Math.random() * 100,
      // For the initial batch (startIndex 0), allows negative delay for immediate presence.
      // For added batches, delay should be small positive to animate in naturally from top.
      delay: startIndex === 0 ? Math.random() * -20 : Math.random() * 2, 
      duration,
      scale,
      layer
    };
  });
};

const Flower: React.FC<{ data: any }> = ({ data }) => {
  const isFar = data.layer === 'far';
  const isNear = data.layer === 'near';
  
  // Randomly choose between a Petal shape and a Heart shape for variety
  // Use data.id to keep the shape consistent for the specific flower
  const isHeart = data.id % 2 === 0; 

  return (
    <motion.div
      initial={{ y: -50, x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: '110vh',
        x: [0, isNear ? 50 : 20, isNear ? -50 : -20, 0],
        opacity: isFar ? [0, 0.4, 0.4, 0] : [0, 0.8, 0.8, 0],
        rotate: [0, 360],
      }}
      transition={{
        y: {
          duration: data.duration,
          repeat: Infinity,
          ease: "linear",
          delay: data.delay
        },
        x: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        },
        opacity: {
          duration: data.duration,
          repeat: Infinity,
          times: [0, 0.1, 0.9, 1],
          delay: data.delay
        },
        rotate: {
          duration: data.duration * 0.8,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      style={{
        left: `${data.left}%`,
        position: 'absolute',
        width: isHeart ? '20px' : '24px',
        height: isHeart ? '20px' : '24px',
        scale: data.scale,
        filter: isFar ? 'blur(2px)' : isNear ? 'blur(0px)' : 'blur(0.5px)',
        zIndex: isNear ? 20 : isFar ? 0 : 10
      }}
    >
      {isHeart ? (
        // Heart Shape
         <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={data.layer === 'far' ? "#fda4af" : "#fb7185"}
              fillOpacity={data.layer === 'far' ? 0.6 : 0.8}
            />
          </svg>
      ) : (
        // Rose Petal Shape
        <svg viewBox="0 0 30 30" fill="none" className="w-full h-full drop-shadow-sm">
            <path
            d="M15 0C15 0 25 10 25 20C25 25.5 20.5 30 15 30C9.5 30 5 25.5 5 20C5 10 15 0 15 0Z"
            fill={data.layer === 'far' ? "#fda4af" : "#f43f5e"}
            fillOpacity={data.layer === 'far' ? 0.6 : 0.8}
            />
        </svg>
      )}
    </motion.div>
  );
};

// Memoize to prevent re-renders when parent state changes
const MemoizedFlower = memo(Flower);

export default FallingFlowers;