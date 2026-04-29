import { useState } from "react";
import {
  Globe,
  CheckCircle2,
  CheckCircle,
  UserPlus,
  CreditCard,
  Search,
  Map,
  Vote,
  BarChart,
  ChevronRight,
  ChevronLeft,
  MapPin,
  ExternalLink,
  Phone,
} from "lucide-react";
import "./index.css";

import Timeline from "./components/Timeline";
import TermDictionary from "./components/TermDictionary";
import ChatAssistant from "./components/ChatAssistant";
import OnboardingModal from "./components/OnboardingModal";

// ========== Header.jsx ==========
function Header() {
  return (
    <header className="header glass-panel">
      <div className="container header-container">
        <div className="logo">
          <div className="logo-icon">🇮🇳</div>
          <span className="logo-text">
            India<span className="text-gradient">VoteAssist</span>
          </span>
        </div>
        <nav className="nav-links">
          <div className="language-selector">
            <Globe size={18} className="text-muted" aria-hidden="true" />
            <label htmlFor="language-select" className="sr-only">
              Select Language
            </label>
            <select
              id="language-select"
              className="language-select"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>
          <a href="#journey">Journey</a>
          <a href="#eli15">Learn</a>
          <a href="#assistant" className="btn btn-primary btn-sm">
            Ask Assistant
          </a>
        </nav>
      </div>
    </header>
  );
}

