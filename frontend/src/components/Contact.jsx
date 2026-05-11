import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { usePortfolio } from '../context/PortfolioContext';
import FloatingParticles from './FloatingParticles';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, multiline }) => {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="group relative">
      <label className="block font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">{label}</label>
      <Tag name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
        rows={multiline ? 5 : undefined}
        className="w-full bg-transparent border border-white/10 text-white font-body text-sm px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-[#00f5ff] transition-colors duration-300 resize-none placeholder-white/20"
        style={{ background:'rgba(255,255,255,0.02)' }} required />
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-focus-within:w-full transition-all duration-500 bg-[#00f5ff]" />
    </div>
  );
};

const Contact = () => {
  const { data } = usePortfolio();
  const contact = data?.contact || {};
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name:'', email:'', subject:'', message:'' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  const socialLinks = [
    { icon: GithubIcon,    href: contact.github,    label: 'GitHub' },
    { icon: LinkedinIcon,  href: contact.linkedin,  label: 'LinkedIn' },
    { icon: TwitterIcon,   href: contact.twitter,   label: 'Twitter' },
   
  ].filter((s) => s.href);

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 bg-plasma overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingParticles color={0xa78bfa} count={400} opacity={0.2} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" aria-hidden>
        <span className="font-display text-[25vw] sm:text-[20vw] text-white/[0.015] leading-none tracking-widest">CONTACT</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16 lg:mb-20">
          <span className="font-mono text-[#a78bfa] text-xs sm:text-sm tracking-[0.3em] uppercase">06.</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider">
            Get In{' '}
            <span style={{ background:'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Touch</span>
          </h2>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-[#a78bfa]/30 to-transparent ml-2 sm:ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 sm:space-y-8 order-2 lg:order-1">
            <p className="font-body text-base sm:text-lg text-white/50 leading-relaxed">
              Have a project in mind or just want to say hi? My inbox is always open.
            </p>

            {[
              { icon: Mail,  label:'Email',    value: contact.email,    href:`mailto:${contact.email}` },
            
              { icon: MapPin,label:'Location', value: contact.location, href: null },
            ].filter((c) => c.value).map(({ icon: Icon, label, value, href }) => (
              <motion.a key={label} href={href || undefined}
                whileHover={{ x: 6, scale: 1.01 }} transition={{ duration: 0.2 }}
                className="flex items-center gap-3 sm:gap-4 glass p-4 sm:p-5 border border-white/5 hover:border-[#a78bfa]/30 group transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(167,139,250,0.1)', border:'1px solid rgba(167,139,250,0.2)' }}>
                  <Icon size={14} style={{ color:'#a78bfa' }} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[9px] sm:text-[10px] text-white/30 tracking-widest uppercase">{label}</div>
                  <div className="font-body text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors duration-300 mt-0.5 truncate">{value}</div>
                </div>
              </motion.a>
            ))}

            {/* Socials */}
            {socialLinks.length > 0 && (
              <div>
                <div className="font-mono text-[9px] sm:text-[10px] text-white/30 tracking-[0.3em] uppercase mb-3 sm:mb-4">Follow me</div>
                <div className="flex gap-2 sm:gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }} transition={{ duration: 0.2 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-[#a78bfa] hover:border-[#a78bfa]/40 transition-all duration-300"
                      title={label}>
                      <Icon size={15} />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.02 }}
              className="glass p-4 sm:p-5 border border-[#39ff14]/20 inline-flex items-center gap-2 sm:gap-3">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#39ff14] animate-pulse flex-shrink-0"
                style={{ boxShadow:'0 0 8px #39ff14' }} />
              <span className="font-mono text-[9px] sm:text-xs text-[#39ff14] tracking-widest">AVAILABLE FOR FREELANCE &amp; FULL-TIME</span>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField label="Your Name"  name="name"  value={form.name}  onChange={handleChange} placeholder="John Doe" />
                <InputField label="Your Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
              </div>
              <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry" />
              <InputField label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." multiline />

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#39ff14] font-body text-xs sm:text-sm">
                  <CheckCircle size={15} /> Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#ff4500] font-body text-xs sm:text-sm">
                  <AlertCircle size={15} /> {errMsg}
                </motion.div>
              )}

              <motion.button type="submit" disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 font-body font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
                style={{
                  background: status === 'loading' ? 'rgba(167,139,250,0.2)' : '#a78bfa',
                  color: status === 'loading' ? '#a78bfa' : '#000',
                  boxShadow: status !== 'loading' ? '0 0 30px rgba(167,139,250,0.3)' : 'none',
                }}>
                {status === 'loading' ? (
                  <><svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="20" strokeDashoffset="10" />
                  </svg> Sending...</>
                ) : (
                  <><Send size={13} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;