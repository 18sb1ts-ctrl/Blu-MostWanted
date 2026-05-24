import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-20 py-6"
      style={{
        backgroundColor: 'rgba(10, 10, 26, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
      }}
    >
      <div className="max-w-[120rem] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.h1
            className="font-heading text-3xl md:text-4xl text-primary tracking-wider"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            MOST WANTED
          </motion.h1>
        </Link>

        <nav className="flex items-center gap-8">
          <motion.div
            className="font-paragraph text-accent-teal text-sm tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LIVE
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
