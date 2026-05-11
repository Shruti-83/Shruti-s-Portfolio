import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [sections] = useState([
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Exp' },
    { id: 'contact', label: 'Contact' },
  ]);

  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[999]"
        css={{ background: 'linear-gradient(90deg, #00f5ff, #39ff14)' }}
      >
        <div
          className="w-full h-full"
          style={{ background: 'linear-gradient(90deg, #00f5ff, #39ff14)', boxShadow: '0 0 8px #00f5ff' }}
        />
      </motion.div>

      {/* Side nav dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[500] hidden xl:flex flex-col gap-4">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            title={label}
            className="group flex items-center gap-2 justify-end"
          >
            <span className="font-mono text-[9px] text-white/0 group-hover:text-white/40 tracking-widest uppercase transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              {label}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: active === id ? 8 : 5,
                height: active === id ? 8 : 5,
                background: active === id ? '#00f5ff' : 'rgba(255,255,255,0.2)',
                boxShadow: active === id ? '0 0 8px #00f5ff' : 'none',
              }}
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default ScrollProgress;