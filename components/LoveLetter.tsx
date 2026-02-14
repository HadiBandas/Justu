import React from 'react';
import { motion } from 'framer-motion';
import { LETTER_CONTENT } from '../constants';

interface LoveLetterProps {
  onReplay: () => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ onReplay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative z-20 w-full max-w-2xl px-4 flex flex-col items-center justify-center h-full max-h-[100dvh]"
    >
      {/* 
         Elegant Scrolling Implementation:
         1. scrollbar-hide: CSS class added in index.html to hide the bar visually
         2. mask-image or bottom gradient: Added a decorative gradient at the bottom
            to hint at more content while keeping the UI clean.
      */}
      <div className="glass-panel w-full rounded-3xl shadow-2xl relative bg-white/70 max-h-[80dvh] flex flex-col overflow-hidden border border-white/50">
        
        {/* Scrollable Container */}
        <div className="overflow-y-auto scrollbar-hide p-6 sm:p-10 md:p-14 pb-20">
            {/* Header */}
            <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center mb-6 sm:mb-10"
            >
                <h2 className="font-script text-3xl sm:text-4xl md:text-6xl text-rose-800 drop-shadow-sm leading-tight">
                {LETTER_CONTENT.title}
                </h2>
            </motion.div>

            {/* Body Content */}
            <div className="space-y-4 sm:space-y-6 text-rose-950 font-serif leading-relaxed text-base sm:text-lg md:text-xl text-left md:text-justify opacity-90">
            {LETTER_CONTENT.body.map((paragraph, idx) => (
                <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + idx * 1.5, duration: 1 }}
                >
                {paragraph}
                </motion.p>
            ))}
            </div>

            {/* Signature */}
            <motion.div 
            className="mt-8 sm:mt-12 text-center md:text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 8 }}
            >
            <div className="font-hand text-2xl sm:text-3xl md:text-5xl text-rose-700">
                {LETTER_CONTENT.signature.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
                className="mt-10 sm:mt-16 flex flex-col items-center gap-4 pb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 9 }}
            >
                <div className="flex gap-4">
                    <button 
                        onClick={onReplay}
                        className="px-6 py-3 sm:px-8 sm:py-3 bg-rose-600 text-white rounded-full font-serif text-base sm:text-lg shadow-lg hover:bg-rose-700 hover:shadow-rose-400/50 transition-all duration-300 active:scale-95"
                    >
                        Replay Journey 💘
                    </button>
                </div>

                {/* Final Soft Ending State - Moved below button */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 10, duration: 2 }} 
                    className="text-sm sm:text-base text-rose-500/80 font-hand mt-4 mb-2 text-center"
                >
                    If you’re smiling right now… then my Valentine is complete.
                </motion.p>

                <p className="text-[10px] sm:text-xs text-rose-400 font-display tracking-widest uppercase mt-2 opacity-60">
                    {LETTER_CONTENT.footer}
                </p>
            </motion.div>
        </div>

        {/* Elegant Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none rounded-b-3xl" />
      </div>
    </motion.div>
  );
};

export default LoveLetter;