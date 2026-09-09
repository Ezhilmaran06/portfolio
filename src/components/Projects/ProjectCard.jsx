import { ProjectImage } from './ProjectImage';
import { GitBranch, ChevronRight, ExternalLink, CheckCircle2, Terminal } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const ProjectCard = ({
  project,
  isActive = false,
  onOpenDetails,
  onSelect,
  className = '',
}) => {
  if (!project) return null;

  const handleDetailsClick = (e) => {
    e?.stopPropagation?.();
    soundManager.playClick();
    onOpenDetails(project);
  };

  const handleCardClick = () => {
    if (onSelect) {
      soundManager.playClick();
      onSelect(project);
    }
  };

  return (
    <article
      id={`project-sector-${project.number}`}
      onClick={handleCardClick}
      className={`project-card-primary corner-brackets rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full group select-none cursor-pointer transition-all duration-300 ${
        isActive ? 'is-active-project' : ''
      } ${className}`}
      role="region"
      aria-label={`${project.title} telemetry panel`}
    >
      {/* Background Energy Glow */}
      <div
        className={`absolute top-0 right-0 w-48 h-48 rounded-bl-full blur-2xl pointer-events-none transition-colors duration-500 ${
          isActive ? 'bg-[#e10600]/15' : 'bg-[#e10600]/5 group-hover:bg-[#e10600]/10'
        }`}
      />

      {/* Top Telemetry Sector Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2.5 mb-3 text-xs font-mono-tech">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              isActive ? 'bg-[#ff1801] shadow-[0_0_8px_#ff1801] animate-ping' : 'bg-[#e10600]'
            }`}
          />
          <span className="text-[#ff3b30] font-racing font-bold tracking-wider uppercase text-xs shrink-0">
            {project.sector || `SECTOR ${project.number}`}
          </span>
          <span className="text-white/20 hidden sm:inline">&bull;</span>
          <span className="text-[#8e8e93] uppercase tracking-wider text-[10px] truncate hidden sm:inline">
            {project.callsign || 'ENGINEERING BAY'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="project-box-secondary px-2 py-0.5 rounded text-[9.5px] text-white/80 font-mono-tech uppercase tracking-widest font-semibold">
            {project.type || 'SYSTEM'}
          </span>
          {isActive && (
            <span className="px-1.5 py-0.5 rounded bg-[#e10600]/25 border border-[#ff3b30] text-[#ff3b30] font-mono-tech text-[9px] font-bold uppercase tracking-wider animate-pulse">
              ACTIVE
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Header: Project Monogram + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="shrink-0">
            <span
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-white font-racing font-black text-base sm:text-lg flex items-center justify-center border transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-[#ff1801] to-[#b30000] border-[#ff4d4d] shadow-[0_0_15px_rgba(225,6,0,0.7)] scale-105'
                  : 'bg-gradient-to-br from-[#e10600] to-[#800000] border-[#ff3b30]/60 shadow-[0_0_10px_rgba(225,6,0,0.3)] group-hover:scale-105'
              }`}
            >
              {project.number}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-racing font-bold text-base sm:text-lg text-white uppercase tracking-wide leading-snug group-hover:text-[#ff3b30] transition-colors truncate">
              {project.title}
            </h3>
            <span className="font-mono-tech text-[10px] sm:text-[10.5px] text-[#8e8e93] uppercase tracking-wider block truncate">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Image Preview */}
        <div className="mb-2.5">
          <ProjectImage
            src={project.image}
            alt={`${project.title} preview`}
            title={project.title}
            projectNumber={project.number}
            sectorLabel={project.callsign}
            onInspect={handleDetailsClick}
            className="max-h-40 sm:max-h-44 w-full"
          />

          {/* Technical Telemetry 3-Col Spec Bar */}
          {project.telemetry && (
            <div className="project-box-secondary rounded-lg p-2 mt-2 grid grid-cols-3 gap-1.5 text-[9.5px] font-mono-tech text-center">
              <div className="truncate">
                <span className="text-[#8e8e93] block text-[8.5px] uppercase tracking-wider">SYSTEM</span>
                <span className="text-white font-semibold uppercase truncate block">
                  {project.telemetry.system}
                </span>
              </div>
              <div className="truncate">
                <span className="text-[#8e8e93] block text-[8.5px] uppercase tracking-wider truncate">
                  {project.telemetry.domain
                    ? 'DOMAIN'
                    : project.telemetry.workflow
                    ? 'WORKFLOW'
                    : project.telemetry.telemetry
                    ? 'TELEMETRY'
                    : 'STATUS'}
                </span>
                <span className="text-[#ff3b30] font-semibold uppercase truncate block">
                  {project.telemetry.domain ||
                    project.telemetry.workflow ||
                    project.telemetry.telemetry ||
                    project.telemetry.status}
                </span>
              </div>
              <div className="truncate">
                <span className="text-[#8e8e93] block text-[8.5px] uppercase tracking-wider">MODULES</span>
                <span className="text-white font-semibold uppercase truncate block">
                  {project.telemetry.modules}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Concise Description */}
        <p className="font-chakra text-xs text-[#c8c8cf] leading-relaxed line-clamp-2 mb-2.5">
          {project.shortDescription}
        </p>

        {/* Technology Stack Chips */}
        <div className="mb-2.5">
          <span className="font-mono-tech text-[9px] tracking-widest text-[#8e8e93] uppercase block mb-1">
            TECHNOLOGY STACK
          </span>
          <div className="flex flex-wrap gap-1">
            {project.tags?.slice(0, 6).map((tech, idx) => (
              <span
                key={idx}
                className="project-badge-tech px-2 py-0.5 rounded text-[10px] sm:text-[10.5px] font-chakra font-semibold"
              >
                {tech}
              </span>
            ))}
            {project.tags && project.tags.length > 6 && (
              <span className="project-badge-tech px-1.5 py-0.5 rounded text-[9.5px] font-chakra text-[#8e8e93]">
                +{project.tags.length - 6}
              </span>
            )}
          </div>
        </div>

        {/* Key System Capabilities */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="mb-2.5">
            <span className="font-mono-tech text-[9px] tracking-widest text-[#8e8e93] uppercase block mb-1">
              KEY SYSTEM CAPABILITIES
            </span>
            <ul className="space-y-1">
              {project.keyFeatures.slice(0, 2).map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-1.5 text-xs font-chakra text-[#d1d1d6] leading-tight"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e10600] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Role & Contribution Summary */}
        {project.myContribution && (
          <div className="project-box-secondary rounded-lg p-2 sm:p-2.5 mb-2.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Terminal className="w-3 h-3 text-[#ff1801] shrink-0" />
              <span className="font-mono-tech text-[9.5px] text-white uppercase font-bold tracking-wider">
                MY CONTRIBUTION / ROLE
              </span>
            </div>
            <p className="font-chakra text-[11px] text-[#a1a1aa] leading-relaxed line-clamp-2">
              {project.myContribution}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons & Sector Connection */}
      <div className="relative z-10 pt-3 border-t border-white/15 mt-auto">
        <div className="flex items-center gap-2">
          {/* Primary Action: Project Details */}
          <button
            onClick={handleDetailsClick}
            className="btn-racing-primary flex-1 py-2 px-3 text-xs font-racing font-bold tracking-wider cursor-pointer"
            aria-label={`View full project details for ${project.title}`}
          >
            <span>PROJECT DETAILS</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Secondary Action: View on GitHub */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn-racing-secondary flex-1 py-2 px-3 text-xs font-racing font-bold tracking-wider cursor-pointer"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <GitBranch className="w-3.5 h-3.5 text-[#e10600]" />
            <span>GITHUB</span>
          </a>

          {/* Optional Live Demo */}
          {Boolean(project.liveDemoUrl) && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-racing-secondary py-2 px-2.5 text-xs font-racing font-bold tracking-wider cursor-pointer"
              aria-label={`View live demo for ${project.title}`}
            >
              <span>DEMO</span>
              <ExternalLink className="w-3 h-3 text-[#00d26a]" />
            </a>
          )}
        </div>

        {/* Sector Checkpoint Connection Marker */}
        <div className="flex items-center justify-between text-[9.5px] font-mono-tech uppercase tracking-wider pt-2 mt-2 border-t border-white/10">
          <span className="flex items-center gap-1.5 text-[#8e8e93]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? 'bg-[#ff1801] animate-ping' : 'bg-[#00d26a]'
              }`}
            />
            <span className={isActive ? 'text-white font-bold' : ''}>
              CHECKPOINT {project.number} READY
            </span>
          </span>
          <span className="text-[#ff3b30] font-semibold truncate max-w-[150px]">
            {project.shortTitle}
          </span>
        </div>
      </div>
    </article>
  );
};
