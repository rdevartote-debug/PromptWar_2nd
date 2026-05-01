import { useState } from "react";
import PropTypes from "prop-types";
import { User, MapPin, CreditCard, CheckCircle2 } from "lucide-react";

const STATES = [
  // 28 States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // 8 Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/**
 * OnboardingModal — A multi-step onboarding wizard that collects
 * user age, state, and voter ID status to personalize the election guide.
 * @param {object} props
 * @param {function} props.onComplete - Callback fired with the completed profile object.
 * @returns {JSX.Element} The onboarding modal overlay.
 */
export default function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: "",
    state: "",
    hasVoterId: null,
  });

  /**
   * Sanitizes user input by stripping HTML tags and script elements.
   * @param {string} input - The raw input string.
   * @returns {string} The sanitized string.
   */
  const sanitizeInput = (input) => {
    if (typeof input !== "string") return input;
    return input.replace(/<[^>]*>?/gm, "").trim();
  };

  const handleNext = () => setStep((prev) => prev + 1);

  const finishOnboarding = () => {
    onComplete(profile);
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal glass-panel animate-fade-in">
        <div className="onboarding-progress">
          <div
            className="progress-bar"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="onboarding-header">
          <h2>Welcome to your Election Guide</h2>
          <p>Let's personalize your experience</p>
        </div>

        <div className="onboarding-body">
          {step === 1 && (
            <div className="step-content animate-fade-in">
              <User className="step-icon" size={48} />
              <h3>How old are you?</h3>
              <div className="options-grid">
                <button
                  className={`option-card ${profile.age === "under18" ? "selected" : ""}`}
                  onClick={() => {
                    setProfile({ ...profile, age: "under18" });
                    handleNext();
                  }}
                >
                  Under 18
                  <span>Future voter</span>
                </button>
                <button
                  className={`option-card ${profile.age === "18-21" ? "selected" : ""}`}
                  onClick={() => {
                    setProfile({ ...profile, age: "18-21" });
                    handleNext();
                  }}
                >
                  18-21
                  <span>First-time voter! 🎉</span>
                </button>
                <button
                  className={`option-card ${profile.age === "over21" ? "selected" : ""}`}
                  onClick={() => {
                    setProfile({ ...profile, age: "over21" });
                    handleNext();
                  }}
                >
                  Over 21
                  <span>Experienced voter</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-fade-in">
              <MapPin className="step-icon" size={48} aria-hidden="true" />
              <h3>Where do you live?</h3>
              <p className="subtitle">
                We'll show you specific instructions for your state
              </p>
              <label htmlFor="state-select" className="sr-only">
                Select your state
              </label>
              <select
                id="state-select"
                className="state-select"
                value={profile.state}
                onChange={(e) => {
                  const sanitizedValue = sanitizeInput(e.target.value);
                  setProfile({ ...profile, state: sanitizedValue });
                  setTimeout(handleNext, 300); // Slight delay for UX
                }}
              >
                <option value="">Select your state</option>
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="step-content animate-fade-in">
              <CreditCard className="step-icon" size={48} />
              <h3>Do you have a Voter ID (EPIC)?</h3>
              <div className="options-grid">
                <button
                  className={`option-card ${profile.hasVoterId === true ? "selected" : ""}`}
                  onClick={() => {
                    setProfile({ ...profile, hasVoterId: true });
                    handleNext();
                  }}
                >
                  Yes, I have it
                </button>
                <button
                  className={`option-card ${profile.hasVoterId === false ? "selected" : ""}`}
                  onClick={() => {
                    setProfile({ ...profile, hasVoterId: false });
                    handleNext();
                  }}
                >
                  No, I need to apply
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content text-center animate-fade-in">
              <CheckCircle2 className="step-icon text-success" size={64} />
              <h3>All set!</h3>
              <p>We've customized your guide based on your profile.</p>
              {profile.state && (
                <p className="profile-summary">Region: {profile.state}</p>
              )}
              {profile.age === "18-21" && (
                <p className="profile-summary">Focus: First-Time Voter Guide</p>
              )}
              {profile.hasVoterId === false && (
                <p className="profile-summary">
                  Priority: Voter ID Application
                </p>
              )}

              <button
                className="btn btn-primary onboarding-cta"
                onClick={finishOnboarding}
              >
                Go to Dashboard
              </button>

              <div className="onboarding-actions">
                {profile.hasVoterId === false && (
                  <a
                    href="https://voters.eci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link"
                  >
                    Apply for Voter ID (Form 6) →
                  </a>
                )}
                {profile.age === "18-21" && (
                  <a
                    href="https://www.eci.gov.in/voter/voter-education/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link"
                  >
                    First-Time Voter Guide →
                  </a>
                )}
                <a
                  href="https://electoralsearch.eci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-link"
                >
                  Search Name in Voter List →
                </a>
              </div>
            </div>
          )}
        </div>

        {step > 1 && step < 4 && (
          <div className="onboarding-footer">
            <button
              className="btn-text"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

OnboardingModal.propTypes = {
  /** Callback fired when the user completes all onboarding steps. Receives the profile object. */
  onComplete: PropTypes.func.isRequired,
};
