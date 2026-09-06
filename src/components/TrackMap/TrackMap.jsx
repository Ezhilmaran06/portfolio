import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Compass, X, Flag } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import '../../styles/trackmap.css';

// 13 Grand Prix Checkpoints mapped with precision to the circuit layout
const CHECKPOINTS = [
  { id: 'hero',           label: 'HOME',           x: 289, y: 299, progress: 0,   speed: 322, sector: 'MAIN STRAIGHT', desc: 'Starting Grid & Launch Control' },
  { id: 'about',          label: 'ABOUT',          x: 252, y: 195, progress: 8,   speed: 212, sector: 'SECTOR 1',      desc: 'Driver Profile & Bio' },
  { id: 'education',      label: 'EDUCATION',      x: 404, y: 177, progress: 18,  speed: 318, sector: 'TOP STRAIGHT',  desc: 'Academic Milestones (B.Tech IT)' },
  { id: 'skills',         label: 'SKILLS',         x: 609, y: 204, progress: 28,  speed: 228, sector: 'S-CURVES',      desc: 'Technical Telemetry & Stack' },
  { id: 'projects',       label: 'PROJECTS',       x: 853, y: 249, progress: 40,  speed: 334, sector: 'SECTOR 2',      desc: 'Race Machinery & Live Apps' },
  { id: 'certifications', label: 'CERTIFICATIONS', x: 890, y: 324, progress: 50,  speed: 196, sector: 'HAIRPIN',       desc: 'Verified Driver Credentials' },
  { id: 'achievements',   label: 'ACHIEVEMENTS',   x: 698, y: 308, progress: 60,  speed: 242, sector: 'INNER LOOP',    desc: 'Podium Finishes & Milestones' },
  { id: 'experience',     label: 'EXPERIENCE',     x: 524, y: 287, progress: 68,  speed: 268, sector: 'FLYOVER BRIDGE',desc: 'Career Grand Prix & Readiness' },
  { id: 'coding',         label: 'CODING',         x: 576, y: 369, progress: 76,  speed: 218, sector: 'INFIELD',       desc: 'GitHub & LeetCode Telemetry' },
  { id: 'trackmap',       label: 'TRACK',          x: 335, y: 355, progress: 84,  speed: 282, sector: 'PIT STRAIGHT',  desc: 'Interactive Circuit Map' },
  { id: 'resume',         label: 'RESUME',         x: 354, y: 394, progress: 90,  speed: 254, sector: 'SECTOR 4',      desc: 'Technical Dossier & Download' },
  { id: 'contact',        label: 'CONTACT',        x: 492, y: 440, progress: 95,  speed: 310, sector: 'APPROACH',      desc: 'Pit Wall Radio Channels' },
  { id: 'finish',         label: 'FINISH',         x: 604, y: 415, progress: 100, speed: 338, sector: 'CHECKERED',    desc: 'Victory Lap & Checkered Flag' },
];

