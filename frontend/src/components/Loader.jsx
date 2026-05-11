import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 700); }, 300);
          return 100;
        }
        return p + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [onComplete]);

  const clamped = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center px-4">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage:'linear-gradient(rgba(0,245,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.05) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />

          <div className="relative mb-8 sm:mb-12">
            <motion.div animate={{ scale:[1,1.2,1], opacity:[0.3,0.1,0.3] }} transition={{ duration:2, repeat:Infinity }}
              className="absolute rounded-full"
              style={{ background:'radial-gradient(circle,rgba(0,245,255,0.3) 0%,transparent 70%)', width:160, height:160, marginLeft:-40, marginTop:-40 }} />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,245,255,0.1)" strokeWidth="2" />
                <motion.circle cx="40" cy="40" r="34" fill="none" stroke="#00f5ff" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray={`${2*Math.PI*34}`}
                  strokeDashoffset={`${2*Math.PI*34*(1-clamped/100)}`}
                  style={{ filter:'drop-shadow(0 0 6px #00f5ff)', transition:'stroke-dashoffset 0.1s ease' }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs sm:text-sm text-[#00f5ff]">{Math.round(clamped)}%</span>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} className="text-center mb-6 sm:mb-8">
            <div className="font-display text-3xl sm:text-5xl tracking-[0.3em] text-white mb-2">PORTFOLIO</div>
            <div className="font-mono text-[9px] sm:text-xs text-white/30 tracking-[0.5em] uppercase">Loading experience</div>
          </motion.div>

          <div className="w-48 sm:w-64 h-[2px] bg-white/5 overflow-hidden">
            <motion.div className="h-full"
              style={{ width:`${clamped}%`, background:'linear-gradient(90deg,#00f5ff,#39ff14)', boxShadow:'0 0 10px #00f5ff', transition:'width 0.1s ease' }} />
          </div>

          <motion.div animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:1.5, repeat:Infinity }}
            className="mt-3 sm:mt-4 font-mono text-[9px] sm:text-[10px] text-white/20 tracking-[0.4em] uppercase">
            Initializing 3D environment
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;