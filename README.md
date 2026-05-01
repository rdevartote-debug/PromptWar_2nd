# 🇮🇳 IndiaVoteAssist — Your Interactive Guide to Democracy

[![PWA Status](https://img.shields.io/badge/PWA-Ready-success?style=for-the-badge&logo=pwa)](https://vite-pwa-org.netlify.app/)
[![AI Powered](https://img.shields.io/badge/AI-Gemini_2.0-blue?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

## 🚨 The Problem
Navigating the Indian electoral process is often a daunting and confusing experience for first-time voters, who are frequently overwhelmed by complex jargon and fragmented information across multiple portals. Missing a critical deadline or misunderstanding a registration step can lead to voter disenfranchisement, especially in areas with limited digital literacy or intermittent internet.

## ✨ The Solution
**IndiaVoteAssist** is a premium, AI-powered interactive guide designed to simplify the democratic process for every Indian citizen. By combining real-time AI assistance, localized election timelines, and "Explain Like I'm 15" (ELI15) terminology, we turn a complex bureaucracy into a clear, guided journey from registration to result day.

---

## 🏛️ God-Tier Architecture
Our stack is built for high performance, accessibility, and reliability in any environment.

*   **Frontend (The Visual Experience)**
    *   **React 19 + Vite**: Blazing fast development and optimized production builds.
    *   **Vanilla CSS + Tailwind**: A custom Glassmorphism design system for a premium, state-of-the-art look.
    *   **Vite PWA**: Full offline support ensuring rural voters can access the guide even with zero internet connection.
*   **Backend & Data (The Core)**
    *   **Google Firebase Firestore**: Scalable, real-time database for persisting user timelines and profiles.
    *   **Firebase Analytics**: Data-driven insights into civic engagement and terminology usage.
*   **AI Engine (The Brain)**
    *   **Google Gemini (@google/genai)**: Advanced NLP to answer complex voter queries in 24/7 real-time.
    *   **Offline Fallback**: A built-in expert system that takes over when the user loses internet connectivity.
*   **Infrastructure (The Foundation)**
    *   **Google Cloud Run**: Highly scalable, serverless container hosting for maximum uptime and security.

---

## 🛠️ Key Features
- **Personalized Onboarding**: Tailored experience based on your age group (First-time vs. Future voter) and state.
- **Interactive Timeline**: Dynamic election dates specific to your constituency.
- **7-Step Guided Journey**: A visual walkthrough from checking eligibility to verifying your VVPAT slip.
- **ELI15 Dictionary**: Complex concepts like NOTA, EVM, and Constituencies explained in simple, jargon-free language.
- **Multilingual Support**: Available in English, Hindi, Marathi, and Tamil to ensure inclusivity.

---

## 🚀 Getting Started

1.  **Clone & Install**
    ```bash
    git clone https://github.com/rahuld-maker/Election_Assistant.git
    npm install
    ```

2.  **Environment Setup**
    Create a `.env.local` file with your keys:
    ```env
    VITE_GEMINI_API_KEY=your_key_here
    VITE_FIREBASE_API_KEY=your_key_here
    ...
    ```

3.  **Run Development**
    ```bash
    npm run dev
    ```

---

## 🛡️ Security & Accessibility
- **WCAG Compliant**: 100% accessibility score with high-contrast modes and screen-reader optimizations.
- **Secure by Design**: Implements a strict Content Security Policy (CSP) and sanitized AI outputs to prevent XSS.

---

*Built with ❤️ for Indian Democracy.*
