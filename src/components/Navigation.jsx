import { useState } from 'react';
import { MapPin, Volume2, VolumeX, Zap, Menu, X } from 'lucide-react';
import '../styles/home.css';

const NAV_ITEMS = [
  { id: 'hero',         label: 'HOME' },
  { id: 'trackmap',     label: 'TRACK' },
  { id: 'about',        label: 'ABOUT' },
  { id: 'projects',     label: 'PROJECTS' },
  { id: 'skills',       label: 'SKILLS' },
  { id: 'experience',   label: 'EXPERIENCE' },
  { id: 'contact',      label: 'CONTACT' },
];

/**
 * Navigation — fixed top navbar matching the F1 reference design.
 * Props:
 *   currentSection   — active nav id
 *   onNavigate       — (id) => void
 *   recruiterMode    — boolean
 *   onToggleRecruiterMode — () => void
 *   isMuted          — boolean
 *   onToggleMute     — () => void
 *   onOpenTrackMap   — () => void
 */
export function Navigation({
  currentSection = 'hero',
  onNavigate,
  recruiterMode = false,
  onToggleRecruiterMode,
  isMuted = false,
  onToggleMute,
  onOpenTrackMap,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id) => {
    if (id === 'trackmap') {
      onOpenTrackMap?.();
    } else {
      onNavigate?.(id);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="nav-bar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* ---- LOGO ---- */}
          <button
            className="nav-logo-btn"
            onClick={() => handleNav('hero')}
            aria-label="Go to home"
          >
            <div className="nav-logo-box" aria-hidden="true">E</div>
            <div className="nav-logo-info">
              <span className="nav-logo-name">
                EZHILMARAN <em>E</em>
              </span>
              <span className="nav-logo-sub">B.TECH IT &bull; JAVA DEV</span>
            </div>
          </button>

          {/* ---- CENTER NAV LINKS (desktop) ---- */}
          <ul className="nav-links" role="list">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = currentSection === id || (id === 'hero' && currentSection === 'hero');
              return (
                <li key={id} className="nav-link-item">
                  <button
                    className={`nav-link-btn${isActive ? ' active' : ''}`}
                    onClick={() => handleNav(id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </button>
                  {isActive && <span className="nav-active-underline" aria-hidden="true" />}
                </li>
              );
            })}
          </ul>

          {/* ---- RIGHT CONTROLS ---- */}
          <div className="nav-controls">
            {/* CIRCUIT */}
            <button
              className="nav-ctrl circuit"
              onClick={() => onOpenTrackMap?.()}
              aria-label="Open circuit track map"
            >
              <span className="circuit-icon" aria-hidden="true">
                <MapPin size={9} color="#ff1e2d" />
              </span>
              <span className="nav-ctrl-text">CIRCUIT</span>
            </button>

            {/* SOUND toggle */}
            <button
              className="nav-ctrl-icon-only"
              onClick={() => onToggleMute?.()}
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
              aria-pressed={isMuted}
            >
              {isMuted
                ? <VolumeX size={16} />
                : <Volume2 size={16} />
              }
            </button>

            {/* RACE MODE */}
            <button
              className={`nav-ctrl race-mode-ctrl${recruiterMode ? ' active' : ''}`}
              onClick={() => onToggleRecruiterMode?.()}
              aria-label={recruiterMode ? 'Disable race mode' : 'Enable race mode'}
              aria-pressed={recruiterMode}
            >
              <Zap size={14} />
              <span className="nav-ctrl-text">RACE MODE</span>
            </button>

            {/* MOBILE hamburger */}
            <button
              className="nav-mobile-menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ---- MOBILE DRAWER ---- */}
      {mobileOpen && (
        <div className="nav-mobile-drawer" role="dialog" aria-label="Mobile navigation">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav-mobile-link${currentSection === id ? ' active' : ''}`}
              onClick={() => handleNav(id)}
            >
              {label}
            </button>
          ))}
          <button
            className="nav-mobile-link"
            onClick={() => { onToggleMute?.(); setMobileOpen(false); }}
          >
            {isMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
          </button>
        </div>
      )}
    </>
  );
}
