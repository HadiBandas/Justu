import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoveGateProps {
  onUnlock: () => void;
  onMusicStart: () => void;
}

const LoveGate: React.FC<LoveGateProps> = ({ onUnlock, onMusicStart }) => {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAnswer = answer.trim().toLowerCase();
    
    if (cleanAnswer === 'bintaro') {
      onMusicStart(); // Start music immediately on interaction
      setIsSuccess(true);
      // Wait for success animation before notifying parent
      setTimeout(onUnlock, 2000); 
    } else {
      setIsError(true);
      // Reset error shake state
      setTimeout(() => setIsError(false), 500); 
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
    >
      {/* Glass Container */}
      <div className="relative w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2rem] p-8 sm:p-12 text-center overflow-hidden">
        
        {/* Success Overlay Animation */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-rose-50/95 z-20 flex flex-col items-center justify-center"
            >
              <motion.div 
                initial={{ scale: 0.5, rotate: -10 }} 
                animate={{ scale: 1.2, rotate: 0 }} 
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-6xl mb-4"
              >
                🔓💗
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-xl text-rose-800"
              >
                Welcome, my love...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6 text-5xl filter drop-shadow-md">🔒</div>
          <h2 className="font-serif text-2xl sm:text-3xl text-rose-900 mb-3 leading-snug">
            Dimana cinta kamu tumbuh pertama kali?
          </h2>
          <p className="font-sans text-rose-500 text-xs sm:text-sm tracking-[0.15em] uppercase mb-8 opacity-80">
            Jawabannya satu kata saja…
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="relative group">
            <motion.input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (isError) setIsError(false);
              }}
              placeholder="Type here..."
              className={`w-full px-6 py-4 bg-white/50 border-2 rounded-2xl text-center text-rose-900 placeholder-rose-300 focus:outline-none focus:ring-4 transition-all font-serif text-xl ${
                isError 
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
                  : 'border-rose-100 focus:border-rose-300 focus:ring-rose-100'
              }`}
              animate={isError ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              autoFocus
            />
          </div>

          <AnimatePresence>
            {isError && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-rose-600 font-hand text-lg sm:text-xl leading-tight"
              >
                Hmm… coba ingat lagi tempat kita pernah terasa paling dekat 💗
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-serif text-lg shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!answer.trim() || isSuccess}
          >
            Masuk 💘
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default LoveGate;