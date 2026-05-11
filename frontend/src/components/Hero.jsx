import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import HeroCanvas from '../canvas/HeroCanvas';
import { usePortfolio } from '../context/PortfolioContext';

const TYPING_WORDS = ['Developer', 'Designer', 'Creator', 'Builder', 'Innovator'];

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Hero = () => {
  const { data } = usePortfolio();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const word = TYPING_WORDS[wordIndex];
    if (!deleting && displayed.length < word.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
    } else if (!deleting && displayed.length === word.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, wordIndex]);

  const hero    = data?.hero    || {};
  const contact = data?.contact || {};

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] opacity-30"
        style={{ backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(0,245,255,0.04) 0%,transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-row lg:justify-between gap-10">

          {/* Left text */}
          <div className="flex-1 max-w-2xl w-full">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6"
            >
              <span className="w-6 sm:w-8 h-[2px] bg-[#00f5ff]" />
              <span className="font-mono text-[#00f5ff] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-wider text-white mb-2"
              style={{ textShadow: '0 0 80px rgba(0,245,255,0.15)' }}
            >
              {hero.name || 'YOUR NAME'}
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <span className="font-body text-base sm:text-xl md:text-2xl text-white/50">I am a</span>
              <span className="font-body text-base sm:text-xl md:text-2xl font-semibold typing-cursor" style={{ color: '#00f5ff', textShadow: '0 0 10px #00f5ff' }}>
                {displayed}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="font-body text-sm sm:text-base lg:text-lg text-white/40 leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0"
            >
              {hero.subTagline || 'Building beautiful digital experiences that push the boundaries of the web.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <a href="#projects"
                className="group relative px-5 sm:px-8 py-3 sm:py-4 bg-[#00f5ff] text-black font-body font-semibold text-xs sm:text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}>
                <span className="relative z-10">{hero.ctaText || 'Explore My Work'}</span>
                <span className="absolute inset-0 bg-[#39ff14] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a href="#contact"
                className="px-5 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-body text-xs sm:text-sm tracking-widest uppercase hover:border-[#00f5ff] hover:text-[#00f5ff] transition-all duration-300">
                Get In Touch
              </a>
              {hero.resumeLink && (
                <a href={hero.resumeLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 border border-[#39ff14]/30 text-[#39ff14] font-body text-xs sm:text-sm tracking-widest uppercase hover:border-[#39ff14] transition-all duration-300">
                  <Download size={13} /> Resume
                </a>
              )}
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="flex items-center justify-center lg:justify-start gap-5 sm:gap-6"
            >
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noreferrer" className="text-white/30 hover:text-[#00f5ff] transition-colors duration-300"><GithubIcon size={18} /></a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-white/30 hover:text-[#00f5ff] transition-colors duration-300"><LinkedinIcon size={18} /></a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} target="_blank" rel="noreferrer" className="text-white/30 hover:text-[#00f5ff] transition-colors duration-300"><TwitterIcon size={18} /></a>
              )}
              <span className="hidden sm:block w-12 sm:w-16 h-[1px] bg-white/10" />
              <span className="hidden sm:block font-mono text-xs text-white/20 tracking-widest">SCROLL DOWN</span>
            </motion.div>
          </div>

          {/* Right: floating badge — hidden on mobile/tablet, shown on lg+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex relative w-56 xl:w-64 h-56 xl:h-64 items-center justify-center flex-shrink-0"
            style={{ perspective: '800px' }}
          >
            <div className="absolute inset-0 rounded-full border border-[#00f5ff]/20 animate-rotate-slow" />
            <div className="absolute inset-4 rounded-full border border-[#39ff14]/10" style={{ animation: 'rotateSlow 15s linear infinite reverse' }} />
            <div className="relative glass rounded-2xl p-6 xl:p-8 text-center animate-float"
              style={{ boxShadow: '0 0 60px rgba(0,245,255,0.15),inset 0 0 40px rgba(0,245,255,0.03)' }}>
              <div className="font-display text-5xl xl:text-6xl leading-none" style={{ color: '#00f5ff', textShadow: '0 0 7px #00f5ff,0 0 10px #00f5ff,0 0 21px #00f5ff' }}>
                {data?.about?.stats?.[0]?.value || '3+'}
              </div>
              <div className="font-mono text-xs text-white/40 tracking-widest mt-1 uppercase">
                {data?.about?.stats?.[0]?.label || 'Years Exp'}
              </div>
            </div>
            {[0,1,2,3].map((i) => (
              <div key={i} className="absolute w-2 h-2 rounded-full bg-[#00f5ff]"
                style={{ top:'50%', left:'50%', transform:`rotate(${i*90}deg) translateX(110px)`, animation:`orbit ${8+i*2}s linear infinite`, boxShadow:'0 0 8px #00f5ff', marginTop:'-4px', marginLeft:'-4px' }} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#about"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 hover:text-[#00f5ff] transition-colors duration-300">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;