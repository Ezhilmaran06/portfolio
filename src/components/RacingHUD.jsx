import { MapPin, Gauge } from 'lucide-react';
import '../styles/home.css';

const SECTION_LABELS = {
  hero:           'HOME',
  trackmap:       'CIRCUIT',
  about:          'ABOUT',
  education:      'EDUCATION',
  skills:         'SKILLS',
  projects:       'PROJECTS',
  experience:     'EXPERIENCE',
  achievements:   'ACHIEVEMENTS',
  certifications: 'CERTIFICATIONS',
  coding:         'CODING PROFILES',
  resume:         'RESUME',
  contact:        'CONTACT',
  finish:         'FINISH LINE',
};

// How many segments to light up per section (out of 10)
const SECTION_PROGRESS = {
  hero:           1,
  about:          2,
  education:      3,
  skills:         4,
  projects:       5,
  experience:     6,
  achievements:   7,
  certifications: 8,
  coding:         9,
  resume:         9,
  contact:        10,
  finish:         10,
};

const TOTAL_SEGS = 10;

/**
 * RacingHUD — fixed bottom telemetry bar.
 * Matches the F1 dashboard reference design exactly.
 */
export function RacingHUD({ currentSection = 'hero', speed = 319, onOpenTrackMap }) {
  if (currentSection === 'loading' || currentSection === 'racestart') return null;

  const label = SECTION_LABELS[currentSection] ?? 'TRACK';
  const activeSeg = SECTION_PROGRESS[currentSection] ?? 1;

  return (
    <aside className="hud-bar" role="complementary" aria-label="Racing telemetry HUD">
      <div className="hud-inner">

        {/* POS */}
        <div className="hud-cell">
          <span className="hud-lbl">POS</span>
          <span className="hud-val">
            01<span className="hud-val-sub">/01</span>
          </span>
        </div>

        <div className="hud-sep" aria-hidden="true" />

        {/* SPEED */}
        <div className="hud-cell">
          <span className="hud-speed-lbl">
            <Gauge size={10} color="#ff1e2d" />
            SPEED
          </span>
          <span className="hud-val">
            {speed}&nbsp;<span className="hud-val-sub">KM/H</span>
          </span>
        </div>

        <div className="hud-sep" aria-hidden="true" />

        {/* CHECKPOINT */}
        <div className="hud-cell">
          <span className="hud-lbl">CHECKPOINT</span>
          <span className={`hud-val${currentSection === 'hero' || currentSection === 'finish' ? ' red' : ''}`}>
            {label}
          </span>
        </div>

        <div className="hud-sep" aria-hidden="true" />

        {/* LAP */}
        <div className="hud-cell">
          <span className="hud-lbl">LAP</span>
          <span className="hud-val">
            01<span className="hud-val-sub">/01</span>
          </span>
        </div>

        {/* Segmented progress bar */}
        <div className="hud-progress" aria-label={`Race progress: ${activeSeg} of ${TOTAL_SEGS}`}>
          {Array.from({ length: TOTAL_SEGS }, (_, i) => (
            <div
              key={i}
              className={`hud-seg${i < activeSeg ? ' on' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* TRACK MAP button */}
        <button
          className="hud-trackmap"
          onClick={() => onOpenTrackMap?.()}
          aria-label="Open track map"
        >
          <MapPin size={13} color="#ff1e2d" />
          <span>TRACK MAP</span>
        </button>

        {/* Brand label */}
        <span className="hud-brand" aria-hidden="true">
          EZHILMARAN &bull; GP TELEMETRY
        </span>

        {/* Minimal F1 watermark */}
        <div className="hud-f1-mark" aria-hidden="true">
          <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
            <rect x="0" y="4" width="8" height="8" fill="white" opacity="0.25" />
            <rect x="10" y="0" width="6" height="16" fill="white" opacity="0.25" />
            <rect x="18" y="4" width="10" height="8" rx="4" fill="white" opacity="0.25" />
          </svg>
        </div>

      </div>
    </aside>
  );
}
