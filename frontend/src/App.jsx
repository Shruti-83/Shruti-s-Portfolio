import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PortfolioProvider } from './context/PortfolioContext';
import { useReveal } from './hooks/useInView';

// Components
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Inner app uses reveal hook (needs DOM)
const AppInner = () => {
  useReveal();
  return (
    <main className="noise scanlines">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
};

const App = () => {
  const [loaded, setLoaded] = useState(false);

  // Smooth lenis scroll
  useEffect(() => {
    let lenis;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    });
    return () => lenis?.destroy();
  }, []);

  return (
    <PortfolioProvider>
      {/* Custom cursor */}
      <Cursor />

      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main content */}
      {loaded && (
        <>
          <ScrollProgress />
          <Navbar />
          <AppInner />
        </>
      )}
    </PortfolioProvider>
  );
};

export default App;