import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, GraduationCap, Award, Calendar } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Education = ({ onNext, onPrev }) => {
  const { education } = portfolioData;

  return (
    <section id="education" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              6. EDUCATION
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1">
            <span className="text-[#e10600]">///</span> EDUCATION{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              MILESTONES ON MY TRACK
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

      {/* Content Grid: Left Pitstop Garage Visual | Right Racing Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Pit-lane visual */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden glass-panel border border-white/15 p-2 h-full min-h-[340px] flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-75 contrast-125"
            style={{ backgroundImage: `url('/images/screens/10_experience.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Slogan Pill */}
          <div className="relative z-10 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
            <span className="font-racing font-bold text-sm tracking-[2px] text-[#ff3b30] uppercase block mb-1">
              ACADEMIC TELEMETRY
            </span>
            <p className="font-chakra text-xs text-[#a1a1aa] leading-relaxed">
              Consistently pushing performance thresholds across every academic sector.
            </p>
          </div>
        </div>

        {/* Right Column: Track Timeline with Glowing Milestones */}
        <div className="lg:col-span-7 space-y-6 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-[#e10600] before:via-[#ff1801]/60 before:to-white/10">
          {education.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Waypoint Glowing Milestone Node */}
              <div className="relative z-10 flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#0e0f14] border-2 border-[#e10600] shadow-[0_0_15px_rgba(225,6,0,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 sm:w-6 h-5 sm:h-6 text-[#ff3b30]" />
              </div>

              {/* Milestone Card */}
              <div className="flex-1 glass-panel rounded-xl p-5 border border-white/10 group-hover:border-[#e10600]/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono-tech text-[#ff1801]">
                    <Calendar className="w-3 h-3 text-[#e10600]" />
                    {item.period}
                  </span>

                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e10600]/15 border border-[#e10600]/30 text-xs font-orbitron font-bold text-white">
                    <Award className="w-3 h-3 text-[#e10600]" />
                    <span>
                      {item.scoreLabel}: <strong className="text-[#ff3b30]">{item.score}</strong>
                    </span>
                  </div>
                </div>

                <h3 className="font-racing font-bold text-lg sm:text-xl text-white tracking-wide uppercase">
                  {item.degree}
                </h3>
                <p className="font-chakra text-xs sm:text-sm text-[#8e8e93] mt-1">
                  {item.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Slogan & Navigation */}
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
          "EVERY LAP BUILDS A STRONGER YOU"
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
