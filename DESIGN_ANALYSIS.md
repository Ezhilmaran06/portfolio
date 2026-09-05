# Formula 1 / Motorsport Portfolio — Complete Design & Architecture Specification

> **Subject**: Ezhilmaran E (Final Year B.Tech – Information Technology)  
> **Institution**: Bannari Amman Institute of Technology, Erode  
> **Theme**: High-Octane Formula 1 / Grand Prix Telemetry Experience  
> **Design Assets Directory**: [`d:/projects/portfolio/design-references/`](file:///d:/projects/portfolio/design-references/)

---

## 1. Design System & Aesthetics

### 1.1 Color Palette
- **Track Stealth Black (Base)**: `#08080a`, `#0d0e12`, `#121318`
- **Smoky Glass Card (Surface)**: `rgba(18, 19, 24, 0.8)` to `rgba(25, 27, 34, 0.9)` with 1px border `rgba(255, 255, 255, 0.08)` and `backdrop-filter: blur(12px)`
- **Scuderia Red / Crimson Neon (Brand Accent)**: `#e10600`, `#ff1801`, `#ff3b30`
- **Neon Glow Filter**: `box-shadow: 0 0 25px rgba(225, 6, 0, 0.5)`
- **Speed White**: `#ffffff`, `#f5f5f7`
- **Telemetry Silver / Pit Gray**: `#8e8e93`, `#a1a1aa`, `#636366`
- **Track Status Colors**:
  - Green Flag / Success: `#00d26a` (or neon lime)
  - Yellow Flag / Caution: `#ffcc00`
  - Chequered Flag: High-contrast monochrome black/white checker pattern

### 1.2 Typography & Motifs
- **Display Typeface**: Bold motorsport geometric sans (e.g. *Rajdhani*, *Orbitron*, *Formula 1 Display*, *Montserrat 900*)
- **Body & Telemetry**: Technical monospace & sans (e.g. *JetBrains Mono*, *Chakra Petch*, *Inter*)
- **Styling Motifs**:
  - Slanted / Skewed italic headers (`transform: skewX(-8deg)`)
  - Red racing accent blocks on capital letters (e.g., `[E]ZHILMARAN E`)
  - Telemetry HUD badges (`LAP 1/1`, `01/01`, `000 KM/H`, `PIT STOP`)
  - Interactive circuit track map with pit stop waypoints

---

## 2. Complete 16-Screen Catalog & Asset Mapping

All 16 screens are cataloged and saved individually in [`design-references/`](file:///d:/projects/portfolio/design-references/):

| # | Screen Name | Reference Asset | Key Content & Specifications |
|---|---|---|---|
| **00** | **Full Overview** | [`00_full_overview_16_screens.png`](file:///d:/projects/portfolio/design-references/00_full_overview_16_screens.png) | High-res 4x4 matrix of the entire 16-screen storyboard |
| **01** | **Loading Screen** | [`01_loading_screen.jpg`](file:///d:/projects/portfolio/design-references/01_loading_screen.jpg) | Overhead night track, spinning/smoking glowing burnout tire, progress bar (78%), checklist (`Loading assets`, `Preparing circuit`, `Starting engine`, `Almost ready...`), slogan `BUILDING A BETTER TOMORROW` |
| **02** | **Race Start Sequence** | [`02_race_start_sequence.jpg`](file:///d:/projects/portfolio/design-references/02_race_start_sequence.jpg) | 5 red starting lights gantry, grid car rear view, `READY? RACE STARTS SOON`, `SKIP INTRO` button, footer `LET'S RIDE THROUGH MY JOURNEY` |
| **03** | **Home / Hero Section** | [`03_home_hero_section.jpg`](file:///d:/projects/portfolio/design-references/03_home_hero_section.jpg) | Nav (`HOME`, `TRACK`, `ABOUT`, `PROJECTS`, `SKILLS`, `EXPERIENCE`, `CONTACT`), racer helmet visual, `SAME PASSION, DIFFERENT TRACK`, `EZHILMARAN E`, `B.Tech IT`, `START JOURNEY` & `VIEW PROJECTS`, stats (`240+ DSA`, `2+ Projects`, `7.64 CGPA`, `∞ Learning`) |
| **04** | **Track Map / Navigation** | [`04_track_map_navigation.jpg`](file:///d:/projects/portfolio/design-references/04_track_map_navigation.jpg) | Stylized GP circuit with interactive sector waypoints (`HOME`, `ABOUT`, `EXPERIENCE`, `SKILLS`, `ACHIEVEMENTS`), compass rose, `LAP 1/1`, `COMPLETE THE CIRCUIT`, HUD bar (`POSITION 01/01`, `SPEED 000 KM/H`, `CURRENT SECTION HOME`) |
| **05** | **About Me** | [`05_about_me.png`](file:///d:/projects/portfolio/design-references/05_about_me.png) | Driver portrait, `EZHILMARAN E - FINAL YEAR IT STUDENT`, bio quote, red slogan *"Keep Going, Keep Learning"*, driver telemetry card (College: Bannari Amman Institute of Technology, Erode; Degree: B.Tech IT; Role: Aspiring Java Developer; Goal: Skilled software developer) |
| **06** | **Education** | [`06_education.png`](file:///d:/projects/portfolio/design-references/06_education.png) | Pit lane garage, vertical glowing milestone timeline: B.Tech IT (2023-2027, 7.64 CGPA), HSC (2021-2023, 80.5%), SSLC (2019-2021, Pass), tagline *"EVERY LAP BUILDS A STRONGER YOU"* |
| **07** | **Skills** | [`07_skills.png`](file:///d:/projects/portfolio/design-references/07_skills.png) | Telemetry gauge bars: Programming (Java 90%, C 75%, Python 70%), Web Tech (HTML 90%, CSS 85%, React 80%, Node.js 75%, Express.js 75%), Core CS (DSA 85%, OOP 80%, DBMS 80%), Databases (MySQL 80%, MongoDB 75%), tagline *"SKILLS FUEL THE JOURNEY"* |
| **08** | **Projects** | [`08_projects.png`](file:///d:/projects/portfolio/design-references/08_projects.png) | Project 01: *Digital Processing Compliance Tool (DPC Tool)*, description, tags (`React`, `Node.js`, `MongoDB`, `JWT`, `Tailwind CSS`), buttons `VIEW DETAILS` & `GITHUB`, laptop mockup, bottom selector (`01 DPC TOOL`, `02 FINANCE DASHBOARD`, `03 MORE PROJECTS`) |
| **09** | **Project Details** | [`09_project_details.png`](file:///d:/projects/portfolio/design-references/09_project_details.png) | Deep-dive modal with left sidebar tabs (`Overview`, `Problem`, `Solution`, `Features`, `Tech Stack`, `My Contribution`, `Screenshots`, `Future Scope`), `<- BACK TO TRACK`, buttons `VIEW LIVE` & `GITHUB`, multi-device showcase |
| **10** | **Experience** | [`10_experience.jpg`](file:///d:/projects/portfolio/design-references/10_experience.jpg) | Pit garage background with red F1 car, statement on active skill building, badge `OPEN FOR INTERNSHIP OPPORTUNITIES`, tagline *"EVERY OPPORTUNITY IS A NEW TRACK"* |
| **11** | **Achievements** | [`11_achievements.png`](file:///d:/projects/portfolio/design-references/11_achievements.png) | Trophy telemetry grid: 🏆 240+ LeetCode DSA, ⭐ 2+ Projects Completed, 📊 7.64 CGPA, 🎯 Problem Solving Enthusiast, ⏱️ Consistent Learner, 👥 Open Source Contributor, tagline *"DISCIPLINE DRIVES RESULTS"* |
| **12** | **Certifications** | [`12_certifications.png`](file:///d:/projects/portfolio/design-references/12_certifications.png) | Carousel cards: Java Programming (Infosys Springboard 2024), React Basics (Coursera 2024), Git & GitHub (Udemy 2023), `View Certificate ->`, tagline *"LEARNING TODAY, LEADING TOMORROW"* |
| **13** | **Coding Profiles** | [`13_coding_profiles.png`](file:///d:/projects/portfolio/design-references/13_coding_profiles.png) | GitHub Card (`Ezhilmaran06`, 15 Repos, 200+ Contributions), LeetCode Card (240+ Solved, Top 40%), Heatmap grid (`Keep Solving / Keep Improving`, *"Consistency is the real win."*) |
| **14** | **Resume** | [`14_resume.png`](file:///d:/projects/portfolio/design-references/14_resume.png) | Driver Resume preview sheet, `Ezhilmaran E - Final Year B.Tech - IT`, buttons `DOWNLOAD RESUME` & `VIEW RESUME`, timestamp `Last Updated: August 2024` |
| **15** | **Contact** | [`15_contact.png`](file:///d:/projects/portfolio/design-references/15_contact.png) | Comms coordinates: Phone (`+91 9361080892`), Email (`ezhilmaran060@gmail.com`), College Email (`ezhilmaran.it23@bitsathy.ac.in`), LinkedIn (`in/ezhilmaran-e`), GitHub (`Ezhilmaran06`), form with `Your Name`, `Your Email`, `Your Message`, `SEND MESSAGE` button |
| **16** | **Finish Line** | [`16_finish_line.jpg`](file:///d:/projects/portfolio/design-references/16_finish_line.jpg) | Finish straight gantry `FINISH`, chequered flags, victorious race car on grid, `RACE COMPLETE!`, `THANK YOU FOR VISITING`, *"Same Passion, Different Track. A Brighter Tomorrow."*, buttons `RESTART JOURNEY` & `DOWNLOAD RESUME` |
