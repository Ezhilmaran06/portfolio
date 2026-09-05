import { portfolioData } from '../../data/portfolio';
import { ChevronRight, Code2, Trophy, GraduationCap, Flame } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Hero = ({ onStartJourney, onViewProjects }) => {
  const { driver } = portfolioData;

  return (
    <section id="hero" className="relative w-full min-h-screen pt-20 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Circuit Grid & Subtle Night Track Overlay */}
      <div className="absolute inset-0 circuit-grid opacity-80 pointer-events-none" />
      <div 
        className="absolute inset-0 bg-cover bg-right md:bg-center opacity-15 pointer-events-none filter grayscale contrast-150"
        style={{ backgroundImage: `url('/images/screens/03_home_hero_section.jpg')` }}
      />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#e10600]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#ff1801]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1 rounded bg-[#e10600]/10 border border-[#e10600]/30 text-[#ff3b30] text-xs font-racing font-bold tracking-[2.5px] uppercase mb-4 shadow-[0_0_15px_rgba(225,6,0,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#e10600] animate-ping" />
              <span>{driver.motto}</span>
            </div>

            {/* Main Driver Headline */}
            <h1 className="font-racing font-black tracking-[3px] sm:tracking-[5px] text-4xl sm:text-6xl xl:text-7xl text-white uppercase italic leading-none mb-3 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              <span className="text-white">EZHILMARAN</span>{' '}
              <span className="text-[#e10600] relative inline-block">
                E
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#e10600] shadow-[0_0_12px_#ff1801]" />
              </span>
            </h1>

            {/* Subtitle & Role */}
            <h2 className="font-chakra font-bold text-sm sm:text-base md:text-lg text-white tracking-[2px] uppercase mb-2">
              {driver.subtitle}
            </h2>
            <p className="font-chakra text-xs sm:text-sm text-[#8e8e93] tracking-widest uppercase mb-8">
              {driver.tagline}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onStartJourney();
                }}
                className="btn-racing-primary px-6 sm:px-8 py-3.5 text-sm sm:text-base cursor-pointer"
              >
                <span>START JOURNEY</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onViewProjects();
                }}
                className="btn-racing-secondary px-6 sm:px-8 py-3.5 text-sm sm:text-base cursor-pointer"
              >
                <span>VIEW PROJECTS</span>
              </button>
            </div>

            {/* Telemetry Stat Badges (240+ DSA, 2+ Projects, 7.64 CGPA, ∞ Learning) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full pt-4 border-t border-white/10">
              <div className="glass-panel p-3 rounded-xl border border-white/10 flex flex-col">
                <div className="flex items-center gap-1.5 text-[#8e8e93] text-[10px] font-mono-tech uppercase mb-1">
                  <Code2 className="w-3 h-3 text-[#e10600]" />
                  <span>DSA PROBLEMS</span>
                </div>
                <span className="font-orbitron font-extrabold text-2xl text-white tracking-wider red-text-glow">
                  {driver.stats.dsa}
                </span>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-white/10 flex flex-col">
                <div className="flex items-center gap-1.5 text-[#8e8e93] text-[10px] font-mono-tech uppercase mb-1">
                  <Flame className="w-3 h-3 text-[#e10600]" />
                  <span>PROJECTS</span>
                </div>
                <span className="font-orbitron font-extrabold text-2xl text-white tracking-wider">
                  {driver.stats.projects}
                </span>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-white/10 flex flex-col">
                <div className="flex items-center gap-1.5 text-[#8e8e93] text-[10px] font-mono-tech uppercase mb-1">
                  <GraduationCap className="w-3 h-3 text-[#e10600]" />
                  <span>CGPA</span>
                </div>
                <span className="font-orbitron font-extrabold text-2xl text-white tracking-wider">
                  {driver.stats.cgpa}
                </span>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-white/10 flex flex-col">
                <div className="flex items-center gap-1.5 text-[#8e8e93] text-[10px] font-mono-tech uppercase mb-1">
                  <Trophy className="w-3 h-3 text-[#e10600]" />
                  <span>LEARNING</span>
                </div>
                <span className="font-orbitron font-extrabold text-2xl text-white tracking-wider red-text-glow">
                  {driver.stats.learning}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Racer Helmet & Suit Visual */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl overflow-hidden glass-panel border border-white/15 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Corner Telemetry Accent Marks */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#e10600] z-20" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#e10600] z-20" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#e10600] z-20" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#e10600] z-20" />

              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/50">
                <img
                  src="/images/driver/racer-helmet.jpg"
                  alt="Formula 1 Racing Driver Helmet"
                  className="w-full h-full object-cover object-center filter contrast-110 hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to full screen reference image
                    (e.target).src = '/images/screens/03_home_hero_section.jpg';
                  }}
                />
                
                {/* Slogan Ribbon across bottom of image */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end">
                  <span className="font-racing font-extrabold text-sm sm:text-base tracking-[3px] text-white uppercase italic text-right">
                    NEVER STOP LEARNING & GROWING
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#e10600] tracking-widest text-right">
                    DRIVER COCKPIT &bull; READY
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
