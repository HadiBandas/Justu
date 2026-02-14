import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FallingFlowers from './components/FallingFlowers';
import ClickPetals from './components/ClickPetals';
import Rose from './components/Rose';
import LoveLetter from './components/LoveLetter';
import FlyingEnvelope from './components/FlyingEnvelope';
import LoadingScreen from './components/LoadingScreen';
import LoveGate from './components/LoveGate';
import { BloomStage } from './types';
import { ROMANTIC_LINES, TOTAL_STAGES, INTRO_TEXT } from './constants';

type AppState = 'loading' | 'gate' | 'main';

const App: React.FC = () => {
  // Global App Flow State
  const [appState, setAppState] = useState<AppState>('loading');
  
  // Main Content State
  const [step, setStep] = useState<number>(0); 
  // 0 = Intro, 1-7 = Journey, >7 = Envelope
  
  const [bloomStage, setBloomStage] = useState<BloomStage>(0);
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [lastBurstId, setLastBurstId] = useState(0);
  
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  // Audio Player Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Audio Setup ---
  useEffect(() => {
    const audio = new Audio('/Perfect_mixdown.mp3');
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // --- Handlers ---

  const handleLoadingComplete = () => {
    setAppState('gate');
  };

  const handleMusicStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked; will retry on next user interaction
      });
    }
  };

  const handleGateUnlock = () => {
    // Trigger a massive petal rain effect via step manipulation temporarily
    setStep(7); // Max flowers
    setTimeout(() => {
        setStep(0); // Reset for Intro
        setAppState('main');
    }, 1500);
  };

  const handleStart = () => {
    setStep(1);
    setBloomStage(1);
  };

  const handleGlobalTap = (e: React.MouseEvent) => {
    // Only allow bursts if not in loading state
    if (appState === 'loading') return;

    const newBurstId = lastBurstId + 1;
    setLastBurstId(newBurstId);
    setBursts(prev => [...prev, { id: newBurstId, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== newBurstId));
    }, 2000);
  };

  const handleRoseClick = (e: React.MouseEvent) => {
    if (step >= TOTAL_STAGES) return;

    const nextStep = step + 1;
    setStep(nextStep);
    setBloomStage(Math.min(nextStep, 7) as BloomStage);

    if (nextStep === TOTAL_STAGES) {
      setTimeout(() => {
        setShowEnvelope(true);
      }, 5000);
    }
  };

  const handleEnvelopeOpen = () => {
    setShowLetter(true);
  };

  const handleReplay = () => {
    setStep(0);
    setBloomStage(0);
    setShowEnvelope(false);
    setShowLetter(false);
    setBursts([]);
    // Restart music on replay
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div 
      onClick={handleGlobalTap}
      className={`relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center font-sans transition-colors duration-1000 cursor-pointer ${step === 7 ? 'bg-[#fff0f3]' : 'bg-gradient-to-b from-rose-50 via-white to-rose-100'}`}
    >
      {/* Audio is handled via audioRef, no visible element needed */}
      
      {/* 1. Global Ambient Layer */}
      {/* 
         FallingFlowers persists across all states.
         During 'loading' or 'gate', step is 0 (low density).
         On unlock, step momentarily hits 7 (high density) for effect.
      */}
      <FallingFlowers stage={step > 7 ? 7 : step} />
      <ClickPetals bursts={bursts} />

      {/* 2. Main Content Controller */}
      <div className="relative z-10 w-full h-[100dvh] flex flex-col items-center justify-center">
        
        <AnimatePresence mode='wait'>
            
            {/* PHASE 1: LOADING */}
            {appState === 'loading' && (
                <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
            )}

            {/* PHASE 2: GATE */}
            {appState === 'gate' && (
                <LoveGate 
                  key="gate" 
                  onUnlock={handleGateUnlock} 
                  onMusicStart={handleMusicStart}
                />
            )}

            {/* PHASE 3: MAIN EXPERIENCE */}
            {appState === 'main' && (
                <motion.div 
                    key="main" 
                    className="w-full h-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <AnimatePresence mode='wait'>
                        {/* SCENE A: INTRO */}
                        {step === 0 && (
                            <motion.div 
                                key="intro"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                transition={{ duration: 1.2 }}
                                className="text-center px-4 max-w-xl w-full flex flex-col items-center justify-center h-full"
                            >
                                <div className="flex-1 flex flex-col justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 1 }}
                                    >
                                        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-rose-900 mb-6 tracking-tight drop-shadow-sm leading-tight">
                                            {INTRO_TEXT.title}
                                        </h1>
                                        <p className="font-light text-rose-700 text-base sm:text-lg md:text-2xl mb-8 tracking-wide font-serif italic">
                                            {INTRO_TEXT.subtitle}
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5, duration: 1 }}
                                        className="space-y-8"
                                    >
                                        <p className="text-rose-500 font-display text-xs sm:text-sm tracking-[0.2em] uppercase animate-pulse">
                                            {INTRO_TEXT.instruction}
                                        </p>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStart();
                                            }}
                                            className="px-10 py-3 sm:px-12 sm:py-4 bg-white/80 backdrop-blur-md border border-rose-200 text-rose-800 rounded-full font-serif text-lg sm:text-xl shadow-xl hover:bg-rose-50 hover:scale-105 hover:shadow-rose-200/50 transition-all duration-500 group active:scale-95"
                                        >
                                            {INTRO_TEXT.cta}
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {/* SCENE B: ROSE JOURNEY */}
                        {!showLetter && step >= 1 && (
                            <motion.div 
                                key="journey"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 flex flex-col w-full h-full pointer-events-none"
                            >
                                {/* Envelope Overlay */}
                                <AnimatePresence>
                                    {showEnvelope && (
                                        <motion.div 
                                            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto bg-white/30 backdrop-blur-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <FlyingEnvelope onClick={handleEnvelopeOpen} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Top: Rose */}
                                <div className="flex-1 flex items-center justify-center pointer-events-auto relative mt-4">
                                    <motion.div 
                                        className="relative"
                                        animate={{ 
                                            opacity: showEnvelope ? 0.3 : 1, 
                                            scale: showEnvelope ? 0.9 : 1,
                                        }}
                                        transition={{ duration: 1 }}
                                    >
                                        <Rose 
                                            stage={bloomStage} 
                                            onClick={handleRoseClick} 
                                            isClickable={!showEnvelope && step <= TOTAL_STAGES} 
                                        />
                                    </motion.div>
                                </div>

                                {/* Bottom: Text */}
                                <div className={`w-full px-6 pb-12 pt-4 transition-all duration-500 flex flex-col items-center justify-end ${showEnvelope ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                                    <div className="w-full max-w-md bg-white/60 backdrop-blur-md border border-white/50 shadow-xl rounded-3xl p-6 sm:p-8 pointer-events-auto transform transition-all">
                                        <motion.div 
                                            className="flex flex-col items-center gap-2 w-full mb-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="text-[10px] sm:text-xs text-rose-500 font-display tracking-[0.2em] uppercase">
                                                Blooming: {step} / {TOTAL_STAGES}
                                            </div>
                                            <div className="w-full h-1 bg-rose-200/50 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-rose-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(step / TOTAL_STAGES) * 100}%` }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                />
                                            </div>
                                        </motion.div>

                                        <div className="min-h-[80px] flex items-center justify-center">
                                            <AnimatePresence mode='wait'>
                                                <motion.div
                                                    key={step}
                                                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                    exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <p className="font-serif text-lg sm:text-2xl text-rose-900 leading-relaxed text-center drop-shadow-sm">
                                                        "{ROMANTIC_LINES[step - 1]}"
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                        
                                        <p className="text-rose-400/80 text-xs text-center font-serif italic mt-2">
                                            {step < TOTAL_STAGES ? "Tap anywhere to continue..." : "One moment..."}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* SCENE C: FINAL LETTER */}
                        {showLetter && (
                            <div className="pointer-events-auto w-full h-full flex items-center justify-center">
                                <LoveLetter key="letter" onReplay={handleReplay} />
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;