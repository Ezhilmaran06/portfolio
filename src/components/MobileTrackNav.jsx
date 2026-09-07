import { X, Flag, CheckCircle2, ChevronRight } from 'lucide-react';
import { PORTFOLIO_SECTIONS } from '../data/sections';
import { soundManager } from '../utils/audio';

export function MobileTrackNav({
  isOpen = false,
  onClose,
  currentSection = 'home',
  onNavigate,
}) {
  if (!isOpen) return null;

  const currentIdx = PORTFOLIO_SECTIONS.findIndex(
    (s) => s.id === currentSection || s.altId === currentSection
  );

  const handleSelect = (id) => {
    soundManager.playClick();
    onNavigate?.(id);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-xl flex flex-col p-5 overflow-y-auto select-none"
      role="dialog"
      aria-label="Mobile Circuit Journey Route"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff1801] animate-ping" />
          <span className="font-racing font-bold text-sm tracking-[2px] text-white uppercase">
            GRAND PRIX ROUTE &bull; MOBILE TELEMETRY
          </span>
        </div>
        <button
          onClick={() => {
            soundManager.playClick();
            onClose?.();
          }}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close route navigation"
        >
          <X size={18} />
        </button>
      </div>

      {/* Start Flag indicator */}
      <div className="flex items-center gap-3 px-3 py-1.5 mb-2 text-[#9ca3af] font-mono-tech text-xs tracking-wider">
        <span className="text-[#ff1801] font-bold">START</span>
        <span className="text-white/20">|</span>
        <span>PIT STRAIGHT LAUNCH</span>
      </div>

      {/* Vertical Track Route Spine */}
      <div className="relative pl-6 py-2 flex flex-col gap-3">
        {/* Connecting Vertical Track Line */}
        <div className="absolute left-[35px] top-4 bottom-4 w-[3px] bg-gradient-to-b from-[#ff1801] via-[#e10600] to-[#10b981] rounded-full opacity-60 pointer-events-none" />

        {PORTFOLIO_SECTIONS.map((sec, idx) => {
          const isCurrent = sec.id === currentSection || sec.altId === currentSection;
          const isCompleted = currentIdx > -1 && idx < currentIdx;

          return (
            <button
              key={sec.id}
              onClick={() => handleSelect(sec.id)}
              className={`relative z-10 flex items-center gap-3.5 p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                isCurrent
                  ? 'bg-[#e10600]/25 border-[#ff1801] shadow-[0_0_20px_rgba(255,24,1,0.35)] translate-x-1'
                  : isCompleted
                  ? 'bg-[#10b981]/10 border-[#10b981]/40'
                  : 'bg-black/60 border-white/10 hover:border-white/30'
              }`}
            >
              {/* Checkpoint Node Marker */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                  isCurrent
                    ? 'bg-[#ff1801] border-white shadow-[0_0_12px_#ff1801]'
                    : isCompleted
                    ? 'bg-[#10b981] border-[#10b981]'
                    : 'bg-[#181a24] border-white/20'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={12} className="text-white" />
                ) : sec.id === 'finish' ? (
                  <Flag size={11} className={isCurrent ? 'text-white' : 'text-[#f59e0b]'} />
                ) : (
                  <span
                    className={`font-mono-tech text-[10px] font-bold ${
                      isCurrent ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {sec.sectorNum}
                  </span>
                )}
              </div>

              {/* Label & Details */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-racing font-bold text-sm tracking-wider uppercase truncate ${
                      isCurrent ? 'text-white' : 'text-gray-300'
                    }`}
                  >
                    {sec.label}
                  </span>
                  <span className="font-mono-tech text-[10px] text-gray-500 uppercase shrink-0">
                    {sec.checkpointName}
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] text-gray-400 truncate">
                  {sec.title}
                </span>
              </div>

              {/* Arrow */}
              <ChevronRight
                size={14}
                className={isCurrent ? 'text-[#ff1801]' : 'text-gray-600'}
              />
            </button>
          );
        })}
      </div>

      {/* Finish Indicator */}
      <div className="flex items-center gap-3 px-3 py-2 mt-4 text-[#10b981] font-mono-tech text-xs tracking-wider border-t border-white/10">
        <Flag size={14} className="text-[#10b981]" />
        <span>FINISH LINE &bull; CAREER VICTORY LAP</span>
      </div>
    </div>
  );
}
