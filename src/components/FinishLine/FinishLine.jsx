import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Download, Flag, Trophy } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const FinishLine = ({ onRestart, onDownloadResume }) => {
  useEffect(() => {
    soundManager.playFinishLine();

    // Trigger Formula 1 Victory Confetti Celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#e10600', '#ffffff', '#ff1801', '#ffd700'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <section id="finish" className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      {/* Background Finish Line Visual */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-90 contrast-110 pointer-events-none"
        style={{ backgroundImage: `url('/assets/portfolio/16-finish-line.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-[#08080a]/70 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Flag className="w-4 h-4 text-[#e10600] animate-bounce" />
          <span className="font-mono-tech text-xs tracking-widest text-[#8e8e93] uppercase">
            16. FINISH LINE &bull; CHEQUERED FLAG
          </span>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#00d26a]/20 border border-[#00d26a]/50 text-xs font-racing font-bold text-[#00d26a] tracking-wider uppercase">
          CIRCUIT COMPLETE
        </span>
      </div>

      {/* Central Finish Gantry & Celebration Banner */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-6 py-8 max-w-3xl mx-auto racing-card corner-brackets-all reveal-on-scroll">
        {/* FINISH Gantry Badge */}
        <div className="inline-flex items-center gap-3 px-8 py-2 rounded-xl bg-black/80 border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-6">
          <span className="text-xl">🏁</span>
          <span className="font-racing font-black text-2xl sm:text-4xl text-white tracking-[6px] uppercase italic">
            FINISH
          </span>
          <span className="text-xl">🏁</span>
        </div>

        {/* Main Headline (Reference Match) */}
        <h1 className="font-racing font-black text-4xl sm:text-6xl text-white uppercase italic tracking-[4px] mb-2 red-text-glow">
          RACE COMPLETE!
        </h1>

        {/* Subtitle */}
        <h2 className="font-chakra font-bold text-lg sm:text-xl text-[#d1d1d6] tracking-[3px] uppercase mb-4">
          THANK YOU FOR VISITING
        </h2>

        {/* Slogan Quote */}
        <p className="font-racing italic font-bold text-base sm:text-lg text-[#ff3b30] tracking-wider mb-8 drop-shadow-[0_0_15px_rgba(225,6,0,0.5)]">
          "Same Passion, Different Track. A Brighter Tomorrow."
        </p>

        {/* Action CTAs: RESTART JOURNEY & DOWNLOAD RESUME (Reference Screen 16 Match) */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              soundManager.playClick();
              onRestart();
            }}
            className="btn-racing-primary px-8 py-4 text-sm sm:text-base cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESTART JOURNEY</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onDownloadResume();
            }}
            className="btn-racing-secondary px-8 py-4 text-sm sm:text-base cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD RESUME</span>
          </button>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto border-t border-white/10 pt-4">
        <span className="font-mono-tech text-[10px] tracking-[2px] text-[#8e8e93] uppercase">
          DRIVER: EZHILMARAN E &bull; POSITION: P1 &bull; FASTEST LAP
        </span>
        <div className="flex items-center gap-2 text-xs font-racing text-[#ff3b30]">
          <Trophy className="w-4 h-4" />
          <span>GRAND PRIX VICTOR</span>
        </div>
      </div>
    </section>
  );
};
