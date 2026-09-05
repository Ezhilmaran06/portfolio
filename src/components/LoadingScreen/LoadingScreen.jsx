import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const LoadingScreen = ({ onComplete, onSkip }) => {
  const [progress, setProgress] = useState(15);
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Loading assets', done: false },
    { id: 2, text: 'Preparing circuit', done: false },
    { id: 3, text: 'Starting engine', done: false },
    { id: 4, text: 'Calibrating telemetry', done: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Update checklist items according to progress
  useEffect(() => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === 1 && progress >= 30) return { ...item, done: true };
        if (item.id === 2 && progress >= 55) return { ...item, done: true };
        if (item.id === 3 && progress >= 80) return { ...item, done: true };
        if (item.id === 4 && progress >= 95) return { ...item, done: true };
        return item;
      })
    );
  }, [progress]);

  return (
    <div className="relative w-full min-h-screen bg-[#08080a] flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      {/* Background Circuit Track Visual */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none filter brightness-50"
        style={{ backgroundImage: `url('/images/screens/01_loading_screen.jpg')` }}
      />
      
      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e10600] animate-ping" />
          <span className="font-mono-tech text-xs tracking-widest text-[#8e8e93] uppercase">
            1. LOADING SCREEN &bull; TELEMETRY BOOT
          </span>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onSkip();
          }}
          className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-[#e10600]/20 border border-white/10 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          <span>SKIP INTRO</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#e10600] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Central Visual: Glowing Burnout Wheel & Smoke Drift */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Neon Ring Halo */}
          <div className="absolute inset-0 rounded-full border-2 border-[#e10600]/30 shadow-[0_0_50px_rgba(225,6,0,0.4)] animate-pulse" />
          
          {/* Burnout Smoke Glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-t from-[#e10600]/20 via-transparent to-white/5 blur-xl pointer-events-none animate-spin-slow" />

          {/* Burning Tyre Asset */}
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-[#ff1801] shadow-[0_0_35px_#e10600] bg-black">
            <img
              src="/images/racing/f1-hot-tyre.jpg"
              alt="Spinning F1 Wheel"
              className="w-full h-full object-cover animate-spin-fast filter contrast-125"
              onError={(e) => {
                // Fallback to high-tech SVG wheel if image fails
                (e.target).style.display = 'none';
              }}
            />
            {/* Center wheel rim spoke overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full border-2 border-white/40 bg-black/60 flex items-center justify-center shadow-[0_0_15px_#ff1801]">
                <div className="w-4 h-4 rounded-full bg-[#ff1801]" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Text & Progress Bar */}
        <div className="w-full max-w-md mt-8 px-4">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-racing font-bold tracking-[2px] text-lg sm:text-xl text-white uppercase flex items-center gap-2">
              <span className="text-[#e10600] animate-pulse">&gt;</span>
              INITIALIZING DRIVER...
            </h2>
            <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-wider red-text-glow">
              {progress}%
            </span>
          </div>

          {/* Neon Progress Bar Container */}
          <div className="w-full h-3 bg-black/60 border border-white/15 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#b30000] via-[#e10600] to-[#ff3b30] rounded-full transition-all duration-150 relative shadow-[0_0_15px_#ff1801]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>

          {/* Initialization Checklist */}
          <div className="grid grid-cols-2 gap-2 mt-6">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-2 text-xs font-chakra tracking-wider uppercase transition-colors duration-300 ${
                  item.done ? 'text-white' : 'text-[#545458]'
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 transition-colors ${
                    item.done ? 'text-[#ff1801] fill-[#e10600]/20' : 'text-white/20'
                  }`}
                />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Slogan */}
      <div className="relative z-10 flex items-center justify-between w-full border-t border-white/5 pt-4 text-center">
        <span className="font-mono-tech text-[10px] tracking-[3px] text-[#8e8e93] uppercase mx-auto">
          BUILDING A BETTER TOMORROW &bull; GRAND PRIX TELEMETRY ENGINE
        </span>
      </div>
    </div>
  );
};
