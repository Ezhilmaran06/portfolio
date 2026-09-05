import { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, Download, Eye, FileText, X } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Resume = ({ onNext, onPrev }) => {
  const { driver, education, projects } = portfolioData;
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleDownload = () => {
    soundManager.playClick();
    // Programmatic trigger to download printable resume text/file
    const element = document.createElement('a');
    element.setAttribute('href', '/resume.pdf');
    element.setAttribute('download', 'Ezhilmaran_E_Resume.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="resume" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Header matching Reference Screen 14 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              14. RESUME
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1">
            <span className="text-[#e10600]">///</span> DRIVER RESUME{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              DOWNLOAD &amp; VIEW
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

      {/* Main Garage Card with Document Mockup (Reference Screen 14 Match) */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 p-6 sm:p-12 flex flex-col justify-center items-center shadow-2xl min-h-[460px]">
        {/* Pit Lane Atmosphere Background */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50 contrast-125"
          style={{ backgroundImage: `url('/images/screens/10_experience.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/70" />

        <div className="relative z-10 max-w-2xl w-full flex flex-col sm:flex-row items-center gap-8 justify-center">
          {/* Document Sheet Thumbnail Card */}
          <div
            onClick={() => {
              soundManager.playClick();
              setViewModalOpen(true);
            }}
            className="w-44 sm:w-56 aspect-[1/1.4] bg-white text-black p-4 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] border-2 border-white/40 flex flex-col justify-between cursor-pointer group hover:scale-105 transition-all"
          >
            <div>
              <div className="flex items-center justify-between border-b pb-2 mb-2">
                <span className="font-bold text-xs tracking-wider">EZHILMARAN E</span>
                <span className="text-[8px] bg-red-600 text-white px-1 rounded">B.Tech IT</span>
              </div>
              <div className="space-y-1.5 opacity-60">
                <div className="h-1.5 bg-gray-400 rounded w-full" />
                <div className="h-1.5 bg-gray-400 rounded w-5/6" />
                <div className="h-1.5 bg-gray-400 rounded w-4/6" />
                <div className="h-2 bg-red-600 rounded w-2/6 mt-3" />
                <div className="h-1.5 bg-gray-400 rounded w-full" />
                <div className="h-1.5 bg-gray-400 rounded w-3/4" />
                <div className="h-2 bg-red-600 rounded w-2/6 mt-3" />
                <div className="h-1.5 bg-gray-400 rounded w-5/6" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t text-[9px] font-mono text-gray-600">
              <span>PDF FORMAT</span>
              <Eye className="w-3 h-3 text-red-600 group-hover:scale-125 transition-transform" />
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-mono-tech text-xs text-[#e10600] tracking-widest uppercase mb-1">
              OFFICIAL CANDIDATE DOSSIER
            </span>
            <h3 className="font-racing font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wider mb-1">
              {driver.name}
            </h3>
            <p className="font-chakra text-sm text-[#8e8e93] tracking-widest uppercase mb-6">
              {driver.subtitle}
            </p>

            {/* Buttons: DOWNLOAD RESUME & VIEW RESUME */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                className="btn-racing-primary w-full sm:w-auto px-6 py-3 text-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewModalOpen(true);
                }}
                className="btn-racing-secondary w-full sm:w-auto px-6 py-3 text-sm cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>VIEW RESUME</span>
              </button>
            </div>

            <span className="font-mono-tech text-[10px] text-[#8e8e93] tracking-wider mt-5">
              Last Updated: August 2024 &bull; Verified Academic Telemetry
            </span>
          </div>
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
          SECTOR 04 &bull; TELEMETRY DOSSIER
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

      {/* Full Resume Preview Modal */}
      {viewModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#08080a]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
          <div className="bg-[#0f1016] border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#e10600]" />
                <span className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                  EZHILMARAN E &bull; RESUME PREVIEW
                </span>
              </div>
              <button
                onClick={() => setViewModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resume Content Sheet */}
            <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-xl font-sans text-sm space-y-6 shadow-inner">
              <div className="border-b pb-4">
                <h1 className="text-2xl font-bold tracking-tight text-black">{driver.name}</h1>
                <p className="text-sm font-semibold text-red-700">{driver.role}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Email: {portfolioData.contact.email} | Phone: {portfolioData.contact.phone}
                </p>
                <p className="text-xs text-gray-600">
                  LinkedIn: {portfolioData.contact.linkedin} | GitHub: {portfolioData.contact.github}
                </p>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-red-700 border-b pb-1 mb-2">
                  SUMMARY
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">{driver.bio}</p>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-red-700 border-b pb-1 mb-2">
                  EDUCATION
                </h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <div>
                        <strong className="block text-black">{edu.degree}</strong>
                        <span className="text-gray-600">{edu.institution}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 block">{edu.period}</span>
                        <strong className="text-red-700">
                          {edu.scoreLabel}: {edu.score}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-red-700 border-b pb-1 mb-2">
                  TECHNICAL SKILLS
                </h2>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-black">Languages:</span> Java, C, Python
                  </div>
                  <div>
                    <span className="font-semibold text-black">Web:</span> HTML, CSS, React, Node.js, Express.js
                  </div>
                  <div>
                    <span className="font-semibold text-black">Core CS:</span> DSA, OOP, DBMS
                  </div>
                  <div>
                    <span className="font-semibold text-black">Databases:</span> MySQL, MongoDB
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-red-700 border-b pb-1 mb-2">
                  PROJECTS
                </h2>
                <div className="space-y-3">
                  {projects.slice(0, 2).map((proj) => (
                    <div key={proj.id} className="text-xs">
                      <strong className="text-black">{proj.title}</strong>
                      <p className="text-gray-600 mt-0.5">{proj.shortDescription}</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">
                        Tech Stack: {proj.tags.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleDownload}
                className="btn-racing-primary px-6 py-2.5 text-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD FILE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
