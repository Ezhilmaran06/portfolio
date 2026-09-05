import { useState } from 'react';
import { Volume2, VolumeX, Zap, Menu, X, Compass } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Navbar = ({
  currentSection,
  onNavigate,
  recruiterMode,
  onToggleRecruiterMode,
  isMuted,
  onToggleMute,
  onOpenTrackMap,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'trackmap', label: 'TRACK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleItemClick = (id) => {
    soundManager.playClick();
    if (id === 'trackmap') {
      onOpenTrackMap();
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo / Monogram */}
        <button
          onClick={() => handleItemClick('hero')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="w-8 h-8 rounded bg-gradient-to-br from-[#e10600] to-[#990000] text-white font-racing font-extrabold flex items-center justify-center text-lg shadow-[0_0_12px_rgba(225,6,0,0.6)] group-hover:scale-105 transition-transform">
            E
          </span>
          <div className="flex flex-col text-left">
            <span className="font-racing font-bold tracking-[2px] text-lg text-white group-hover:text-[#ff3b30] transition-colors">
              EZHILMARAN <span className="text-[#e10600]">E</span>
            </span>
            <span className="text-[9px] font-mono-tech uppercase tracking-widest text-[#8e8e93]">
              B.Tech IT &bull; Java Dev
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative px-3 py-1.5 rounded text-xs font-racing font-bold tracking-[1.5px] uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10 shadow-[inset_0_-2px_0_#e10600]'
                    : 'text-[#8e8e93] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#e10600] shadow-[0_0_8px_#ff1801]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls: Audio, Track Map & Recruiter Mode */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick Track Minimap Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTrackMap();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-[#e10600]/50 hover:bg-[#e10600]/10 text-xs font-racing font-semibold text-[#8e8e93] hover:text-white transition-all cursor-pointer"
            title="Open GP Track Minimap"
          >
            <Compass className="w-3.5 h-3.5 text-[#e10600] animate-spin-slow" />
            <span>CIRCUIT</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              soundManager.playClick();
            }}
            className="p-1.5 rounded-md bg-white/5 border border-white/10 hover:border-white/20 text-[#8e8e93] hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Racing Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>

          {/* Recruiter Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleRecruiterMode();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-racing font-bold tracking-wider uppercase border transition-all cursor-pointer ${
              recruiterMode
                ? 'bg-[#e10600] border-[#ff3b30] text-white shadow-[0_0_15px_rgba(225,6,0,0.5)]'
                : 'bg-white/5 border-white/15 text-[#8e8e93] hover:text-white hover:border-white/30'
            }`}
            title="Toggle Recruiter Mode for instant navigation"
          >
            <Zap className={`w-3.5 h-3.5 ${recruiterMode ? 'fill-white text-white' : 'text-amber-400'}`} />
            <span>{recruiterMode ? 'RECRUITER' : 'RACE MODE'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md bg-white/5 border border-white/10 text-[#8e8e93] hover:text-white cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 bg-[#08080a]/95 flex flex-col gap-1 pb-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded text-sm font-racing font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  isActive ? 'bg-[#e10600]/20 text-white border-l-4 border-[#e10600]' : 'text-[#8e8e93] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-[10px] text-[#e10600] font-mono-tech">PIT STOP</span>}
              </button>
            );
          })}

          <div className="flex items-center justify-between px-4 pt-3 mt-2 border-t border-white/10">
            <button
              onClick={() => {
                onToggleMute();
                soundManager.playClick();
              }}
              className="flex items-center gap-2 text-xs font-racing text-[#8e8e93] hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
              <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onToggleRecruiterMode();
              }}
              className={`px-3 py-1 rounded text-xs font-racing font-bold ${
                recruiterMode ? 'bg-[#e10600] text-white' : 'bg-white/10 text-[#8e8e93]'
              }`}
            >
              {recruiterMode ? 'RECRUITER ON' : 'RACE MODE'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
