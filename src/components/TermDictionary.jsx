import React, { useState } from "react";
import { BookOpen, Cpu, FileText, Map as MapIcon, XCircle } from "lucide-react";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

const ELI15_TERMS = [
  {
    id: "evm",
    term: "EVM (Electronic Voting Machine)",
    icon: <Cpu />,
    simpleExplanation:
      "Think of it like a giant, super-secure calculator. Instead of adding numbers, it adds up votes. You press a blue button next to the candidate you like, and the machine safely stores your vote.",
    whyImportant: "It stops invalid votes and makes counting much faster.",
  },
  {
    id: "vvpat",
    term: "VVPAT (Voter Verified Paper Audit Trail)",
    icon: <FileText />,
    simpleExplanation:
      "It's like a receipt printer attached to the EVM. When you press the button to vote, this machine prints a small slip of paper showing who you voted for. You can see it through a glass window for 7 seconds before it drops into a sealed box.",
    whyImportant:
      "It proves to you that the machine recorded your vote correctly.",
  },
  {
    id: "constituency",
    term: "Constituency",
    icon: <MapIcon />,
    simpleExplanation:
      "Imagine your school dividing everyone into smaller groups or 'houses' to elect a house captain. A constituency is just a specific area (like a group of neighborhoods) that gets to elect one person to represent them in the government.",
    whyImportant:
      "It ensures every part of the country has a voice in the parliament or state assembly.",
  },
  {
    id: "nota",
    term: "NOTA (None Of The Above)",
    icon: <XCircle />,
    simpleExplanation:
      "It's a button at the very bottom of the EVM. Pressing it means 'I don't think any of the candidates listed are good enough.' It's a way to officially register your protest.",
    whyImportant:
      "It gives voters a voice even when they don't support any candidate.",
  },
];

/**
 * TermDictionary — An ELI15 (Explain Like I'm 15) accordion that
 * simplifies election jargon. Tracks term clicks via Firebase Analytics.
 * @returns {JSX.Element} The term dictionary section.
 */
export default function TermDictionary() {
  const [activeTerm, setActiveTerm] = useState(ELI15_TERMS[0].id);

  return (
    <section className="eli15-section py-20" id="eli15">
      <div className="container">
        <div className="section-header text-center mb-12">
          <div className="section-kicker">
            <BookOpen className="text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Explain Like I'm 15
            </span>
          </div>
          <h2 className="text-gradient">Election Terms Simplified</h2>
          <p className="text-muted">
            No jargon. Just simple explanations of important voting concepts.
          </p>
        </div>

        <div className="eli15-grid">
          <div className="terms-surface glass-panel">
            <div className="terms-list">
              {ELI15_TERMS.map((term) => (
                <button
                  key={term.id}
                  id={`term-${term.id}`}
                  aria-expanded={activeTerm === term.id}
                  aria-controls={`explanation-${term.id}`}
                  className={`term-btn ${activeTerm === term.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveTerm(term.id);
                    if (analytics) {
                      try {
                        logEvent(analytics, "select_content", {
                          content_type: "eli15_term",
                          item_id: term.id,
                        });
                      } catch (err) {
                        console.error("Analytics error", err);
                      }
                    }
                  }}
                >
                  <span className="term-icon">{term.icon}</span>
                  <span className="term-name">{term.term}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="term-explanation glass-panel">
            {ELI15_TERMS.map((term) => (
              <div
                key={term.id}
                id={`explanation-${term.id}`}
                role="region"
                aria-labelledby={`term-${term.id}`}
                className={`explanation-content animate-fade-in ${activeTerm === term.id ? "block" : "hidden"}`}
              >
                <div className="explanation-icon text-accent mb-4">
                  {React.cloneElement(term.icon, { size: 48 })}
                </div>
                <h3>{term.term}</h3>

                <div className="explanation-card mb-4">
                  <h4>In Simple Words:</h4>
                  <p>{term.simpleExplanation}</p>
                </div>

                <div className="explanation-card bg-secondary">
                  <h4>Why it's important:</h4>
                  <p className="text-muted">{term.whyImportant}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
