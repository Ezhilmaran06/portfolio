import { useEffect, useState, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const RaceStart = ({ onStartComplete, onSkip }) => {
  const [activeLights, setActiveLights] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);
  const [launching, setLaunching] = useState(false);

  const handleLaunch = useCallback(() => {
    setLightsOut(true);
    setLaunching(true);
    soundManager.playLightsOut();

    setTimeout(() => {
      onStartComplete();
    }, 1200);
  }, [onStartComplete]);

  useEffect(() => {
    let timer;

    if (activeLights < 5) {
      timer = setTimeout(() => {
        const nextLight = activeLights + 1;
        setActiveLights(nextLight);
        soundManager.playLightBeep(nextLight - 1);
      }, 700);
    } else if (activeLights === 5 && !lightsOut) {
      // Hold with all 5 red lights on (like official F1 gantry) then lights out!
      timer = setTimeout(() => {
        handleLaunch();
      }, 1400);
    }

    return () => clearTimeout(timer);
  }, [activeLights, lightsOut, handleLaunch]);

  return (
    <div
      className={`relative w-full min-h-screen bg-[#08080a] flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none transition-all duration-700 ${
        launching ? 'scale-105 brightness-125' : ''
      }`}
    >
      {/* Background Starting Grid with F1 Car Rear */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 filter brightness-90 contrast-125"
        style={{ backgroundImage: `url('/images/screens/02_race_start_sequence.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/80" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded bg-[#e10600] font-racing font-extrabold flex items-center justify-center text-sm shadow-[0_0_12px_#ff1801]">
            E
          </span>
          <div className="flex flex-col">
            <span className="font-racing font-bold tracking-[2px] text-base text-white">
              EZHILMARAN <span className="text-[#e10600]">E</span>
            </span>
            <span className="text-[10px] font-mono-tech tracking-widest text-[#8e8e93]">
              FINAL YEAR IT &bull; STARTING GRID
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onSkip();
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-[#e10600]/20 border border-white/10 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer"
        >
          <span>SKIP INTRO</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#e10600]" />
        </button>
      </div>

      {/* Central Starting Light Gantry */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
        {/* 5-Light F1 Start Gantry Unit */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 px-6 sm:px-10 py-5 rounded-2xl bg-[#0c0d12]/90 border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md mb-8">
          {[1, 2, 3, 4, 5].map((index) => {
            const isOn = !lightsOut && activeLights >= index;
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Individual Round Light */}
                <div
                  className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full transition-all duration-150 ${
                    isOn ? 'f1-light-on scale-105' : 'f1-light-off'
                  }`}
                />
                <span className="text-[9px] font-mono-tech text-[#545458] font-bold">
                  0{index}
                </span>
              </div>
            );
          })}
        </div>

        {/* Prompt Headlines */}
        <div className="max-w-lg">
          <h1 className="font-racing font-extrabold tracking-[4px] text-3xl sm:text-5xl text-white uppercase italic mb-2 drop-shadow-md">
            {lightsOut ? (
              <span className="text-[#00d26a] red-text-glow">LIGHTS OUT! AWAY WE GO!</span>
            ) : (
              <span>READY? RACE STARTS SOON</span>
            )}
          </h1>
          <p className="font-chakra text-sm sm:text-base text-[#a1a1aa] tracking-widest uppercase">
            {lightsOut
              ? 'Accelerating down the main straight...'
              : 'Gearing up for the full telemetry showcase'}
          </p>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="relative z-10 flex items-center justify-center w-full border-t border-white/10 pt-4">
        <span className="font-racing text-xs tracking-[3px] text-[#8e8e93] uppercase italic">
          LET'S RIDE THROUGH MY JOURNEY &bull; LAP 01
        </span>
      </div>
    </div>
  );
};
