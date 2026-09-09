import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailsModal } from '../ProjectDetails/ProjectDetailsModal';
import {
  Wrench,
  Flag,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Projects = ({ onNext, onPrev }) => {
  const { projects } = portfolioData;

  // Slide pair structure: Slide 0 has Projects 01 & 02, Slide 1 has Projects 03 & 04
  const projectSlides = useMemo(
    () => [
      [projects[0], projects[1]],
      [projects[2], projects[3]],
    ],
    [projects]
  );

  const [activeSlide, setActiveSlide] = useState(0); // 0 or 1 on desktop
  const [mobileSlide, setMobileSlide] = useState(0); // 0, 1, 2, 3 on mobile
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' | 'prev'
  const [isSweeping, setIsSweeping] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Animation lock to prevent double clicks and transition glitches
  const isAnimatingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Responsive window listener
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync mobile slide index with desktop activeSlide when switching views
  useEffect(() => {
    if (isMobile) {
      setMobileSlide(activeSlide * 2);
    } else {
      setActiveSlide(Math.floor(mobileSlide / 2));
    }
  }, [isMobile]);

  // Navigate to Next Slide Pair (or next project on mobile)
  const handleNextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;

    if (!isMobile) {
      if (activeSlide === 0) {
        soundManager.playClick();
        isAnimatingRef.current = true;
        setSlideDirection('next');
        setIsSweeping(true);
        setActiveSlide(1);

        setTimeout(() => {
          isAnimatingRef.current = false;
          setIsSweeping(false);
        }, 550);
      }
    } else {
      if (mobileSlide < projects.length - 1) {
        soundManager.playClick();
        isAnimatingRef.current = true;
        setSlideDirection('next');
        setIsSweeping(true);
        setMobileSlide((prev) => prev + 1);

        setTimeout(() => {
          isAnimatingRef.current = false;
          setIsSweeping(false);
        }, 550);
      }
    }
  }, [activeSlide, isMobile, mobileSlide, projects.length]);

  // Navigate to Previous Slide Pair (or previous project on mobile)
  const handlePrevSlide = useCallback(() => {
    if (isAnimatingRef.current) return;

    if (!isMobile) {
      if (activeSlide === 1) {
        soundManager.playClick();
        isAnimatingRef.current = true;
        setSlideDirection('prev');
        setIsSweeping(true);
        setActiveSlide(0);

        setTimeout(() => {
          isAnimatingRef.current = false;
          setIsSweeping(false);
        }, 550);
      }
    } else {
      if (mobileSlide > 0) {
        soundManager.playClick();
        isAnimatingRef.current = true;
        setSlideDirection('prev');
        setIsSweeping(true);
        setMobileSlide((prev) => prev - 1);

        setTimeout(() => {
          isAnimatingRef.current = false;
          setIsSweeping(false);
        }, 550);
      }
    }
  }, [activeSlide, isMobile, mobileSlide]);

  // Direct Jump via Checkpoint Beacons (01, 02, 03, 04)
  const handleSelectCheckpoint = (index) => {
    if (isAnimatingRef.current) return;

    if (!isMobile) {
      const targetSlide = Math.floor(index / 2);
      if (targetSlide === activeSlide) return;
      soundManager.playClick();
      isAnimatingRef.current = true;
      setSlideDirection(targetSlide > activeSlide ? 'next' : 'prev');
      setIsSweeping(true);
      setActiveSlide(targetSlide);

      setTimeout(() => {
        isAnimatingRef.current = false;
        setIsSweeping(false);
      }, 550);
    } else {
      if (index === mobileSlide) return;
      soundManager.playClick();
      isAnimatingRef.current = true;
      setSlideDirection(index > mobileSlide ? 'next' : 'prev');
      setIsSweeping(true);
      setMobileSlide(index);

      setTimeout(() => {
        isAnimatingRef.current = false;
        setIsSweeping(false);
      }, 550);
    }
  };

  // Keyboard navigation (ArrowLeft / ArrowRight) with input protection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        modalOpen ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        return;
      }

      const section = document.getElementById('projects');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;

      if (inView) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextSlide();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, modalOpen]);

  // Touch Swipe Gesture Support
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Minimum swipe threshold & ensure horizontal gesture intent
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
  };

  const handleOpenDetails = (project) => {
    soundManager.playClick();
    setSelectedProject(project);
    setModalOpen(true);
  };

  // Labels for current state
  const isPrevDisabled = !isMobile ? activeSlide === 0 : mobileSlide === 0;
  const isNextDisabled = !isMobile
    ? activeSlide === 1
    : mobileSlide === projects.length - 1;

  const counterText = !isMobile
    ? activeSlide === 0
      ? 'PROJECTS 01–02 OF 04'
      : 'PROJECTS 03–04 OF 04'
    : `PROJECT 0${mobileSlide + 1} OF 04`;

  const checkpointLabel = !isMobile
    ? activeSlide === 0
      ? 'CHECKPOINT 01–02 READY'
      : 'CHECKPOINT 03–04 READY'
    : `CHECKPOINT 0${mobileSlide + 1} READY`;

  return (
    <section
      id="projects"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[100vw] overflow-x-hidden select-none reveal-on-scroll"
      aria-label="Projects Section"
    >
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/08-projects.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-[#08080a]/90 pointer-events-none" />

      {/* Top Telemetry Status Bar */}
      <div className="max-w-7xl mx-auto relative z-10 w-full mb-4 px-4 py-2 rounded-xl project-nav-panel flex items-center justify-between text-xs font-mono-tech text-[#8e8e93]">
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider">
              {checkpointLabel}
            </span>
          </span>
          <span className="text-[#ff3b30] font-racing font-bold tracking-wider uppercase hidden sm:flex items-center gap-1.5">
            <span>&bull;</span>
            <span>
              {!isMobile
                ? activeSlide === 0
                  ? 'SECTORS 01 & 02: COMPLIANCE & FLEET LOGISTICS'
                  : 'SECTORS 03 & 04: VOTING & FINANCE TELEMETRY'
                : `SECTOR ${projects[mobileSlide]?.number}: ${projects[mobileSlide]?.shortTitle}`}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline tracking-widest text-[10px] uppercase text-white/60">
            HORIZONTAL TWO-PROJECT CAROUSEL &bull; USE PREV / NEXT
          </span>
        </div>
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase flex items-center gap-1.5 font-semibold">
              <Wrench className="w-3.5 h-3.5 text-[#e10600]" />
              8. PROJECTS &bull; RACING PADDOCK LANE
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[2px] sm:tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> PROJECT GARAGE{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              {!isMobile
                ? activeSlide === 0
                  ? 'SECTORS 01–02'
                  : 'SECTORS 03–04'
                : `SECTOR 0${mobileSlide + 1}`}
            </span>
          </h2>
        </div>

        {/* Sector Quick Jump Checkpoint Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {projects.map((proj, idx) => {
            const isPairActive = !isMobile
              ? Math.floor(idx / 2) === activeSlide
              : mobileSlide === idx;
            const isCleared = !isMobile
              ? Math.floor(idx / 2) < activeSlide
              : mobileSlide > idx;

            return (
              <button
                key={proj.id}
                onClick={() => handleSelectCheckpoint(idx)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-racing font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isPairActive
                    ? 'bg-[#e10600] border-[#ff3b30] text-white shadow-[0_0_15px_rgba(225,6,0,0.6)] scale-105'
                    : isCleared
                    ? 'bg-[#00d26a]/15 border-[#00d26a]/40 text-[#00d26a] hover:bg-[#00d26a]/25'
                    : 'bg-white/5 border-white/15 text-[#8e8e93] hover:border-white/30 hover:text-white'
                }`}
                aria-label={`Jump to Project ${proj.number}`}
              >
                <span>{proj.number}</span>
                <span className="font-mono-tech text-[10px] text-white/70 hidden md:inline">
                  {proj.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Racing Telemetry Route Progress Bar */}
      <div className="max-w-7xl mx-auto relative z-10 mb-6 p-3 sm:p-4 rounded-xl project-nav-panel">
        <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#8e8e93] mb-2.5">
          <span className="uppercase tracking-widest text-white/90 flex items-center gap-2 font-semibold">
            <Flag className="w-3.5 h-3.5 text-[#e10600]" />
            CIRCUIT TELEMETRY ROUTE &bull; HORIZONTAL PAIR SLIDER
          </span>
          <span className="text-[#ff1801] font-bold tracking-wider truncate ml-2">
            ACTIVE: {!isMobile ? (activeSlide === 0 ? 'PROJECTS 01 & 02' : 'PROJECTS 03 & 04') : `PROJECT 0${mobileSlide + 1}`}
          </span>
        </div>

        {/* Checkpoint Trackline Progress Bar */}
        <div className="relative flex items-center justify-between w-full px-4 sm:px-8 py-1">
          {/* Background Trackline */}
          <div className="absolute left-8 right-8 h-1 bg-white/15 top-1/2 -translate-y-1/2 rounded-full" />

          {/* Active Highlighted Red Trackline */}
          <div
            className="absolute left-8 h-1 bg-gradient-to-r from-[#e10600] via-[#ff3b30] to-[#ff1801] top-1/2 -translate-y-1/2 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(225,6,0,0.8)]"
            style={{
              width: !isMobile
                ? activeSlide === 0
                  ? '33%'
                  : '88%'
                : `${(mobileSlide / (projects.length - 1)) * 88}%`,
            }}
          />

          {/* Interactive Checkpoint Beacons (01, 02, 03, 04) */}
          {projects.map((proj, idx) => {
            const isCurrent = !isMobile
              ? Math.floor(idx / 2) === activeSlide
              : mobileSlide === idx;
            const isCompleted = !isMobile
              ? Math.floor(idx / 2) < activeSlide
              : mobileSlide > idx;

            return (
              <button
                key={proj.id}
                onClick={() => handleSelectCheckpoint(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                aria-label={`Jump to ${proj.title}`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-racing font-bold text-xs sm:text-sm border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#e10600] text-white border-[#ff3b30] shadow-[0_0_20px_rgba(225,6,0,0.8)] scale-110 ring-2 ring-[#ff3b30]/50'
                      : isCompleted
                      ? 'bg-[#00d26a]/20 text-[#00d26a] border-[#00d26a]/60 shadow-[0_0_10px_rgba(0,210,106,0.3)]'
                      : 'bg-[#12131a] text-[#8e8e93] border-white/20 hover:border-white/50 hover:text-white'
                  }`}
                >
                  {proj.number}
                </div>
                <span
                  className={`font-mono-tech text-[10px] mt-1 uppercase tracking-wider hidden sm:inline transition-colors ${
                    isCurrent
                      ? 'text-[#ff1801] font-bold'
                      : isCompleted
                      ? 'text-[#00d26a]'
                      : 'text-[#8e8e93] group-hover:text-white'
                  }`}
                >
                  {proj.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          MAIN HORIZONTAL TWO-PROJECT CAROUSEL (EXACTLY 2 CARDS ON DESKTOP)
          ============================================================ */}
      <div
        className="max-w-7xl mx-auto relative z-10 w-full project-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Racing Line Sweep Effect During Slide Transition */}
        {isSweeping && (
          <div
            className={`racing-line-sweep ${
              slideDirection === 'next' ? 'is-sweeping-next' : 'is-sweeping-prev'
            }`}
          />
        )}

        {/* Carousel Sliding Track */}
        <div
          className="project-carousel-track"
          style={{
            transform: `translateX(-${(!isMobile ? activeSlide : mobileSlide) * 100}%)`,
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {!isMobile ? (
            /* DESKTOP / TABLET: 2 SLIDES, EACH HOLDING EXACTLY 2 CARDS */
            projectSlides.map((slidePair, slideIdx) => {
              const isCurrentPair = activeSlide === slideIdx;

              return (
                <div
                  key={slideIdx}
                  className={`project-carousel-slide ${
                    isCurrentPair ? 'project-slide-active' : 'opacity-40'
                  }`}
                  aria-hidden={!isCurrentPair}
                >
                  {slidePair.map((proj) => (
                    <div key={proj.id} className="w-full h-full flex">
                      <ProjectCard
                        project={proj}
                        isActive={isCurrentPair}
                        onOpenDetails={handleOpenDetails}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            /* MOBILE: 1 CARD PER SLIDE */
            projects.map((proj, idx) => {
              const isCurrent = mobileSlide === idx;

              return (
                <div
                  key={proj.id}
                  className={`w-full shrink-0 flex-none px-1 ${
                    isCurrent ? 'project-slide-active' : 'opacity-40'
                  }`}
                  aria-hidden={!isCurrent}
                >
                  <ProjectCard
                    project={proj}
                    isActive={isCurrent}
                    onOpenDetails={handleOpenDetails}
                    className="w-full"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ============================================================
          RACING NAVIGATION CONTROL BAR BELOW THE PROJECT CARDS
          [ ← PREVIOUS PROJECT ]    PROJECTS 01–02 / 04    [ NEXT PROJECT → ]
          ============================================================ */}
      <div className="max-w-7xl mx-auto relative z-10 mt-6 p-3 sm:p-4 rounded-xl project-nav-panel flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Project Button */}
        <button
          onClick={handlePrevSlide}
          disabled={isPrevDisabled}
          className={`project-nav-btn group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-racing font-bold tracking-wider uppercase cursor-pointer w-full sm:w-auto min-h-[44px] transition-all duration-300 ${
            isPrevDisabled
              ? 'opacity-40 cursor-not-allowed pointer-events-none'
              : 'shadow-[0_0_15px_rgba(225,6,0,0.3)] hover:border-[#e10600]'
          }`}
          aria-label="Previous project pair"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff1801] transition-transform duration-200 group-hover:-translate-x-1.5" />
          <span>PREVIOUS PROJECT</span>
        </button>

        {/* Center Project Counter Display */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#8e8e93] uppercase">
            <span
              className={`w-2 h-2 rounded-full ${
                isPrevDisabled
                  ? 'bg-[#00d26a]'
                  : 'bg-[#ff1801] shadow-[0_0_8px_#ff1801] animate-ping'
              }`}
            />
            <span className="text-white font-racing font-black text-sm sm:text-base tracking-wider">
              <span
                key={!isMobile ? activeSlide : mobileSlide}
                className="counter-digit-slide text-[#ff1801] font-orbitron font-black text-base sm:text-lg px-1"
              >
                {counterText}
              </span>
            </span>
          </div>

          <span className="font-mono-tech text-[10.5px] text-white/70 uppercase tracking-wider mt-0.5">
            {!isMobile
              ? activeSlide === 0
                ? '01 DPC TOOL &bull; 02 FLEETFLOW'
                : '03 EVENT & VOTING &bull; 04 PERSONAL FINANCE'
              : projects[mobileSlide]?.title}
          </span>
        </div>

        {/* Next Project Button */}
        <button
          onClick={handleNextSlide}
          disabled={isNextDisabled}
          className={`project-nav-btn group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-racing font-bold tracking-wider uppercase cursor-pointer w-full sm:w-auto min-h-[44px] transition-all duration-300 ${
            isNextDisabled
              ? 'opacity-40 cursor-not-allowed pointer-events-none'
              : 'shadow-[0_0_15px_rgba(225,6,0,0.3)] hover:border-[#e10600]'
          }`}
          aria-label="Next project pair"
        >
          <span>NEXT PROJECT</span>
          <ArrowRight className="w-4 h-4 text-[#ff1801] transition-transform duration-200 group-hover:translate-x-1.5" />
        </button>
      </div>

      {/* ============================================================
          SECTION FOOTER: PORTFOLIO FLOW CONTINUATION
          ============================================================ */}
      <div className="max-w-7xl mx-auto relative z-10 flex items-center justify-between border-t border-white/15 pt-6 mt-10">
        <button
          onClick={() => {
            soundManager.playClick();
            onPrev?.();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-racing font-bold text-[#8e8e93] hover:text-white uppercase transition-colors cursor-pointer border border-white/10"
          aria-label="Previous section"
        >
          <ChevronUp className="w-4 h-4" />
          <span>PREV SECTION (SKILLS)</span>
        </button>

        <div className="flex items-center gap-2 font-mono-tech text-[10.5px] tracking-[1.5px] text-[#8e8e93] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d26a]" />
          <span>PADDOCK SECTORS 01–04</span>
          <span className="hidden sm:inline">&bull; CONTINUOUS RACING TRACK</span>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext?.();
          }}
          className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#ff1801] text-xs font-racing font-bold text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(225,6,0,0.4)] border border-[#ff3b30]"
          aria-label="Next section"
        >
          <span>NEXT SECTION (EXPERIENCE)</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Deep Dive Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
