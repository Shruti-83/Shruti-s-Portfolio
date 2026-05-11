import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { usePortfolio } from '../context/PortfolioContext';

const CATEGORY_COLORS = {
  Frontend: '#00f5ff', Backend: '#39ff14', Database: '#f59e0b',
  Language: '#a78bfa', DevOps: '#ff4500', Other: '#f472b6',
};

const SkillBar = ({ name, level, category, animate }) => {
  const color = CATEGORY_COLORS[category] || '#00f5ff';
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
          <span className="font-body text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors duration-300">{name}</span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs" style={{ color }}>{level}%</span>
      </div>
      <div className="h-[2px] sm:h-[3px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg,${color},${color}88)`, boxShadow: `0 0 10px ${color}88` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const { data } = usePortfolio();
  const { ref, inView } = useInView(0.1);
  const skills = data?.skills || [];
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="relative py-20 sm:py-28 lg:py-32 bg-void overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%,#00f5ff 0%,transparent 50%),radial-gradient(circle at 80% 50%,#39ff14 0%,transparent 50%)' }} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16 lg:mb-20">
          <span className="font-mono text-[#39ff14] text-xs sm:text-sm tracking-[0.3em] uppercase">02.</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider">
            My <span style={{ background:'linear-gradient(135deg,#00f5ff 0%,#39ff14 50%,#ff4500 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Skills</span>
          </h2>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-[#39ff14]/30 to-transparent ml-2 sm:ml-4" />
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Skill bars */}
          <div className="space-y-5 sm:space-y-6">
            <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="font-mono text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase mb-6 sm:mb-8">
              Proficiency
            </motion.h3>
            <div className="space-y-4 sm:space-y-6">
              {skills.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }}>
                  <SkillBar {...skill} animate={inView} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category cards */}
          <div className="space-y-3 sm:space-y-4">
            <motion.h3 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="font-mono text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase mb-6 sm:mb-8">
              By Category
            </motion.h3>
            {categories.map((cat, ci) => {
              const catSkills = skills.filter((s) => s.category === cat);
              const color = CATEGORY_COLORS[cat] || '#00f5ff';
              return (
                <motion.div key={cat}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }} transition={{ delay: ci * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02, rotateY: 3 }}
                  className="glass p-4 sm:p-5 border border-white/5 hover:border-opacity-40 transition-all duration-300"
                  style={{ borderColor: `${color}22` }}>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3" style={{ background: color, clipPath:'polygon(50% 0%,100% 50%,50% 100%,0% 50%)', boxShadow:`0 0 8px ${color}` }} />
                      <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase" style={{ color }}>{cat}</span>
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs text-white/20">{catSkills.length} skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {catSkills.map((s) => (
                      <span key={s.name} className="px-2 py-0.5 font-mono text-[9px] sm:text-[10px] text-white/60 hover:text-white transition-colors duration-200"
                        style={{ background:`${color}10`, border:`1px solid ${color}20` }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Top skill circular */}
            {skills.length > 0 && (() => {
              const top = [...skills].sort((a, b) => b.level - a.level)[0];
              const r = 45, circ = 2 * Math.PI * r;
              return (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}
                  className="glass p-4 sm:p-6 border border-[#00f5ff]/10 mt-3 sm:mt-4">
                  <div className="font-mono text-[9px] sm:text-xs text-white/40 tracking-widest uppercase mb-3 sm:mb-4">Top Skill</div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        <motion.circle cx="50" cy="50" r={r} fill="none" stroke="#00f5ff" strokeWidth="4"
                          strokeLinecap="round" strokeDasharray={circ}
                          initial={{ strokeDashoffset: circ }}
                          whileInView={{ strokeDashoffset: circ * (1 - top.level / 100) }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                          style={{ filter:'drop-shadow(0 0 6px #00f5ff)' }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-sm sm:text-lg" style={{ color:'#00f5ff', textShadow:'0 0 7px #00f5ff' }}>{top.level}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-body text-base sm:text-xl text-white font-medium">{top.name}</div>
                      <div className="font-mono text-[9px] sm:text-xs text-white/30 tracking-widest mt-1">{top.category}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;