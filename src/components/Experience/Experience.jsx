import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, Wrench, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Experience = ({ onNext, onPrev }) => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none reveal-on-scroll">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/10-experience.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/90 pointer-events-none" />

      {/* Header matching Reference Screen 10 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              10. EXPERIENCE
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> EXPERIENCE{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              PIT STOP JOURNEY
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
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4 text-[#e10600]" />
        </button>
      </div>

      {/* Main Garage Card with F1 Car in Pit Stop */}
      <div className="relative rounded-3xl overflow-hidden racing-card corner-brackets p-6 sm:p-12 min-h-[440px] flex flex-col justify-between shadow-2xl">
        {/* Background Visual */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-90 contrast-110"
          style={{ backgroundImage: `url('/assets/portfolio/10-experience.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

        {/* Content Box */}
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#ff1801] tracking-widest uppercase mb-4">
            <Wrench className="w-4 h-4 text-[#e10600]" />
            <span>PIT LANE STATUS &bull; READY TO ACCELERATE</span>
          </div>

          <h3 className="font-racing font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wider mb-4">
            READY FOR THE NEXT GEAR
          </h3>

          <p className="font-chakra text-base sm:text-lg text-[#d1d1d6] leading-relaxed mb-8">
            {experience.status}
          </p>

          {/* Status Badge (Reference Screen 10 Match) */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black/80 border-2 border-[#e10600] shadow-[0_0_25px_rgba(225,6,0,0.5)]">
            <span className="w-3 h-3 rounded-full bg-[#ff1801] animate-ping" />
            <span className="font-racing font-bold tracking-[2px] text-sm sm:text-base text-white uppercase">
              {experience.badge}
            </span>
            <Sparkles className="w-4 h-4 text-[#ff1801]" />
          </div>
        </div>

        {/* Bottom Tagline & Stats */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 mt-10">
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block mb-1">
              AVAILABILITY
            </span>
            <span className="font-racing font-bold text-sm text-white uppercase">
              IMMEDIATE &bull; FULL TIME / INTERN
            </span>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block mb-1">
              PRIMARY TARGET
            </span>
            <span className="font-racing font-bold text-sm text-[#ff3b30] uppercase">
              JAVA BACKEND & SOFTWARE ENGINEERING
            </span>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block mb-1">
              LOCATION
            </span>
            <span className="font-racing font-bold text-sm text-white uppercase">
              TAMIL NADU &bull; OPEN TO RELOCATION
            </span>
          </div>
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
          "EVERY OPPORTUNITY IS A NEW TRACK"
        </span>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#ff1801] text-xs font-racing font-bold text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(225,6,0,0.4)]"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
