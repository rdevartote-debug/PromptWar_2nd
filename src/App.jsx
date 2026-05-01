import { useState } from "react";
import "./index.css";

import { LanguageProvider, useLanguage } from "./LanguageContext";
import { t } from "./i18n";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import GuidedJourney from "./components/GuidedJourney";
import TermDictionary from "./components/TermDictionary";
import PollingInfo from "./components/PollingInfo";
import ChatAssistant from "./components/ChatAssistant";
import OnboardingModal from "./components/OnboardingModal";

/** @constant {string} localStorage key for persisting user profile */
const PROFILE_STORAGE_KEY = "voterProfile_v3";

/**
 * Checks whether the user profile has all required fields.
 * @param {object|null} profile - The user profile object.
 * @returns {boolean} True if the profile contains age and state.
 */
const hasRequiredProfile = (profile) => Boolean(profile?.age && profile?.state);

/**
 * AppContent — Inner shell that consumes LanguageContext and
 * orchestrates layout, onboarding, and section rendering.
 * @returns {JSX.Element} The full application UI.
 */
function AppContent() {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const shouldShowOnboarding = !hasRequiredProfile(userProfile);
  const { lang } = useLanguage();

  /**
   * Handles onboarding completion by persisting the profile to
   * localStorage and scrolling to the top of the page.
   * @param {object} profile - The completed user profile.
   */
  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      {shouldShowOnboarding && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      <main
        className="app-shell"
        style={{
          filter: shouldShowOnboarding ? "blur(4px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <Hero userProfile={userProfile} />
        <Timeline userProfile={userProfile} />
        <GuidedJourney />
        <TermDictionary />
        <PollingInfo />
        <ChatAssistant />
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>{t(lang, "footer")}</p>
        </div>
      </footer>
    </>
  );
}

/**
 * App — Root component that wraps the application in LanguageProvider
 * to enable multilingual support across all child components.
 * @returns {JSX.Element} The wrapped application.
 */
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
