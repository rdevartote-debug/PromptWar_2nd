import PropTypes from "prop-types";
import { CheckCircle2, Globe } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

/**
 * Hero — Landing section that displays a personalized welcome message
 * based on the user's age group from the onboarding profile.
 * @param {object} props
 * @param {object|null} props.userProfile - The current user profile.
 * @returns {JSX.Element} The hero banner section.
 */
export default function Hero({ userProfile }) {
  const { lang } = useLanguage();

  let welcomeTitle = t(lang, "hero.difference");
  let welcomeMessage = t(lang, "hero.differenceMsg");

  if (userProfile) {
    if (userProfile.age === "18-21") {
      welcomeTitle = t(lang, "hero.firstTime");
      welcomeMessage = t(lang, "hero.firstTimeMsg");
    } else if (userProfile.age === "under18") {
      welcomeTitle = t(lang, "hero.future");
      welcomeMessage = t(lang, "hero.futureMsg");
    } else if (userProfile.age === "over21") {
      welcomeTitle = t(lang, "hero.difference");
      welcomeMessage = t(lang, "hero.differenceReturnMsg");
    }
  }

  const heroSteps = [t(lang, "hero.step1"), t(lang, "hero.step2")];

  return (
    <section className="hero">
      <div className="hero-mesh hero-mesh-1"></div>
      <div className="hero-mesh hero-mesh-2"></div>
      <div className="hero-mesh hero-mesh-3"></div>
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="badge hero-badge">{t(lang, "hero.badge")}</div>
          <div className="hero-copy">
            <h1>
              {t(lang, "hero.heading")}{" "}
              <span className="text-gradient">{welcomeTitle}</span>
            </h1>
            <p className="hero-subtitle">{welcomeMessage}</p>
          </div>
          <div className="hero-actions">
            <a href="#journey" className="btn btn-primary">
              {t(lang, "hero.startGuide")}
            </a>
            <a href="#timeline" className="btn btn-secondary">
              {t(lang, "hero.viewTimeline")}
            </a>
          </div>
          <div className="hero-trust-row">
            <div className="hero-trust-pill glass-panel">
              <CheckCircle2 size={16} />
              <span>{t(lang, "hero.trusted")}</span>
            </div>
            <div className="hero-trust-pill glass-panel">
              <Globe size={16} />
              <span>{t(lang, "hero.accessible")}</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit hero-orbit-1"></div>
          <div className="hero-orbit hero-orbit-2"></div>
          <div className="hero-core-panel glass-panel">
            <div className="hero-core-label">IndiaVoteAssist</div>
            <div className="hero-core-title">
              {t(lang, "hero.coreTitle")}
            </div>
            <div className="hero-core-grid">
              {heroSteps.map((step, index) => (
                <div className="hero-core-metric" key={step}>
                  <span className="hero-core-metric-value">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="hero-core-metric-label">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel stat-card card-1">
            <span className="stat-number">{heroSteps.length}</span>
            <span className="stat-label">{t(lang, "hero.simpleSteps")}</span>
          </div>
          <div className="glass-panel stat-card card-2">
            <span className="stat-number">24/7</span>
            <span className="stat-label">{t(lang, "hero.aiAssistance")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  /** The user profile object containing age and state. */
  userProfile: PropTypes.shape({
    age: PropTypes.string,
    state: PropTypes.string,
  }),
};

Hero.defaultProps = {
  userProfile: null,
};
