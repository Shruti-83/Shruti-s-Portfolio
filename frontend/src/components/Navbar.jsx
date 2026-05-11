import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

// ── Inline SVG brand icons (lucide v1 removed all brand icons) ───────────────

// ────────────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const { data } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const name    = data?.hero?.name || 'Portfolio';
  const contact = data?.contact    || {};
  const resume  = data?.hero?.resumeLink;

  const firstName  = name.split(' ')[0]?.toUpperCase() || 'PORT';
  const secondName = name.split(' ')[1]?.toUpperCase() || 'FOLIO';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        menuOpen ? 'py-3 border-b border-[#00f5ff]/10' : scrolled ? 'glass border-b border-white/5 py-3' : 'py-6'
      }`}
      style={{ background: menuOpen ? 'rgba(3,3,8,0.99)' : undefined }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="relative group">
          <span className="font-display text-3xl tracking-widest text-white">
            {firstName}
          </span>
          <span
            className="font-display text-3xl tracking-widest"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 7px #00f5ff, 0 0 10px #00f5ff, 0 0 21px #00f5ff',
            }}
          >
            {secondName}
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f5ff] to-[#39ff14] group-hover:w-full transition-all duration-500" />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link font-body text-sm tracking-widest text-white/60 hover:text-[#00f5ff] transition-colors duration-300 uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Right: Socials + Resume */}
       

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span animate={menuOpen ? { rotate: 45,  y:  7 } : { rotate: 0, y: 0 }} className="block w-6 h-[2px] bg-[#00f5ff]" />
          <motion.span animate={menuOpen ? { opacity: 0 }          : { opacity: 1 }}       className="block w-6 h-[2px] bg-[#00f5ff]" />
          <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-[2px] bg-[#00f5ff]" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden border-t border-[#00f5ff]/10 overflow-hidden"
            style={{ background: 'rgba(3,3,8,0.98)', backdropFilter: 'none', boxShadow: '0 20px 60px rgba(0,0,0,0.9)' }}
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-body text-sm tracking-widest text-white/70 hover:text-[#00f5ff] uppercase transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}

              {/* Mobile socials + resume */}
            
               
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Full-screen overlay — closes menu on tap outside */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[-1] md:hidden"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', top: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;