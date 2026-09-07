import { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ProjectDetailsModal } from '../ProjectDetails/ProjectDetailsModal';
import { ChevronRight, ChevronLeft, GitBranch, Laptop } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Projects = ({ onNext, onPrev }) => {
  const { projects } = portfolioData;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const currentProject = projects[selectedProjectIndex] || projects[0];

  const handleSelectProject = (index) => {
    soundManager.playClick();
    setSelectedProjectIndex(index);
  };

  return (
    <section id="projects" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none reveal-on-scroll">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/08-projects.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/90 pointer-events-none" />

      {/* Top Telemetry Bar matching Reference Screen 08 */}
      <div className="w-full mb-6 px-4 py-2 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono-tech text-[#8e8e93]">
        <div className="flex items-center gap-6">
          <span>
            <strong className="text-white font-orbitron">01</strong>/01
          </span>
          <span>
            <strong className="text-white font-orbitron">000</strong> KM/H
          </span>
          <span className="text-[#e10600] font-racing font-bold tracking-wider uppercase">
            SECTOR 02 &bull; PROJECTS
          </span>
        </div>
        <span className="hidden sm:inline tracking-widest text-[10px] uppercase">
          YOUR JOURNEY &bull; MY PORTFOLIO
        </span>
      </div>

      {/* Header matching Reference */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              8. PROJECTS
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1 section-title-accent">
            <span className="text-[#e10600]">///</span> PROJECTS{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              BUILT FOR IMPACT
            </span>
          </h2>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#e10600]/20 border border-white/15 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4 text-[#e10600]" />
        </button>
      </div>

      {/* Featured Project Showcase Card (Reference Screen 08 Match) */}
      <div className="racing-card corner-brackets rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden shadow-2xl stagger-1 reveal-on-scroll">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e10600]/10 rounded-bl-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Project Telemetry & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Project Number Monogram */}
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e10600] to-[#800000] text-white font-racing font-black text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(225,6,0,0.5)] border border-[#ff3b30]">
                {currentProject.number}
              </span>
              <span className="font-mono-tech text-xs tracking-widest text-[#8e8e93] uppercase">
                ACTIVE CHECKPOINT
              </span>
            </div>

            {/* Project Title */}
            <h3 className="font-racing font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide mb-3">
              {currentProject.title}
            </h3>

            {/* Description */}
            <p className="font-chakra text-sm sm:text-base text-[#d1d1d6] leading-relaxed mb-6">
              {currentProject.shortDescription}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {currentProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-chakra text-[#ff1801] tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons: VIEW DETAILS & GITHUB */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setModalOpen(true);
                }}
                className="btn-racing-primary px-6 sm:px-8 py-3 text-sm cursor-pointer"
              >
                <span>VIEW DETAILS</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-racing-secondary px-6 sm:px-8 py-3 text-sm cursor-pointer"
              >
                <GitBranch className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Right Column: Device Laptop Preview */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden glass-panel border border-white/15 p-2 shadow-2xl group cursor-pointer"
              onClick={() => {
                soundManager.playClick();
                setModalOpen(true);
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/60 flex items-center justify-center">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target).src = '/assets/portfolio/08-projects.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-racing font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5 text-[#e10600]" />
                    CLICK TO INSPECT GARAGE
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#ff3b30]">EXPAND</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Selector Carousel Tabs (Reference Screen 08 Match) */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 sm:gap-4">
          {projects.map((proj, idx) => {
            const isSelected = selectedProjectIndex === idx;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(idx)}
                className={`flex items-center gap-3 px-4 sm:px-6 py-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#e10600]/20 border-[#e10600] shadow-[0_0_15px_rgba(225,6,0,0.3)] text-white'
                    : 'bg-white/5 border-white/10 hover:border-white/25 text-[#8e8e93] hover:text-white'
                }`}
              >
                <span
                  className={`font-racing font-bold text-sm ${
                    isSelected ? 'text-[#ff3b30]' : 'text-[#8e8e93]'
                  }`}
                >
                  {proj.number}
                </span>
                <span className="font-racing font-bold text-xs sm:text-sm tracking-wider uppercase">
                  {proj.title.split('(')[0].trim().toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-10">
        <button
          onClick={() => {
            soundManager.playClick();
            onPrev();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-racing font-bold text-[#8e8e93] hover:text-white uppercase transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREV</span>
        </button>

        <span className="font-mono-tech text-[10px] tracking-[2px] text-[#545458] uppercase">
          GARAGE 02 &bull; SECTOR COMPLETE
        </span>

        <button
          onClick={() => {
            soundManager.playClick();
            onNext();
          }}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#ff1801] text-xs font-racing font-bold text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(225,6,0,0.4)]"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Deep Dive Modal (Screen 09) */}
      <ProjectDetailsModal
        project={currentProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
