import { memo } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

/**
 * Header — Sticky navigation bar with the app logo, language selector,
 * and primary navigation links. Wrapped in React.memo for performance.
 * @returns {JSX.Element} The header navigation bar.
 */
const Header = memo(function Header() {
  const { lang, setLang } = useLanguage();

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
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>
          <a href="#journey">{t(lang, "nav.journey")}</a>
          <a href="#eli15">{t(lang, "nav.learn")}</a>
          <a href="#assistant" className="btn btn-primary btn-sm">
            {t(lang, "nav.askAssistant")}
          </a>
        </nav>
      </div>
    </header>
  );
});

export default Header;
