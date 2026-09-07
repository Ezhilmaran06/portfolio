import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, Cpu, Terminal, Globe, Database, Wrench } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Skills = ({ onNext, onPrev }) => {
  const { skills } = portfolioData;

  const categories = [
    {
      id: 'programming',
      icon: Terminal,
      data: skills.programming,
    },
    {
      id: 'web',
      icon: Globe,
      data: skills.web,
    },
    {
      id: 'coreCs',
      icon: Cpu,
      data: skills.coreCs,
    },
    {
      id: 'databases',
      icon: Database,
      data: skills.databases,
    },
  ];

  return (
    <section id="skills" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none reveal-on-scroll">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/07-skills.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/90 pointer-events-none" />

      {/* Header matching Reference Screen 07 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              7. SKILLS
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> SKILLS{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              DRIVER STATS
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

      {/* 4 Telemetry Performance Dashboard Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {categories.map((cat, catIdx) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={cat.id}
              className={`racing-card corner-brackets rounded-2xl p-5 sm:p-6 border border-white/15 relative overflow-hidden flex flex-col justify-between group hover:border-[#e10600]/50 transition-all duration-300 stagger-${catIdx + 1} reveal-on-scroll`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e10600] group-hover:shadow-[0_0_8px_#ff1801] transition-shadow" />
                  <IconComponent className="w-4 h-4 text-[#ff1801] group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                  <h3 className="font-racing font-bold text-base sm:text-lg tracking-wider text-white uppercase">
                    {cat.data.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono-tech tracking-widest text-[#8e8e93]">
                  TELEMETRY
                </span>
              </div>

              {/* Progress Gauges */}
              <div className="space-y-4">
                {cat.data.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-chakra">
                      <span className="font-bold tracking-wider text-[#f5f5f7]">
                        {skill.name}
                      </span>
                      <span className="font-orbitron font-semibold text-[#ff3b30]">
                        {skill.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar Gauge */}
                    <div className="w-full h-2 rounded-full bg-black/60 border border-white/10 overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-[#b30000] via-[#e10600] to-[#ff3b30] rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(225,6,0,0.5)] group-hover:shadow-[0_0_12px_#ff1801]"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Tools Telemetry Strip */}
      <div className="racing-card rounded-2xl p-5 border border-white/15 mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[#e10600]" />
          <span className="font-racing font-bold text-sm text-white uppercase tracking-wider">
            DEVELOPER TOOLBOX:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.tools.map((tool, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-chakra text-[#d1d1d6] tracking-wider hover:border-[#e10600]/50 hover:bg-white/10 hover:text-white transition-all"
            >
              {tool}
            </span>
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
          "SKILLS FUEL THE JOURNEY"
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
