import { useState, useEffect, useRef } from 'react';
import { soundManager } from './utils/audio';

// Components
import { Navbar } from './components/Navigation/Navbar';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { RaceStart } from './components/RaceStart/RaceStart';
import { Hero } from './components/Hero/Hero';
import { TrackMap } from './components/TrackMap/TrackMap';
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
import { RacingHUD } from './components/RacingHUD/RacingHUD';

export function App() {
  const [currentSection, setCurrentSection] = useState('loading');
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [trackMapOpen, setTrackMapOpen] = useState(false);
  const [speed, setSpeed] = useState(0);

  // Speed simulation effect
  const speedIntervalRef = useRef(null);

  const simulateAcceleration = () => {
    if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    let current = 120;
    speedIntervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 15;
      if (current >= 315) {
        current = 315 + Math.floor(Math.random() * 10);
        if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
      }
      setSpeed(current);
    }, 80);
  };

  const handleNavigate = (section) => {
    soundManager.playClick();
    simulateAcceleration();
    setCurrentSection(section);

    // Smoothly scroll to top of window for section change
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
    const element = document.createElement('a');
    element.setAttribute('href', '/resume.pdf');
    element.setAttribute('download', 'Ezhilmaran_E_Resume.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
      if (e.key === 't' || e.key === 'T') {
        setTrackMapOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setTrackMapOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#08080a] text-white flex flex-col justify-between selection:bg-[#e10600] selection:text-white overflow-x-hidden font-chakra">
      {/* 1. Pre-race Boot Sequence: Loading Screen (Screen 01) */}
      {currentSection === 'loading' && (
        <LoadingScreen
          onComplete={() => setCurrentSection('racestart')}
          onSkip={() => setCurrentSection('hero')}
        />
      )}

      {/* 2. Starting Grid Sequence: Race Start (Screen 02) */}
      {currentSection === 'racestart' && (
        <RaceStart
          onStartComplete={() => setCurrentSection('hero')}
          onSkip={() => setCurrentSection('hero')}
        />
      )}

      {/* 3. Main Journey View */}
      {currentSection !== 'loading' && currentSection !== 'racestart' && (
        <>
          {/* Top Persistent Navigation Bar */}
          <Navbar
            currentSection={currentSection}
            onNavigate={handleNavigate}
            recruiterMode={recruiterMode}
            onToggleRecruiterMode={handleToggleRecruiterMode}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenTrackMap={() => setTrackMapOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1 w-full pb-20 pt-16">
            {/* If in Recruiter Mode, render linear scrolling stream */}
            {recruiterMode ? (
              <div className="space-y-16">
                <Hero
                  onStartJourney={() => handleNavigate('about')}
                  onViewProjects={() => handleNavigate('projects')}
                />
                <About
                  onNext={() => handleNavigate('education')}
                  onPrev={() => handleNavigate('hero')}
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
              </div>
            ) : (
              /* Normal Race Mode: Section-by-Section Checkpoints with Telemetry */
              <>
                {currentSection === 'hero' && (
                  <Hero
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

                {currentSection === 'about' && (
                  <About
                    onNext={() => handleNavigate('education')}
                    onPrev={() => handleNavigate('hero')}
                  />
                )}

                {currentSection === 'education' && (
                  <Education
                    onNext={() => handleNavigate('skills')}
                    onPrev={() => handleNavigate('about')}
                  />
                )}

                {currentSection === 'skills' && (
                  <Skills
                    onNext={() => handleNavigate('projects')}
                    onPrev={() => handleNavigate('education')}
                  />
                )}

                {currentSection === 'projects' && (
                  <Projects
                    onNext={() => handleNavigate('experience')}
                    onPrev={() => handleNavigate('skills')}
                  />
                )}

                {currentSection === 'experience' && (
                  <Experience
                    onNext={() => handleNavigate('achievements')}
                    onPrev={() => handleNavigate('projects')}
                  />
                )}

                {currentSection === 'achievements' && (
                  <Achievements
                    onNext={() => handleNavigate('certifications')}
                    onPrev={() => handleNavigate('experience')}
                  />
                )}

                {currentSection === 'certifications' && (
                  <Certifications
                    onNext={() => handleNavigate('coding')}
                    onPrev={() => handleNavigate('achievements')}
                  />
                )}

                {currentSection === 'coding' && (
                  <CodingProfiles
                    onNext={() => handleNavigate('resume')}
                    onPrev={() => handleNavigate('certifications')}
                  />
                )}

                {currentSection === 'resume' && (
                  <Resume
                    onNext={() => handleNavigate('contact')}
                    onPrev={() => handleNavigate('coding')}
                  />
                )}

                {currentSection === 'contact' && (
                  <Contact
                    onNext={() => handleNavigate('finish')}
                    onPrev={() => handleNavigate('resume')}
                  />
                )}

                {currentSection === 'finish' && (
                  <FinishLine
                    onRestart={handleRestartJourney}
                    onDownloadResume={handleDownloadResume}
                  />
                )}
              </>
            )}
          </main>

          {/* Persistent Racing Telemetry HUD */}
          <RacingHUD
            currentSection={currentSection}
            onOpenTrackMap={() => setTrackMapOpen(true)}
            speed={speed || 285}
          />

          {/* Interactive Track Map Overlay Modal (Screen 04) */}
          <TrackMap
            currentSection={currentSection}
            onNavigate={handleNavigate}
            isOpen={trackMapOpen}
            onClose={() => setTrackMapOpen(false)}
            isInline={false}
          />
        </>
      )}
    </div>
  );
}

export default App;
