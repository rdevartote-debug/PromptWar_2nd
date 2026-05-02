import { lazy, Suspense } from "react";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { Loader2 } from "lucide-react";
import { t } from "./i18n";
import { useProfile } from "./hooks/useProfile";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded components for optimized initial bundle size
const Timeline = lazy(() => import("./components/Timeline"));
const GuidedJourney = lazy(() => import("./components/GuidedJourney"));
const TermDictionary = lazy(() => import("./components/TermDictionary"));
const PollingInfo = lazy(() => import("./components/PollingInfo"));
const ChatAssistant = lazy(() => import("./components/ChatAssistant"));
const OnboardingModal = lazy(() => import("./components/OnboardingModal"));
const VoterPledge = lazy(() => import("./components/VoterPledge"));

import "./index.css";

/**
 * AppContent — Inner shell that consumes LanguageContext and
 * orchestrates layout, onboarding, and section rendering.
 * @returns {JSX.Element} The full application UI.
 */
function AppContent() {
  const { userProfile, updateProfile, isComplete } = useProfile();
  const shouldShowOnboarding = !isComplete;
  const { lang } = useLanguage();

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#06101d]">
            <Loader2 className="text-primary animate-spin" size={48} />
          </div>
        }
      >
        {shouldShowOnboarding && (
          <OnboardingModal onComplete={updateProfile} />
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
          <VoterPledge />
        </main>
      </Suspense>

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
 * and ErrorBoundary to ensure resilience and multilingual support.
 * @returns {JSX.Element} The wrapped application.
 */
function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
