import { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailsModal } from '../ProjectDetails/ProjectDetailsModal';
import { ChevronRight, ChevronLeft, Wrench } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Projects = ({ onNext, onPrev }) => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleOpenDetails = (project) => {
    soundManager.playClick();
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleFilterClick = (filterId) => {
    soundManager.playClick();
    setActiveFilter(filterId);
    if (filterId !== 'all') {
      const targetElement = document.getElementById(`project-sector-${filterId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none reveal-on-scroll"
      aria-label="Projects Section"
    >
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/08-projects.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/75 to-[#08080a]/90 pointer-events-none" />

      {/* Top Telemetry Bar matching Reference Screen 08 */}
      <div className="relative z-10 w-full mb-6 px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono-tech text-[#8e8e93]">
        <div className="flex items-center gap-4 sm:gap-6">
          <span>
            <strong className="text-white font-orbitron">04</strong>/04 BUILDS
          </span>
          <span className="hidden sm:inline">
            <strong className="text-white font-orbitron">100%</strong> REPO VERIFIED
          </span>
          <span className="text-[#e10600] font-racing font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
            SECTOR 02 &bull; ENGINEERING GARAGE
          </span>
        </div>
        <span className="hidden md:inline tracking-widest text-[10px] uppercase text-white/60">
          DEVELOPMENT PADDOCK &bull; FOUR CHECKPOINTS
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#e10600]" />
              8. PROJECTS &bull; DEVELOPMENT PADDOCK
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> PROJECT GARAGE{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              ENGINEERED BUILDS
            </span>
          </h2>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#e10600]/20 border border-white/15 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer"
          aria-label="Navigate to next section"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4 text-[#e10600]" />
        </button>
      </div>

      {/* Circuit Checkpoint Trackline Navigation */}
      <div className="relative z-10 mb-8 p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/10">
        <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#8e8e93] mb-3">
          <span className="uppercase tracking-widest text-white/70">
            SECTOR CHECKPOINT PROGRESSION
          </span>
          <span className="text-[#ff1801] tracking-wider hidden sm:inline">
            SELECT BAY TO INSPECT
          </span>
        </div>

        {/* Checkpoint Sector Connector Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleFilterClick('all')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider uppercase transition-all cursor-pointer border ${
              activeFilter === 'all'
                ? 'bg-[#e10600] text-white border-[#ff3b30] shadow-[0_0_15px_rgba(225,6,0,0.4)]'
                : 'bg-white/5 border-white/10 text-[#8e8e93] hover:text-white hover:border-white/25'
            }`}
          >
            ALL SECTORS (4)
          </button>

          {projects.map((proj, idx) => {
            const isActive = activeFilter === proj.number;
            const nextProj = projects[idx + 1];
            return (
              <div key={proj.id} className="flex items-center gap-2">
                <button
                  onClick={() => handleFilterClick(proj.number)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#e10600] text-white border-[#ff3b30] shadow-[0_0_15px_rgba(225,6,0,0.4)]'
                      : 'bg-white/5 border-white/10 text-[#8e8e93] hover:text-white hover:border-white/25'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#ff1801]'}>
                    {proj.number}
                  </span>
                  <span>{proj.shortTitle}</span>
                </button>
                {nextProj && (
                  <span className="text-white/20 hidden md:inline font-mono-tech text-xs">
                    &rarr;
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Card Engineering Garage Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {projects.map((proj, idx) => {
          const nextProj = projects[idx + 1];
          return (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenDetails={handleOpenDetails}
              nextProjectTitle={nextProj ? `${nextProj.number} ${nextProj.shortTitle}` : null}
            />
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 mt-12">
        <button
          onClick={() => {
            soundManager.playClick();
            onPrev();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-racing font-bold text-[#8e8e93] hover:text-white uppercase transition-colors cursor-pointer"
          aria-label="Previous section"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREV</span>
        </button>

        <span className="font-mono-tech text-[10px] tracking-[2px] text-[#545458] uppercase">
          GARAGE 02 &bull; ALL 4 SECTORS READY
        </span>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#ff1801] text-xs font-racing font-bold text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(225,6,0,0.4)]"
          aria-label="Next section"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Deep Dive Modal (Screen 09) */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