// Multi-route racing circuit vectors (1024 x 576 coordinate system)
const MAIN_CIRCUIT_PATH =
  'M 289.0 299.0 C 270.3 297.5, 232.1 298.9, 215.0 290.0 C 197.9 281.1, 177.3 252.8, 175.0 240.0 C 172.8 227.3, 188.4 211.8, 200.0 205.0 C 211.6 198.3, 233.3 198.4, 252.0 195.0 C 270.8 191.6, 302.2 184.7, 325.0 182.0 C 347.8 179.3, 378.5 177.3, 404.0 177.0 C 429.5 176.7, 473.1 176.6, 495.0 180.0 C 516.9 183.4, 532.9 196.4, 550.0 200.0 C 567.1 203.6, 590.3 204.3, 609.0 204.0 C 627.8 203.7, 653.1 196.3, 675.0 198.0 C 696.9 199.7, 728.3 207.3, 755.0 215.0 C 781.7 222.7, 829.0 237.0, 853.0 249.0 C 877.0 261.0, 909.5 283.8, 915.0 295.0 C 920.5 306.3, 905.8 318.0, 890.0 324.0 C 874.3 330.0, 831.8 335.6, 810.0 335.0 C 788.3 334.4, 761.8 324.1, 745.0 320.0 C 728.2 315.9, 715.3 311.8, 698.0 308.0 C 680.8 304.3, 648.5 298.0, 630.0 295.0 C 611.5 292.0, 590.9 289.2, 575.0 288.0 C 559.1 286.8, 539.0 283.7, 524.0 287.0 C 509.0 290.3, 480.9 301.3, 475.0 310.0 C 469.1 318.7, 476.0 336.8, 485.0 345.0 C 494.0 353.3, 521.4 361.4, 535.0 365.0 C 548.6 368.6, 573.8 363.0, 576.0 369.0 C 578.3 375.0, 565.9 401.1, 550.0 405.0 C 534.1 408.9, 494.8 401.0, 470.0 395.0 C 445.3 389.0, 405.3 371.0, 385.0 365.0 C 364.8 359.0, 348.5 353.5, 335.0 355.0 C 321.5 356.5, 292.1 369.1, 295.0 375.0 C 297.9 380.9, 335.3 386.5, 354.0 394.0 C 372.8 401.5, 399.3 418.1, 420.0 425.0 C 440.7 431.9, 471.0 438.9, 492.0 440.0 C 513.0 441.1, 543.2 435.8, 560.0 432.0 C 576.8 428.3, 591.3 422.1, 604.0 415.0 C 616.8 407.9, 642.6 397.0, 645.0 385.0 C 647.4 373.0, 638.8 349.3, 620.0 335.0 C 601.3 320.8, 551.5 296.0, 520.0 290.0 C 488.5 284.0, 437.0 293.5, 410.0 295.0 C 383.0 296.5, 358.1 299.4, 340.0 300.0 C 321.9 300.6, 307.8 300.5, 289.0 299.0 Z';

const INNER_LOOP_PATH =
  'M 698.0 308.0 C 717.3 311.7, 730.1 316.4, 745.0 320.0 C 759.9 323.6, 805.3 329.0, 810.0 335.0 C 814.7 341.0, 793.3 359.7, 780.0 365.0 C 766.7 370.3, 728.7 375.7, 710.0 375.0 C 691.3 374.3, 657.9 360.8, 640.0 360.0 C 622.1 359.2, 590.0 368.3, 576.0 369.0 C 562.0 369.7, 541.9 375.9, 535.0 365.0 C 528.1 354.1, 515.3 296.7, 524.0 287.0 C 532.7 277.3, 576.8 289.2, 600.0 292.0 C 623.2 294.8, 678.7 304.3, 698.0 308.0 Z';

const OUTER_LOOP_PATH =
  'M 252.0 195.0 C 282.5 186.6, 356.4 175.8, 404.0 177.0 C 451.6 178.2, 562.2 198.9, 609.0 204.0 C 655.8 209.1, 722.5 209.0, 755.0 215.0 C 787.5 221.0, 831.7 238.3, 853.0 249.0 C 874.3 259.7, 910.1 285.0, 915.0 295.0 C 919.9 305.0, 901.3 314.0, 890.0 324.0 C 878.7 334.0, 850.0 357.9, 830.0 370.0 C 810.0 382.1, 770.1 409.0, 740.0 415.0 C 709.9 421.0, 637.1 411.7, 604.0 415.0 C 570.9 418.3, 525.3 442.8, 492.0 440.0 C 458.7 437.2, 380.3 402.7, 354.0 394.0 C 327.7 385.3, 313.5 388.9, 295.0 375.0 C 276.5 361.1, 231.0 308.0, 215.0 290.0 C 199.0 272.0, 170.1 252.7, 175.0 240.0 C 179.9 227.3, 221.5 203.4, 252.0 195.0 Z';

const PIT_LANE_PATH =
  'M 370.0 355.0 C 350.0 352.0, 335.0 355.0, 315.0 340.0 C 298.0 328.0, 292.0 312.0, 289.0 299.0';

