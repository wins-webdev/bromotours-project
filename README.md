# BROMO TOURS — Static Landing Page (Phase 1)

**Creative Concept:** *"CHASE THE SUNRISE. DISCOVER THE EXTRAORDINARY."*  
**Destination Focus:** Mount Bromo & the Tengger Caldera, East Java, Indonesia  
**Tech Stack:** Semantic HTML5 · Modern CSS3 (Custom Properties, Grid, Flexbox) · Vanilla JavaScript (Zero External Libraries)

---

## 1. Project Overview

This repository contains the **Phase 1 Static Frontend Landing Page** for **BROMO TOURS**, an adventure tour and travel studio targeting international travelers visiting Mount Bromo, East Java, Indonesia.

In accordance with Phase 1 requirements:
- Runs directly in any modern browser without build tools or frameworks (no React, Next.js, Vue, Tailwind, or Bootstrap).
- Includes all **14 required editorial sections** from Sticky Navigation and Cinematic Hero to Dual Full-Width Interactive Carousels, Interactive FAQ Accordion, and a WhatsApp Lead-Generation Inquiry Form.
- Prepared with clean, modular data structures (`SAMPLE_TOURS_DATA` and `SAMPLE_TESTIMONIALS_DATA` in `assets/js/main.js`) for seamless conversion into a dynamic application in Phase 2.

---

## 2. Directory Structure

```text
bromotours/
│
├── index.html                  # Complete 14-section semantic HTML5 landing page
│
├── assets/
│   ├── css/
│   │   └── style.css           # Custom design system, editorial grids, responsive layouts
│   │
│   ├── js/
│   │   └── main.js             # Custom infinite drag/swipe carousels, FAQ, form -> WhatsApp
│   │
│   ├── images/                 # Bespoke high-resolution Mount Bromo photography (.jpg)
│   │   ├── hero-bromo-sunrise.jpg
│   │   ├── exp-jeep-safari.jpg
│   │   ├── exp-crater-trek.jpg
│   │   ├── exp-savanna-hills.jpg
│   │   ├── exp-tengger-culture.jpg
│   │   ├── custom-trip-banner.jpg
│   │   ├── tour-milkyway-photo.jpg
│   │   ├── tour-private-expedition.jpg
│   │   └── gallery-sea-of-sand.jpg
│   │
│   └── icons/
│       ├── favicon.svg         # Brand volcano & sunrise SVG favicon
│       └── topo-marker.svg     # Topographical caldera contour vector
│
└── README.md                   # Documentation & customization guide
```

---

## 3. Configuration & Customization Guide

### A. Updating the Configurable WhatsApp Number
Open `assets/js/main.js` and edit `BROMO_CONFIG` at the top of the file:

```javascript
const BROMO_CONFIG = {
  brandName: 'BROMO TOURS',
  whatsappNumber: '62 2142961911', // Replace with your active WhatsApp number (country code + digits, no '+')
  whatsappDisplay: '+62 821-4296-1911',
  ...
};
```

Updating `BROMO_CONFIG.whatsappNumber` automatically updates:
1. The **Section 13 Travel Inquiry Form** (`wa.me` structured message redirect).
2. The **Floating WhatsApp Button**.
3. The **Mobile Drawer**, **FAQ Helper Card**, **Direct WhatsApp Card**, and **Footer WhatsApp links**.

### B. Editing Sample Tours & Placeholder Testimonials
- **Featured Tours (Section 05):** Edit the `SAMPLE_TOURS_DATA` array in `assets/js/main.js`.
- **Guest Testimonials (Section 11):** Edit the `SAMPLE_TESTIMONIALS_DATA` array in `assets/js/main.js` once genuine customer reviews, photos, and ratings are collected.
- **Trust Indicators (Section 03):** Edit the `[XX]+` placeholder statistics inside `index.html` (`#trust-indicators`).

---

## 4. Visual Design System

- **Forest Green (`#172B25`)** & **Deep Caldera (`#0F1D19`)**
- **Warm Sand (`#F4EFE4`)** & **Editorial Card Sand (`#FAF7F0`)**
- **Coral Orange (`#FF6545`)** — Primary High-Contrast Conversion Accent
- **Lime Green (`#D9ED74`)** — Elevation Telemetry & Highlight Accent
- **Charcoal (`#252525`)** & **White (`#FFFFFF`)**
- **Headlines:** `Montserrat` (800/700/600/500)
- **Body Copy:** `DM Sans` (400/500/700)
