import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, User, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const About = ({ onNext, onPrev }) => {
  const { driver } = portfolioData;

  return (
    <section id="about" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none reveal-on-scroll">
      {/* Background Circuit Night Track */}
      <div
        className="absolute inset-0 bg-cover bg-left md:bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/05-about-me.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/90 via-[#08080a]/60 to-[#08080a]/80 pointer-events-none" />

      {/* Section Header Matching Reference Screen 05 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              5. ABOUT ME
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> ABOUT ME{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              DRIVER PROFILE
            </span>
          </h2>
        </div>

        {/* Top Right Next Pit Action */}
        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#e10600]/20 border border-white/15 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer"
        >
          <span>NEXT PIT</span>
          <ChevronRight className="w-4 h-4 text-[#e10600]" />
        </button>
      </div>

      {/* Main Grid: Left Portrait & Bio | Right Driver Telemetry Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Portrait & Slogan */}
        <div className="lg:col-span-5 flex flex-col racing-card corner-brackets rounded-2xl p-6 relative overflow-hidden stagger-1 reveal-on-scroll">
          {/* Top Red Racing Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e10600] to-transparent" />

          {/* Driver Portrait */}
          <div className="relative w-full aspect-square max-h-[380px] rounded-xl overflow-hidden mb-6 bg-black/60 border border-white/10 shadow-lg">
            <img
              src="/assets/portfolio/05-about-me.webp"
              alt="Ezhilmaran E - Driver Profile"
              className="w-full h-full object-cover object-left md:object-center filter contrast-110"
              onError={(e) => {
                (e.target).style.display = 'none';
              }}
            />
            {/* Monogram Overlay */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md p-2.5 rounded-lg border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-racing font-bold text-sm tracking-wider text-white">
                  EZHILMARAN <span className="text-[#e10600]">E</span>
                </h3>
                <p className="text-[10px] font-mono-tech tracking-wider text-[#8e8e93]">
                  FINAL YEAR IT STUDENT
                </p>
              </div>
              <span className="w-6 h-6 rounded bg-[#e10600] font-racing font-bold text-xs flex items-center justify-center text-white">
                01
              </span>
            </div>
          </div>

          {/* Bio Statement */}
          <p className="font-chakra text-sm text-[#d1d1d6] leading-relaxed mb-4 italic">
            "{driver.bio}"
          </p>

          {/* Red Handwriting Slogan (Reference Match) */}
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-racing italic font-bold text-lg sm:text-xl text-[#ff3b30] tracking-wider drop-shadow-[0_0_10px_rgba(225,6,0,0.5)]">
              Keep Going. Keep Learning.
            </span>
            <Sparkles className="w-4 h-4 text-[#e10600]" />
          </div>
        </div>

        {/* Right Column: Driver Telemetry Specs Card */}
        <div className="lg:col-span-7 racing-card corner-brackets rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative stagger-2 reveal-on-scroll">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e10600]/10 rounded-bl-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="font-mono-tech text-xs tracking-widest text-[#8e8e93] uppercase flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#e10600]" />
                DRIVER SPECIFICATION SHEET
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-racing font-bold bg-[#e10600]/20 text-[#ff3b30] border border-[#e10600]/40">
                ACTIVE
              </span>
            </div>

            {/* Telemetry Key-Value Grid */}
            <div className="space-y-4 font-chakra">
              <div className="grid grid-cols-3 sm:grid-cols-4 py-2 border-b border-white/5">
                <span className="font-bold text-xs text-[#8e8e93] uppercase tracking-wider">NAME</span>
                <span className="col-span-2 sm:col-span-3 text-sm text-white font-semibold tracking-wide">
                  {driver.name}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 py-2 border-b border-white/5">
                <span className="font-bold text-xs text-[#8e8e93] uppercase tracking-wider">ROLE</span>
                <span className="col-span-2 sm:col-span-3 text-sm text-[#ff3b30] font-semibold tracking-wide">
                  {driver.role}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 py-2 border-b border-white/5">
                <span className="font-bold text-xs text-[#8e8e93] uppercase tracking-wider">COLLEGE</span>
                <span className="col-span-2 sm:col-span-3 text-sm text-white font-medium tracking-wide">
                  {driver.college}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 py-2 border-b border-white/5">
                <span className="font-bold text-xs text-[#8e8e93] uppercase tracking-wider">DEGREE</span>
                <span className="col-span-2 sm:col-span-3 text-sm text-white font-medium tracking-wide">
                  {driver.degree}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 py-2 border-b border-white/5">
                <span className="font-bold text-xs text-[#8e8e93] uppercase tracking-wider">INTERESTS</span>
                <div className="col-span-2 sm:col-span-3 flex flex-wrap gap-2">
                  {driver.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-[#f5f5f7] tracking-wider"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 py-2">
                <span className="font-bold text-xs text-[#8e8e93] uppercase tracking-wider">GOAL</span>
                <p className="col-span-2 sm:col-span-3 text-xs sm:text-sm text-[#d1d1d6] leading-relaxed">
                  {driver.goal}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Pit Stop Navigation Controls */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
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

            <span className="font-mono-tech text-[10px] tracking-[2px] text-[#545458] uppercase">
              SECTOR 01 &bull; PIT STOP
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
        </div>
      </div>
    </section>
  );
};
