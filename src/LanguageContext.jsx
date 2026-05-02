import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} LanguageContextValue
 * @property {string} lang - The current active language code (e.g., "en", "hi").
 * @property {function(string): void} setLang - Function to update the global language state.
 */

/** @type {import('react').Context<LanguageContextValue>} */
const LanguageContext = createContext({ lang: "en", setLang: () => { } });

/**
 * LanguageProvider — Context provider that manages the global application language state.
 * @param {object} props
 * @param {import('react').ReactNode} props.children - Child components to be wrapped.
 * @returns {JSX.Element} The provider component.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * useLanguage — Custom hook to consume the LanguageContext.
 * @returns {LanguageContextValue} The current language and setter function.
 */
export function useLanguage() {
  return useContext(LanguageContext);
}
