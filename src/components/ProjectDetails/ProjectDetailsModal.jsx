import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  CheckCircle,
  Layers,
  AlertTriangle,
  Lightbulb,
  Cpu,
  UserCheck,
  Image as ImageIcon,
  Rocket,
  Workflow,
  ShieldAlert,
} from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { ProjectImage } from '../Projects/ProjectImage';

export const ProjectDetailsModal = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // ESC to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'features', label: 'Key Features' },
    { id: 'techStack', label: 'Tech Stack' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'contribution', label: 'My Contribution' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'screenshots', label: 'Visual Specs' },
    { id: 'futureScope', label: 'Roadmap' },
  ];

  const getTabIcon = (id) => {
    switch (id) {
      case 'overview':
        return <Layers className="w-4 h-4" />;
      case 'problem':
        return <AlertTriangle className="w-4 h-4" />;
      case 'solution':
        return <Lightbulb className="w-4 h-4" />;
      case 'features':
        return <CheckCircle className="w-4 h-4" />;
      case 'techStack':
        return <Cpu className="w-4 h-4" />;
      case 'architecture':
        return <Workflow className="w-4 h-4" />;
      case 'contribution':
        return <UserCheck className="w-4 h-4" />;
      case 'challenges':
        return <ShieldAlert className="w-4 h-4" />;
      case 'screenshots':
        return <ImageIcon className="w-4 h-4" />;
      case 'futureScope':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const details = project.details || {};

  return (
    <div
      className="fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Background Specs Blueprint Imagery */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/09-project-details.webp')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/75 to-[#08080a]/90 pointer-events-none" />

      {/* Header matching Reference Screen 09 */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#e10600]/20 border border-white/15 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            aria-label="Back to track"
          >
            <ArrowLeft className="w-4 h-4 text-[#e10600]" />
            <span>BACK TO TRACK</span>
          </button>
          <span className="font-mono-tech text-xs tracking-widest text-[#8e8e93] uppercase hidden sm:inline">
            9. PROJECT DETAILS &bull; TELEMETRY INSPECTION
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e10600] animate-ping" />
          <span className="font-racing font-bold text-sm text-[#ff3b30] tracking-wider uppercase">
            GARAGE INSPECTION
          </span>
        </div>
      </div>

      {/* Main Garage Layout: Left Navigation Tabs | Right Details Body */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 relative z-10">
        {/* Left Sidebar Navigation Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-1.5 glass-panel p-3 sm:p-4 rounded-2xl border border-white/15">
          <span className="font-mono-tech text-[10px] tracking-[2px] text-[#8e8e93] uppercase px-3 py-2">
            TELEMETRY MODULES
          </span>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-racing font-bold tracking-wider uppercase text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#e10600] text-white shadow-[0_0_20px_rgba(225,6,0,0.4)]'
                      : 'text-[#8e8e93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#e10600]'}>
                    {getTabIcon(tab.id)}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Showcase Area */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border border-white/15 flex flex-col justify-between min-h-[520px]">
          <div>
            {/* Title & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[#e10600] font-mono-tech text-xs tracking-widest uppercase">
                  SECTOR {project.number} &bull; {project.sector || `CHECKPOINT ${project.number}`}
                </span>
                <h1
                  id="modal-project-title"
                  className="font-racing font-extrabold text-2xl sm:text-3xl text-white uppercase italic tracking-wide mt-0.5"
                >
                  {project.title}
                </h1>
                <span className="font-mono-tech text-xs text-[#8e8e93] uppercase tracking-wider block mt-1">
                  {project.category}
                </span>
              </div>

              {/* Action Buttons: VIEW LIVE & GITHUB */}
              <div className="flex flex-wrap items-center gap-3">
                {Boolean(project.liveDemoUrl) && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-racing-primary px-4 py-2 text-xs cursor-pointer"
                  >
                    <span>VIEW LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-racing-secondary px-4 py-2 text-xs cursor-pointer"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#e10600]" />
                  <span>VIEW ON GITHUB</span>
                </a>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono-tech text-[#ff1801] tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tab Body Content */}
            <div className="text-sm font-chakra text-[#d1d1d6] leading-relaxed">
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider mb-2">
                      SYSTEM OVERVIEW
                    </h3>
                    <p className="text-base text-[#e5e5ea] leading-relaxed">
                      {details.overview || project.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl overflow-hidden border border-white/15 bg-black/60 p-2">
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      title={project.title}
                      projectNumber={project.number}
                      sectorLabel={project.callsign}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'problem' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-[#ff3b30] uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#e10600]" />
                    THE CHALLENGE / OPERATIONAL BOTTLENECK
                  </h3>
                  <p className="text-base text-[#e5e5ea] leading-relaxed">
                    {details.problem ||
                      'Manual, fragmented processes introduce operational overhead, compliance risks, and lack real-time visibility across workflows.'}
                  </p>
                </div>
              )}

              {activeTab === 'solution' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-[#00d26a] uppercase tracking-wider flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#00d26a]" />
                    ENGINEERED ARCHITECTURE & SOLUTION
                  </h3>
                  <p className="text-base text-[#e5e5ea] leading-relaxed">
                    {details.solution ||
                      'Constructed a centralized web architecture that automates workflows, enforces role-based validation, and delivers instant status telemetry.'}
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    CORE TELEMETRY FEATURES
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {Array.isArray(details.features) &&
                      details.features.map((feat, idx) => {
                        const isObject = typeof feat === 'object';
                        const featNumber = isObject ? feat.id : String(idx + 1).padStart(2, '0');
                        const featTitle = isObject ? feat.title : feat;
                        const featDesc = isObject ? feat.desc : null;

                        return (
                          <div
                            key={idx}
                            className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-4"
                          >
                            <span className="w-8 h-8 rounded-lg bg-[#e10600]/20 border border-[#e10600]/40 text-[#ff1801] font-racing font-bold text-sm flex items-center justify-center flex-shrink-0">
                              {featNumber}
                            </span>
                            <div>
                              <strong className="font-racing text-white text-sm uppercase tracking-wide block">
                                {featTitle}
                              </strong>
                              {featDesc && (
                                <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed">
                                  {featDesc}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {activeTab === 'techStack' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    TECHNOLOGY STACK ARCHITECTURE
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.isArray(details.techStack) &&
                      details.techStack.map((tech, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <span className="font-mono-tech text-[10px] text-[#e10600] tracking-widest uppercase block mb-1">
                            {tech.category}
                          </span>
                          <p className="font-bold text-white text-sm">{tech.technologies}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-[#ff1801]" />
                    SYSTEM ARCHITECTURE PIPELINE
                  </h3>
                  {Array.isArray(details.architecture) ? (
                    <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#e10600]/30">
                      {details.architecture.map((node, idx) => (
                        <div
                          key={idx}
                          className="relative pl-10 flex flex-col p-3 rounded-xl bg-white/5 border border-white/10 ml-2"
                        >
                          <span className="absolute -left-2 top-4 w-4 h-4 rounded-full bg-[#08080a] border-2 border-[#e10600] flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1801]" />
                          </span>
                          <span className="font-mono-tech text-[10px] text-[#ff3b30] uppercase tracking-widest">
                            STEP {idx + 1} &bull; {node.step}
                          </span>
                          <span className="font-chakra text-white text-xs sm:text-sm mt-0.5">
                            {node.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono-tech text-xs text-white">
                      CLIENT (REACT) &rarr; REST API (EXPRESS / NODE) &rarr; CONTROLLERS &rarr; DATABASE
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'contribution' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    ENGINEER ROLE & CONTRIBUTIONS
                  </h3>
                  <p className="text-base leading-relaxed text-[#e5e5ea]">
                    {details.myContribution || project.myContribution}
                  </p>
                </div>
              )}

              {activeTab === 'challenges' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-[#ff9500] uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#ff9500]" />
                    ENGINEERING CHALLENGES SOLVED
                  </h3>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-base leading-relaxed text-[#e5e5ea]">
                      {details.challenges ||
                        'Coordinating distributed states and maintaining transaction integrity under concurrent client operations.'}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'screenshots' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    SYSTEM SCREENSHOTS & DASHBOARDS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.isArray(details.screenshots) && details.screenshots.length > 0 ? (
                      details.screenshots.map((src, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl overflow-hidden border border-white/10 bg-black/60 p-2"
                        >
                          <img
                            src={src}
                            alt={`${project.title} view ${idx + 1}`}
                            className="w-full h-auto object-cover rounded"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = '/assets/portfolio/08-projects.webp';
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <ProjectImage
                        src={project.image}
                        alt={project.title}
                        title={project.title}
                        projectNumber={project.number}
                      />
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'futureScope' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-[#e10600]" />
                    ROADMAP & FUTURE ENHANCEMENTS
                  </h3>
                  <p className="text-base leading-relaxed text-[#e5e5ea]">
                    {details.futureScope ||
                      'Cloud-native containerized deployments and automated anomaly detection services.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="border-t border-white/10 pt-4 mt-8 flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-racing-primary px-6 py-2.5 text-xs cursor-pointer flex items-center gap-2"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <GitBranch className="w-4 h-4" />
              <span>VIEW SOURCE CODE ON GITHUB</span>
            </a>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="btn-racing-secondary px-6 py-2.5 text-xs cursor-pointer"
            >
              CLOSE GARAGE VIEW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
