import { useState, useEffect, useRef } from 'react';
import { soundManager } from './utils/audio';

// New pixel-accurate components
import { Navigation }  from './components/Navigation';
import { RacingHUD }   from './components/RacingHUD';
import { Home }        from './sections/Home';

// Loading + Race Start (unchanged)
import { LoadingScreen }  from './components/LoadingScreen/LoadingScreen';
import { RaceStart }      from './components/RaceStart/RaceStart';

// All portfolio sections (unchanged)
import { About }          from './components/About/About';
import { Education }      from './components/Education/Education';
import { Skills }         from './components/Skills/Skills';
import { Projects }       from './components/Projects/Projects';
import { Experience }     from './components/Experience/Experience';
import { Achievements }   from './components/Achievements/Achievements';
import { Certifications } from './components/Certifications/Certifications';
import { CodingProfiles } from './components/CodingProfiles/CodingProfiles';
import { Resume }         from './components/Resume/Resume';
import { Contact }        from './components/Contact/Contact';
import { FinishLine }     from './components/FinishLine/FinishLine';
import { TrackMap }       from './components/TrackMap/TrackMap';

export function App() {
  const [currentSection, setCurrentSection] = useState('loading');
  const [recruiterMode, setRecruiterMode]   = useState(false);
  const [isMuted, setIsMuted]               = useState(soundManager.getMuted());
  const [trackMapOpen, setTrackMapOpen]     = useState(false);
  const [speed, setSpeed]                   = useState(319);

  const speedIntervalRef = useRef(null);

  const simulateAcceleration = () => {
    if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    let current = 120;
    speedIntervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 15;
      if (current >= 319) {
        current = 315 + Math.floor(Math.random() * 10);
        clearInterval(speedIntervalRef.current);
      }
      setSpeed(current);
    }, 80);
  };

  const handleNavigate = (section) => {
    soundManager.playClick();
    simulateAcceleration();
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleRecruiterMode = () => {
    setRecruiterMode((prev) => !prev);
    if (currentSection === 'loading' || currentSection === 'racestart') {
      setCurrentSection('hero');
    }
  };

  const handleRestartJourney = () => {
    soundManager.playClick();
    setCurrentSection('racestart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') handleToggleMute();
      if (e.key === 't' || e.key === 'T') setTrackMapOpen((v) => !v);
      if (e.key === 'Escape') setTrackMapOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // ---- Screens ----
  if (currentSection === 'loading') {
    return (
      <LoadingScreen
        onComplete={() => setCurrentSection('racestart')}
        onSkip={() => setCurrentSection('hero')}
      />
    );
  }

  if (currentSection === 'racestart') {
    return (
      <RaceStart
        onStartComplete={() => setCurrentSection('hero')}
        onSkip={() => setCurrentSection('hero')}
      />
    );
  }

  // ---- Main app (nav + content + HUD) ----
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
      {/* Fixed top navigation */}
      <Navigation
        currentSection={currentSection}
        onNavigate={handleNavigate}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={handleToggleRecruiterMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenTrackMap={() => setTrackMapOpen(true)}
      />

      {/* Main content */}
      <main>
        {recruiterMode ? (
          /* Recruiter mode: all sections stacked */
          <div>
            <Home
              onStartJourney={() => handleNavigate('about')}
              onViewProjects={() => handleNavigate('projects')}
            />
            <About     onNext={() => handleNavigate('education')}    onPrev={() => handleNavigate('hero')} />
            <Education onNext={() => handleNavigate('skills')}       onPrev={() => handleNavigate('about')} />
            <Skills    onNext={() => handleNavigate('projects')}     onPrev={() => handleNavigate('education')} />
            <Projects  onNext={() => handleNavigate('experience')}   onPrev={() => handleNavigate('skills')} />
            <Experience   onNext={() => handleNavigate('achievements')}  onPrev={() => handleNavigate('projects')} />
            <Achievements onNext={() => handleNavigate('certifications')} onPrev={() => handleNavigate('experience')} />
            <Certifications onNext={() => handleNavigate('coding')}  onPrev={() => handleNavigate('achievements')} />
            <CodingProfiles onNext={() => handleNavigate('resume')}  onPrev={() => handleNavigate('certifications')} />
            <Resume    onNext={() => handleNavigate('contact')}      onPrev={() => handleNavigate('coding')} />
            <Contact   onNext={() => handleNavigate('finish')}       onPrev={() => handleNavigate('resume')} />
            <FinishLine onRestart={handleRestartJourney} onDownloadResume={handleDownloadResume} />
          </div>
        ) : (
          /* Race mode: one section at a time */
          <>
            {currentSection === 'hero' && (
              <Home
                onStartJourney={() => handleNavigate('about')}
                onViewProjects={() => handleNavigate('projects')}
              />
            )}
            {currentSection === 'trackmap' && (
              <TrackMap
                currentSection={currentSection}
                onNavigate={handleNavigate}
                isOpen={true}
                onClose={() => handleNavigate('hero')}
                isInline={true}
              />
            )}
            {currentSection === 'about'          && <About          onNext={() => handleNavigate('education')}      onPrev={() => handleNavigate('hero')} />}
            {currentSection === 'education'      && <Education      onNext={() => handleNavigate('skills')}         onPrev={() => handleNavigate('about')} />}
            {currentSection === 'skills'         && <Skills         onNext={() => handleNavigate('projects')}       onPrev={() => handleNavigate('education')} />}
            {currentSection === 'projects'       && <Projects       onNext={() => handleNavigate('experience')}     onPrev={() => handleNavigate('skills')} />}
            {currentSection === 'experience'     && <Experience     onNext={() => handleNavigate('achievements')}   onPrev={() => handleNavigate('projects')} />}
            {currentSection === 'achievements'   && <Achievements   onNext={() => handleNavigate('certifications')} onPrev={() => handleNavigate('experience')} />}
            {currentSection === 'certifications' && <Certifications onNext={() => handleNavigate('coding')}        onPrev={() => handleNavigate('achievements')} />}
            {currentSection === 'coding'         && <CodingProfiles onNext={() => handleNavigate('resume')}        onPrev={() => handleNavigate('certifications')} />}
            {currentSection === 'resume'         && <Resume         onNext={() => handleNavigate('contact')}       onPrev={() => handleNavigate('coding')} />}
            {currentSection === 'contact'        && <Contact        onNext={() => handleNavigate('finish')}        onPrev={() => handleNavigate('resume')} />}
            {currentSection === 'finish'         && <FinishLine     onRestart={handleRestartJourney}               onDownloadResume={handleDownloadResume} />}
          </>
        )}
      </main>

      {/* Fixed bottom racing HUD */}
      <RacingHUD
        currentSection={currentSection}
        speed={speed}
        onOpenTrackMap={() => setTrackMapOpen(true)}
      />

      {/* Track Map overlay modal */}
      <TrackMap
        currentSection={currentSection}
        onNavigate={handleNavigate}
        isOpen={trackMapOpen}
        onClose={() => setTrackMapOpen(false)}
        isInline={false}
      />
    </div>
  );
}

export default App;
