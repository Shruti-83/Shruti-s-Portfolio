import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { data } = usePortfolio();
  const name = data?.hero?.name || 'Your Name';

  return (
    <footer className="relative py-10 sm:py-12 bg-void border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* Logo */}
          <motion.a href="#hero" whileHover={{ scale: 1.05 }} className="font-display text-2xl sm:text-3xl tracking-widest">
            <span className="text-white">{name.split(' ')[0]?.toUpperCase()}</span>
            <span style={{ color:'#00f5ff', textShadow:'0 0 7px #00f5ff,0 0 10px #00f5ff' }}>{name.split(' ')[1]?.toUpperCase() || ''}</span>
          </motion.a>

          {/* Nav links — wrap on mobile */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {['Home','About','Skills','Projects','Experience','Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-white/30 hover:text-[#00f5ff] uppercase transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-white/20 tracking-widest">
            <span>Built with</span>
            <Heart size={9} className="text-[#ff4500]" fill="#ff4500" />
            <span>by {name}</span>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-8 sm:mt-10 overflow-hidden border-t border-white/5 pt-5 sm:pt-6">
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12 sm:gap-16 whitespace-nowrap">
            {Array(8).fill(['React','Node.js','MongoDB','Three.js','MERN Stack','Tailwind CSS','Vite','Express']).flat().map((tech, i) => (
              <span key={i} className="font-display text-[10px] sm:text-xs tracking-[0.4em] text-white/10 uppercase">
                {tech} <span className="text-[#00f5ff]/20 mx-3 sm:mx-4">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;