/**
 * sectionBackgrounds.js
 * Centralized mapping of portfolio sections → background images.
 * All images live in /assets/portfolio/.
 *
 * SECTION IMAGE MAPPING (matches the 16-screen F1 journey):
 *  01 Loading Screen        → pit garage interior, dark red lighting
 *  02 Race Start            → driver + F1 car, wet night circuit
 *  03 Home Hero             → empty pit lane at dramatic sunset
 *  04 Track Map             → night circuit curve + glowing tyre
 *  05 About Me              → night track, burnout red-rim tyre
 *  06 Education             → existing education screen reference
 *  07 Skills                → existing skills screen reference
 *  08 Projects              → existing projects screen reference
 *  09 Project Details       → existing project details reference
 *  10 Experience            → existing experience screen reference
 *  11 Achievements          → existing achievements reference
 *  12 Certifications        → existing certifications reference
 *  13 Coding Profiles       → existing coding profiles reference
 *  14 Resume                → existing resume screen reference
 *  15 Contact               → existing contact screen reference
 *  16 Finish Line           → existing finish line reference
 */

const BASE = '/assets/portfolio';

export const SECTION_BACKGROUNDS = {
  loading:        `${BASE}/01-loading-screen.webp`,
  racestart:      `${BASE}/02-race-start.webp`,
  hero:           `${BASE}/03-home-hero.webp`,
  trackmap:       `${BASE}/04-track-map.webp`,
  about:          `${BASE}/05-about-me.webp`,
  education:      `${BASE}/06-education.webp`,
  skills:         `${BASE}/07-skills.webp`,
  projects:       `${BASE}/08-projects.webp`,
  projectDetails: `${BASE}/09-project-details.webp`,
  experience:     `${BASE}/10-experience.webp`,
  achievements:   `${BASE}/11-achievements.webp`,
  certifications: `${BASE}/12-certifications.webp`,
  coding:         `${BASE}/13-coding-profiles.webp`,
  resume:         `${BASE}/14-resume.webp`,
  contact:        `${BASE}/15-contact.webp`,
  finish:         `${BASE}/16-finish-line.webp`,
};

/**
 * Section-specific background-position to keep the best
 * part of each image visible and text areas dark.
 */
export const SECTION_BG_POSITION = {
  loading:        'center center',
  racestart:      'center center',
  hero:           'right center',
  trackmap:       'center center',
  about:          'left center',
  education:      'center center',
  skills:         'center center',
  projects:       'center center',
  projectDetails: 'center center',
  experience:     'center center',
  achievements:   'center center',
  certifications: 'center center',
  coding:         'center center',
  resume:         'center center',
  contact:        'center center',
  finish:         'center center',
};

/**
 * Overlay opacity per section (rgba black alpha).
 * Subtle darkening ensures both high image vibrancy and text readability.
 */
export const SECTION_BG_OVERLAY = {
  loading:        0.35,
  racestart:      0.30,
  hero:           0.35,
  trackmap:       0.35,
  about:          0.40,
  education:      0.45,
  skills:         0.45,
  projects:       0.45,
  projectDetails: 0.45,
  experience:     0.40,
  achievements:   0.40,
  certifications: 0.40,
  coding:         0.45,
  resume:         0.45,
  contact:        0.38,
  finish:         0.30,
};

/**
 * getSectionBackground(sectionId)
 * Returns the style object to apply as a section background.
 */
export function getSectionBackground(sectionId) {
  const img      = SECTION_BACKGROUNDS[sectionId];
  const position = SECTION_BG_POSITION[sectionId] ?? 'center center';

  if (!img) return {};

  return {
    backgroundImage:    `url("${img}")`,
    backgroundSize:     'cover',
    backgroundPosition: position,
    backgroundRepeat:   'no-repeat',
    backgroundAttachment: 'scroll',
  };
}

/**
 * getOverlayStyle(sectionId)
 * Returns the style for the absolute dark overlay div.
 */
export function getOverlayStyle(sectionId) {
  const alpha = SECTION_BG_OVERLAY[sectionId] ?? 0.50;
  return {
    position: 'absolute',
    inset: 0,
    background: `rgba(0,0,0,${alpha})`,
    pointerEvents: 'none',
    zIndex: 0,
  };
}
