import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { usePortfolio } from '../context/PortfolioContext';
import FloatingParticles from './FloatingParticles';

const About = () => {
  const { data } = usePortfolio();
  const { ref, inView } = useInView(0.15);
  const about = data?.about || {};

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 bg-plasma overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingParticles color={0x39ff14} count={300} opacity={0.25} />
      </div>
      <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00f5ff]/20 to-transparent" />
      <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#39ff14]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="font-mono text-[#00f5ff] text-xs sm:text-sm tracking-[0.3em] uppercase">01.</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider">
            About <span style={{ background:'linear-gradient(135deg,#00f5ff 0%,#39ff14 50%,#ff4500 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Me</span>
          </h2>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-[#00f5ff]/30 to-transparent ml-2 sm:ml-4" />
        </motion.div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <motion.div variants={itemVariants} className="relative group mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            <div className="relative aspect-square w-full">
              <div className="absolute inset-4 blob" style={{ background:'linear-gradient(135deg,rgba(0,245,255,0.1),rgba(57,255,20,0.05))', filter:'blur(20px)' }} />
              <div className="relative w-full h-full overflow-hidden"
                style={{ clipPath:'polygon(10% 0%,100% 0%,90% 100%,0% 100%)', border:'1px solid rgba(0,245,255,0.2)' }}>
                {about.image ? (
                  <img src={about.image} alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background:'rgba(255,255,255,0.05)' }}>
                    <span className="font-display text-8xl text-white/10">{data?.hero?.name?.[0] || 'Y'}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute top-0 left-[10%] w-6 sm:w-8 h-6 sm:h-8 border-t border-l border-[#00f5ff]" />
              <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b border-r border-[#39ff14]" />
              {/* Floating tag */}
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 sm:-bottom-6 right-2 sm:-right-6 glass px-3 sm:px-4 py-2 sm:py-3 border border-[#00f5ff]/20"
                style={{ boxShadow:'0 0 20px rgba(0,245,255,0.1)' }}>
                <div className="font-mono text-[9px] sm:text-xs text-[#00f5ff] tracking-widest">STATUS</div>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#39ff14] animate-pulse" />
                  <span className="font-body text-xs sm:text-sm text-white/70">Available for work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="space-y-5 sm:space-y-6">
            <motion.p variants={itemVariants} className="font-body text-base sm:text-lg text-white/60 leading-relaxed">
              {about.description || 'Your about me description goes here. Tell the world who you are, what you do, and what makes you unique as a developer and creator.'}
            </motion.p>
            <motion.p variants={itemVariants} className="font-body text-base sm:text-lg text-white/60 leading-relaxed">
              {about.description2 || 'Add your second paragraph here. Talk about your passion for coding, your approach to problem-solving, and what kind of projects excite you.'}
            </motion.p>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
              {(about.stats || [
                { value: '3+', label: 'Years Experience' },
                { value: '20+', label: 'Projects Done' },
                { value: '10+', label: 'Happy Clients' },
                { value: '5+', label: 'Technologies' },
              ]).map((stat, i) => (
                <div key={i} className="glass p-4 sm:p-5 border border-white/5 hover:border-[#00f5ff]/30 transition-all duration-300 group">
                  <div className="font-display text-3xl sm:text-4xl leading-none group-hover:transition-all duration-300"
                    style={{ background:'linear-gradient(90deg,#00f5ff,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] sm:text-xs text-white/40 tracking-widest mt-1 uppercase">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech chips */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {['React', 'Node.js', 'MongoDB', 'Express', 'Three.js', 'TypeScript'].map((tech) => (
                <span key={tech} className="px-2 sm:px-3 py-1 font-mono text-[10px] sm:text-xs text-[#00f5ff] border border-[#00f5ff]/20 bg-[#00f5ff]/5 hover:bg-[#00f5ff]/10 transition-colors duration-300">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;