import { SafeImage } from './SafeImage';
import '../styles/home.css';

const LABELS = ['DRIVE', 'DEVELOP', 'ACHIEVE', 'REPEAT'];

/**
 * RacingCockpit — right panel of the Home hero.
 * Shows the racing car image inside a telemetry-monitor frame.
 */
export function RacingCockpit() {
  return (
    <div className="cockpit-frame">
      {/* Corner telemetry brackets */}
      <div className="cockpit-corner tl" aria-hidden="true" />
      <div className="cockpit-corner tr" aria-hidden="true" />
      <div className="cockpit-corner bl" aria-hidden="true" />
      <div className="cockpit-corner br" aria-hidden="true" />

      {/* Top-right DRIVE / DEVELOP / ACHIEVE / REPEAT labels */}
      <div className="cockpit-labels-tr" aria-hidden="true">
        {LABELS.map((word) => (
          <div key={word} className="cockpit-label-row">
            <span className="cockpit-label-word">{word}</span>
            <span className="cockpit-label-line" />
          </div>
        ))}
      </div>

      {/* Racing car / driver visual from Section 03 */}
      <SafeImage
        src="/assets/portfolio/03-home-hero.webp"
        alt="Formula 1 driver and racecar cockpit visual"
        className="cockpit-image"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }}
        loading="eager"
      />

      {/* Bottom overlay: progress + slogan */}
      <div className="cockpit-bottom-overlay">
        <div className="cockpit-prog-row">
          <div className="cockpit-prog-bar">
            <div className="cockpit-prog-fill" style={{ width: '78%' }} />
          </div>
          <span className="cockpit-percent">78%</span>
        </div>
        <div className="cockpit-slogan">NEVER STOP LEARNING &amp; GROWING</div>
        <div className="cockpit-status">DRIVER COCKPIT &bull; READY</div>
      </div>
    </div>
  );
}
