# 🏎️ Ezhilmaran | F1 Grand Prix Developer Portfolio

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-Animations-green?style=for-the-badge&logo=greensock)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

A high-octane, interactive Formula 1-themed developer portfolio designed and engineered with rich racing aesthetics, dynamic telemetries, and interactive track circuits.

🌐 **Live Demo:** [https://ezhilmaran06.github.io/portfolio/](https://ezhilmaran06.github.io/portfolio/)

---

## ⚡ Highlights & Features

- 🏁 **F1 Hero Grid**: Pitwall radio sound effects, live RPM tachometer, DRS activator, and driver readiness state.
- 🗺️ **Interactive Grand Prix Circuit (TrackMap)**:
  - Custom SVG Grand Prix circuit with 13 interactive sector checkpoints (Turn 1 Senna 'S', Kemmel Straight, Eau Rouge, DRS Zone 2, Ascari Chicane, etc.).
  - Realistic animated F1 telemetry car dynamically tracking circuit paths.
  - Interactive checkpoint inspections showing live speeds, gear states, and track sector data.
- 🛠️ **Pit Stop Configurator**: Interactive tyre compound selection (Soft, Medium, Hard, Wet, Intermediate) dynamically adjusting performance metrics and themes.
- 🏆 **Career Podium**: Championship trophy cabinet showcasing milestones, hackathons, and engineering achievements.
- 📡 **Telemetry Terminal**: Live simulated diagnostics, terminal command prompts, and code performance HUDs.
- 🎵 **Spatial Pitwall Audio**: Dynamic Formula 1 engine revs, team radios, pit gun sounds, and ambient track effects synthesized via Web Audio API.
- 📱 **Fully Responsive**: Optimized for high-resolution displays, ultra-wides, laptops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP (GreenSock)](https://gsap.com/) & CSS3 Transitions
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) & Web Audio API
- **Deployment:** GitHub Pages & GitHub Actions CI/CD

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Ezhilmaran06/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install
```

### Development
```bash
# Start local Vite development server
npm run dev
```
Open your browser at `http://localhost:5173/`.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Deployment

This repository includes automated continuous deployment via **GitHub Actions** (`.github/workflows/deploy.yml`). 

To activate GitHub Pages for your repository:
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. Every push to the `main` branch will automatically build and deploy the portfolio live!

---

## 👤 Author

**Ezhilmaran**
- GitHub: [@Ezhilmaran06](https://github.com/Ezhilmaran06)

---

## 📄 License
This project is licensed under the MIT License.
