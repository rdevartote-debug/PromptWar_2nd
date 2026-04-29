# IndiaVoteAssist - Project Overview & Features

This document outlines the current state of the "IndiaVoteAssist" project, detailing the core features present in the application, along with all the security, accessibility, testing, and code quality updates that have been implemented.

## 🚀 Core Features Present in the Project

The application is built with **React** and **Vite** and features a modern, responsive, glassmorphic UI. 

### 1. Personalized Onboarding & Guidance
*   **User Profiling:** An onboarding modal that collects the user's age, state of residence, and Voter ID (EPIC) status.
*   **Dynamic Content:** The application dynamically tailors its content based on this profile (e.g., welcoming "Future Voters" differently than "First-Time Voters").

### 2. Interactive Election Timeline
*   **State-Specific Dates:** Displays mock election dates specific to the user's selected state (e.g., Maharashtra, Tamil Nadu).
*   **Phase Tracking:** Tracks the progress from "Announcement of Elections" to "Counting & Results".

### 3. Guided Voter Journey
*   **Step-by-Step Interactive Path:** A 7-step guide covering Eligibility, Registration, Voter ID, Electoral Roll, Constituencies, Polling Day, and Vote Counting.
*   **Pro Tips:** Actionable advice and direct links for each step (e.g., direct links to the NVSP portal).

### 4. ELI15 (Explain Like I'm 15)
*   **Simplified Terminology:** Breaks down complex election jargon (EVM, VVPAT, Constituency, NOTA) into simple, easily digestible language.
*   **Interactive Accordion UI:** Allows users to easily explore the "Simple Explanation" and "Why it's important" for each term.

### 5. Polling Booth Information
*   **Actionable Resources:** Provides direct links to the ECI Electoral Search portal and the 1950 Voter Helpline for finding specific polling booth details.

### 6. AI-Powered Election Assistant Chatbot
*   **Google Gemini Integration:** Utilizes the `@google/genai` API for intelligent, natural conversations about the Indian electoral process.
*   **Strict Neutrality:** System instructions enforce a neutral, non-political tone that refuses to endorse specific parties or candidates.
*   **Offline Knowledge Base:** A robust built-in fallback system that answers common questions (EVMs, registration, etc.) if the API key is missing or the network drops.
*   **Voice Input (Accessibility):** Supports speech-to-text via the browser's `SpeechRecognition` API (optimized for Indian English).
*   **Rich Formatting:** Parses markdown-style bolding and links to improve the readability of the AI's responses.

---

## 🛠️ Updates & Improvements Implemented

To improve the project's evaluation scores, the following updates have been successfully implemented:

### Security Enhancements
*   **Environment Variables:** Successfully migrated the Google Gemini API key out of the source code.
*   **`.env` Architecture:** Implemented `VITE_GEMINI_API_KEY` using `import.meta.env` for secure credential access.
*   **Git Protection:** Added `.env`, `.env.local`, etc., to the `.gitignore` to prevent secret leakage and created a `.env.example` file for safe developer onboarding.

### Accessibility (a11y) Upgrades
*   **Semantic HTML5:** Refactored generic `<div>` wrappers into proper semantic landmarks (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
*   **Screen Reader Support:**
    *   Added descriptive `aria-label` attributes to icon-only buttons (like the Voice Mic and Send buttons) and links.
    *   Linked form elements explicitly using `<label htmlFor="...">` and `.sr-only` hidden classes.
    *   Added `aria-live="polite"` to the chat container so screen readers announce incoming AI messages.
*   **Keyboard Navigation:** Added `tabIndex={0}` and keyboard focus/blur event handlers to hover-based elements (like the interactive timeline) so users can navigate the app using only the `Tab` key.

### Testing Infrastructure
*   **Framework Setup:** Installed and configured `vitest`, `jsdom`, `@testing-library/react`, and `@testing-library/jest-dom`.
*   **Configuration:** Updated `vite.config.js` to support testing environments and added a `test` script to `package.json`.
*   **Initial Test Suites:** Created `src/setupTests.js` and the foundational `src/__tests__/App.test.jsx` file to begin tracking test coverage.

### Code Quality & Formatting
*   **Standardization:** Ran Prettier across the `src` directory to standardize indentation, spacing, and quote usage in all `.js`, `.jsx`, and `.css` files.
*   **Cleanup:** Removed unused imports (e.g., legacy React imports in the test files) to satisfy linter warnings.

---

## 📋 What's Left to Do (Next Steps)

To maximize the remaining evaluation metrics, the following tasks are still pending:
1. **Component Modularization (Code Quality):** Break down the monolithic 1,600+ line `App.jsx` file into separate files inside a `src/components/` directory (e.g., `AssistantChat.jsx`, `Timeline.jsx`).
2. **Google Services Integration:** Implement **Google Analytics (gtag.js)** to track user engagement and integrate the **Google Maps API** for a visual polling booth finder.
3. **Expand Test Coverage:** Write robust unit tests for the newly separated components to push the Testing score up from 0%.
