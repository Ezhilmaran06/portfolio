import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Compass, X, Flag, Camera, Eye, Zap, Shield, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { PORTFOLIO_SECTIONS, getSectionById } from '../../data/sections';
import '../../styles/trackmap.css';

// 12 Professional Grand Prix Sectors + Navigation Data mapped across 1600x900 canvas
export const SECTOR_CHECKPOINTS = PORTFOLIO_SECTIONS;

// Coordinate geometry on 1600x900 canvas spanning 85% of screen
export const PRIMARY_CIRCUIT_PATH =
  'M 300 700 C 230 700, 160 630, 150 540 C 140 450, 150 380, 190 320 C 230 260, 290 220, 380 180 C 470 140, 560 145, 660 160 C 740 175, 780 195, 840 215 C 900 235, 960 215, 1020 175 C 1070 140, 1140 145, 1240 155 C 1340 165, 1430 195, 1475 255 C 1515 315, 1495 395, 1445 445 C 1395 495, 1335 505, 1260 520 C 1190 535, 1140 520, 1060 500 C 990 480, 940 520, 890 590 C 840 660, 780 725, 680 750 C 570 775, 470 750, 410 715 C 360 690, 335 700, 300 700 Z';

export const TrackMap = ({
  currentSection = 'home',
  scrollProgress = 0,
  onNavigate,
  isOpen = true,
  onClose,
  isInline = false,
}) => {
  // Normalize section id to match checkpoint list
  const activeId = currentSection === 'trackmap' || currentSection === 'hero' ? 'home' : currentSection;
  const initialCp = getSectionById(activeId);

  const [activeCheckpoint, setActiveCheckpoint] = useState(activeId);
  const [carState, setCarState] = useState({ x: initialCp.x, y: initialCp.y, angle: -170 });
  const [currentSpeed, setCurrentSpeed] = useState(initialCp.speed);
  const [isDriving, setIsDriving] = useState(false);
  const [hoveredCp, setHoveredCp] = useState(null);
  const [cameraMode, setCameraMode] = useState('full'); // 'full', 'follow', 'focus', 'sector'
  const [stageTilt, setStageTilt] = useState({ rx: 0, ry: 0 });

  const pathRef = useRef(null);
  const animFrameRef = useRef(null);

  // Sync state if external section changes
  useEffect(() => {
    const targetId = currentSection === 'trackmap' || currentSection === 'hero' ? 'home' : currentSection;
    setActiveCheckpoint(targetId);
    const cp = getSectionById(targetId);
    setCarState((prev) => ({ ...prev, x: cp.x, y: cp.y }));
    setCurrentSpeed(cp.speed);
  }, [currentSection]);

  // Find active checkpoint record
  const activeCpData = useMemo(() => {
    return (
      SECTOR_CHECKPOINTS.find((c) => c.id === activeCheckpoint) ||
      SECTOR_CHECKPOINTS.find((c) => c.id === activeId) ||
      SECTOR_CHECKPOINTS[0]
    );
  }, [activeCheckpoint, activeId]);

  // Check if checkpoint is completed
  const activeIdx = SECTOR_CHECKPOINTS.findIndex((c) => c.id === activeCheckpoint);

  // 3D Parallax Mouse reaction
  const handleMouseMove = (e) => {
    if (cameraMode !== 'full') return;
    const { innerWidth, innerHeight } = window;
    const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const normY = (e.clientY / innerHeight - 0.5) * 2;
    setStageTilt({
      rx: normY * -3.5, // tilt up/down
      ry: normX * 4.5,  // tilt left/right
    });
  };

  // Dynamic Camera Transform Calculation
  const cameraTransform = useMemo(() => {
    if (cameraMode === 'follow') {
      const cx = 800 - carState.x;
      const cy = 450 - carState.y;
      return `scale(1.45) translate(${cx}px, ${cy}px)`;
    }
    if (cameraMode === 'focus') {
      const cx = 800 - activeCpData.x;
      const cy = 450 - activeCpData.y;
      return `scale(1.6) translate(${cx}px, ${cy}px)`;
    }
    if (cameraMode === 'sector') {
      if (activeCpData.sector === 'SECTOR 1') {
        return 'scale(1.35) translate(300px, 120px)';
      }
      if (activeCpData.sector === 'SECTOR 2') {
        return 'scale(1.35) translate(-280px, 160px)';
      }
      return 'scale(1.35) translate(-80px, -140px)';
    }
    return 'scale(1) translate(0px, 0px)';
  }, [cameraMode, carState.x, carState.y, activeCpData]);

  // Smooth car driving animation along SVG circuit path
  const driveToTarget = useCallback(
    (targetCp, onArrive) => {
      const pathEl = pathRef.current;
      if (!pathEl) {
        setCarState({ x: targetCp.x, y: targetCp.y, angle: 0 });
        if (onArrive) onArrive();
        return;
      }

      setIsDriving(true);
      const totalLen = pathEl.getTotalLength();

      // Sample path to locate closest current point and target point
      let bestCurrentDist = 0;
      let minCurrentDiff = Infinity;
      let bestTargetDist = 0;
      let minTargetDiff = Infinity;

      const samples = 300;
      for (let i = 0; i <= samples; i++) {
        const d = (i / samples) * totalLen;
        const pt = pathEl.getPointAtLength(d);

        const diffCurrent = Math.hypot(pt.x - carState.x, pt.y - carState.y);
        if (diffCurrent < minCurrentDiff) {
          minCurrentDiff = diffCurrent;
          bestCurrentDist = d;
        }

        const diffTarget = Math.hypot(pt.x - targetCp.x, pt.y - targetCp.y);
        if (diffTarget < minTargetDiff) {
          minTargetDiff = diffTarget;
          bestTargetDist = d;
        }
      }

      if (bestTargetDist < bestCurrentDist) {
        bestTargetDist += totalLen;
      }

      const travelDistance = bestTargetDist - bestCurrentDist;
      const startTime = performance.now();
      const duration = Math.min(1600, Math.max(700, travelDistance * 1.5));

      const animate = (time) => {
        const elapsed = time - startTime;
        const progressRatio = Math.min(1, elapsed / duration);

        // Smooth cubic easeInOut
        const ease =
          progressRatio < 0.5
            ? 4 * progressRatio * progressRatio * progressRatio
            : 1 - Math.pow(-2 * progressRatio + 2, 3) / 2;

        const currentD = (bestCurrentDist + travelDistance * ease) % totalLen;
        const nextD = (currentD + 3) % totalLen;

        const pt = pathEl.getPointAtLength(currentD);
        const ptNext = pathEl.getPointAtLength(nextD);
        const angle = (Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180) / Math.PI;

        setCarState({ x: pt.x, y: pt.y, angle });

        // Realistic F1 physics: deceleration on cornering, acceleration on straights
        const dynSpeed = Math.round(
          targetCp.speed + (progressRatio > 0.2 && progressRatio < 0.8 ? 20 : -10)
        );
        setCurrentSpeed(Math.max(160, Math.min(348, dynSpeed)));

        if (progressRatio < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCarState({ x: targetCp.x, y: targetCp.y, angle });
          setCurrentSpeed(targetCp.speed);
          setIsDriving(false);
          soundManager.playCheckpoint();
          if (onArrive) onArrive();
        }
      };

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    },
    [carState.x, carState.y]
  );

  // Checkpoint selection handler
  const handleCheckpointClick = (cp) => {
    soundManager.playClick();
    setActiveCheckpoint(cp.id);

    driveToTarget(cp, () => {
      onNavigate(cp.id);
      if (!isInline && onClose) {
        onClose();
      }
    });
  };

  // Full circuit hot lap demo
  const handleHotLap = () => {
    soundManager.playFinishLine();
    let currentIdx = 0;

    const driveNext = () => {
      if (currentIdx >= SECTOR_CHECKPOINTS.length) {
        soundManager.playFinishLine();
        onNavigate('finish');
        if (!isInline && onClose) onClose();
        return;
      }
      const nextCp = SECTOR_CHECKPOINTS[currentIdx];
      setActiveCheckpoint(nextCp.id);
      driveToTarget(nextCp, () => {
        currentIdx += 1;
        setTimeout(driveNext, 350);
      });
    };

    driveNext();
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!isOpen && !isInline) return null;

  return (
    <div
      className={`trackmap-container ${isInline ? 'relative' : 'trackmap-modal'}`}
      onMouseMove={handleMouseMove}
    >
      {/* 1. Deep Atmospheric & World Environment Background */}
      <div className="trackmap-world-env" />
      <div className="trackmap-stars" />
      <div className="trackmap-vignette" />

      {/* 2. Top Tactical Telemetry Header */}
      <header className="trackmap-top-bar" aria-label="Grand Prix circuit telemetry header">
        {/* Left: Tactical Compass & Status */}
        <div className="flex items-center gap-3">
          <div className="tactical-pill flex items-center gap-2.5 px-3 py-1.5">
            <Compass className="w-4 h-4 text-[#ff1801] animate-spin-slow" />
            <span className="font-racing font-bold text-xs tracking-widest text-white">N</span>
            <span className="text-[#3a3f4e] font-mono-tech text-xs">|</span>
            <span className="font-orbitron text-xs text-[#d1d5db]">AUTODROME GP</span>
            <span className="text-[#3a3f4e] font-mono-tech text-xs">|</span>
            <span className="font-mono-tech text-xs text-[#ff1801] tracking-wider uppercase font-semibold">
              {activeCpData.sector}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-3 tactical-pill px-3 py-1.5 font-mono-tech text-[11px] text-[#9ca3af]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              TRACK: DRY 32°C
            </span>
            <span className="text-[#3a3f4e]">|</span>
            <span>AIR: 24°C</span>
            <span className="text-[#3a3f4e]">|</span>
            <span className="text-[#ff1801] font-semibold">GRIP: 98%</span>
          </div>
        </div>

        {/* Center: Camera Mode Controls */}
        <div className="tactical-pill flex items-center gap-1 p-1">
          <span className="text-[10px] font-mono-tech text-[#6b7280] uppercase tracking-wider px-2 hidden sm:inline">
            CAMERA:
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              setCameraMode('full');
            }}
            className={`camera-btn ${cameraMode === 'full' ? 'active' : ''}`}
            title="Full Circuit Panoramic View"
          >
            CIRCUIT
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setCameraMode('follow');
            }}
            className={`camera-btn ${cameraMode === 'follow' ? 'active' : ''}`}
            title="Dynamic Camera Following Vehicle"
          >
            FOLLOW
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setCameraMode('focus');
            }}
            className={`camera-btn ${cameraMode === 'focus' ? 'active' : ''}`}
            title="Magnified Checkpoint Focus View"
          >
            FOCUS
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setCameraMode('sector');
            }}
            className={`camera-btn ${cameraMode === 'sector' ? 'active' : ''}`}
            title="Sector Framing View"
          >
            SECTOR
          </button>
        </div>

        {/* Right: Action Buttons (Hot-Lap & Close) */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleHotLap}
            disabled={isDriving}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#e10600]/25 hover:bg-[#e10600] border border-[#e10600]/60 text-xs font-racing font-bold tracking-[1.5px] text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(225,6,0,0.35)] active:scale-95"
            title="Automated Full Lap Drive through all portfolio sectors"
          >
            <Flag className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
            <span>{isDriving ? 'DRIVING LAP...' : 'COMPLETE THE CIRCUIT'}</span>
          </button>

          {!isInline && onClose && (
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-black/70 hover:bg-white/20 border border-white/15 text-white cursor-pointer transition-all active:scale-95"
              title="Close Circuit Map (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* 3. Interactive 3D Multi-Route Circuit Canvas (ViewBox: 1600 x 900) */}
      <main
        className="trackmap-stage-wrapper"
        style={{
          transform: `perspective(1200px) rotateX(${stageTilt.rx}deg) rotateY(${stageTilt.ry}deg)`,
        }}
      >
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid meet"
          className={`trackmap-svg-canvas camera-${cameraMode}`}
          style={{ transform: cameraTransform }}
        >
          <defs>
            {/* Red Neon Glow */}
            <filter id="circuitRedGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="9" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Vehicle Ground Shadow */}
            <filter id="f1CarShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.9" />
            </filter>

            {/* Bridge 3D Cast Shadow onto Lower Track */}
            <filter id="bridgeElevationShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.95" />
            </filter>

            {/* Wet Asphalt Sheen Gradient */}
            <linearGradient id="wetAsphaltSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2230" />
              <stop offset="35%" stopColor="#292e40" />
              <stop offset="50%" stopColor="#1a1c26" />
              <stop offset="80%" stopColor="#252a38" />
              <stop offset="100%" stopColor="#141620" />
            </linearGradient>

            {/* Glowing Red Racing Line Gradient */}
            <linearGradient id="redRacingLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1801" />
              <stop offset="50%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#e10600" />
            </linearGradient>

            {/* Headlight Beam Cone Gradient */}
            <radialGradient id="headlightBeam" cx="10%" cy="50%" r="90%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="40%" stopColor="rgba(255, 240, 200, 0.4)" />
              <stop offset="80%" stopColor="rgba(255, 30, 45, 0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Infield Lake Water Gradient */}
            <radialGradient id="lakeWaterGrad" cx="45%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#091b26" />
              <stop offset="60%" stopColor="#06121a" />
              <stop offset="100%" stopColor="#040b10" />
            </radialGradient>

            {/* Stadium Floodlight Radial Cones */}
            <radialGradient id="floodlightCone" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 250, 240, 0.22)" />
              <stop offset="40%" stopColor="rgba(255, 230, 200, 0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* ========================================================
              LAYER 1: BACKGROUND ENVIRONMENT (HORIZON, MOUNTAINS, CITY)
              ======================================================== */}
          {/* Distant Mountain Ridges */}
          <polygon
            points="0,180 180,110 320,150 480,95 620,140 760,80 940,135 1100,75 1280,125 1420,90 1600,145 1600,260 0,260"
            fill="#060912"
            opacity="0.8"
          />
          <polygon
            points="0,210 140,155 290,180 430,140 580,175 720,130 890,165 1040,120 1210,160 1370,135 1520,170 1600,195 1600,290 0,290"
            fill="#080c18"
            opacity="0.9"
          />

          {/* Distant Metropolitan City Skyline (Illuminated Skyscrapers & Towers) */}
          <g opacity="0.65">
            {/* City Silhouette Blocks */}
            <rect x="360" y="110" width="22" height="60" fill="#0b1020" />
            <rect x="385" y="90" width="30" height="80" fill="#0e1428" />
            <rect x="420" y="125" width="25" height="45" fill="#090d1a" />
            <rect x="680" y="95" width="35" height="75" fill="#0d1326" />
            <rect x="720" y="70" width="18" height="100" fill="#101830" />
            <rect x="742" y="115" width="28" height="55" fill="#0a0f1e" />
            <rect x="1010" y="80" width="40" height="90" fill="#0d1326" />
            <rect x="1055" y="105" width="26" height="65" fill="#090d1a" />
            <rect x="1220" y="90" width="34" height="80" fill="#0e1428" />
            <rect x="1260" y="65" width="16" height="105" fill="#101830" />

            {/* Glowing Skyscraper Windows (Subtle golden & cyan specks) */}
            <circle cx="395" cy="110" r="1" fill="#fde047" opacity="0.8" />
            <circle cx="402" cy="120" r="1" fill="#38bdf8" opacity="0.7" />
            <circle cx="700" cy="115" r="1.2" fill="#fde047" opacity="0.9" />
            <circle cx="730" cy="85" r="1.5" fill="#ff1801" className="animate-ping" />
            <circle cx="1030" cy="100" r="1.2" fill="#fde047" opacity="0.8" />
            <circle cx="1270" cy="80" r="1.5" fill="#ff1801" className="animate-ping" />
          </g>

          {/* ========================================================
              LAYER 2: INFIELD CIRCUIT LAKE & PADDOCK COMPLEX
              ======================================================== */}
          {/* Infield Reflection Lake */}
          <path
            d="M 520 340 C 600 300, 720 310, 760 360 C 800 410, 750 480, 680 500 C 610 520, 500 510, 460 450 C 420 390, 470 360, 520 340 Z"
            fill="url(#lakeWaterGrad)"
            stroke="#102534"
            strokeWidth="3"
            opacity="0.95"
          />
          {/* Lake Water Ripple Shimmers */}
          <path d="M 500 390 Q 560 385, 620 390" stroke="#00d2ff" strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M 540 430 Q 610 425, 680 430" stroke="#ff1e2d" strokeWidth="1" opacity="0.25" fill="none" />
          <path d="M 580 460 Q 640 455, 710 460" stroke="#00d2ff" strokeWidth="0.8" opacity="0.25" fill="none" />

          {/* Paddock Headquarters, Garages & Motorhomes */}
          <g id="paddockComplex" opacity="0.9">
            {/* Main Pit Garages Structure */}
            <rect x="250" y="605" width="220" height="38" rx="4" fill="#121622" stroke="#252d42" strokeWidth="1.5" />
            {/* 6 Individual Garage Bays */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={`garage-${i}`} transform={`translate(${260 + i * 35}, 612)`}>
                <rect x="0" y="0" width="26" height="24" rx="2" fill="#090c12" stroke="#1f273a" strokeWidth="1" />
                <rect x="4" y="4" width="18" height="4" fill="#e10600" opacity="0.75" />
                <rect x="4" y="10" width="18" height="10" fill="#f8fafc" opacity="0.15" />
              </g>
            ))}

            {/* Race Control & Timing Tower (4-Story High-Tech Glass Tower) */}
            <g transform="translate(485, 590)">
              <rect x="0" y="0" width="48" height="55" rx="5" fill="#151b2a" stroke="#00d2ff" strokeWidth="1.2" />
              <rect x="6" y="8" width="36" height="12" rx="2" fill="#0284c7" opacity="0.4" />
              <rect x="6" y="24" width="36" height="10" rx="2" fill="#000000" />
              <text x="24" y="32" fill="#22c55e" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" fontWeight="bold">
                RACE: GREEN
              </text>
              <line x1="24" y1="0" x2="24" y2="-12" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="24" cy="-14" r="3" fill="#ff1801" className="animate-ping" />
            </g>

            {/* Team Motorhomes & Transporters in Paddock Infield */}
            <rect x="260" y="555" width="55" height="22" rx="3" fill="#1a202c" stroke="#334155" strokeWidth="1" />
            <rect x="325" y="555" width="55" height="22" rx="3" fill="#1a202c" stroke="#334155" strokeWidth="1" />
            <rect x="390" y="555" width="55" height="22" rx="3" fill="#1a202c" stroke="#334155" strokeWidth="1" />
          </g>

          {/* ========================================================
              TACTICAL GPS INFIELD COMPASS & TOPOGRAPHIC MATRIX
              ======================================================== */}
          <g id="tacticalInfieldCompass" pointerEvents="none" opacity="0.85">
            {/* Topographic Contour Elevation Waves across Infield Terrain */}
            <path d="M 400 480 Q 560 410, 760 450 T 1020 430" stroke="rgba(255, 24, 1, 0.12)" strokeWidth="1.2" strokeDasharray="3 4" fill="none" />
            <path d="M 440 515 Q 600 445, 800 485 T 1060 465" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" strokeDasharray="4 6" fill="none" />
            <path d="M 420 440 Q 580 380, 780 415 T 980 395" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
            <path d="M 470 545 Q 640 480, 830 520 T 1090 500" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" strokeDasharray="6 8" fill="none" />

            {/* Tactical Circuit Compass Rose Centered at (640, 440) */}
            <g transform="translate(640, 440)">
              {/* Outer Azimuth Degree Dial */}
              <circle cx="0" cy="0" r="70" fill="rgba(6, 9, 15, 0.55)" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="64" fill="none" stroke="rgba(255, 24, 1, 0.3)" strokeWidth="1" strokeDasharray="3 6" />
              <circle cx="0" cy="0" r="46" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" strokeDasharray="2 4" />

              {/* Crosshair Alignment Guides */}
              <line x1="-80" y1="0" x2="80" y2="0" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="-80" x2="0" y2="80" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" strokeDasharray="4 4" />

              {/* 45-degree Diagonal Ticks */}
              <line x1="-50" y1="-50" x2="-42" y2="-42" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              <line x1="50" y1="-50" x2="42" y2="-42" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              <line x1="-50" y1="50" x2="-42" y2="42" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              <line x1="50" y1="50" x2="42" y2="42" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />

              {/* Cardinal Compass Markers */}
              {/* North Pointer */}
              <polygon points="0,-68 -5,-54 5,-54" fill="#ff1801" filter="url(#circuitRedGlow)" />
              <text x="0" y="-74" fill="#ff1801" fontSize="10" fontFamily="'Orbitron', sans-serif" fontWeight="900" textAnchor="middle">
                N
              </text>
              {/* East */}
              <text x="76" y="4" fill="#9ca3af" fontSize="9" fontFamily="'Rajdhani', sans-serif" fontWeight="bold" textAnchor="middle">
                E
              </text>
              {/* South */}
              <text x="0" y="80" fill="#9ca3af" fontSize="9" fontFamily="'Rajdhani', sans-serif" fontWeight="bold" textAnchor="middle">
                S
              </text>
              {/* West */}
              <text x="-76" y="4" fill="#9ca3af" fontSize="9" fontFamily="'Rajdhani', sans-serif" fontWeight="bold" textAnchor="middle">
                W
              </text>

              {/* Center Gyro Core */}
              <circle cx="0" cy="0" r="10" fill="#0b0f19" stroke="#ff1801" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill="#ffffff" />

              {/* Technical Telemetry Badges around Compass */}
              <text x="0" y="24" fill="#6b7280" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5px" textAnchor="middle">
                AUTODROME GP
              </text>
              <text x="0" y="34" fill="#ef4444" fontSize="6" fontFamily="'JetBrains Mono', monospace" letterSpacing="1px" textAnchor="middle" opacity="0.8">
                GPS: 45°38'N 09°16'E
              </text>
            </g>
          </g>

          {/* ========================================================
              LAYER 3: GRANDSTANDS & SPECTATOR ARENAS
              ======================================================== */}
          {/* Main Straight Grandstand (Canopy Roof & Seating) */}
          <g transform="translate(200, 745)">
            {/* Grandstand Foundation */}
            <rect x="0" y="0" width="240" height="34" rx="4" fill="#0f141f" stroke="#252d40" strokeWidth="1.5" />
            {/* Canopy Roof */}
            <polygon points="-10,-4 250,-4 240,8 0,8" fill="#e2e8f0" opacity="0.85" />
            {/* Seating Rows Texture */}
            <line x1="10" y1="14" x2="230" y2="14" stroke="#ff1801" strokeWidth="2" strokeDasharray="3 2" opacity="0.6" />
            <line x1="10" y1="20" x2="230" y2="20" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" opacity="0.4" />
            <line x1="10" y1="26" x2="230" y2="26" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" opacity="0.5" />
          </g>

          {/* Turn 1 Grandstand */}
          <g transform="translate(70, 420) rotate(15)">
            <rect x="0" y="0" width="70" height="28" rx="3" fill="#0f141f" stroke="#252d40" strokeWidth="1.2" />
            <polygon points="-5,-3 75,-3 70,6 0,6" fill="#e2e8f0" opacity="0.8" />
            <line x1="5" y1="12" x2="65" y2="12" stroke="#ff1801" strokeWidth="1.8" strokeDasharray="2 2" opacity="0.7" />
          </g>

          {/* North Hairpin Arena Grandstand */}
          <g transform="translate(1420, 310) rotate(-20)">
            <rect x="0" y="0" width="130" height="34" rx="4" fill="#0f141f" stroke="#252d40" strokeWidth="1.5" />
            <polygon points="-5,-4 135,-4 130,8 0,8" fill="#e2e8f0" opacity="0.85" />
            <line x1="8" y1="15" x2="122" y2="15" stroke="#ff1801" strokeWidth="2" strokeDasharray="3 2" opacity="0.6" />
            <line x1="8" y1="22" x2="122" y2="22" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" opacity="0.4" />
          </g>

          {/* Parabolica Arena Grandstand */}
          <g transform="translate(620, 775)">
            <rect x="0" y="0" width="160" height="30" rx="4" fill="#0f141f" stroke="#252d40" strokeWidth="1.5" />
            <polygon points="-5,-3 165,-3 160,7 0,7" fill="#e2e8f0" opacity="0.8" />
            <line x1="8" y1="14" x2="152" y2="14" stroke="#ff1801" strokeWidth="2" strokeDasharray="3 2" opacity="0.6" />
          </g>

          {/* ========================================================
              LAYER 4: STADIUM FLOODLIGHT GANTRIES (14 HIGH-MAST TOWERS)
              ======================================================== */}
          {[
            { x: 130, y: 550 },
            { x: 140, y: 350 },
            { x: 260, y: 190 },
            { x: 440, y: 120 },
            { x: 680, y: 120 },
            { x: 920, y: 130 },
            { x: 1140, y: 115 },
            { x: 1380, y: 170 },
            { x: 1530, y: 350 },
            { x: 1410, y: 560 },
            { x: 1180, y: 560 },
            { x: 940, y: 640 },
            { x: 700, y: 780 },
            { x: 380, y: 760 },
          ].map((fl, idx) => (
            <g key={`floodlight-${idx}`} pointerEvents="none">
              {/* Radial Light Cone Illuminating Track Surface */}
              <circle cx={fl.x} cy={fl.y} r="110" fill="url(#floodlightCone)" />
              {/* Floodlight Mast Structure */}
              <circle cx={fl.x} cy={fl.y} r="3.5" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              {/* 4-Lamp Head Array */}
              <rect x={fl.x - 7} y={fl.y - 7} width="14" height="4" rx="1" fill="#f8fafc" />
              {/* Red Aviation Warning Beacon on Top */}
              <circle cx={fl.x} cy={fl.y - 8} r="1.5" fill="#ff1801" className="floodlight-beacon" />
            </g>
          ))}

          {/* ========================================================
              LAYER 5: TACTICAL PERIMETER RUNOFF & MARSHAL ACCESS PATHS
              ======================================================== */}
          {/* Subtle circuit boundary contour */}
          <path
            d="M 190 320 C 140 240, 220 120, 450 100 C 700 80, 1100 85, 1340 110 C 1470 125, 1540 200, 1475 255"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />

          {/* ========================================================
              LAYER 6: PRIMARY CHAMPIONSHIP GRAND PRIX CIRCUIT
              ======================================================== */}
          {/* 1. Broad Gravel Runoff Shoulder Foundation */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="#0a0c13"
            strokeWidth="52"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />

          {/* 2. Armco Steel Safety Barrier Foundation */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="#1c2230"
            strokeWidth="44"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* 3. Red & White Rumble Kerbs Foundation (Underneath Asphalt) */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="#ffffff"
            strokeWidth="38"
            strokeDasharray="8 8"
            opacity="0.95"
          />
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="#e10600"
            strokeWidth="38"
            strokeDasharray="8 8"
            strokeDashoffset="8"
            opacity="0.98"
          />

          {/* 4. White Track Boundary Limit (Outer Edge Line) */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="31"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. Solid Dark Asphalt Road Core (Sits over Kerbs, peeking 3.5px kerbs on each edge) */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="#121520"
            strokeWidth="29"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 6. Wet Specular Sheen Layer (Realistic AAA Road Shimmer) */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="url(#wetAsphaltSheen)"
            strokeWidth="25"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />

          {/* 7. Centerline Dashed Lane Markings */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="14 18"
          />

          {/* Heavy Braking Skid Marks (Tire Rubber Trails on Approaches) */}
          <g opacity="0.65" pointerEvents="none">
            {/* Approach to Turn 1 Senna 'S' */}
            <path d="M 235 600 C 210 575, 180 540, 165 510" stroke="#000000" strokeWidth="7" fill="none" strokeDasharray="14 6" />
            {/* Approach to North Hairpin */}
            <path d="M 1370 185 C 1420 205, 1460 235, 1475 265" stroke="#000000" strokeWidth="8" fill="none" strokeDasharray="12 5" />
            {/* Approach to Double Chicane */}
            <path d="M 1445 425 C 1430 455, 1400 480, 1375 495" stroke="#000000" strokeWidth="7" fill="none" strokeDasharray="10 5" />
          </g>

          {/* Starting Grid Boxes (10 Numbered Grid Slots on Main Straight) */}
          <g id="startingGridBoxes" pointerEvents="none">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((slot) => {
              const offsetX = 310 - slot * 24;
              const offsetY = 700 + (slot % 2 === 0 ? -6 : 6);
              return (
                <rect
                  key={`grid-slot-${slot}`}
                  x={offsetX}
                  y={offsetY - 5}
                  width="18"
                  height="10"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity="0.75"
                />
              );
            })}
          </g>

          {/* Start/Finish Checkered Gantry Line at (300, 700) */}
          <g transform="translate(300, 700) rotate(88)" pointerEvents="none">
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#ffffff" strokeWidth="4" strokeDasharray="4 4" />
            <line x1="-16" y1="4" x2="16" y2="4" stroke="#000000" strokeWidth="4" strokeDasharray="4 4" />
          </g>

          {/* Invisible Mathematical Target Path for Precise Length & Tangent Calculations */}
          <path
            ref={pathRef}
            id="grandPrixMainPath"
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />

          {/* ========================================================
              LAYER 7: 3D ELEVATED FLYOVER BRIDGE & OVERPASS
              ======================================================== */}
          {/* Bridge overpass at intersection (x: 1060, y: 500) */}
          <g id="flyoverBridge3D" filter="url(#bridgeElevationShadow)" pointerEvents="none">
            {/* Concrete Structural Abutments */}
            <rect x="1025" y="475" width="70" height="50" rx="3" fill="#1c202c" stroke="#374151" strokeWidth="1.5" />
            {/* Upper Bridge Asphalt Deck */}
            <path
              d="M 1025 500 C 1045 500, 1075 500, 1095 500"
              stroke="#252a3a"
              strokeWidth="34"
              strokeLinecap="square"
            />
            {/* High-Visibility White Road Limits on Bridge */}
            <line x1="1025" y1="483" x2="1095" y2="483" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="1025" y1="517" x2="1095" y2="517" stroke="#ffffff" strokeWidth="1.5" />
            {/* Armco Guardrails with Red LED Lighting Strips */}
            <line x1="1025" y1="480" x2="1095" y2="480" stroke="#ff1801" strokeWidth="2.5" filter="url(#circuitRedGlow)" />
            <line x1="1025" y1="520" x2="1095" y2="520" stroke="#ff1801" strokeWidth="2.5" filter="url(#circuitRedGlow)" />
          </g>

          {/* ========================================================
              LAYER 8: GLOWING RED RACING LINE (DYNAMIC APEX FLOW)
              ======================================================== */}
          <path
            d={PRIMARY_CIRCUIT_PATH}
            fill="none"
            stroke="url(#redRacingLineGrad)"
            strokeWidth="3.2"
            strokeDasharray="14 10"
            filter="url(#circuitRedGlow)"
            className="racing-line-flow"
          />

          {/* ========================================================
              LAYER 9: TRACKSIDE TELEMETRY OVERLAYS & SPONSOR BOARDS
              ======================================================== */}
          {/* DRS Zone 1 Overhead Gantry (Back Straight at 1060, 155) */}
          <g transform="translate(1060, 135)" pointerEvents="none">
            <rect x="0" y="0" width="60" height="14" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <text x="30" y="10" fill="#ffffff" fontSize="8" fontFamily="'Rajdhani', sans-serif" fontWeight="bold" textAnchor="middle">
              DRS ZONE 1
            </text>
          </g>

          {/* DRS Zone 2 Overhead Gantry (Main Straight at 450, 715) */}
          <g transform="translate(450, 680)" pointerEvents="none">
            <rect x="0" y="0" width="60" height="14" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <text x="30" y="10" fill="#ffffff" fontSize="8" fontFamily="'Rajdhani', sans-serif" fontWeight="bold" textAnchor="middle">
              DRS ZONE 2
            </text>
          </g>

          {/* Speed Trap Radar Gantry at (1220, 155) */}
          <g transform="translate(1220, 135)" pointerEvents="none">
            <rect x="0" y="0" width="50" height="14" rx="2" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
            <text x="25" y="10" fill="#ffffff" fontSize="7.5" fontFamily="'Rajdhani', sans-serif" fontWeight="bold" textAnchor="middle">
              SPEED TRAP
            </text>
          </g>

          {/* Sector Boundary Lines */}
          <g pointerEvents="none" opacity="0.75">
            {/* Sector 1 End (580, 150) */}
            <line x1="580" y1="130" x2="580" y2="170" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 3" />
            {/* Sector 2 End (1420, 470) */}
            <line x1="1405" y1="470" x2="1445" y2="470" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 3" />
          </g>

          {/* ========================================================
              LAYER 10: HIGH-FIDELITY ANIMATED F1 TELEMETRY CAR
              ======================================================== */}
          <g
            transform={`translate(${carState.x}, ${carState.y}) rotate(${carState.angle})`}
            filter="url(#f1CarShadow)"
            pointerEvents="none"
          >
            {/* Twin Forward Headlight Projection Beams */}
            <polygon
              points="14,-5 120,-28 120,28 14,5"
              fill="url(#headlightBeam)"
              className="car-headlights"
            />

            {/* Neon Underglow Ambient Halo */}
            <circle cx="0" cy="0" r="18" fill="#ff1801" opacity="0.5" filter="url(#circuitRedGlow)" />

            {/* Twin Exhaust Flame Jets during acceleration bursts */}
            {isDriving && (
              <g>
                <polygon points="-16,-3 -32,-2 -16,-1" fill="#f59e0b" opacity="0.9" filter="url(#circuitRedGlow)" />
                <polygon points="-16,1 -32,2 -16,3" fill="#f59e0b" opacity="0.9" filter="url(#circuitRedGlow)" />
              </g>
            )}

            {/* Front Aerodynamic Wing & Carbon Endplates */}
            <rect x="11" y="-10" width="3.5" height="20" rx="1" fill="#18181b" stroke="#ffffff" strokeWidth="0.6" />
            <rect x="14.5" y="-10" width="1" height="3" fill="#e10600" />
            <rect x="14.5" y="7" width="1" height="3" fill="#e10600" />

            {/* Sculpted Nose Cone & Chassis */}
            <path
              d="M 13 0 L 2 -4 L -11 -5 L -14 -5 L -14 5 L -11 5 L 2 4 Z"
              fill="#ff1801"
              stroke="#80000a"
              strokeWidth="0.6"
            />

            {/* Driver Cockpit & Titanium Halo Ring */}
            <circle cx="-1" cy="0" r="3.8" fill="#09090b" stroke="#e4e4e7" strokeWidth="0.8" />
            {/* Driver Helmet (Fluorescent Yellow/Red visor) */}
            <circle cx="-1" cy="0" r="2.2" fill="#ffd60a" />

            {/* Sidepods with Air Radiator Inlets */}
            <rect x="-9" y="-8" width="11" height="16" rx="2.5" fill="#e10600" stroke="#80000a" strokeWidth="0.5" />
            <rect x="-8" y="-7" width="3" height="3" rx="0.5" fill="#18181b" />
            <rect x="-8" y="4" width="3" height="3" rx="0.5" fill="#18181b" />

            {/* Rear Wing Structure */}
            <rect x="-16" y="-11" width="3" height="22" rx="1" fill="#18181b" stroke="#e10600" strokeWidth="0.8" />

            {/* 4 Black Pirelli P-Zero Slick Tyres with Red Sidewalls */}
            <rect x="4" y="-13" width="7.5" height="4" rx="1.2" fill="#000000" stroke="#ff1801" strokeWidth="0.5" />
            <rect x="4" y="9" width="7.5" height="4" rx="1.2" fill="#000000" stroke="#ff1801" strokeWidth="0.5" />
            <rect x="-13" y="-13.5" width="8" height="4.5" rx="1.2" fill="#000000" stroke="#ff1801" strokeWidth="0.5" />
            <rect x="-13" y="9" width="8" height="4.5" rx="1.2" fill="#000000" stroke="#ff1801" strokeWidth="0.5" />

            {/* Rapid Strobe FIA Safety Rain Light on Rear Wing */}
            <circle cx="-16.5" cy="0" r="1.5" fill="#ffffff" className="animate-ping" />
          </g>

          {/* ========================================================
              LAYER 11: THE 12 GRAND PRIX CHECKPOINT GPS STATIONS
              ======================================================== */}
          {SECTOR_CHECKPOINTS.map((cp, idx) => {
            const isCurrent = activeCheckpoint === cp.id || activeId === cp.id;
            const isCompleted = idx < activeIdx;
            const isHovered = hoveredCp === cp.id;

            return (
              <g
                key={cp.id}
                className="checkpoint-node"
                onClick={() => handleCheckpointClick(cp)}
                onMouseEnter={() => {
                  setHoveredCp(cp.id);
                  soundManager.playClick();
                }}
                onMouseLeave={() => setHoveredCp(null)}
              >
                {/* Active Concentric Sonar Pulse Rings */}
                {isCurrent && (
                  <>
                    <circle
                      cx={cp.x}
                      cy={cp.y}
                      r="16"
                      fill="none"
                      stroke="#ff1801"
                      strokeWidth="2.5"
                      className="beacon-sonar-1"
                      filter="url(#circuitRedGlow)"
                    />
                    <circle
                      cx={cp.x}
                      cy={cp.y}
                      r="24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="beacon-sonar-2"
                    />
                  </>
                )}

                {/* Radar Diode Outer Base */}
                <circle
                  cx={cp.x}
                  cy={cp.y}
                  r={isCurrent ? 10 : 8}
                  fill="#080a10"
                  stroke={isCurrent ? '#ffffff' : isCompleted ? '#10b981' : '#ff1801'}
                  strokeWidth={isCurrent ? 3 : 2}
                  className="checkpoint-marker-core"
                  filter={isCurrent || isHovered ? 'url(#circuitRedGlow)' : undefined}
                />

                {/* Central Status Core */}
                <circle
                  cx={cp.x}
                  cy={cp.y}
                  r={isCurrent ? 5.5 : 4}
                  fill={isCurrent ? '#ff1801' : isCompleted ? '#10b981' : '#e10600'}
                />

                {/* Vertical Optical Guide Stalk to Tactical Label */}
                {(() => {
                  const isBelow = cp.id === 'finish' || cp.id === 'coding';
                  const stalkY1 = isBelow ? cp.y + (isCurrent ? 10 : 8) : cp.y - (isCurrent ? 10 : 8);
                  const stalkY2 = isBelow ? cp.y + 20 : cp.y - 20;
                  const badgeY = isBelow ? cp.y + 34 : cp.y - 34;

                  return (
                    <>
                      <line
                        x1={cp.x}
                        y1={stalkY1}
                        x2={cp.x}
                        y2={stalkY2}
                        stroke={isCurrent ? '#ff1801' : 'rgba(255,255,255,0.45)'}
                        strokeWidth="1.4"
                      />

                      {/* Checkpoint Tactical Glass Badge */}
                      <g transform={`translate(${cp.x}, ${badgeY})`}>
                        {/* Badge Background Pill */}
                        <rect
                          x="-46"
                          y="-12"
                          width="92"
                          height="24"
                          rx="4.5"
                          className="checkpoint-badge"
                          fill={isCurrent ? '#e10600' : 'rgba(8, 10, 16, 0.94)'}
                          stroke={
                            isCurrent
                              ? '#ffffff'
                              : isHovered
                              ? '#ff1801'
                              : cp.id === 'finish'
                              ? '#f59e0b'
                              : isCompleted
                              ? 'rgba(16, 185, 129, 0.6)'
                              : 'rgba(255, 255, 255, 0.22)'
                          }
                          strokeWidth={isCurrent ? '1.8' : '1'}
                          filter="drop-shadow(0 4px 10px rgba(0,0,0,0.9))"
                        />

                        {/* Sector Number Tag */}
                        <text
                          x="-36"
                          y="4"
                          fill={isCurrent ? '#ffffff' : cp.id === 'finish' ? '#f59e0b' : '#ff1801'}
                          fontSize="9.5"
                          fontFamily="'JetBrains Mono', monospace"
                          fontWeight="bold"
                        >
                          {cp.sectorNum}
                        </text>

                        {/* Divider */}
                        <line
                          x1="-20"
                          y1="-6"
                          x2="-20"
                          y2="6"
                          stroke={isCurrent ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
                          strokeWidth="1"
                        />

                        {/* Checkpoint Section Name */}
                        <text
                          x="10"
                          y="4"
                          textAnchor="middle"
                          className="checkpoint-text"
                          fill={isCurrent ? '#ffffff' : '#f4f4f5'}
                          style={{
                            fontSize: '11px',
                            fontWeight: isCurrent ? '800' : '700',
                            letterSpacing: '1px',
                          }}
                        >
                          {cp.label}
                        </text>

                        {/* Checkered Flag Pattern for Finish or Completed Icon */}
                        {cp.id === 'finish' && !isCurrent ? (
                          <g transform="translate(33, -5)">
                            <rect x="0" y="0" width="4" height="4" fill="#ffffff" />
                            <rect x="4" y="0" width="4" height="4" fill="#000000" />
                            <rect x="0" y="4" width="4" height="4" fill="#000000" />
                            <rect x="4" y="4" width="4" height="4" fill="#ffffff" />
                          </g>
                        ) : (
                          isCompleted && !isCurrent && (
                            <circle cx="36" cy="0" r="4" fill="#10b981" />
                          )
                        )}
                      </g>
                    </>
                  );
                })()}
              </g>
            );
          })}
        </svg>
      </main>

      {/* 4. Bottom Motorsport Telemetry Console & Quick-Jump Ribbon */}
      <footer className="trackmap-bottom-console" aria-label="Circuit telemetry bottom console">
        {/* Left: Position & Speed with Dynamic Tachometer */}
        <div className="tactical-pill flex items-center gap-4 px-4 py-2">
          {/* Position */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#9ca3af] uppercase tracking-widest font-semibold">
              POS
            </span>
            <span className="font-orbitron font-extrabold text-base sm:text-lg text-white">
              01<span className="text-xs text-[#6b7280] font-normal">/01</span>
            </span>
          </div>

          <div className="w-[1px] h-8 bg-white/10" />

          {/* Speed */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#9ca3af] uppercase tracking-widest font-semibold">
              SPEED
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-orbitron font-extrabold text-base sm:text-lg text-white">
                {currentSpeed}
              </span>
              <span className="text-[10px] text-[#9ca3af] font-mono-tech">KM/H</span>
            </div>
          </div>

          <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />

          {/* Dynamic RPM Tachometer Bars */}
          <div className="hidden sm:flex flex-col gap-1">
            <span className="text-[9px] font-mono-tech text-[#6b7280] uppercase tracking-wider">
              REV METER
            </span>
            <div className="tachometer-bar">
              {[...Array(12)].map((_, i) => {
                const isLit = i < Math.round((currentSpeed / 350) * 12);
                const colorClass =
                  i < 5 ? 'green' : i < 8 ? 'yellow' : i < 11 ? 'red' : 'purple';
                return (
                  <span
                    key={`tacho-${i}`}
                    className={`tacho-seg ${colorClass} ${isLit ? 'lit' : ''}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: Sector Quick-Jump Navigation Ribbon */}
        <nav className="sector-ribbon tactical-pill" aria-label="Direct sector navigation">
          {SECTOR_CHECKPOINTS.map((cp) => {
            const isCurrent = activeCheckpoint === cp.id;
            return (
              <button
                key={`ribbon-${cp.id}`}
                onClick={() => handleCheckpointClick(cp)}
                className={`sector-ribbon-btn ${isCurrent ? 'active' : ''}`}
                title={`Jump to Sector ${cp.sectorNum}: ${cp.label}`}
              >
                <span>{cp.sectorNum}</span> {cp.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Active Section Dossier & Progress */}
        <div className="tactical-pill flex items-center gap-4 px-4 py-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#9ca3af] uppercase tracking-widest font-semibold">
              CURRENT SECTOR
            </span>
            <span className="font-racing font-bold text-base sm:text-lg text-[#ff1801] tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,24,1,0.6)]">
              {activeCpData.label}
            </span>
          </div>

          <div className="w-[1px] h-8 bg-white/10" />

          <div className="flex flex-col">
            <span className="text-[10px] font-mono-tech text-[#9ca3af] uppercase tracking-widest font-semibold">
              CHECKPOINT
            </span>
            <span className="font-orbitron font-extrabold text-sm sm:text-base text-white">
              {activeCpData.sectorNum}
              <span className="text-xs text-[#6b7280] font-normal">/12</span>
            </span>
          </div>

          <div className="hidden lg:flex flex-col border-l border-white/10 pl-4 max-w-[240px]">
            <span className="text-[10px] font-mono-tech text-[#9ca3af] truncate">
              {activeCpData.title}
            </span>
            <span className="text-[10px] text-[#6b7280] truncate font-sans">
              {activeCpData.desc}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
