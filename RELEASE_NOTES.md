# 🚀 Mandarin Sprint: Beta 0.1 Release Notes

Welcome to the first beta release of **Mandarin Sprint**! This version establishes the core framework for a high-intensity, 30-day Mandarin learning journey based on the *Integrated Chinese* curriculum.

---

## 🌟 Key Features

### 1. The 30-Day Curriculum
*   **Structured Learning**: 25 days of active vocabulary acquisition followed by 5 days of cumulative review.
*   **150 High-Frequency Characters**: Carefully selected vocabulary covering greetings, family, shopping, weather, and school life.
*   **Contextual Dialogues**: Every lesson includes a native-style dialogue to see characters in practical scenarios.

### 2. Interactive Study Tools
*   **Drill Mode (Flashcards)**: A dedicated tab for active recall with sleek flip-card animations and shuffle functionality.
*   **Sound Board**: A comprehensive guide to "Hard Initials" (zh, ch, sh, r), dental sibilants (z, c, s), and palatal sounds (j, q, x).
*   **Tone Master**: A visual and auditory guide to the four Mandarin tones, featuring the "Ma" quadrant comparison.

### 3. Personalization & UX
*   **Theme Engine**: 10 handcrafted color schemes including *Midnight Red*, *Synthwave*, *Sakura Pastel*, and *Cyberpunk*.
*   **Native Audio**: Integrated Speech Synthesis (zh-CN) for every character, dialogue line, and pronunciation guide.
*   **Progress Persistence**: Your mastery status and theme preferences are automatically saved to local storage.

---

## 🛠 Technical Improvements

### Mobile & App Distribution
*   **PWA Ready**: Service worker and manifest configuration are live and fully synchronized.
*   **Robust Android Build**: Fixed the lockfile dependency error in the APK build process by removing strict NPM caching. The pipeline now successfully generates a native APK using the **PWABuilder CLI** and **Gradle**.
*   **Icon Sync**: Centralized the app icon into `public/icon.svg`. This ensures the web manifest, apple-touch-icon, and Android build use the exact same high-resolution asset.
*   **Automated Deployment**: The deployment workflow hosts the PWA, while the updated `android-apk.yml` handles native packaging.

### Performance & Architecture
*   **Vite 6 Core**: Optimized build pipeline for lightning-fast development and minimal production bundle sizes.
*   **CSS Variable Injection**: Dynamic theme switching handled via root-level CSS variables for smooth UI transitions.
*   **Responsive Geometry**: Mobile-first design with specific overrides for modern mobile displays (notches/safe areas).

---

## 📋 Known Issues & Roadmap
*   **Build URL**: The `android-apk.yml` points to a specific deployment URL. Ensure this matches your actual host for the best metadata synchronization.
*   **Audio Sensitivity**: Speech synthesis depends on the availability of the `zh-CN` voice on the host operating system.

*Jiāyóu! (加油!)*
