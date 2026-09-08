import { ProjectImage } from './ProjectImage';
import { GitBranch, ChevronRight, ExternalLink, CheckCircle2, Terminal } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const ProjectCard = ({
  project,
  onOpenDetails,
  nextProjectTitle = null,
}) => {
  if (!project) return null;

  const handleDetailsClick = () => {
    soundManager.playClick();
    onOpenDetails(project);
  };

  return (
    <article
      id={`project-sector-${project.number}`}
      className="racing-card corner-brackets rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#e10600]/50 hover:shadow-[0_15px_40px_rgba(225,6,0,0.2)] group"
    >
      {/* Background Energy Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#e10600]/5 rounded-bl-full blur-3xl pointer-events-none group-hover:bg-[#e10600]/10 transition-colors duration-500" />

      {/* Top Telemetry Sector Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 mb-5 text-xs font-mono-tech">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e10600] animate-pulse" />
          <span className="text-[#ff3b30] font-racing font-bold tracking-wider uppercase">
            {project.sector || `SECTOR ${project.number}`}
          </span>
          <span className="text-white/30 hidden sm:inline">&bull;</span>
          <span className="text-[#8e8e93] uppercase tracking-wider hidden sm:inline">
            {project.callsign || 'ENGINEERING BAY'}
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/70 font-mono-tech uppercase tracking-widest">
          {project.type || 'SYSTEM'}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Header: Project Monogram + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e10600] to-[#800000] text-white font-racing font-black text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(225,6,0,0.4)] border border-[#ff3b30] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,24,1,0.7)] transition-all duration-300">
              {project.number}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[10px] text-[#ff3b30] tracking-widest uppercase">
                {project.shortTitle || `SECTOR ${project.number}`}
              </span>
            </div>
            <h3 className="font-racing font-bold text-xl sm:text-2xl text-white uppercase tracking-wide leading-tight mt-0.5 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <span className="font-mono-tech text-[11px] text-[#8e8e93] uppercase tracking-wider block mt-1">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Visual Spec Preview */}
        <div className="mb-5">
          <ProjectImage
            src={project.image}
            alt={`${project.title} interface preview`}
            title={project.title}
            projectNumber={project.number}
            sectorLabel={project.callsign}
            onInspect={handleDetailsClick}
          />
        </div>

        {/* Short Description */}
        <p className="font-chakra text-sm text-[#d1d1d6] leading-relaxed mb-5">
          {project.shortDescription}
        </p>

        {/* Technical HUD Telemetry Spec Bar */}
        {project.telemetry && (
          <div className="mb-5 p-3 rounded-xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-mono-tech">
            <div>
              <span className="text-[#8e8e93] block uppercase tracking-wider">SYSTEM</span>
              <span className="text-white font-semibold uppercase">{project.telemetry.system}</span>
            </div>
            <div>
              <span className="text-[#8e8e93] block uppercase tracking-wider">
                {project.telemetry.domain
                  ? 'DOMAIN'
                  : project.telemetry.workflow
                  ? 'WORKFLOW'
                  : project.telemetry.telemetry
                  ? 'TELEMETRY'
                  : 'STATUS'}
              </span>
              <span className="text-[#ff3b30] font-semibold uppercase">
                {project.telemetry.domain ||
                  project.telemetry.workflow ||
                  project.telemetry.telemetry ||
                  project.telemetry.status}
              </span>
            </div>
            <div>
              <span className="text-[#8e8e93] block uppercase tracking-wider">MODULES</span>
              <span className="text-white font-semibold uppercase">{project.telemetry.modules}</span>
            </div>
          </div>
        )}

        {/* Technology Stack Chips */}
        <div className="mb-5">
          <span className="font-mono-tech text-[10px] tracking-widest text-[#8e8e93] uppercase block mb-2">
            TECHNOLOGY STACK
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-chakra text-[#ff1801] tracking-wider font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features Preview */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="mb-5">
            <span className="font-mono-tech text-[10px] tracking-widest text-[#8e8e93] uppercase block mb-2">
              KEY SYSTEM CAPABILITIES
            </span>
            <ul className="space-y-1.5">
              {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs font-chakra text-[#d1d1d6]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e10600] flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Role & Contribution Summary */}
        {project.myContribution && (
          <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-1.5 mb-1">
              <Terminal className="w-3.5 h-3.5 text-[#ff1801]" />
              <span className="font-mono-tech text-[10px] text-white uppercase tracking-wider font-bold">
                MY CONTRIBUTION / ROLE
              </span>
            </div>
            <p className="font-chakra text-xs text-[#a1a1aa] leading-relaxed line-clamp-2">
              {project.myContribution}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons & Navigation Footer */}
      <div className="relative z-10 pt-4 border-t border-white/10 mt-auto">
        <div className="flex flex-wrap items-center gap-3">
          {/* Primary Action: Project Details */}
          <button
            onClick={handleDetailsClick}
            className="btn-racing-primary flex-1 min-w-[140px] py-2.5 px-4 text-xs font-racing cursor-pointer"
            aria-label={`View full project details for ${project.title}`}
          >
            <span>PROJECT DETAILS</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Secondary Action: View on GitHub */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-racing-secondary flex-1 min-w-[140px] py-2.5 px-4 text-xs font-racing cursor-pointer"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <GitBranch className="w-4 h-4 text-[#e10600]" />
            <span>VIEW ON GITHUB</span>
          </a>

          {/* Optional Live Demo button (rendered ONLY if real URL exists) */}
          {Boolean(project.liveDemoUrl) && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-racing-secondary py-2.5 px-4 text-xs font-racing cursor-pointer"
              aria-label={`View live demo for ${project.title}`}
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00d26a]" />
            </a>
          )}
        </div>

        {/* Sector Checkpoint Connection Marker */}
        {nextProjectTitle && (
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#545458] uppercase tracking-wider pt-3 mt-3 border-t border-white/5">
            <span className="flex items-center gap-1 text-[#8e8e93]">
              <span>CHECKPOINT {project.number} COMPLETED</span>
            </span>
            <span className="text-[#ff3b30] flex items-center gap-1 font-semibold">
              NEXT &rarr; {nextProjectTitle}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};
