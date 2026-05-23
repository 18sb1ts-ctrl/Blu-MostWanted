// HPI 1.7-G
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { MostWantedList } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ChevronDown, ChevronUp, Crosshair, Database } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [showEncryption, setShowEncryption] = useState(true);
  const [encryptedText, setEncryptedText] = useState('');
  const [items, setItems] = useState<MostWantedList[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const targetText = 'MOST WANTED';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await BaseCrudService.getAll<MostWantedList>('mostwantedlist');
      // Sort descending so rank 10 is at index 0, rank 9 at index 1, etc.
      const sortedItems = result.items.sort((a, b) => (b.rank || 0) - (a.rank || 0));
      setItems(sortedItems);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!showEncryption) return;

    let frame = 0;
    const totalFrames = 100; // ~15 seconds at 100ms interval
    const interval = setInterval(() => {
      frame++;

      if (frame >= totalFrames) {
        setEncryptedText(targetText);
        setTimeout(() => setShowEncryption(false), 1000);
        clearInterval(interval);
        return;
      }

      const progress = frame / totalFrames;
      let result = '';

      for (let i = 0; i < targetText.length; i++) {
        const charProgress = Math.max(0, (progress - i / targetText.length) * targetText.length);

        if (charProgress >= 1) {
          result += targetText[i];
        } else if (charProgress > 0) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setEncryptedText(result);
    }, 100);

    return () => clearInterval(interval);
  }, [showEncryption]);

  const handleNavigate = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem = items[currentIndex];

  if (showEncryption) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
        <style>{`
          .crt-flicker {
            animation: flicker 0.15s infinite;
          }
          @keyframes flicker {
            0% { opacity: 0.95; }
            50% { opacity: 1; }
            100% { opacity: 0.95; }
          }
          .scanline-bg {
            background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 255, 0.05) 51%);
            background-size: 100% 4px;
          }
        `}</style>
        <div className="absolute inset-0 scanline-bg pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)] z-0" />

        <div className="text-center z-20 relative w-full max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-paragraph text-4xl md:text-7xl text-primary tracking-[0.2em] crt-flicker drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
          >
            {encryptedText}
          </motion.div>

          <div className="mt-12 relative h-1 w-full max-w-2xl mx-auto bg-primary/20 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 15, ease: 'linear' }}
              className="absolute top-0 left-0 h-full bg-loading-bar shadow-[0_0_10px_#0066FF]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 font-paragraph text-xs text-primary/50 uppercase tracking-widest"
          >
            Decrypting Secure Dossier...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-clip selection:bg-primary selection:text-primary-foreground">
      <style>{`
        .hud-clip {
          clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
        }
        .hud-clip-reverse {
          clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
        }
        .scanline-overlay {
          background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 255, 0.1) 51%);
          background-size: 100% 4px;
          animation: scan 10s linear infinite;
        }
        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 100vh; }
        }
        .tech-border {
          background:
            linear-gradient(90deg, var(--tw-colors-primary) 50%, transparent 50%),
            linear-gradient(90deg, var(--tw-colors-primary) 50%, transparent 50%),
            linear-gradient(0deg, var(--tw-colors-primary) 50%, transparent 50%),
            linear-gradient(0deg, var(--tw-colors-primary) 50%, transparent 50%);
          background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
          background-size: 10px 1px, 10px 1px, 1px 10px, 1px 10px;
          background-position: 0 0, 0 100%, 0 0, 100% 0;
        }
      `}</style>

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-24 relative z-10">
        <div className="w-full max-w-[100rem] mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
              <Activity className="w-12 h-12 text-primary animate-pulse" />
              <span className="font-paragraph text-primary tracking-widest uppercase text-sm">Accessing Database...</span>
            </div>
          ) : !currentItem ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
              <Database className="w-12 h-12 text-destructive" />
              <span className="font-paragraph text-destructive tracking-widest uppercase text-sm">No Records Found</span>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">

              {/* Left Column: Visual Dossier */}
              <div className="lg:col-span-6 relative group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem._id}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full min-h-[60vh] lg:min-h-[80vh] hud-clip bg-primary/5 p-[1px]"
                  >
                    <div className="absolute inset-0 bg-background hud-clip" />

                    {/* Image Container */}
                    <div className="relative w-full h-full hud-clip overflow-hidden bg-background">
                      <Image
                        src={currentItem.personImage || 'https://static.wixstatic.com/media/bd1230_c08d7d6aea9e4246a208c58f6efd3462~mv2.png?originWidth=960&originHeight=768'}
                        alt={currentItem.personName || 'Unknown Target'}
                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                        width={1000}
                      />

                      {/* Tech Overlays */}
                      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-50" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                      {/* Targeting Reticle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/30 rounded-full flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Crosshair className="w-8 h-8 text-primary/50" />
                        <div className="absolute w-full h-[1px] bg-primary/20" />
                        <div className="absolute h-full w-[1px] bg-primary/20" />
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/70" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/70" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/70" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/70" />

                      {/* Status Badge */}
                      <div className="absolute top-6 right-6 bg-destructive/20 border border-destructive/50 px-3 py-1 backdrop-blur-md">
                        <span className="font-paragraph text-xs text-destructive uppercase tracking-widest animate-pulse">
                          Target Active
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Data Readout */}
              <div className="lg:col-span-6 flex flex-col justify-between py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`data-${currentItem._id}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12"
                  >
                    {/* Header / Rank */}
                    <div className="space-y-4 border-b border-primary/20 pb-8 relative">
                      <div className="absolute left-0 bottom-0 w-1/3 h-[1px] bg-primary shadow-[0_0_10px_#00FFFF]" />

                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-primary/20" />
                        <span className="font-paragraph text-primary text-sm tracking-[0.3em] uppercase">
                          Threat Level
                        </span>
                      </div>

                      <div className="flex items-baseline gap-6">
                        <span className="font-paragraph text-2xl text-primary/50">#</span>
                        <h1 className="font-heading text-8xl md:text-[10rem] text-foreground leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                          {currentItem.rank || '00'}
                        </h1>
                      </div>
                    </div>

                    {/* Identity */}
                    <div className="space-y-6">
                      <div>
                        <span className="font-paragraph text-xs text-primary/60 uppercase tracking-widest block mb-2">
                          Racing Alias
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl text-primary uppercase tracking-wide">
                          {currentItem.personName || 'UNKNOWN_ENTITY'}
                        </h2>
                      </div>

                      <div className="hud-clip-reverse bg-glassmorphism-overlay border border-primary/10 p-6 md:p-8 backdrop-blur-sm relative group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                        <span className="font-paragraph text-xs text-primary/60 uppercase tracking-widest block mb-4">
                          Profile Overview
                        </span>
                        <p className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {(currentItem.description || '').replaceAll('|', '\n')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation & System Status */}
                <div className="mt-16 pt-8 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">

                  {/* Controls */}
                  <div className="flex gap-4 w-full md:w-auto">
                    <button
                      onClick={() => handleNavigate('up')}
                      disabled={currentIndex >= items.length - 1}
                      className="flex-1 md:flex-none group relative px-8 py-4 bg-primary/10 border border-primary/50 text-primary font-paragraph text-sm tracking-[0.2em] uppercase overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Ascend list"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                      <span className="relative flex items-center justify-center gap-2">
                        <ChevronUp className="w-4 h-4" />
                        Ascend
                      </span>
                    </button>

                    <button
                      onClick={() => handleNavigate('down')}
                      disabled={currentIndex <= 0}
                      className="flex-1 md:flex-none group relative px-8 py-4 bg-transparent border border-primary/30 text-primary/70 font-paragraph text-sm tracking-[0.2em] uppercase overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all duration-300"
                      aria-label="Descend list"
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        <ChevronDown className="w-4 h-4" />
                        Descend
                      </span>
                    </button>
                  </div>

                  {/* Database Progress */}
                  <div className="w-full md:w-1/3 space-y-2">
                    <div className="flex justify-between font-paragraph text-xs text-primary/60 uppercase tracking-widest">
                      <span>Database Index</span>
                      <span>{currentIndex + 1} / {items.length}</span>
                    </div>
                    <div className="h-1 w-full bg-primary/10 flex gap-1">
                      {items.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-full flex-1 transition-all duration-500 ${
                            idx === currentIndex
                              ? 'bg-primary shadow-[0_0_8px_#00FFFF]'
                              : idx < currentIndex
                                ? 'bg-primary/40'
                                : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