// ========== Hero.jsx ==========
function Hero({ userProfile }) {
  let welcomeTitle = "Making a Difference";
  let welcomeMessage =
    "Navigate the election process with ease. Understand the timeline, learn the steps to vote, and ask our AI assistant any questions you have.";

  if (userProfile) {
    if (userProfile.age === "18-21") {
      welcomeTitle = "Your First Election";
      welcomeMessage =
        "Welcome to your first election! Let's get you registered and ready to make your voice heard.";
    } else if (userProfile.age === "under18") {
      welcomeTitle = "Future Voter";
      welcomeMessage =
        "Welcome future voter! Let's learn about the democratic process so you're ready when your time comes.";
    } else if (userProfile.age === "over21") {
      welcomeTitle = "Making a Difference";
      welcomeMessage =
        "Welcome back! Let's get you ready for election day and ensure your voter details are up to date.";
    }
  }

  return (
    <section className="hero">
      <div className="hero-mesh hero-mesh-1"></div>
      <div className="hero-mesh hero-mesh-2"></div>
      <div className="hero-mesh hero-mesh-3"></div>
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="badge hero-badge">2026 Elections</div>
          <div className="hero-copy">
            <h1>
              Your Guide to{" "}
              <span className="text-gradient">{welcomeTitle}</span>
            </h1>
            <p className="hero-subtitle">{welcomeMessage}</p>
          </div>
          <div className="hero-actions">
            <a href="#journey" className="btn btn-primary">
              Start the Guide
            </a>
            <a href="#timeline" className="btn btn-secondary">
              View Timeline
            </a>
          </div>
          <div className="hero-trust-row">
            <div className="hero-trust-pill glass-panel">
              <CheckCircle2 size={16} />
              <span>Trusted election guidance</span>
            </div>
            <div className="hero-trust-pill glass-panel">
              <Globe size={16} />
              <span>Accessible for every voter</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit hero-orbit-1"></div>
          <div className="hero-orbit hero-orbit-2"></div>
          <div className="hero-core-panel glass-panel">
            <div className="hero-core-label">IndiaVoteAssist</div>
            <div className="hero-core-title">
              Calm, clear voter guidance with AI at the center.
            </div>
            <div className="hero-core-grid">
              <div className="hero-core-metric">
                <span className="hero-core-metric-value">01</span>
                <span className="hero-core-metric-label">
                  Understand the process
                </span>
              </div>
              <div className="hero-core-metric">
                <span className="hero-core-metric-value">02</span>
                <span className="hero-core-metric-label">
                  Track each election phase
                </span>
              </div>
            </div>
          </div>
          <div className="glass-panel stat-card card-1">
            <span className="stat-number">4</span>
            <span className="stat-label">Simple Steps</span>
          </div>
          <div className="glass-panel stat-card card-2">
            <span className="stat-number">24/7</span>
            <span className="stat-label">AI Assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== GuidedJourney.jsx ==========
const JOURNEY_STEPS = [
  {
    id: 1,
    title: "Eligibility",
    icon: <CheckCircle />,
    description:
      "To vote in India, you must be a citizen of India and 18 years of age or older as of January 1st of the year the electoral roll is revised.",
    action: "Check your age and citizenship status.",
  },
  {
    id: 2,
    title: "Voter Registration",
    icon: <UserPlus />,
    description:
      "Register online via the National Voters' Service Portal (NVSP) or Voter Portal using Form 6.",
    action: "Visit voters.eci.gov.in to apply.",
  },
  {
    id: 3,
    title: "Voter ID (EPIC)",
    icon: <CreditCard />,
    description:
      "Once registered, your Electors Photo Identity Card (EPIC) will be mailed to you. You can also download the digital version (e-EPIC).",
    action: "Track your application status online.",
  },
  {
    id: 4,
    title: "Electoral Roll",
    icon: <Search />,
    description:
      "Before voting day, verify your name in the electoral roll (voter list) of your constituency. Even with an EPIC, you can only vote if your name is on the list.",
    action: "Search your name in the ECI Voter List.",
  },
  {
    id: 5,
    title: "Constituencies",
    icon: <Map />,
    description:
      "India is divided into constituencies for Lok Sabha (national) and Vidhan Sabha (state). You will vote for a representative for your specific area.",
    action: "Find out your Parliamentary & Assembly constituencies.",
  },
  {
    id: 6,
    title: "Polling Day",
    icon: <Vote />,
    description:
      "Go to your designated polling booth. Press the button against the candidate of your choice on the Electronic Voting Machine (EVM) and check the VVPAT slip.",
    action: "Carry your EPIC or other approved ID.",
  },
  {
    id: 7,
    title: "Vote Counting",
    icon: <BarChart />,
    description:
      "Votes are counted under strict security on a designated day. The candidate with the most votes in the constituency wins.",
    action: "Follow the election results on ECI website or news.",
  },
];

function GuidedJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const journeyProgress =
    JOURNEY_STEPS.length > 1
      ? `${(activeStep / (JOURNEY_STEPS.length - 1)) * 100}%`
      : "0%";

  const nextStep = () => {
    if (activeStep < JOURNEY_STEPS.length - 1)
      setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <section className="guided-journey-section py-20" id="journey">
      <div className="container">
        <div className="section-header text-center mb-12">
          <h2 className="text-gradient">Your Election Journey</h2>
          <p className="text-muted">
            A step-by-step guide from registration to result day.
          </p>
        </div>

        <div className="journey-layout">
          <div className="journey-tracker-shell glass-panel">
            <div className="journey-tracker">
              <div className="tracker-line"></div>
              <div
                className="tracker-line-fill"
                style={{ width: journeyProgress }}
              ></div>
              {JOURNEY_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  aria-label={`Go to step ${step.id}: ${step.title}`}
                  className={`tracker-node ${index === activeStep ? "active" : ""} ${index < activeStep ? "completed" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="node-icon">{step.icon}</div>
                  <div className="node-copy">
                    <div className="node-step">Step {step.id}</div>
                    <div className="node-label">{step.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="journey-content glass-panel">
            <div
              key={JOURNEY_STEPS[activeStep].id}
              className="journey-stage animate-step-panel"
            >
              <div className="step-badge">
                Step {JOURNEY_STEPS[activeStep].id} of {JOURNEY_STEPS.length}
              </div>

              <div className="step-header">
                <div className="step-icon-large text-gradient">
                  {JOURNEY_STEPS[activeStep].icon}
                </div>
                <div className="step-header-copy">
                  <div className="step-kicker">Interactive Voter Path</div>
                  <h3 className="step-title">
                    {JOURNEY_STEPS[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="step-description">
                {JOURNEY_STEPS[activeStep].description}
              </p>

              <div className="step-action">
                <div className="step-action-label">Pro Tip</div>
                <strong>Tip:</strong> {JOURNEY_STEPS[activeStep].action}
              </div>

              <div className="step-controls">
                <button
                  className="btn btn-secondary"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                >
                  <ChevronLeft size={18} /> Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={nextStep}
                  disabled={activeStep === JOURNEY_STEPS.length - 1}
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== PollingInfo.jsx ==========
function PollingInfo() {
  return (
    <section className="polling-info-section py-20" id="polling-info">
      <div className="container">
        <div className="glass-panel polling-info-card">
          <div className="section-header polling-info-header">
            <div className="polling-info-icon">
              <MapPin size={48} className="text-primary" />
            </div>
            <h2>Find Your Polling Booth</h2>
            <p className="text-muted polling-info-copy">
              The Election Commission of India provides multiple ways to find
              your constituency and exact polling booth location. Do this a few
              days before the election.
            </p>
          </div>

          <div className="info-options">
            <div className="info-option-card">
              <Search className="option-icon" />
              <h3>Online Search</h3>
              <p>
                Visit the official ECI Electoral Search portal to find your
                details using your EPIC number.
              </p>
              <a
                href="https://electoralsearch.eci.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label="Search your polling booth online"
              >
                Search Online <ExternalLink size={16} />
              </a>
            </div>

            <div className="info-option-card">
              <Phone className="option-icon" />
              <h3>Voter Helpline</h3>
              <p>
                Call the toll-free national voter helpline for assistance or use
                the Voter Helpline App.
              </p>
              <a
                href="tel:1950"
                className="btn btn-secondary"
                aria-label="Call voter helpline 1950"
              >
                Call 1950
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== App.jsx ==========
const PROFILE_STORAGE_KEY = "voterProfile_v3";
const hasRequiredProfile = (profile) => Boolean(profile?.age && profile?.state);

function App() {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const shouldShowOnboarding = !hasRequiredProfile(userProfile);

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
          <p>&copy; 2026 Election Assistant. Built for educational purposes.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
