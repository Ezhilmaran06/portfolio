import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, Trophy, Star, BarChart3, Target, Clock, Users } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Achievements = ({ onNext, onPrev }) => {
  const { achievements } = portfolioData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-8 h-8 text-[#ffb800]" />;
      case 'star':
        return <Star className="w-8 h-8 text-[#ffb800] fill-[#ffb800]/20" />;
      case 'chart':
        return <BarChart3 className="w-8 h-8 text-[#ff3b30]" />;
      case 'target':
        return <Target className="w-8 h-8 text-[#ff3b30]" />;
      case 'timer':
        return <Clock className="w-8 h-8 text-[#ff3b30]" />;
      case 'users':
        return <Users className="w-8 h-8 text-[#ff3b30]" />;
      default:
        return <Trophy className="w-8 h-8 text-[#e10600]" />;
    }
  };

  return (
    <section id="achievements" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none reveal-on-scroll">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/11-achievements.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/90 pointer-events-none" />

      {/* Header matching Reference Screen 11 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              11. ACHIEVEMENTS
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> ACHIEVEMENTS{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              TROPHIES ON MY TRACK
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

      {/* Podium Telemetry Cards Grid (Reference Match) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, idx) => (
          <div
            key={item.id}
            className={`racing-card corner-brackets rounded-2xl p-6 border border-white/15 relative overflow-hidden flex flex-col justify-between group hover:border-[#e10600]/60 transition-all duration-300 shadow-lg hover:shadow-[0_12px_35px_rgba(225,6,0,0.25)] stagger-${(idx % 3) + 1} reveal-on-scroll`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>
              <span className="font-mono-tech text-[10px] tracking-widest text-[#8e8e93] uppercase">
                PODIUM FINISH
              </span>
            </div>

            <div>
              <span className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wider red-text-glow block mb-1">
                {item.metric}
              </span>
              <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wide">
                {item.title}
              </h3>
              {item.subtext && (
                <p className="font-chakra text-xs text-[#8e8e93] mt-1">
                  {item.subtext}
                </p>
              )}
            </div>

            {/* Bottom Sector Accent */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#e10600]/40 to-transparent mt-5" />
          </div>
        ))}
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
          "DISCIPLINE DRIVES RESULTS"
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