export const TrackMap = ({
  currentSection = 'hero',
  onNavigate,
  isOpen = true,
  onClose,
  isInline = false,
}) => {
  const [prevSection, setPrevSection] = useState(currentSection);
  const [activeCheckpoint, setActiveCheckpoint] = useState(currentSection);

  const initialCp = CHECKPOINTS.find((c) => c.id === currentSection) || CHECKPOINTS[0];
  const [carState, setCarState] = useState({ x: initialCp.x, y: initialCp.y, angle: -160 });
  const [currentSpeed, setCurrentSpeed] = useState(initialCp.speed);
  const [isDriving, setIsDriving] = useState(false);
  const [hoveredCp, setHoveredCp] = useState(null);

  const pathRef = useRef(null);
  const animFrameRef = useRef(null);

  // Sync active checkpoint and car when currentSection prop changes
  if (currentSection !== prevSection) {
    setPrevSection(currentSection);
    setActiveCheckpoint(currentSection);
    const cp = CHECKPOINTS.find((c) => c.id === currentSection) || CHECKPOINTS[0];
    setCarState((prev) => ({ ...prev, x: cp.x, y: cp.y }));
    setCurrentSpeed(cp.speed);
  }

  // Find checkpoint details
  const activeCpData = useMemo(() => {
    return (
      CHECKPOINTS.find((c) => c.id === activeCheckpoint) ||
      CHECKPOINTS.find((c) => c.id === currentSection) ||
      CHECKPOINTS[0]
    );
  }, [activeCheckpoint, currentSection]);

  // Drive vehicle smoothly along SVG path to target checkpoint
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

      // Sample path to find nearest distance to current car position and target position
      let bestCurrentDist = 0;
      let minCurrentDiff = Infinity;
      let bestTargetDist = 0;
      let minTargetDiff = Infinity;

      const samples = 200;
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

      // If wrapping around circuit
      if (bestTargetDist < bestCurrentDist) {
        bestTargetDist += totalLen;
      }

      const startTime = performance.now();
      const duration = Math.min(1400, Math.max(650, (bestTargetDist - bestCurrentDist) * 1.6));

      const animate = (time) => {
        const elapsed = time - startTime;
        const progressRatio = Math.min(1, elapsed / duration);
        // Easing: easeInOutQuad
        const ease =
          progressRatio < 0.5
            ? 2 * progressRatio * progressRatio
            : -1 + (4 - 2 * progressRatio) * progressRatio;

        const currentD = (bestCurrentDist + (bestTargetDist - bestCurrentDist) * ease) % totalLen;
        const nextD = (currentD + 2) % totalLen;

        const pt = pathEl.getPointAtLength(currentD);
        const ptNext = pathEl.getPointAtLength(nextD);
        const angle = (Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180) / Math.PI;

        setCarState({ x: pt.x, y: pt.y, angle });

        // Dynamic speed simulation based on turn sharpness
        const turnSharpness = Math.abs(angle % 90);
        const dynSpeed = Math.round(targetCp.speed + (progressRatio < 0.7 ? 15 : -8) - (turnSharpness > 40 ? 30 : 0));
        setCurrentSpeed(Math.max(185, Math.min(345, dynSpeed)));

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

  // Checkpoint click handler: drives car and navigates
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

  // Complete the circuit hot-lap demo
  const handleHotLap = () => {
    soundManager.playFinishLine();
    let currentIdx = 0;

    const driveNext = () => {
      if (currentIdx >= CHECKPOINTS.length) {
        soundManager.playFinishLine();
        onNavigate('finish');
        if (!isInline && onClose) onClose();
        return;
      }
      const nextCp = CHECKPOINTS[currentIdx];
      setActiveCheckpoint(nextCp.id);
      driveToTarget(nextCp, () => {
        currentIdx += 1;
        setTimeout(driveNext, 300);
      });
    };

    driveNext();
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!isOpen && !isInline) return null;

  return (
    <div className={`trackmap-container ${isInline ? 'relative' : 'trackmap-modal'}`}>
      {/* Background High-Definition Circuit World Artwork */}
      <div
        className="trackmap-bg-artwork"
        style={{ backgroundImage: `url('/assets/portfolio/04-track-map.webp')` }}
      />
      <div className="trackmap-vignette" />

      {/* Top Header Controls */}
      <div className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto px-4 pt-3 pb-1 select-none">
        {/* Compass, Telemetry & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 border border-white/15 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            <Compass className="w-4 h-4 text-[#ff1e2d] animate-spin-slow" />
            <span className="font-racing font-bold text-xs tracking-widest text-white">N</span>
            <span className="text-[#545458] font-mono-tech text-xs">|</span>
            <span className="font-orbitron text-xs text-[#d1d1d6]">CIRCUIT 01</span>
            <span className="text-[#545458] font-mono-tech text-xs">|</span>
            <span className="font-mono-tech text-xs text-[#ff1e2d] tracking-wider uppercase font-semibold">
              {activeCpData.sector}
            </span>
          </div>

          <span className="hidden md:inline-block font-mono-tech text-[11px] tracking-[2px] text-[#a1a1aa] uppercase">
            GRAND PRIX MULTI-ROUTE CIRCUIT TELEMETRY
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleHotLap}
            disabled={isDriving}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#e10600]/25 hover:bg-[#e10600] border border-[#e10600]/60 text-xs font-racing font-bold tracking-[1.5px] text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(225,6,0,0.35)] active:scale-95"
            title="Start automated full lap drive through all portfolio checkpoints"
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
              className="p-1.5 rounded-lg bg-black/60 hover:bg-white/20 border border-white/15 text-white cursor-pointer transition-all active:scale-95"
              title="Close Circuit Map (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Center Interactive Circuit Canvas SVG */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-[1500px] mx-auto px-2 sm:px-6">
        <svg
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid meet"
          className="trackmap-svg-canvas"
        >
          <defs>
            {/* Red Neon Glow Filter */}
            <filter id="f1NeonRedGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur1" />
              <feGaussianBlur stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle Vehicle Shadow */}
            <filter id="carShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.9" />
            </filter>

            {/* Asphalt Surface Gradient */}
            <linearGradient id="asphaltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1c24" />
              <stop offset="50%" stopColor="#222530" />
              <stop offset="100%" stopColor="#181a22" />
            </linearGradient>

            {/* Glowing Red Racing Line */}
            <linearGradient id="racingLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1801" />
              <stop offset="50%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#e10600" />
            </linearGradient>

            {/* Radial Terrain Glow */}
            <radialGradient id="infieldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff1e2d" stopOpacity="0.09" />
              <stop offset="70%" stopColor="#ff1e2d" stopOpacity="0.02" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* LAYER 1: Ambient Infield Lighting */}
          <circle cx="580" cy="340" r="220" fill="url(#infieldGlow)" pointerEvents="none" />

          {/* LAYER 2: Secondary Routes & Connecting Roads */}
          {/* Outer Ring Route */}
          <path
            d={OUTER_LOOP_PATH}
            fill="none"
            stroke="#12131a"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
          <path
            d={OUTER_LOOP_PATH}
            fill="none"
            stroke="#ff1e2d"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.35"
          />

          {/* Inner Technical Loop */}
          <path
            d={INNER_LOOP_PATH}
            fill="none"
            stroke="#14161f"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          <path
            d={INNER_LOOP_PATH}
            fill="none"
            stroke="#ff1e2d"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.4"
          />

          {/* Pit Lane Service Road */}
          <path
            d={PIT_LANE_PATH}
            fill="none"
            stroke="#13141c"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          <path
            d={PIT_LANE_PATH}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.4"
          />

          {/* LAYER 3: Main Championship GP Circuit */}
          {/* Outer Track Road Border / Runoff Barrier */}
          <path
            d={MAIN_CIRCUIT_PATH}
            fill="none"
            stroke="#0b0c10"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Main Asphalt Road Surface */}
          <path
            d={MAIN_CIRCUIT_PATH}
            fill="none"
            stroke="url(#asphaltGradient)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Red & White Alternating Kerbs */}
          <path
            d={MAIN_CIRCUIT_PATH}
            fill="none"
            stroke="#ffffff"
            strokeWidth="17"
            strokeDasharray="4 4"
            opacity="0.3"
          />
          <path
            d={MAIN_CIRCUIT_PATH}
            fill="none"
            stroke="#ff1801"
            strokeWidth="17"
            strokeDasharray="4 4"
            strokeDashoffset="4"
            opacity="0.45"
          />

          {/* Invisible Reference Path for DOM Coordinate & Distance Calculations */}
          <path
            ref={pathRef}
            id="circuitMainPath"
            d={MAIN_CIRCUIT_PATH}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />

          {/* LAYER 4: Glowing Red Neon Racing Line */}
          <path
            d={MAIN_CIRCUIT_PATH}
            fill="none"
            stroke="url(#racingLineGrad)"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            filter="url(#f1NeonRedGlow)"
            className="racing-line-flow"
          />

          {/* LAYER 5: Elevated Flyover Bridge & Overpass at EXPERIENCE (524, 287) */}
          <g pointerEvents="none">
            {/* Bridge shadow underneath */}
            <path
              d="M 495 292 C 510 292, 540 292, 555 292"
              stroke="#000000"
              strokeWidth="24"
              opacity="0.85"
            />
            {/* Bridge elevated deck */}
            <path
              d="M 498 287 C 512 287, 538 287, 552 287"
              stroke="#2c2f3d"
              strokeWidth="18"
              strokeLinecap="square"
            />
            {/* Bridge guardrails with LED lights */}
            <line x1="498" y1="277" x2="552" y2="277" stroke="#ff1e2d" strokeWidth="1.5" filter="url(#f1NeonRedGlow)" />
            <line x1="498" y1="297" x2="552" y2="297" stroke="#ff1e2d" strokeWidth="1.5" filter="url(#f1NeonRedGlow)" />
          </g>

          {/* LAYER 6: Start/Finish Grid & Trackside Signage */}
          {/* Chequered Start Line at HOME (289, 299) */}
          <g transform="translate(289, 299) rotate(80)" pointerEvents="none">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" strokeWidth="3" strokeDasharray="3 3" />
            <line x1="-10" y1="3" x2="10" y2="3" stroke="#000000" strokeWidth="3" strokeDasharray="3 3" />
          </g>

          {/* LAYER 7: Animated F1 Racing Car */}
          <g
            transform={`translate(${carState.x}, ${carState.y}) rotate(${carState.angle})`}
            className="f1-car-shadow"
            pointerEvents="none"
          >
            {/* Red Underglow Halo */}
            <circle cx="0" cy="0" r="14" fill="#ff1801" opacity="0.45" filter="url(#f1NeonRedGlow)" />

            {/* Rear Exhaust Flame Particles */}
            {isDriving && (
              <path
                d="M -16 -2 L -24 0 L -16 2 Z"
                fill="#ffaa00"
                opacity="0.8"
                filter="url(#f1NeonRedGlow)"
              />
            )}

            {/* F1 Car Body */}
            {/* Front Wing */}
            <rect x="10" y="-8" width="3" height="16" rx="1" fill="#18181b" stroke="#ffffff" strokeWidth="0.5" />
            {/* Nose Cone */}
            <path d="M 12 0 L 2 -3 L -10 -4 L -12 -4 L -12 4 L -10 4 L 2 3 Z" fill="#ff1801" stroke="#a0000c" strokeWidth="0.5" />
            {/* Cockpit / Halo */}
            <circle cx="-1" cy="0" r="3.2" fill="#09090b" stroke="#ffffff" strokeWidth="0.6" />
            {/* Driver Helmet (Yellow/Red visor) */}
            <circle cx="-1" cy="0" r="1.8" fill="#ffd60a" />
            {/* Sidepods & Airbox */}
            <rect x="-8" y="-6" width="9" height="12" rx="2" fill="#e10600" />
            {/* Rear Wing */}
            <rect x="-14" y="-8.5" width="2.5" height="17" rx="1" fill="#18181b" stroke="#e10600" strokeWidth="0.6" />
            {/* 4 Black Pirelli Slick Tyres */}
            <rect x="4" y="-10" width="6" height="3" rx="1" fill="#000000" stroke="#ff1801" strokeWidth="0.4" />
            <rect x="4" y="7" width="6" height="3" rx="1" fill="#000000" stroke="#ff1801" strokeWidth="0.4" />
            <rect x="-11" y="-10.5" width="6.5" height="3.5" rx="1" fill="#000000" stroke="#ff1801" strokeWidth="0.4" />
            <rect x="-11" y="7" width="6.5" height="3.5" rx="1" fill="#000000" stroke="#ff1801" strokeWidth="0.4" />
            {/* Blinking Rain Light on Rear Wing */}
            <circle cx="-14.5" cy="0" r="1" fill="#ffffff" className="animate-ping" />
          </g>

          {/* LAYER 8: The 13 Grand Prix Checkpoint Beacons */}
          {CHECKPOINTS.map((cp) => {
            const isCurrent = activeCheckpoint === cp.id || currentSection === cp.id;
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
                {/* Outer Pulsing Beacon Halo */}
                {isCurrent && (
                  <circle
                    cx={cp.x}
                    cy={cp.y}
                    r="16"
                    fill="none"
                    stroke="#ff1801"
                    strokeWidth="2"
                    className="beacon-pulse"
                    filter="url(#f1NeonRedGlow)"
                  />
                )}

                {/* Glowing Core Outer Ring */}
                <circle
                  cx={cp.x}
                  cy={cp.y}
                  r={isCurrent ? 8 : 6.5}
                  fill="#0c0d12"
                  stroke={isCurrent ? '#ffffff' : '#ff1801'}
                  strokeWidth={isCurrent ? 2.5 : 1.8}
                  filter={isCurrent || isHovered ? 'url(#f1NeonRedGlow)' : undefined}
                />

                {/* Central Red Dot */}
                <circle
                  cx={cp.x}
                  cy={cp.y}
                  r={isCurrent ? 4.5 : 3}
                  fill={isCurrent ? '#ff1801' : '#e10600'}
                />

                {/* Connecting Stalk to Pill Label */}
                <line
                  x1={cp.x}
                  y1={cp.y - 7}
                  x2={cp.x}
                  y2={cp.y - 14}
                  stroke={isCurrent ? '#ff1801' : 'rgba(255,255,255,0.4)'}
                  strokeWidth="1.2"
                />

                {/* Checkpoint Pill Box (Exact Reference Match) */}
                <g transform={`translate(${cp.x}, ${cp.y - 25})`}>
                  <rect
                    x="-36"
                    y="-10"
                    width="72"
                    height="20"
                    rx="3.5"
                    className="checkpoint-pill"
                    fill={isCurrent ? '#e10600' : 'rgba(10, 11, 16, 0.92)'}
                    stroke={isCurrent ? '#ffffff' : isHovered ? '#ff1801' : 'rgba(255, 255, 255, 0.22)'}
                    strokeWidth={isCurrent ? '1.5' : '1'}
                    filter="drop-shadow(0 2px 6px rgba(0,0,0,0.85))"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    className="checkpoint-text"
                    fill={isCurrent ? '#ffffff' : '#f4f4f5'}
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: isCurrent ? '800' : '700',
                      fontSize: '10.5px',
                      letterSpacing: '1px',
                      userSelect: 'none',
                    }}
                  >
                    {cp.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Telemetry Card at Bottom-Left (Reference Match) */}
      <div className="floating-telemetry-card">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase tracking-widest font-semibold">
            POSITION
          </span>
          <span className="font-orbitron font-extrabold text-base sm:text-lg text-white">
            01<span className="text-xs text-[#71717a] font-normal">/01</span>
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase tracking-widest font-semibold">
            SPEED
          </span>
          <span className="font-orbitron font-extrabold text-base sm:text-lg text-white">
            {currentSpeed} <span className="text-xs text-[#8e8e93] font-normal">KM/H</span>
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase tracking-widest font-semibold">
            CURRENT SECTION
          </span>
          <span className="font-racing font-bold text-base sm:text-lg text-[#ff1801] tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,24,1,0.6)]">
            {activeCpData.label}
          </span>
        </div>

        <div className="hidden lg:flex flex-col border-l border-white/10 pl-6">
          <span className="text-[10px] font-mono-tech text-[#71717a] uppercase tracking-widest">
            {activeCpData.desc}
          </span>
          <span className="font-racing text-xs tracking-[2px] text-[#a1a1aa] uppercase font-bold mt-0.5">
            YOUR JOURNEY &bull; MY PORTFOLIO
          </span>
        </div>
      </div>

      {/* Right-Side Official F1 Typography Banner (Reference Match) */}
      <aside className="trackmap-f1-banner" aria-label="Formula 1 motorsport pillars">
        {/* Official F1 Logo Vector */}
        <div className="f1-banner-logo">
          <svg viewBox="0 0 100 24" className="w-24 h-6 text-[#e10600] fill-current">
            <path d="M0 0 L25 0 L15 24 L0 24 Z" />
            <path d="M28 0 L58 0 L52 10 L39 10 L36 14 L49 14 L44 24 L22 24 Z" />
            <path d="M62 0 L75 0 L65 24 L52 24 Z" />
          </svg>
        </div>

        {/* 4 Pillars with Red Telemetry Accent */}
        <div className="f1-banner-text border-r-2 border-[#ff1801]/60 pr-3">
          <span className="f1-banner-item active">SPEED</span>
          <span className="f1-banner-item active">SKILLS</span>
          <span className="f1-banner-item">DISCIPLINE</span>
          <span className="f1-banner-item">PROGRESS</span>
        </div>
      </aside>
    </div>
  );
};
