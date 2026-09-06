import { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { ChevronRight, ChevronLeft, Award, Calendar } from 'lucide-react';
import { soundManager } from '../../utils/audio';



export const Certifications = ({ onNext, onPrev }) => {
  const { certifications } = portfolioData;
  const [activeCertIndex, setActiveCertIndex] = useState(0);

  const handlePrevCert = () => {
    soundManager.playClick();
    setActiveCertIndex((prev) => (prev === 0 ? certifications.length - 1 : prev - 1));
  };

  const handleNextCert = () => {
    soundManager.playClick();
    setActiveCertIndex((prev) => (prev === certifications.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="certifications" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none filter brightness-90 contrast-110"
        style={{ backgroundImage: `url('/assets/portfolio/12-certifications.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/90 pointer-events-none" />

      {/* Header matching Reference Screen 12 */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest text-[#e10600] uppercase">
              12. CERTIFICATIONS
            </span>
          </div>
          <h2 className="font-racing font-black tracking-[3px] text-2xl sm:text-4xl text-white uppercase italic flex items-center gap-2 mt-1">
            <span className="text-[#e10600]">///</span> CERTIFICATIONS{' '}
            <span className="text-[#8e8e93] text-lg sm:text-2xl font-normal not-italic">
              PROOF OF PROGRESS
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

      {/* Carousel Container */}
      <div className="relative">
        {/* Desktop 3-Card Showcase / Mobile Active Slide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className={`glass-panel rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group ${
                activeCertIndex === idx
                  ? 'border-[#e10600] shadow-[0_0_25px_rgba(225,6,0,0.3)] bg-white/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Document Certificate Thumbnail */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/60 border border-white/10 p-3 flex flex-col justify-between mb-5">
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e10600]" />
                  <span className="text-[10px] font-mono-tech text-[#8e8e93] uppercase">
                    CREDENTIAL
                  </span>
                </div>

                <div className="p-3 bg-white/5 rounded-lg border border-white/10 my-auto text-center">
                  <Award className="w-8 h-8 text-[#ff3b30] mx-auto mb-1.5" />
                  <span className="font-racing font-bold text-sm text-white uppercase tracking-wider block">
                    {cert.title}
                  </span>
                  <span className="font-chakra text-xs text-[#a1a1aa] block">
                    {cert.issuer}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8e8e93]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#e10600]" />
                    {cert.year}
                  </span>
                  <span className="text-[#00d26a]">VERIFIED</span>
                </div>
              </div>

              {/* Title & Issuer Info */}
              <div>
                <h3 className="font-racing font-bold text-lg text-white uppercase tracking-wide">
                  {cert.title}
                </h3>
                <p className="font-chakra text-xs text-[#8e8e93] mt-0.5">
                  {cert.issuer} &bull; {cert.year}
                </p>
              </div>

              {/* View Certificate Link */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <a
                  href={cert.credentialUrl}
                  onClick={(e) => {
                    if (cert.credentialUrl === '#') e.preventDefault();
                    soundManager.playClick();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-racing font-bold tracking-wider text-[#ff3b30] hover:text-white uppercase transition-colors"
                >
                  <span>VIEW CERTIFICATE</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#e10600]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Prev & Next Arrow Controls (Reference Screen 12 Match) */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrevCert}
            className="p-2 rounded-lg bg-black/60 border border-white/15 hover:border-[#e10600] text-white hover:text-[#ff1801] transition-all cursor-pointer"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono-tech text-xs text-[#8e8e93] tracking-widest">
            {activeCertIndex + 1} / {certifications.length}
          </span>
          <button
            onClick={handleNextCert}
            className="p-2 rounded-lg bg-black/60 border border-white/15 hover:border-[#e10600] text-white hover:text-[#ff1801] transition-all cursor-pointer"
            aria-label="Next Certificate"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer Navigation & Slogan */}
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

        <span className="font-racing italic font-bold text-xs sm:text-sm tracking-[2px] text-[#8e8e93] uppercase text-center">
          "LEARNING TODAY, LEADING TOMORROW"
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
    </section>
  );
};
