import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full border-t border-primary/20 bg-background/80 backdrop-blur-sm"
    >
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="space-y-2">
            <h3 className="font-heading text-lg text-primary tracking-wider">
              DIGITAL DOSSIER
            </h3>
            <p className="font-paragraph text-xs text-foreground/60 leading-relaxed">
              Secure access to classified information
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-loading-bar animate-pulse" />
              <span className="font-paragraph text-xs text-foreground/60 tracking-wider">
                SYSTEM ACTIVE
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <p className="font-paragraph text-xs text-foreground/40 tracking-wider">
              © {new Date().getFullYear()} ENCRYPTED ROSTER
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
