import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative px-6 md:px-20 py-12"
      style={{
        backgroundColor: 'rgba(10, 10, 26, 0.9)',
        borderTop: '1px solid rgba(0, 255, 255, 0.2)',
      }}
    >
      <div className="max-w-[120rem] mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-2xl text-primary mb-4 tracking-wide">
              MOST WANTED
            </h3>
          </div>

          <div>
            <h4 className="font-heading text-lg text-accent-teal mb-4 tracking-wide">
              SYSTEM STATUS
            </h4>
            <div className="space-y-2 font-paragraph text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-foreground opacity-80">Database: Online</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-foreground opacity-80">Rankings: Updated</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-foreground opacity-80">Security: Active</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg text-accent-teal mb-4 tracking-wide">
              CLASSIFIED
            </h4>
            <p className="font-paragraph text-foreground text-sm leading-relaxed opacity-80">
              Access to racer profiles is restricted. Unauthorized viewing is prohibited.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted-blue">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-foreground text-xs opacity-60 tracking-wider">
              © 2026 MOST WANTED. ALL RIGHTS RESERVED.
            </p>
            <p className="font-paragraph text-primary text-xs tracking-widest">
              ENCRYPTED CONNECTION ACTIVE
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
