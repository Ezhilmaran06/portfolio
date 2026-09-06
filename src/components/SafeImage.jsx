import { useState } from 'react';

/**
 * SafeImage — renders img with graceful error fallback.
 * Never shows a broken image icon.
 */
export function SafeImage({ src, alt = '', className = '', style = {}, fallbackContent = null, ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return fallbackContent ?? (
      <div
        className={className}
        style={{
          background: 'linear-gradient(135deg, #080810 0%, #1a0208 60%, #080810 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
        aria-label={alt}
      >
        {/* SVG racing tyre fallback */}
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="cockpit-fallback-svg">
          <circle cx="60" cy="60" r="55" stroke="rgba(255,30,45,0.3)" strokeWidth="2" />
          <circle cx="60" cy="60" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle cx="60" cy="60" r="20" fill="rgba(255,30,45,0.15)" stroke="rgba(255,30,45,0.5)" strokeWidth="2" />
          <circle cx="60" cy="60" r="7" fill="rgba(255,30,45,0.7)" />
          <line x1="60" y1="18" x2="60" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="60" y1="78" x2="60" y2="102" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="18" y1="60" x2="42" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="78" y1="60" x2="102" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <text x="60" y="116" textAnchor="middle" fill="rgba(255,30,45,0.4)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">COCKPIT FEED</text>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
