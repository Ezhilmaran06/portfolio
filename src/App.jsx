import { useState, useEffect, useRef } from 'react';
import { soundManager } from './utils/audio';
import { usePortfolioScroll } from './utils/usePortfolioScroll';
import { useScrollReveal } from './utils/useScrollReveal';

// Header Navigation & Telemetry HUD
import { Navigation } from './components/Navigation';
import { RacingHUD } from './components/RacingHUD';

// Loading + Race Start screens
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { RaceStart } from './components/RaceStart/RaceStart';

// 12 Standard Portfolio Sections in Natural Vertical Sequence
import { Home } from './sections/Home';
import { About } from './components/About/About';
import { Education } from './components/Education/Education';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Achievements } from './components/Achievements/Achievements';
import { Certifications } from './components/Certifications/Certifications';
import { CodingProfiles } from './components/CodingProfiles/CodingProfiles';
import { Resume } from './components/Resume/Resume';
import { Contact } from './components/Contact/Contact';
import { FinishLine } from './components/FinishLine/FinishLine';

// Secondary Navigation Circuit Maps (Desktop Grand Prix + Mobile Vertical Route)
import { TrackMap } from './components/TrackMap/TrackMap';
import { MobileTrackNav } from './components/MobileTrackNav';

export function App() {
  const [appState, setAppState] = useState('loading'); // 'loading' | 'racestart' | 'ready'
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [trackMapOpen, setTrackMapOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Initialize premium motorsport scroll reveal observer
  useScrollReveal(appState);

  // Dynamic Scroll Progress & Synchronized Telemetry
  const {
    currentSection,
    scrollProgress,
    speed: scrollSpeed,
    scrollToSection,
  } = usePortfolioScroll();

  const [simulatedSpeed, setSimulatedSpeed] = useState(null);
  const speedIntervalRef = useRef(null);

  // Screen resize listener for responsive mobile route navigation
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const simulateAcceleration = () => {
    if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    let current = 140;
    speedIntervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 15;
      if (current >= 325) {
        current = 320 + Math.floor(Math.random() * 10);
        clearInterval(speedIntervalRef.current);
        setTimeout(() => setSimulatedSpeed(null), 1200);
      }
      setSimulatedSpeed(current);
    }, 70);
  };

  const handleNavigate = (sectionId) => {
    soundManager.playClick();
    simulateAcceleration();
    scrollToSection(sectionId);
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleRecruiterMode = () => {
    setRecruiterMode((prev) => !prev);
  };

  const handleRestartJourney = () => {
    soundManager.playClick();
    scrollToSection('home');
  };

  const handleDownloadResume = () => {
    soundManager.playClick();
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Ezhilmaran_E_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') handleToggleMute();
      if (e.key === 't' || e.key === 'T') setTrackMapOpen((v) => !v);
      if (e.key === 'Escape') setTrackMapOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Display initial loading sequence
  if (appState === 'loading') {
    return (
      <LoadingScreen
        onComplete={() => setAppState('racestart')}
        onSkip={() => setAppState('ready')}
      />
    );
  }

  // Display race launch gantry
  if (appState === 'racestart') {
    return (
      <RaceStart
        onStartComplete={() => setAppState('ready')}
        onSkip={() => setAppState('ready')}
      />
    );
  }

  const effectiveSpeed = simulatedSpeed ?? scrollSpeed;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#050506',
        color: '#fff',
        overflowX: 'hidden',
        fontFamily: "'Chakra Petch', sans-serif",
      }}
    >
      {/* Fixed top navigation bar */}
      <Navigation
        currentSection={currentSection}
        onNavigate={handleNavigate}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={handleToggleRecruiterMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenTrackMap={() => setTrackMapOpen(true)}
      />

      {/* Main portfolio content — Pure, natural vertical scrolling flow */}
      <main id="portfolio-main">
        <Home
          onStartJourney={() => handleNavigate('about')}
          onViewProjects={() => handleNavigate('projects')}
        />
        <About
          onNext={() => handleNavigate('education')}
          onPrev={() => handleNavigate('home')}
        />
        <Education
          onNext={() => handleNavigate('skills')}
          onPrev={() => handleNavigate('about')}
        />
        <Skills
          onNext={() => handleNavigate('projects')}
          onPrev={() => handleNavigate('education')}
        />
        <Projects
          onNext={() => handleNavigate('experience')}
          onPrev={() => handleNavigate('skills')}
        />
        <Experience
          onNext={() => handleNavigate('achievements')}
          onPrev={() => handleNavigate('projects')}
        />
        <Achievements
          onNext={() => handleNavigate('certifications')}
          onPrev={() => handleNavigate('experience')}
        />
        <Certifications
          onNext={() => handleNavigate('coding')}
          onPrev={() => handleNavigate('achievements')}
        />
        <CodingProfiles
          onNext={() => handleNavigate('resume')}
          onPrev={() => handleNavigate('certifications')}
        />
        <Resume
          onNext={() => handleNavigate('contact')}
          onPrev={() => handleNavigate('coding')}
        />
        <Contact
          onNext={() => handleNavigate('finish')}
          onPrev={() => handleNavigate('resume')}
        />
        <FinishLine
          onRestart={handleRestartJourney}
          onDownloadResume={handleDownloadResume}
        />
      </main>

      {/* Fixed bottom racing telemetry HUD */}
      <RacingHUD
        currentSection={currentSection}
        speed={effectiveSpeed}
        scrollProgress={scrollProgress}
        onOpenTrackMap={() => setTrackMapOpen(true)}
      />

      {/* Secondary Track Map Navigation Overview */}
      {isMobile ? (
        <MobileTrackNav
          isOpen={trackMapOpen}
          onClose={() => setTrackMapOpen(false)}
          currentSection={currentSection}
          onNavigate={handleNavigate}
        />
      ) : (
        <TrackMap
          currentSection={currentSection}
          scrollProgress={scrollProgress}
          onNavigate={handleNavigate}
          isOpen={trackMapOpen}
          onClose={() => setTrackMapOpen(false)}
          isInline={false}
        />
      )}
    </div>
  );
}

export default App;
