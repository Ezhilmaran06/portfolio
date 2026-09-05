import { useState } from 'react';
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
} from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const ProjectDetailsModal = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'features', label: 'Features' },
    { id: 'techStack', label: 'Tech Stack' },
    { id: 'contribution', label: 'My Contribution' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'futureScope', label: 'Future Scope' },
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
      case 'contribution':
        return <UserCheck className="w-4 h-4" />;
      case 'screenshots':
        return <ImageIcon className="w-4 h-4" />;
      case 'futureScope':
        return <Rocket className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 select-none overflow-y-auto">
      {/* Header matching Reference Screen 09 */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#e10600]/20 border border-white/15 hover:border-[#e10600]/50 text-xs font-racing font-bold tracking-widest text-white uppercase transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
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
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        {/* Left Sidebar Navigation Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-1.5 glass-panel p-3 sm:p-4 rounded-2xl border border-white/15">
          <span className="font-mono-tech text-[10px] tracking-[2px] text-[#8e8e93] uppercase px-3 py-2">
            TELEMETRY MODULES
          </span>

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

        {/* Right Main Showcase Area */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border border-white/15 flex flex-col justify-between min-h-[480px]">
          <div>
            {/* Title & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[#e10600] font-mono-tech text-xs tracking-widest uppercase">
                  PROJECT {project.number}
                </span>
                <h1 className="font-racing font-extrabold text-2xl sm:text-3xl text-white uppercase italic tracking-wide mt-0.5">
                  {project.title}
                </h1>
              </div>

              {/* Action Buttons: VIEW LIVE & GITHUB */}
              <div className="flex items-center gap-3">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-racing-primary px-4 py-2 text-xs"
                  >
                    <span>VIEW LIVE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-racing-secondary px-4 py-2 text-xs"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, idx) => (
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
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    SYSTEM OVERVIEW
                  </h3>
                  <p>{project.details.overview}</p>
                  <div className="mt-6 rounded-xl overflow-hidden border border-white/15 bg-black/60 p-2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto max-h-72 object-contain mx-auto"
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
                  <p className="text-base">{project.details.problem}</p>
                </div>
              )}

              {activeTab === 'solution' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-[#00d26a] uppercase tracking-wider flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[#00d26a]" />
                    ENGINEERED ARCHITECTURE & SOLUTION
                  </h3>
                  <p className="text-base">{project.details.solution}</p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    CORE TELEMETRY FEATURES
                  </h3>
                  <ul className="space-y-2.5">
                    {project.details.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                        <CheckCircle className="w-4 h-4 text-[#e10600] flex-shrink-0 mt-0.5" />
                        <span className="text-white">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'techStack' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    TECHNOLOGY STACK ARCHITECTURE
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.details.techStack.map((tech, idx) => (
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

              {activeTab === 'contribution' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    ENGINEER ROLE & CONTRIBUTIONS
                  </h3>
                  <p className="text-base leading-relaxed">{project.details.myContribution}</p>
                </div>
              )}

              {activeTab === 'screenshots' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                    SYSTEM SCREENSHOTS & DASHBOARDS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.details.screenshots.map((src, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-white/10 bg-black/60 p-2">
                        <img src={src} alt={`Screenshot ${idx + 1}`} className="w-full h-auto object-cover rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'futureScope' && (
                <div className="space-y-4">
                  <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-[#e10600]" />
                    ROADMAP & FUTURE ENHANCEMENTS
                  </h3>
                  <p className="text-base leading-relaxed">{project.details.futureScope}</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mt-8 flex justify-end">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="btn-racing-secondary px-6 py-2 text-xs cursor-pointer"
            >
              CLOSE GARAGE VIEW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
