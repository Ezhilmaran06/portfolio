import { useEffect, useRef } from 'react';
import { ChevronRight, Code2, Flame, GraduationCap, Infinity as InfinityIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { RacingCockpit } from '../components/RacingCockpit';
import { StatCard } from '../components/StatCard';
import '../styles/home.css';

/**
 * Home — complete hero/home section for the F1 portfolio.
 * Pixel-accurate to the supplied reference image.
 */
export function Home({ onStartJourney, onViewProjects }) {
  const { driver } = portfolioData;
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  /* GSAP reveal (gracefully skipped if GSAP unavailable) */
  useEffect(() => {
    let cleanup = () => {};
    try {
      import('gsap').then(({ gsap }) => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (leftRef.current) {
          const children = leftRef.current.children;
          gsap.set(children, { opacity: 0, y: 28 });
          tl.to(children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.1);
        }

        if (rightRef.current) {
          gsap.set(rightRef.current, { opacity: 0, scale: 0.96 });
          tl.to(rightRef.current, { opacity: 1, scale: 1, duration: 0.8 }, 0.4);
        }

        cleanup = () => tl.kill();
      }).catch(() => {});
    } catch {
      // GSAP not available — content visible via CSS defaults
    }
    return cleanup;
  }, []);

  return (
    <section
      id="hero"
      className="home-wrap"
      aria-label="Home — Driver Profile"
    >
      {/* ---- BACKGROUND ---- */}
      <div className="home-bg" aria-hidden="true">
        <div
          className="home-bg-image"
          style={{ backgroundImage: `url('/assets/portfolio/03-home-hero.webp')` }}
        />
        <div className="home-bg-grid" />
        <div className="home-bg-glow-tl" />
        <div className="home-bg-glow-tr" />
        <div className="home-bg-vignette" />
        <div className="home-bg-track-curve" />
      </div>

      {/* ---- MAIN LAYOUT ---- */}
      <div className="home-container">

        {/* ==== LEFT PANEL ==== */}
        <div className="home-left" ref={leftRef}>

          {/* Badge */}
          <div className="home-badge" aria-label={driver.motto}>
            <span className="home-badge-dot" aria-hidden="true" />
            <span className="home-badge-text">{driver.motto}</span>
          </div>

          {/* Hero name */}
          <h1 className="home-name">
            EZHILMARAN&nbsp;
            <span className="home-name-red" aria-label="E">
              E
              <span className="home-name-underline" aria-hidden="true" />
            </span>
          </h1>

          {/* Role */}
          <p className="home-role">{driver.subtitle}</p>

          {/* Subtitle / tagline */}
          <p className="home-subtitle">{driver.tagline}</p>

          {/* CTA Buttons */}
          <div className="home-btns">
            <button
              id="btn-start-journey"
              className="btn-home-primary"
              onClick={onStartJourney}
              aria-label="Start the portfolio journey"
            >
              <span>START JOURNEY</span>
              <ChevronRight size={17} />
            </button>

            <button
              id="btn-view-projects"
              className="btn-home-secondary"
              onClick={onViewProjects}
              aria-label="View projects section"
            >
              <span>VIEW PROJECTS</span>
              <ChevronRight size={17} />
            </button>
          </div>

          {/* Stat cards + faint INITIALIZING text */}
          <div className="home-stats-wrapper">
            <div className="home-stats">
              <StatCard
                icon={<Code2 size={14} />}
                label="DSA PROBLEMS"
                value={driver.stats.dsa}
              />
              <StatCard
                icon={<Flame size={14} />}
                label="PROJECTS"
                value={driver.stats.projects}
              />
              <StatCard
                icon={<GraduationCap size={14} />}
                label="CGPA"
                value={driver.stats.cgpa}
              />
              <StatCard
                icon={<InfinityIcon size={14} />}
                label="LEARNING"
                value={driver.stats.learning}
              />
            </div>

            {/* Background INITIALIZING DRIVER... text */}
            <div className="home-init-text" aria-hidden="true">
              INITIALIZING DRIVER...
            </div>
          </div>
        </div>

        {/* ==== RIGHT PANEL — COCKPIT ==== */}
        <div className="home-right" ref={rightRef}>
          <RacingCockpit />
        </div>

      </div>
    </section>
  );
}
