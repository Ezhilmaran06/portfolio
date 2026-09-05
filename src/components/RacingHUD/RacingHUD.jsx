import { Compass, Gauge } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const RacingHUD = ({
  currentSection,
  onOpenTrackMap,
  speed = 280,
}) => {
  // Hide HUD on loading and race start sequence
  if (currentSection === 'loading' || currentSection === 'racestart') {
    return null;
  }

  const getSectionLabel = (sec) => {
    switch (sec) {
      case 'hero':
        return 'HOME';
      case 'trackmap':
        return 'CIRCUIT';
      case 'about':
        return 'ABOUT';
      case 'education':
        return 'EDUCATION';
      case 'skills':
        return 'SKILLS';
      case 'projects':
        return 'PROJECTS';
      case 'experience':
        return 'EXPERIENCE';
      case 'achievements':
        return 'ACHIEVEMENTS';
      case 'certifications':
        return 'CERTIFICATIONS';
      case 'coding':
        return 'CODING PROFILES';
      case 'resume':
        return 'RESUME';
      case 'contact':
        return 'CONTACT';
      case 'finish':
        return 'FINISH LINE';
      default:
        return 'TRACK';
    }
  };

  return (
    <aside aria-label="Racing Telemetry HUD" className="fixed bottom-0 inset-x-0 z-40 bg-[#08080a]/90 backdrop-blur-md border-t border-white/10 px-4 py-2 sm:py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        {/* Left Telemetry Cluster */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Position */}
          <div className="flex flex-col">
            <span className="text-[9px] font-mono-tech text-[#8e8e93] uppercase tracking-wider">
              POS
            </span>
            <span className="font-orbitron font-extrabold text-sm sm:text-base text-white">
              01<span className="text-[10px] text-[#8e8e93]">/01</span>
            </span>
          </div>

          {/* Speedometer */}
          <div className="flex flex-col">
            <span className="text-[9px] font-mono-tech text-[#8e8e93] uppercase tracking-wider flex items-center gap-1">
              <Gauge className="w-2.5 h-2.5 text-[#e10600]" />
              SPEED
            </span>
            <span className="font-orbitron font-extrabold text-sm sm:text-base text-white red-text-glow">
              {speed} <span className="text-[10px] text-[#8e8e93] font-normal">KM/H</span>
            </span>
          </div>

          {/* Current Section Checkpoint */}
          <div className="flex flex-col">
            <span className="text-[9px] font-mono-tech text-[#8e8e93] uppercase tracking-wider">
              CHECKPOINT
            </span>
            <span className="font-racing font-bold text-sm sm:text-base text-[#ff1801] tracking-wider uppercase">
              {getSectionLabel(currentSection)}
            </span>
          </div>

          {/* Lap Counter */}
          <div className="hidden sm:flex flex-col">
            <span className="text-[9px] font-mono-tech text-[#8e8e93] uppercase tracking-wider">
              LAP
            </span>
            <span className="font-orbitron font-bold text-sm text-white">
              01<span className="text-[10px] text-[#8e8e93]">/01</span>
            </span>
          </div>
        </div>

        {/* Right Track Map Trigger Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTrackMap();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-[#e10600]/20 border border-white/15 hover:border-[#e10600]/50 text-[11px] font-racing font-bold tracking-wider text-white uppercase transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#e10600] animate-spin-slow" />
            <span>TRACK MAP</span>
          </button>

          <span className="hidden md:inline font-mono-tech text-[10px] text-[#8e8e93] tracking-widest uppercase">
            EZHILMARAN &bull; GP TELEMETRY
          </span>
        </div>
      </div>
    </aside>
  );
};
