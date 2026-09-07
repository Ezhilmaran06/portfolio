import { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, Phone, Mail, Link2, GitBranch, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Contact = ({ onNext, onPrev }) => {
  const { contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      soundManager.playCheckpoint();
    }, 1200);
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none reveal-on-scroll">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/15-contact.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/90 pointer-events-none" />

      {/* Header matching Reference Screen 15 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              15. CONTACT
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> CONTACT ME{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              LET'S BUILD SOMETHING GREAT
            </span>
          </h2>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#e10600]/20 border border-white/15 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer"
        >
          <span>FINISH LINE</span>
          <ChevronRight className="w-4 h-4 text-[#e10600]" />
        </button>
      </div>

      {/* Grid: Left Comms Coordinates | Right Radio Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Coordinates */}
        <div className="lg:col-span-5 racing-card corner-brackets rounded-2xl p-6 sm:p-8 space-y-6 stagger-1 reveal-on-scroll">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#ff3b30] tracking-widest uppercase pb-3 border-b border-white/10">
            <span>PIT WALL RADIO &bull; DIRECT CHANNELS</span>
          </div>

          <div className="space-y-4">
            {/* Phone */}
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#e10600]/50 hover:bg-white/10 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-black/60 text-[#e10600] group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  PHONE
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-[#ff3b30] transition-colors">
                  {contact.phone}
                </span>
              </div>
            </a>

            {/* Personal Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#e10600]/50 hover:bg-white/10 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-black/60 text-[#e10600] group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  EMAIL
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-[#ff3b30] transition-colors truncate block">
                  {contact.email}
                </span>
              </div>
            </a>

            {/* Academic Email */}
            <a
              href={`mailto:${contact.academicEmail}`}
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#e10600]/50 hover:bg-white/10 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-black/60 text-[#e10600] group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  COLLEGE EMAIL
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-[#ff3b30] transition-colors truncate block">
                  {contact.academicEmail}
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#e10600]/50 hover:bg-white/10 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-black/60 text-[#0077b5] group-hover:scale-110 transition-transform">
                <Link2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  LINKEDIN
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-[#ff3b30] transition-colors">
                  {contact.linkedin}
                </span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#e10600]/50 hover:bg-white/10 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-black/60 text-white group-hover:scale-110 transition-transform">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  GITHUB
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-[#ff3b30] transition-colors">
                  {contact.github}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Radio Message Form (Reference Screen 15 Match) */}
        <div className="lg:col-span-7 racing-card corner-brackets rounded-2xl p-6 sm:p-8 space-y-6 stagger-2 reveal-on-scroll">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono-tech text-xs text-[#8e8e93] uppercase tracking-wider block mb-1.5">
                YOUR NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#e10600] focus:ring-1 focus:ring-[#e10600] outline-none text-white font-chakra text-sm transition-all"
              />
            </div>

            <div>
              <label className="font-mono-tech text-xs text-[#8e8e93] uppercase tracking-wider block mb-1.5">
                YOUR EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#e10600] focus:ring-1 focus:ring-[#e10600] outline-none text-white font-chakra text-sm transition-all"
              />
            </div>

            <div>
              <label className="font-mono-tech text-xs text-[#8e8e93] uppercase tracking-wider block mb-1.5">
                YOUR MESSAGE
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message, opportunity, or collaboration notes..."
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#e10600] focus:ring-1 focus:ring-[#e10600] outline-none text-white font-chakra text-sm transition-all resize-none"
              />
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#00d26a]/15 border border-[#00d26a]/40 text-[#00d26a] text-xs font-chakra">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message broadcasted to pit wall successfully! Thank you.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#e10600]/15 border border-[#e10600]/40 text-[#ff3b30] text-xs font-chakra">
                <AlertCircle className="w-4 h-4" />
                <span>Please complete all fields before transmission.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-racing-primary w-full py-4 text-sm sm:text-base tracking-[2px] mt-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{status === 'submitting' ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer Navigation & Slogan */}
      <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-10">
        <button
          onClick={() => {
            soundManager.playClick();
            onPrev();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-racing font-bold text-[#8e8e93] hover:text-white uppercase transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREV</span>
        </button>

        <span className="font-racing italic font-bold text-xs sm:text-sm tracking-[2px] text-[#8e8e93] uppercase text-center">
          "LOOKING FORWARD TO HEARING FROM YOU!"
        </span>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#ff1801] text-xs font-racing font-bold text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(225,6,0,0.4)]"
        >
          <span>FINISH LINE</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
