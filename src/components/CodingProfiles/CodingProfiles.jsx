import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, GitBranch, Code2, Flame, ExternalLink } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const CodingProfiles = ({ onNext, onPrev }) => {
  const { codingProfiles } = portfolioData;

  // Generate a 52-column by 7-row interactive activity grid matching reference
  const renderActivityHeatmap = () => {
    const weeks = 28; // Responsive 28-week display
    const days = 5;

    return (
      <div className="grid grid-flow-col gap-1.5 overflow-x-auto py-2">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1.5">
            {Array.from({ length: days }).map((_, d) => {
              // Create realistic activity density pattern
              const seed = (w * 7 + d) % 9;
              let bg = 'bg-white/5';
              if (seed === 1 || seed === 4) bg = 'bg-[#00d26a]/40';
              if (seed === 2 || seed === 7) bg = 'bg-[#00d26a]/70';
              if (seed === 3 || seed === 8) bg = 'bg-[#00d26a] shadow-[0_0_6px_#00d26a]';
              if (seed === 5 && w % 3 === 0) bg = 'bg-[#e10600]/80 shadow-[0_0_6px_#ff1801]';

              return (
                <div
                  key={d}
                  className={`w-3.5 h-3.5 rounded-sm ${bg} transition-transform hover:scale-125`}
                  title={`Activity logged on Day ${w * 5 + d + 1}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="coding" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/13-coding-profiles.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/90 pointer-events-none" />

      {/* Header matching Reference Screen 13 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              13. CODING PROFILES
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1">
            <span className="text-[#e10600]">///</span> CODING PROFILES{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              PERFORMANCE TELEMETRY
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

      {/* Telemetry Cards Grid (Reference Match) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Card 1: GitHub Card */}
        <div className="md:col-span-4 glass-panel rounded-2xl p-6 border border-white/15 flex flex-col justify-between group hover:border-[#e10600]/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 group-hover:scale-105 transition-transform">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <a
                href={codingProfiles.github.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono-tech text-[#8e8e93] hover:text-white flex items-center gap-1"
              >
                <span>VISIT</span>
                <ExternalLink className="w-3 h-3 text-[#e10600]" />
              </a>
            </div>

            <span className="font-mono-tech text-xs text-[#8e8e93] uppercase tracking-wider block">
              GITHUB TELEMETRY
            </span>
            <h3 className="font-racing font-bold text-xl text-white tracking-wide uppercase mt-1">
              {codingProfiles.github.handle}
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  REPOSITORIES
                </span>
                <span className="font-orbitron font-extrabold text-2xl text-white">
                  {codingProfiles.github.repositories}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  CONTRIBUTIONS
                </span>
                <span className="font-orbitron font-extrabold text-2xl text-[#ff3b30] red-text-glow">
                  {codingProfiles.github.contributions}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-1 bg-gradient-to-r from-[#e10600] to-transparent mt-6" />
        </div>

        {/* Card 2: LeetCode Telemetry Card */}
        <div className="md:col-span-4 glass-panel rounded-2xl p-6 border border-white/15 flex flex-col justify-between group hover:border-[#e10600]/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6 text-[#ffa116]" />
              </div>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                LEETCODE
              </span>
            </div>

            <span className="font-mono-tech text-xs text-[#8e8e93] uppercase tracking-wider block">
              ALGORITHM TELEMETRY
            </span>
            <h3 className="font-racing font-bold text-xl text-white tracking-wide uppercase mt-1">
              240+ PROBLEMS SOLVED
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  SOLVED COUNT
                </span>
                <span className="font-orbitron font-extrabold text-2xl text-white red-text-glow">
                  240+
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase block">
                  STANDING
                </span>
                <span className="font-orbitron font-bold text-xl text-[#00d26a]">
                  {codingProfiles.leetcode.globalRanking}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-1 bg-gradient-to-r from-[#ffa116] to-transparent mt-6" />
        </div>

        {/* Card 3: Heatmap Matrix Card */}
        <div className="md:col-span-4 glass-panel rounded-2xl p-6 border border-white/15 flex flex-col justify-between group hover:border-[#e10600]/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#ff1801]" />
                <h3 className="font-racing font-bold text-base text-white uppercase tracking-wider">
                  KEEP SOLVING &bull; KEEP IMPROVING
                </h3>
              </div>
            </div>

            <p className="font-chakra text-xs text-[#8e8e93] mb-4">
              Telemetry commit and problem solving activity distribution.
            </p>

            {/* Heatmap Blocks Matrix */}
            <div className="p-3 bg-black/60 rounded-xl border border-white/10 overflow-hidden">
              {renderActivityHeatmap()}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="font-racing italic font-bold text-xs tracking-wider text-[#d1d1d6]">
              "Consistency is the real win."
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00d26a] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
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

        <span className="font-mono-tech text-[10px] tracking-[2px] text-[#545458] uppercase">
          TELEMETRY SECTOR 03 &bull; SYNCHRONIZED
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
