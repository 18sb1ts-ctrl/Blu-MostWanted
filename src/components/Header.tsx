import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full border-b border-primary/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-[120rem] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary animate-pulse" />
          <h1 className="font-heading text-2xl md:text-3xl text-primary tracking-wider">
            Blu-Blacklist.com
          </h1>
        </div>
        
        <div className="font-paragraph text-xs text-foreground/60 tracking-wider hidden md:block">
          ENCRYPTED ROSTER
        </div>
      </div>
    </motion.header>
  );
}
