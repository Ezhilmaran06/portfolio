import { useState, useEffect, useCallback, useRef } from 'react';
import { PORTFOLIO_SECTIONS, getSectionById } from '../data/sections';

export function usePortfolioScroll() {
  const [currentSection, setCurrentSection] = useState('home');
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [speed, setSpeed] = useState(328);
  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Smooth scroll to target section with navbar offset
  const scrollToSection = useCallback((sectionId) => {
    if (!sectionId) return;
    const targetSection = getSectionById(sectionId);
    const candidateIds = [targetSection.id, targetSection.altId].filter(Boolean);

    let element = null;
    for (const id of candidateIds) {
      const el = document.getElementById(id);
      if (el) {
        element = el;
        break;
      }
    }

    if (!element) return;

    isNavigatingRef.current = true;
    setCurrentSection(targetSection.id);
    setActiveIndex(targetSection.index);
    setSpeed(targetSection.speed);

    const navOffset = 68; // Height of fixed top navbar
    const rect = element.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top - navOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 900);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        setScrollProgress(progress);

        if (isNavigatingRef.current) {
          ticking = false;
          return;
        }

        // Determine active section based on element positions in the viewport
        const viewportFocalPoint = window.innerHeight * 0.35;
        let detectedSection = null;
        let detectedIndex = 0;

        // Check if at very bottom
        if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 40) {
          detectedSection = PORTFOLIO_SECTIONS[PORTFOLIO_SECTIONS.length - 1];
          detectedIndex = PORTFOLIO_SECTIONS.length - 1;
        } else if (scrollTop <= 50) {
          detectedSection = PORTFOLIO_SECTIONS[0];
          detectedIndex = 0;
        } else {
          for (let i = 0; i < PORTFOLIO_SECTIONS.length; i++) {
            const sec = PORTFOLIO_SECTIONS[i];
            const candidateIds = [sec.id, sec.altId].filter(Boolean);
            let el = null;
            for (const id of candidateIds) {
              const found = document.getElementById(id);
              if (found) {
                el = found;
                break;
              }
            }

            if (el) {
              const rect = el.getBoundingClientRect();
              // If the section top is above focal point and bottom is below focal point
              if (rect.top <= viewportFocalPoint && rect.bottom > viewportFocalPoint) {
                detectedSection = sec;
                detectedIndex = i;
                break;
              }
            }
          }
        }

        if (detectedSection) {
          setCurrentSection(detectedSection.id);
          setActiveIndex(detectedIndex);
          
          // Realistic dynamic speed based on sector curvature and scroll
          const baseSpeed = detectedSection.speed;
          const variance = Math.round((Math.sin(progress * Math.PI * 6) * 15));
          setSpeed(Math.max(165, Math.min(348, baseSpeed + variance)));
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return {
    currentSection,
    activeIndex,
    scrollProgress,
    speed,
    scrollToSection,
  };
}
