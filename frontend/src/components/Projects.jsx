import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Layers } from 'lucide-react';
import { useTilt } from '../hooks/useTilt';
import { usePortfolio } from '../context/PortfolioContext';
import FloatingParticles from './FloatingParticles';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ProjectCard = ({ project, onClick, index }) => {
  const tiltRef = useTilt(8);
  const color = project.color || '#00f5ff';
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      ref={tiltRef}
      onClick={() => onClick(project)}
      className="relative glass border border-white/5 overflow-hidden group"
      style={{ transformStyle:'preserve-3d', borderColor:`${color}15`, cursor:'pointer' }}
    >
      <div className="relative h-40 sm:h-48 lg:h-52 overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background:`linear-gradient(135deg,${color}10,transparent)` }}>
            <Layers size={40} style={{ color, opacity: 0.3 }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {project.featured && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase"
            style={{ background:`${color}20`, border:`1px solid ${color}40`, color }}>
            Featured
          </div>
        )}
        <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 font-display text-4xl sm:text-5xl opacity-20 leading-none" style={{ color }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <div className="p-4 sm:p-6" style={{ transform:'translateZ(20px)' }}>
        <h3 className="font-display text-xl sm:text-2xl tracking-wider text-white mb-1 sm:mb-2">{project.title}</h3>
        <p className="font-body text-xs sm:text-sm text-white/50 leading-relaxed mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {project.tech?.map((t) => (
            <span key={t} className="px-1.5 sm:px-2 py-0.5 font-mono text-[9px] sm:text-[10px] tracking-widest"
              style={{ color:`${color}cc`, background:`${color}10`, border:`1px solid ${color}20` }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white/30 hover:text-white transition-colors duration-300">
              <GithubIcon size={15} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-white/30 hover:text-white transition-colors duration-300">
              <ExternalLink size={15} />
            </a>
          )}
          <span className="ml-auto font-mono text-[9px] sm:text-xs text-white/20 group-hover:text-white/50 transition-colors duration-300">View Details →</span>
        </div>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background:`radial-gradient(circle at 50% 0%,${color}08 0%,transparent 60%)` }} />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background:`linear-gradient(90deg,${color},transparent)` }} />
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const color = project.color || '#00f5ff';
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4"
      style={{ background:'rgba(0,0,0,0.85)', backdropFilter:'blur(20px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.8, rotateX: -20, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotateX: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative glass w-full max-w-lg sm:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ border:`1px solid ${color}30`, boxShadow:`0 0 60px ${color}20` }}
        onClick={(e) => e.stopPropagation()}>
        <div className="relative h-40 sm:h-56 overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background:`linear-gradient(135deg,${color}15,transparent)` }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <button onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-all duration-300">
          <X size={14} />
        </button>
        <div className="p-5 sm:p-8">
          <h3 className="font-display text-3xl sm:text-4xl tracking-wider text-white mb-2 sm:mb-3">{project.title}</h3>
          <p className="font-body text-sm sm:text-base text-white/60 leading-relaxed mb-5 sm:mb-6">{project.longDescription || project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {project.tech?.map((t) => (
              <span key={t} className="px-2 sm:px-3 py-1 font-mono text-xs" style={{ color, background:`${color}10`, border:`1px solid ${color}25` }}>{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 sm:px-5 py-2 border border-white/20 text-white/70 text-xs sm:text-sm font-body hover:text-white hover:border-white/50 transition-all duration-300">
                <GithubIcon size={13} /> View Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-body font-medium transition-all duration-300"
                style={{ background:color, color:'#000' }}>
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const { data } = usePortfolio();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const projects = data?.projects || [];
  const allTech = ['All', ...new Set(projects.flatMap((p) => p.tech || []))];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.tech?.includes(filter));

  return (
    <section id="projects" className="relative py-20 sm:py-28 lg:py-32 bg-plasma overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingParticles color={0xff4500} count={200} opacity={0.15} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <span className="font-mono text-[#ff4500] text-xs sm:text-sm tracking-[0.3em] uppercase">03.</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider">
            My <span style={{ background:'linear-gradient(135deg,#00f5ff 0%,#39ff14 50%,#ff4500 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Projects</span>
          </h2>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-[#ff4500]/30 to-transparent ml-2 sm:ml-4" />
        </motion.div>

        {/* Filters — scrollable on mobile */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none">
          {allTech.slice(0, 8).map((tech) => (
            <button key={tech} onClick={() => setFilter(tech)}
              className="flex-shrink-0 px-3 sm:px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                border:`1px solid ${filter === tech ? '#00f5ff' : 'rgba(255,255,255,0.1)'}`,
                color: filter === tech ? '#00f5ff' : 'rgba(255,255,255,0.4)',
                background: filter === tech ? 'rgba(0,245,255,0.05)' : 'transparent',
              }}>
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} onClick={setSelected} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 sm:py-20 text-white/20 font-mono text-xs tracking-widest">
            No projects found for "{filter}"
          </div>
        )}
      </div>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;