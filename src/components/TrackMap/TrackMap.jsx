import { useState } from 'react';
import { Compass, X, Flag } from 'lucide-react';
import { soundManager } from '../../utils/audio';





export const TrackMap = ({
  currentSection,
  onNavigate,
  isOpen,
  onClose,
  isInline = false,
}) => {
  const [speed, setSpeed] = useState(285);

  const checkpoints = [
    { id: 'hero', label: 'HOME', x: 340, y: 160, sector: 'SECTOR 1' },
    { id: 'about', label: 'ABOUT', x: 140, y: 360, sector: 'SECTOR 1' },
    { id: 'education', label: 'EDUCATION', x: 260, y: 440, sector: 'SECTOR 2' },
    { id: 'skills', label: 'SKILLS', x: 500, y: 340, sector: 'SECTOR 2' },
    { id: 'projects', label: 'PROJECTS', x: 440, y: 220, sector: 'SECTOR 2' },
    { id: 'experience', label: 'EXPERIENCE', x: 310, y: 460, sector: 'PIT LANE' },
    { id: 'achievements', label: 'ACHIEVEMENTS', x: 740, y: 220, sector: 'SECTOR 3' },
    { id: 'certifications', label: 'CERTIFICATIONS', x: 860, y: 330, sector: 'SECTOR 3' },
    { id: 'coding', label: 'CODING', x: 800, y: 440, sector: 'SECTOR 3' },
    { id: 'resume', label: 'RESUME', x: 700, y: 530, sector: 'SECTOR 3' },
    { id: 'contact', label: 'CONTACT', x: 640, y: 590, sector: 'MAIN STRAIGHT' },
    { id: 'finish', label: 'FINISH', x: 580, y: 610, sector: 'CHECKERED' },
  ];

  const handleCheckpointClick = (id) => {
    soundManager.playCheckpoint();
    setSpeed(Math.floor(Math.random() * 50) + 290);
    onNavigate(id);
    if (!isInline) {
      onClose();
    }
  };

  const handleCompleteCircuit = () => {
    soundManager.playFinishLine();
    onNavigate('finish');
    if (!isInline) {
      onClose();
    }
  };

  if (!isOpen && !isInline) return null;

  return (
    <div
      className={
        isInline
          ? 'relative w-full py-12'
          : 'fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 select-none'
      }
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-4">
        {/* Compass & Lap Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/15">
            <Compass className="w-4 h-4 text-[#e10600] animate-spin-slow" />
            <span className="font-racing font-bold text-xs tracking-widest text-white">N</span>
            <span className="text-[#545458] font-mono-tech text-xs">|</span>
            <span className="font-orbitron text-xs text-[#a1a1aa]">LAP 1/1</span>
          </div>

          <span className="hidden sm:inline font-mono-tech text-xs tracking-widest text-[#8e8e93] uppercase">
            4. TRACK MAP &bull; NAVIGATION OVERLAY
          </span>
        </div>

        {/* Action Button: Complete the Circuit / Close */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCompleteCircuit}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#e10600]/20 hover:bg-[#e10600] border border-[#e10600]/50 text-xs font-racing font-bold tracking-[1.5px] text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(225,6,0,0.3)]"
          >
            <Flag className="w-3.5 h-3.5 text-white" />
            <span>COMPLETE THE CIRCUIT</span>
          </button>

          {!isInline && (
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              title="Close Circuit Map"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Circuit Canvas SVG */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center min-h-[360px] sm:min-h-[480px]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 circuit-grid opacity-50 rounded-2xl pointer-events-none" />

        {/* Vector F1 GP Circuit Track Outline */}
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full max-h-[520px] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]"
        >
          <defs>
            {/* Glowing Neon Track Gradient */}
            <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a2c36" />
              <stop offset="50%" stopColor="#414454" />
              <stop offset="100%" stopColor="#2a2c36" />
            </linearGradient>

            <linearGradient id="racingLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1801" />
              <stop offset="50%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#e10600" />
            </linearGradient>

            <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Track Outer Border / Runoff Area */}
          <path
            d="M 320 120 C 500 110, 680 160, 750 210 C 820 260, 920 300, 900 400 C 880 500, 750 560, 680 620 C 600 680, 480 600, 360 520 C 240 440, 100 480, 70 380 C 40 280, 140 130, 320 120 Z"
            fill="none"
            stroke="#161720"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Main Asphalt Track Surface */}
          <path
            d="M 320 120 C 500 110, 680 160, 750 210 C 820 260, 920 300, 900 400 C 880 500, 750 560, 680 620 C 600 680, 480 600, 360 520 C 240 440, 100 480, 70 380 C 40 280, 140 130, 320 120 Z"
            fill="none"
            stroke="url(#trackGradient)"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Racing Apex Line */}
          <path
            d="M 320 120 C 500 110, 680 160, 750 210 C 820 260, 920 300, 900 400 C 880 500, 750 560, 680 620 C 600 680, 480 600, 360 520 C 240 440, 100 480, 70 380 C 40 280, 140 130, 320 120 Z"
            fill="none"
            stroke="url(#racingLineGradient)"
            strokeWidth="3"
            strokeDasharray="8 6"
            filter="url(#redGlow)"
            className="animate-pulse"
          />

          {/* Interactive Checkpoints along Circuit */}
          {checkpoints.map((cp) => {
            const isCurrent = currentSection === cp.id;
            return (
              <g
                key={cp.id}
                className="cursor-pointer group"
                onClick={() => handleCheckpointClick(cp.id)}
              >
                {/* Checkpoint Beacon Ring */}
                <circle
                  cx={cp.x}
                  cy={cp.y}
                  r={isCurrent ? 14 : 9}
                  className={`transition-all duration-300 ${
                    isCurrent
                      ? 'fill-[#ff1801] stroke-white stroke-2 shadow-[0_0_20px_#ff1801] animate-ping'
                      : 'fill-[#12131a] stroke-[#e10600] stroke-2 group-hover:fill-[#e10600]'
                  }`}
                />
                <circle
                  cx={cp.x}
                  cy={cp.y}
                  r={isCurrent ? 8 : 5}
                  className={isCurrent ? 'fill-white' : 'fill-[#e10600]'}
                />

                {/* Waypoint Label Box */}
                <rect
                  x={cp.x - 45}
                  y={cp.y - 34}
                  width="90"
                  height="22"
                  rx="4"
                  className={`transition-all ${
                    isCurrent
                      ? 'fill-[#e10600] stroke-white/40'
                      : 'fill-[#0c0d12]/90 stroke-white/10 group-hover:fill-[#1e2029]'
                  }`}
                  strokeWidth="1"
                />
                <text
                  x={cp.x}
                  y={cp.y - 19}
                  textAnchor="middle"
                  className={`font-racing font-bold text-[11px] tracking-wider uppercase select-none ${
                    isCurrent ? 'fill-white font-extrabold' : 'fill-[#e5e5ea] group-hover:fill-[#ff3b30]'
                  }`}
                >
                  {cp.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Telemetry HUD Bar (Reference Match) */}
      <div className="w-full max-w-5xl mx-auto mt-4 px-4 py-3 rounded-xl glass-panel border border-white/15 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase tracking-wider">POSITION</span>
            <span className="font-orbitron font-extrabold text-lg text-white">01/01</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase tracking-wider">SPEED</span>
            <span className="font-orbitron font-extrabold text-lg text-white red-text-glow">
              {speed} <span className="text-xs text-[#8e8e93] font-normal">KM/H</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase tracking-wider">CURRENT SECTION</span>
            <span className="font-racing font-bold text-lg text-[#ff1801] tracking-wider uppercase">
              {currentSection.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-racing text-xs tracking-[2px] text-[#8e8e93] uppercase">
            YOUR JOURNEY &bull; MY PORTFOLIO
          </span>
        </div>
      </div>
    </div>
  );
};
