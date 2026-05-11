import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const TimelineItem = ({ item, index, type }) => {
  const color = type === 'work' ? '#00f5ff' : '#a78bfa';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-4 sm:gap-6"
    >
      {/* Left timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 z-10 mt-1"
          style={{ borderColor: color, background:`${color}30`, boxShadow:`0 0 10px ${color}` }} />
        {/* vertical line */}
        <div className="flex-1 w-[1px] mt-2" style={{ background:`linear-gradient(to bottom,${color}40,transparent)` }} />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.01, x: 4 }}
        transition={{ duration: 0.2 }}
        className="flex-1 glass p-4 sm:p-6 border border-white/5 hover:border-opacity-40 transition-all duration-300 group mb-6 sm:mb-8"
        style={{ borderColor:`${color}15` }}
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mb-3 sm:mb-4"
          style={{ background:`${color}15`, border:`1px solid ${color}30` }}>
          {type === 'work'
            ? <Briefcase size={13} style={{ color }} />
            : <GraduationCap size={13} style={{ color }} />}
        </div>
        <h3 className="font-display text-lg sm:text-xl tracking-wider text-white mb-1">{item.role || item.degree}</h3>
        <div className="font-body text-sm font-medium mb-2 sm:mb-3" style={{ color }}>{item.company || item.institution}</div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-white/30 tracking-widest">
            <Calendar size={9} />{item.duration}
          </div>
          {item.location && (
            <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-white/30 tracking-widest">
              <MapPin size={9} />{item.location}
            </div>
          )}
        </div>
        <p className="font-body text-xs sm:text-sm text-white/50 leading-relaxed mb-3 sm:mb-4">{item.description}</p>
        {item.tech && (
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 font-mono text-[9px] sm:text-[10px]"
                style={{ color:`${color}99`, background:`${color}0d`, border:`1px solid ${color}20` }}>
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background:`linear-gradient(90deg,${color},transparent)` }} />
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const { data } = usePortfolio();
  const experience = data?.experience || [];
  const education  = data?.education  || [];

  return (
    <section id="experience" className="relative py-20 sm:py-28 lg:py-32 bg-void overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ background:'radial-gradient(ellipse at center,#00f5ff 0%,transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Experience */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <span className="font-mono text-[#00f5ff] text-xs sm:text-sm tracking-[0.3em] uppercase">04.</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider">
            Work <span style={{ background:'linear-gradient(90deg,#00f5ff,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Experience</span>
          </h2>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-[#00f5ff]/30 to-transparent ml-2 sm:ml-4" />
        </motion.div>

        <div className="mb-16 sm:mb-24">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} type="work" />
          ))}
          {experience.length === 0 && (
            <p className="text-center font-mono text-xs text-white/20 tracking-widest py-10">
              Add your experience in server/routes/portfolio.js
            </p>
          )}
        </div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <span className="font-mono text-[#a78bfa] text-xs sm:text-sm tracking-[0.3em] uppercase">05.</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider">
            <span style={{ background:'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Education</span>
          </h2>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-[#a78bfa]/30 to-transparent ml-2 sm:ml-4" />
        </motion.div>

        <div>
          {education.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} type="edu" />
          ))}
          {education.length === 0 && (
            <p className="text-center font-mono text-xs text-white/20 tracking-widest py-10">
              Add your education in server/routes/portfolio.js
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;