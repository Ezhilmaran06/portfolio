import { useState } from 'react';
import { Cpu, Eye } from 'lucide-react';

export const ProjectImage = ({
  src,
  alt = 'Project Visual',
  title = '',
  projectNumber = '01',
  sectorLabel = '',
  className = '',
  onInspect,
}) => {
  const [imageError, setImageError] = useState(false);

  // If no source is provided or the image failed to load, show clean racing-style fallback panel
  if (!src || imageError) {
    return (
      <div
        className={`relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#0c0d12] via-[#12131a] to-[#08080a] border border-white/15 p-4 flex flex-col justify-between group cursor-pointer corner-brackets-all ${className}`}
        onClick={onInspect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onInspect?.();
          }
        }}
        aria-label={`Inspect garage telemetry for ${title || `Project ${projectNumber}`}`}
      >
        {/* Subtle Engineering Grid Overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 24, 1, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 24, 1, 0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#e10600]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Telemetry Header */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-tech text-[#8e8e93] border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
            <span className="text-[#ff3b30] tracking-widest uppercase">
              {sectorLabel || `SECTOR ${projectNumber} SPEC`}
            </span>
          </div>
          <span className="tracking-wider text-white/60 uppercase">GARAGE BAY {projectNumber}</span>
        </div>

        {/* Center Monogram & Technical Wireframe Callout */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4 py-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(225,6,0,0.2)] group-hover:scale-110 group-hover:border-[#e10600]/60 transition-all duration-300">
            <Cpu className="w-7 h-7 text-[#ff1801]" />
          </div>
          <span className="font-racing font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-1">
            {title || `PROJECT ${projectNumber}`}
          </span>
          <span className="font-mono-tech text-[10px] text-[#8e8e93] tracking-widest uppercase">
            ENGINEERING SCHEMATIC &bull; TELEMETRY VERIFIED
          </span>
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-tech text-[#8e8e93] border-t border-white/10 pt-2">
          <span className="text-white/70 tracking-wider uppercase">STATUS: ACTIVE BUILD</span>
          <span className="text-[#ff1801] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <Eye className="w-3 h-3" />
            CLICK TO INSPECT
          </span>
        </div>
      </div>
    );
  }

  // Normal image rendering with fallback error boundary and hover telemetry
  return (
    <div
      className={`relative w-full aspect-video rounded-xl overflow-hidden bg-black/60 project-img-frame project-img-scanline group cursor-pointer ${className}`}
      onClick={onInspect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect?.();
        }
      }}
      aria-label={`Inspect ${title || `Project ${projectNumber}`}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:brightness-105 group-hover:scale-[1.02] transition-all duration-500 ease-out"
        loading="lazy"
        onError={() => setImageError(true)}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Hover Telemetry Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5 pointer-events-none z-10">
        <span className="font-racing font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#e10600]" />
          INSPECT GARAGE TELEMETRY
        </span>
        <span className="font-mono-tech text-[10px] text-[#ff3b30] uppercase tracking-widest font-semibold">
          EXPAND
        </span>
      </div>
    </div>
  );
};
