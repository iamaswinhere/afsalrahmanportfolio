# Afsal Rahman — Minimal Futuristic Digital Marketing Portfolio

A refined, minimal futuristic web portfolio built with **Bootstrap 5**, clean typography, generous whitespace, dynamic parallax scroll depth, and responsive micro-interactions for an intuitive user experience.

---

## 🚀 Live Local Access
To preview the portfolio locally:
- Open `index.html` in your browser.
- Or run a lightweight local HTTP server:
  ```bash
  cd "/Users/aswin/Downloads/Afsal Rahman Portfolio"
  python3 -m http.server 8080
  ```
  Then navigate to `http://localhost:8080` in Chrome, Safari, Firefox, or Edge.

---

## 🎨 Key Features & Architecture

1. **Bootstrap 5 Responsive Grid & Components**:
   - Built on Bootstrap 5 CDN (`bootstrap.min.css` & `bootstrap.bundle.min.js`).
   - Standardized 12-column responsive layout (`container`, `row`, `col-*`).
   - Mobile navigation powered by Bootstrap 5 **Offcanvas** drawer.
   - Case study overlays powered by Bootstrap 5 **Modals** with keyboard (`Escape`) and backdrop dismissal.
   - Form inputs styled with custom dark-mode Bootstrap `.form-control` and `.form-select`.

2. **Ultra-Minimal Hero Section**:
   - Clean, spacious centered layout with generous whitespace.
   - Status badge indicating availability and location (Kerala, India).
   - Dynamic role typewriter animation.
   - Responsive horizontal metrics strip structured with Bootstrap's grid (`col-6 col-sm-3`).
   - Clean call-to-action buttons (`View Selected Work`, `Get In Touch`, and LinkedIn profile link).

3. **Smooth Parallax Scroll Engine**:
   - Background ambient glow orbs (`#parallaxMesh`, `#parallaxOrb1`, `#parallaxOrb2`) float at distinct scroll speeds using GPU-accelerated `translate3d` transforms.
   - Foreground headers and elements translate with subtle depth based on their `data-parallax` coefficients.
   - Accessibility-ready: automatically respects `prefers-reduced-motion: reduce`.

4. **Zero Audio Clutter**:
   - Audio buttons and Web Audio synthesizer completely removed for a silent, focused browsing experience.

5. **Refined Micro-Interactions**:
   - Custom minimal cursor with magnetic hover states.
   - Perspective 3D card tilt with smooth spring-back damping.
   - Animated counter numbers ticking up upon entering the viewport.
   - Interactive CLI command deck supporting `about`, `skills`, `experience`, and `contact`.
   - One-click copy email button with toast feedback.
