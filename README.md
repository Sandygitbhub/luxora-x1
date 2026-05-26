# LUXORA X1 - Premium E-Commerce Landing Page

A production-grade, Apple-inspired premium e-commerce landing page built for the fictional smart wireless headphone, **LUXORA X1**. The project demonstrates senior-level frontend architecture, utilizing Next.js, Three.js, GSAP, and Tailwind CSS for a highly interactive and cinematic user experience.

## ✨ Project Overview

The goal of this project is to build a modern, fully responsive, and highly interactive landing page. It showcases features of a premium headphone using a dark-mode glassmorphic UI, fluid scroll animations, and an interactive procedural 3D model that responds to scroll events.

### Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS (v4)
- **Animations:** GSAP (ScrollTrigger) & Lenis (Smooth Scrolling)
- **3D Rendering:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Language:** TypeScript

---

## 🚀 Setup Instructions

1. **Clone the repository** (if applicable) or navigate to the project root.
2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` is required due to upstream peer dependency mismatch between React 19 / Next.js 15 and certain packages like `lenis` / `three` wrappers.)*
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:** Navigate to `http://localhost:3000` to view the application.

---

## 📁 Folder Architecture Explanation

The project strictly follows a scalable architecture pattern separating UI, business logic, animations, and configurations.

```text
src/ (or app/ in this setup)
├── app/
│   ├── layout.tsx         # Root layout with SEO metadata & smooth scroll provider wrapper
│   ├── page.tsx           # Main page composing all visual sections
│   └── globals.css        # Base Tailwind v4 configuration and global CSS variables
├── components/
│   ├── hero/              # HeroSection with timeline entrance animations
│   ├── features/          # Staggered scroll-reveal feature cards
│   ├── three-scene/       # Three.js Canvas and Procedural Headphone 3D model
│   ├── experience/        # Scroll-pinned storytelling section with parallax
│   ├── testimonials/      # User reviews section
│   └── layout/            # Footer, Nav, and SmoothScroll client wrapper
├── animations/            # GSAP configuration and timeline factories
├── hooks/                 # Reusable custom hooks (e.g., useScrollReveal)
└── lib/                   # Utility functions (cn for class merging)
```

---

## 🎬 GSAP Explanation

GSAP is used to handle both timeline-based animations and scroll-linked interactions. 
- **Centralized Config:** We register plugins (`ScrollTrigger`, `useGSAP`) in a centralized `gsap-config.ts` to avoid memory leaks or duplicate registrations in Next.js SSR.
- **Reusable Hooks:** The `useScrollReveal` hook encapsulates the complex logic of scroll-triggered fade-ups and staggers, allowing any component to easily animate its children on scroll without cluttering the component's UI logic.
- **Context Cleanup:** Utilizing `@gsap/react`'s `useGSAP` hook ensures all animations, timelines, and ScrollTriggers are properly reverted and cleaned up when the component unmounts, preventing memory leaks and scroll glitches.

---

## 🧊 Three.js Explanation

The 3D scene provides a premium interactive backdrop for the landing page.
- **Procedural Geometry:** Since we do not rely on external `.glb`/`.gltf` assets, the headphone is procedurally generated using core Three.js primitives (`TorusGeometry`, `CylinderGeometry`). This guarantees zero missing asset errors and instant load times.
- **Scroll Synchronization:** We utilize `@react-three/drei`'s `ScrollControls` to map the scroll progress (`scroll.offset`) to the 3D model's rotation and scale in the `useFrame` loop, creating a direct physical connection between the user's scroll wheel and the 3D object.

---

## 🎨 Design Decisions

1. **Dark Cinematic Theme:** Employs deep blacks and subtle grays paired with glassmorphism (translucency + background blur) to create an Apple-style premium feel.
2. **Smooth Scrolling (Lenis):** Native browser scrolling often feels rigid. Lenis interpolates scroll events to make scrolling silky smooth, which directly enhances the perceived quality of the GSAP animations and 3D rotations.
3. **Accessibility (a11y):** Buttons are visible, colors pass contrast ratio checks, semantic HTML (`section`, `main`, `nav`) is used throughout, and `aria-label`s are applied where necessary.
4. **Tailwind v4:** Adopted the latest Tailwind CSS v4 syntax utilizing CSS variables directly in `@theme` rather than a complex `tailwind.config.ts`.

---

## ⚖️ Trade-offs

- **Procedural vs. Imported 3D Model:** Using a procedural model made of basic shapes is less realistic than an actual 3D scanned product. *Trade-off:* We sacrificed hyper-realism to ensure a standalone, easily executable project with no external asset dependencies.
- **Performance vs. Visuals:** Running Three.js, GSAP, and a custom scroll interpolator simultaneously can be demanding on low-end devices. *Trade-off:* Prioritized visual fidelity and "wow" factor, assuming the target audience for premium headphones possesses modern devices.

---

## 🔮 Future Improvements

1. **Asset Integration:** Replace the procedural Three.js shapes with a high-poly optimized `.glb` model of a real headphone, utilizing `gltfjsx` for component conversion.
2. **Dynamic Theming:** Introduce a premium "Light Mode" (e.g., a "Silver/White" product variant) triggered by a UI toggle.
3. **Loading Screen:** Add a custom WebGL preloader that builds suspense while the Next.js assets and Three.js environment load.
4. **E-commerce Functionality:** Integrate a real shopping cart state, Stripe checkout, and variant selection (color, size) mapped to the 3D model's material properties.
