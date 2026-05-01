import { useState } from "react";
import {
  CheckCircle,
  UserPlus,
  CreditCard,
  Search,
  Map,
  Vote,
  BarChart,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

const STEP_ICONS = [
  <CheckCircle />,
  <UserPlus />,
  <CreditCard />,
  <Search />,
  <Map />,
  <Vote />,
  <BarChart />,
];

/**
 * GuidedJourney — An interactive 7-step walkthrough of the Indian
 * election process, from eligibility to vote counting. Supports i18n.
 * @returns {JSX.Element} The guided journey section.
 */
export default function GuidedJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const { lang } = useLanguage();

  const steps = t(lang, "journey.steps");
  const journeyProgress =
    steps.length > 1
      ? `${(activeStep / (steps.length - 1)) * 100}%`
      : "0%";

  const nextStep = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <section className="guided-journey-section py-20" id="journey">
      <div className="container">
        <div className="section-header text-center mb-12">
          <h2 className="text-gradient">{t(lang, "journey.title")}</h2>
          <p className="text-muted">{t(lang, "journey.subtitle")}</p>
        </div>

        <div className="journey-layout">
          <div className="journey-tracker-shell glass-panel">
            <div className="journey-tracker">
              <div className="tracker-line"></div>
              <div
                className="tracker-line-fill"
                style={{ width: journeyProgress }}
              ></div>
              {steps.map((step, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`${t(lang, "journey.step")} ${index + 1}: ${step.title}`}
                  className={`tracker-node ${index === activeStep ? "active" : ""} ${index < activeStep ? "completed" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="node-icon">{STEP_ICONS[index]}</div>
                  <div className="node-copy">
                    <div className="node-step">{t(lang, "journey.step")} {index + 1}</div>
                    <div className="node-label">{step.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="journey-content glass-panel">
            <div
              key={activeStep}
              className="journey-stage animate-step-panel"
            >
              <div className="step-badge">
                {t(lang, "journey.step")} {activeStep + 1} {t(lang, "journey.of")} {steps.length}
              </div>

              <div className="step-header">
                <div className="step-icon-large text-gradient">
                  {STEP_ICONS[activeStep]}
                </div>
                <div className="step-header-copy">
                  <div className="step-kicker">{t(lang, "journey.interactivePath")}</div>
                  <h3 className="step-title">{steps[activeStep].title}</h3>
                </div>
              </div>

              <p className="step-description">
                {steps[activeStep].description}
              </p>

              <div className="step-action">
                <div className="step-action-label">{t(lang, "journey.proTip")}</div>
                <strong>{t(lang, "journey.tip")}</strong> {steps[activeStep].action}
              </div>

              <div className="step-controls">
                <button
                  className="btn btn-secondary"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                >
                  <ChevronLeft size={18} /> {t(lang, "journey.previous")}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={nextStep}
                  disabled={activeStep === steps.length - 1}
                >
                  {t(lang, "journey.next")} <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
