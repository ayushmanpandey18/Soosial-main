# 🚀 Soosial Web Platform

A high-performance, ultra-premium web application for the **Soosial** creator platform built with React 19, Vite, and TailwindCSS v4.

---

## ✨ Features & Modules

- **Hero Showcase (`Hero.jsx`)**: Interactive hero mockup featuring live post double-tap like animations, audio synthesis wave previews, and animated floating widgets.
- **Interactive Simulator (`SimulatorTour.jsx`)**: Auto-rotating feature carousel showcasing vocal feeds, private chat portals, transparent rate cards, and Soos stream.
- **Sovereign Creator Portal (`CanvaStudio.jsx`)**: Interactive UI simulation sandbox to test creator profiles, collaboration settings, domain management, and comment feeds.
- **Spatial Audio Synthesizer (`audio.js`)**: Built-in acoustic web synthesizer providing real-time audio playback feedback for voice posts & UI interactions.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8
- **Styling**: TailwindCSS v4 with custom glassmorphism, dynamic glow gradients, & CSS keyframe animations
- **Icons**: FontAwesome 6

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Development Server
Run the local dev server:
```bash
cmd /c "npm run dev"
# or
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 3. Production Build
Create an optimized production build:
```bash
npm run build
```

---

## 📂 Project Structure

```
SOOSIAL-WEB/
├── public/              # Static assets & avatar images
├── src/
│   ├── components/      # UI sections (Hero, SimulatorTour, CanvaStudio, etc.)
│   ├── utils/           # Audio synthesizer & utility functions
│   ├── App.jsx          # Main App entry layout
│   ├── main.jsx         # React root mounting
│   └── index.css        # Global CSS & Tailwind imports
├── package.json         # Dependencies & scripts
└── vite.config.js       # Vite configuration
```
