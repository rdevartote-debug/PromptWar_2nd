import { memo } from "react";
import { MapPin, Search, ExternalLink, Phone } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

/**
 * PollingInfo — Displays polling booth lookup options (ECI online search
 * and voter helpline). Wrapped in React.memo as it has no dynamic props.
 * @returns {JSX.Element} The polling info section.
 */
const PollingInfo = memo(function PollingInfo() {
  const { lang } = useLanguage();

  return (
    <section className="polling-info-section py-20" id="polling-info">
      <div className="container">
        <div className="glass-panel polling-info-card">
          <div className="section-header polling-info-header">
            <div className="polling-info-icon">
              <MapPin size={48} className="text-primary" />
            </div>
            <h2>{t(lang, "polling.title")}</h2>
            <p className="text-muted polling-info-copy">
              {t(lang, "polling.subtitle")}
            </p>
          </div>

          <div className="info-options">
            <div className="info-option-card">
              <Search className="option-icon" />
              <h3>{t(lang, "polling.onlineSearch")}</h3>
              <p>{t(lang, "polling.onlineDesc")}</p>
              <a
                href="https://electoralsearch.eci.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label={t(lang, "polling.searchOnline")}
              >
                {t(lang, "polling.searchOnline")} <ExternalLink size={16} />
              </a>
            </div>

            <div className="info-option-card">
              <Phone className="option-icon" />
              <h3>{t(lang, "polling.voterHelpline")}</h3>
              <p>{t(lang, "polling.helplineDesc")}</p>
              <a
                href="tel:1950"
                className="btn btn-secondary"
                aria-label={t(lang, "polling.call1950")}
              >
                {t(lang, "polling.call1950")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PollingInfo;
