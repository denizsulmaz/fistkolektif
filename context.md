# Project Specification: Fist Kolektif

## 1. Project Overview
Fist Kolektif is an alternative business ecosystem and united collective of builders. We operate outside the noise, funding our own vision and building our own reality. This is **not a traditional website**. It is a continuous, scrollytelling experience. The user journeys through a story of independence, execution, and creation, guided by fluid scroll animations, massive typography, and high-end, sculptural aesthetics.

## 2. Tech Stack & Architecture
* **Framework:** SvelteKit (App Router)
* **Styling:** Tailwind CSS
* **Animations:** GSAP (ScrollTrigger) or native Svelte transitions. Crucial for locking the screen, horizontal scrolling, and cinematic fades.
* **3D/Interactive:** Threlte (Three.js for Svelte) to render a generative, WebGL-driven interactive map.

## 3. Design System & Vibe
* **Color Palette:** Strictly Monochromatic.
    * Primary: Black (`#0a0a0a`)
    * Secondary: White (`#f5f5f5`)
* **Theme:** Default to **Dark Mode** with a seamless Light Mode toggle.
* **Typography:**
    * Headlines: **Branch** (Massive, screen-filling, elegant).
    * Body/UI: **DM Sans** (Clean, highly legible).
* **Aesthetic Direction:** Sculptural, generative, non-traditional, and elegant. Embrace negative space. UI elements should feel like physical art pieces fading and shifting into view as the user scrolls down the page.

## 4. Scrollytelling Flow (Page Structure)

### Act I: The Manifesto (Hero to Scroll)
* **Visual:** Pitch black. A single, glowing WebGL particle or minimal generative shape forms in the center.
* **Scroll Action:** As the user scrolls, massive **Branch** text fades in and out, one phrase at a time, taking up the full screen to force focus.
    * *"We build our own reality."*
    * *"Outside the noise."*
    * *"United by execution."*
    * *"An alternative ecosystem of builders."*
    * *"Welcome to Fist Kolektif."*

### Act II: The Ecosystem Map (Interactive WebGL)
* **Visual:** The scroll locks. The background dissolves into a dark, stylized, interactive WebGL globe or an abstract geographical node network. 
* **Interaction:** Glowing, elegant pins represent our global footprint. Hovering or clicking pans the camera dynamically to the specific location and reveals the brand:
    * **V FOR HUMAN Association:** Istanbul, Beşiktaş
    * **Social Walkers:** Istanbul, Kadıköy
    * **MXD Culture:** Spain
    * **MANRVA:** Bangkok
    * **SPHOT:** Seoul
    * **COPPLINN:** Kocaeli
    * **SoundPool:** San Francisco (Chainlink HQ)
* **Scroll Action:** Continuing to scroll breaks the map lock, pulling the camera back into the void to transition to the project roster.

### Act III: The Builders (Portfolio Roster)
* **Visual:** A highly custom, non-traditional horizontal scroll gallery or staggered asymmetrical grid.
* **Categories & Styling:**
    * **Active Ecosystem:** V FOR HUMAN (vforhuman.org), Social Walkers (socialwalkers.com), MXD Culture (mxdculture.com), SPHOT (booksphot.com). These should feel alive, perhaps featuring subtle hover physics or generative distortions.
    * **Exited / Legacy:** MANRVA (manrva.com), COPPLINN (copplinn.com). Displayed elegantly, perhaps as outlined text or with a subtle, respectful strikethrough to honor their successful completion. 
    * **Failed / Lesson Learned:** SoundPool (soundpool.app). Highlight this proudly as a stepping stone; do not hide it.

### Act IV: The Outro (Footer)
* **Visual:** The space empties out entirely. 
* **Copy:** 
    * Address: *"Out there in the world"*
    * Contact: `hello@fistkolektif.com` (Make this a massive mailto link with a striking hover effect, like inverting colors or expanding tracking).
* **Final Note:** A small, elegant sign-off at the absolute bottom: *"Built with execution."*