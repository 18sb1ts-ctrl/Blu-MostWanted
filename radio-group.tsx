// HPI 1.7-G
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Crosshair, Cpu, Database, Terminal } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { MostWantedRacers } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const [encryptedText, setEncryptedText] = useState('');
  const [racers, setRacers] = useState<MostWantedRacers[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [slideDir, setSlideDir] = useState(1);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?{}[]';
  const finalText = 'MOST WANTED';

  useEffect(() => {
    loadRacers();
  }, []);

  const loadRacers = async () => {
    try {
      const result = await BaseCrudService.getAll<MostWantedRacers>('mostwantedracers');
      // Sort descending by ranking (10 to 1)
      const sortedRacers = result.items.sort((a, b) => (b.ranking || 0) - (a.ranking || 0));
      setRacers(sortedRacers);
      setIsDataLoading(false);
    } catch (error) {
      console.error('Failed to load racers:', error);
      setIsDataLoading(false);
    }
  };

  // 10-second loading sequence
  useEffect(() => {
    if (encryptionProgress < 100) {
      const timer = setTimeout(() => {
        setEncryptionProgress(prev => Math.min(prev + 1, 100));
      }, 100); // 100 * 100ms = 10 seconds
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [encryptionProgress]);

  // Text scrambling effect
  useEffect(() => {
    if (encryptionProgress < 100) {
      const interval = setInterval(() => {
        let result = '';
        for (let i = 0; i < finalText.length; i++) {
          if (i < (finalText.length * encryptionProgress) / 100) {
            result += finalText[i];
          } else {
            result += characters[Math.floor(Math.random() * characters.length)];
          }
        }
        setEncryptedText(result);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setEncryptedText(finalText);
    }
  }, [encryptionProgress]);

  const handleNavigate = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < racers.length - 1) {
      setSlideDir(1);
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setSlideDir(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, racers.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;
      if (e.key === 'ArrowUp') handleNavigate('up');
      if (e.key === 'ArrowDown') handleNavigate('down');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate, isLoading]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 150 : -150,
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
    }),
  };

  const currentRacer = racers[currentIndex];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground flex flex-col">
      <style dangerouslySetInnerHTML={{
        __html: `
        .tech-clip { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%); }
        .tech-clip-reverse { clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px); }
        .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3)); background-size: 100% 4px; }
        .text-stroke { -webkit-text-stroke: 2px rgba(0, 255, 255, 0.15); color: transparent; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(26, 42, 74, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 255, 0.5); }
        .grid-bg { background-image: linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 40px 40px; }
      `}} />

      <Header />

      {/* Loading Sequence Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-4xl px-8 relative z-10 flex flex-col items-center"
            >
              <Terminal className="w-12 h-12 text-primary mb-8 opacity-50 animate-pulse" />
              
              <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl text-primary text-center mb-12 tracking-[0.2em] drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] whitespace-nowrap">
                {encryptedText}
              </h1>

              <div className="w-full max-w-2xl relative">
                {/* Decorative brackets for progress bar */}
                <div className="absolute -left-4 -top-4 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute -right-4 -bottom-4 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
                
                <div className="w-full h-2 bg-muted-blue/30 overflow-hidden backdrop-blur-sm border border-primary/20">
                  <motion.div
                    className="h-full bg-primary relative"
                    style={{ width: `${encryptionProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-[shimmer_2s_infinite]" />
                  </motion.div>
                </div>
                
                <div className="flex justify-between mt-4 font-paragraph text-accent-teal text-xs md:text-sm tracking-widest uppercase">
                  <span>SYS.DECRYPT_SEQ</span>
                  <span>{encryptionProgress.toString().padStart(3, '0')}%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard */}
      <main className="flex-grow relative flex items-center justify-center overflow-hidden py-20">
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-accent-teal/5 rounded-full blur-[120px]" />
        </div>

        <div className="w-full max-w-[120rem] mx-auto px-4 md:px-8 lg:px-12 relative z-10 h-full min-h-[70vh] flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Navigation Panel (Desktop) */}
          <div className="hidden lg:flex flex-col justify-between w-24 border-r border-primary/10 py-8 relative">
            <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-primary to-transparent" />
            
            <div className="writing-vertical-rl transform rotate-180 font-paragraph text-primary/40 tracking-[0.3em] text-xs uppercase flex items-center gap-4">
              <Database className="w-4 h-4 transform rotate-90" />
              DATABASE // ELITE_RACERS
            </div>

            <div className="flex flex-col gap-6 items-center">
              <button
                onClick={() => handleNavigate('up')}
                disabled={currentIndex === racers.length - 1}
                className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 tech-clip"
                aria-label="Next Racer"
              >
                <ChevronUp className="w-6 h-6" />
              </button>
              
              <div className="font-paragraph text-accent-teal text-sm tracking-widest">
                {currentRacer?.ranking?.toString().padStart(2, '0') || '00'}
              </div>

              <button
                onClick={() => handleNavigate('down')}
                disabled={currentIndex === 0}
                className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 tech-clip-reverse"
                aria-label="Previous Racer"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow relative h-full flex items-center">
            {isDataLoading ? (
              <div className="w-full flex justify-center items-center font-paragraph text-primary animate-pulse tracking-widest">
                ESTABLISHING CONNECTION...
              </div>
            ) : racers.length === 0 ? (
              <div className="w-full flex justify-center items-center font-paragraph text-destructive tracking-widest">
                NO RECORDS FOUND
              </div>
            ) : (
              <div className="w-full h-full relative">
                <AnimatePresence mode="wait" custom={slideDir}>
                  <motion.div
                    key={currentRacer?._id || 'empty'}
                    custom={slideDir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
                  >
                    
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 h-[40vh] lg:h-[70vh] relative group">
                      {/* Decorative HUD Elements */}
                      <div className="absolute -top-2 -left-2 w-16 h-16 border-t border-l border-primary/50 z-20 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
                      <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b border-r border-primary/50 z-20 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                      <Crosshair className="absolute top-4 right-4 w-6 h-6 text-primary/30 z-20 animate-[spin_10s_linear_infinite]" />
                      
                      <div className="w-full h-full tech-clip relative overflow-hidden border border-primary/20 bg-muted-blue/10 backdrop-blur-md">
                        {currentRacer?.racerImage ? (
                          <Image
                            src={currentRacer.racerImage}
                            alt={currentRacer.racerName || 'Racer'}
                            className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 scale-105 group-hover:scale-100"
                            width={1200}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-muted-blue/20">
                            <Cpu className="w-16 h-16 text-primary/20 mb-4" />
                            <span className="font-paragraph text-primary/40 tracking-widest">IMAGE_NOT_FOUND</span>
                          </div>
                        )}
                        
                        {/* Overlays */}
                        <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                      </div>

                      {/* Massive Background Rank */}
                      <div className="absolute -right-4 lg:-right-24 -bottom-12 lg:bottom-0 font-heading text-[8rem] lg:text-[16rem] leading-none text-stroke pointer-events-none select-none z-0">
                        {currentRacer?.ranking?.toString().padStart(2, '0') || '00'}
                      </div>
                    </div>

                    {/* Data Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 lg:space-y-12 relative z-10">
                      
                      {/* Header Info */}
                      <div className="relative">
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-primary/10 border border-primary/30 font-paragraph text-primary text-xs tracking-widest uppercase">
                              RANK // {currentRacer?.ranking || 'N/A'}
                            </span>
                            <span className="h-[1px] flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
                          </div>
                          
                          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground uppercase tracking-wider drop-shadow-[0_0_15px_rgba(0,255,255,0.2)] leading-none">
                            {currentRacer?.racerName || 'UNKNOWN'}
                          </h2>
                        </motion.div>
                      </div>

                      {/* History Dossier */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.4, duration: 0.5 }} 
                        className="relative group"
                      >
                        <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent-teal to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="pl-6">
                          <h4 className="font-paragraph text-primary/60 text-sm tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Terminal className="w-4 h-4" />
                            DOSSIER // HISTORY
                          </h4>
                          
                          <div className="relative bg-muted-blue/10 border border-primary/10 p-6 backdrop-blur-sm tech-clip-reverse">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 to-transparent" />
                            <div className="font-paragraph text-foreground/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap max-h-[30vh] overflow-y-auto pr-4 custom-scrollbar">
                              {currentRacer?.racerHistory || 'No historical data available in current database.'}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Navigation (Visible only on small screens) */}
          <div className="lg:hidden flex justify-center items-center gap-8 mt-8 border-t border-primary/10 pt-8">
            <button
              onClick={() => handleNavigate('down')}
              disabled={currentIndex === 0}
              className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary/10 disabled:opacity-20 tech-clip-reverse"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
            
            <div className="font-paragraph text-accent-teal text-sm tracking-widest">
              {(currentIndex + 1).toString().padStart(2, '0')} / {racers.length.toString().padStart(2, '0')}
            </div>

            <button
              onClick={() => handleNavigate('up')}
              disabled={currentIndex === racers.length - 1}
              className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary/10 disabled:opacity-20 tech-clip"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
