// Centralized configuration for all portfolio sections & racing circuit checkpoints
export const PORTFOLIO_SECTIONS = [
  {
    id: 'home',
    altId: 'hero',
    index: 0,
    sectorNum: '01',
    label: 'HOME',
    checkpointName: 'Starting Grid',
    sector: 'SECTOR 1',
    title: 'STARTING GRID & LAUNCH CONTROL',
    desc: 'Main pit straight launch, driver profile, and cockpit readiness.',
    x: 300,
    y: 700,
    progress: 0,
    speed: 328,
  },
  {
    id: 'about',
    index: 1,
    sectorNum: '02',
    label: 'ABOUT',
    checkpointName: 'Checkpoint 01',
    sector: 'SECTOR 1',
    title: "TURN 1 SENNA 'S' & BIOGRAPHY",
    desc: 'Driver background, problem-solving philosophy, and technical roots.',
    x: 170,
    y: 490,
    progress: 9,
    speed: 215,
  },
  {
    id: 'education',
    index: 2,
    sectorNum: '03',
    label: 'EDUCATION',
    checkpointName: 'Checkpoint 02',
    sector: 'SECTOR 1',
    title: 'KEMMEL STRAIGHT & ACADEMIC DOSSIER',
    desc: 'B.Tech in Information Technology, core CS foundations, and academic honors.',
    x: 230,
    y: 270,
    progress: 18,
    speed: 295,
  },
  {
    id: 'skills',
    index: 3,
    sectorNum: '04',
    label: 'SKILLS',
    checkpointName: 'Checkpoint 03',
    sector: 'SECTOR 1',
    title: 'TECHNICAL S-CURVES & ENGINE TELEMETRY',
    desc: 'Java, Spring Boot, React, Node.js, Next.js, and full-stack performance.',
    x: 520,
    y: 155,
    progress: 28,
    speed: 245,
  },
  {
    id: 'projects',
    index: 4,
    sectorNum: '05',
    label: 'PROJECTS',
    checkpointName: 'Sector 01',
    sector: 'SECTOR 2',
    title: 'DRS BACK STRAIGHT & PRODUCTION APPS',
    desc: 'Flagship full-stack machines, live deployments, and architecture blueprints.',
    x: 840,
    y: 210,
    progress: 40,
    speed: 342,
  },
  {
    id: 'experience',
    index: 5,
    sectorNum: '06',
    label: 'EXPERIENCE',
    checkpointName: 'Sector 02',
    sector: 'SECTOR 2',
    title: 'HIGH-SPEED CREST & CAREER GRAND PRIX',
    desc: 'Professional engineering readiness, internships, and production delivery.',
    x: 1180,
    y: 155,
    progress: 52,
    speed: 318,
  },
  {
    id: 'achievements',
    index: 6,
    sectorNum: '07',
    label: 'ACHIEVEMENTS',
    checkpointName: 'Checkpoint 04',
    sector: 'SECTOR 2',
    title: 'NORTH HAIRPIN & CHAMPIONSHIP PODIUMS',
    desc: 'Hackathon victories, national competition awards, and elite recognitions.',
    x: 1470,
    y: 260,
    progress: 63,
    speed: 172,
  },
  {
    id: 'certifications',
    index: 7,
    sectorNum: '08',
    label: 'CERTIFICATIONS',
    checkpointName: 'Checkpoint 05',
    sector: 'SECTOR 2',
    title: 'DOUBLE CHICANE & VERIFIED LICENSES',
    desc: 'Industry-standard cloud, web, and software development certifications.',
    x: 1430,
    y: 450,
    progress: 73,
    speed: 208,
  },
  {
    id: 'coding',
    altId: 'coding-profiles',
    index: 8,
    sectorNum: '09',
    label: 'CODING',
    checkpointName: 'Sector 03',
    sector: 'SECTOR 3',
    title: 'FLYOVER OVERPASS & CODE METRICS',
    desc: 'LeetCode, GitHub commit streaks, algorithmic problem solving & DSA.',
    x: 1150,
    y: 515,
    progress: 82,
    speed: 276,
  },
  {
    id: 'resume',
    index: 9,
    sectorNum: '10',
    label: 'RESUME',
    checkpointName: 'Pit Lane / Resume Garage',
    sector: 'SECTOR 3',
    title: 'SWITCHBACK SWEEPER & TECHNICAL CV',
    desc: 'Comprehensive engineering CV, verified milestones, and 1-click PDF download.',
    x: 880,
    y: 600,
    progress: 90,
    speed: 242,
  },
  {
    id: 'contact',
    index: 10,
    sectorNum: '11',
    label: 'CONTACT',
    checkpointName: 'Final Sector',
    sector: 'SECTOR 3',
    title: 'PARABOLICA ARENA & PIT WALL RADIO',
    desc: 'Direct communication channels, pit wall radio, and career inquiries.',
    x: 580,
    y: 750,
    progress: 96,
    speed: 304,
  },
  {
    id: 'finish',
    index: 11,
    sectorNum: '12',
    label: 'FINISH',
    checkpointName: 'Finish Line',
    sector: 'SECTOR 3',
    title: 'CHECKERED FLAG & VICTORY LAP',
    desc: 'Final lap celebration, career summary, and restart journey command.',
    x: 390,
    y: 715,
    progress: 100,
    speed: 338,
  },
];

// Helper functions
export const getSectionById = (id) => {
  if (!id) return PORTFOLIO_SECTIONS[0];
  const normalized = id.toLowerCase();
  return (
    PORTFOLIO_SECTIONS.find(
      (s) => s.id === normalized || s.altId === normalized
    ) || PORTFOLIO_SECTIONS[0]
  );
};

export const getSectionByIndex = (index) => {
  const boundedIndex = Math.max(0, Math.min(PORTFOLIO_SECTIONS.length - 1, index));
  return PORTFOLIO_SECTIONS[boundedIndex];
};

export const getNextSectionId = (currentId) => {
  const section = getSectionById(currentId);
  const nextIndex = Math.min(PORTFOLIO_SECTIONS.length - 1, section.index + 1);
  return PORTFOLIO_SECTIONS[nextIndex].id;
};

export const getPrevSectionId = (currentId) => {
  const section = getSectionById(currentId);
  const prevIndex = Math.max(0, section.index - 1);
  return PORTFOLIO_SECTIONS[prevIndex].id;
};

export const TOTAL_SECTIONS = PORTFOLIO_SECTIONS.length;
