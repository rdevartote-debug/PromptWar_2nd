import { useState } from "react";
import PropTypes from "prop-types";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";

import { TIMELINE_BASE_EVENTS as timelineEvents, STATE_ELECTION_DATES } from "../constants/electionData";


/**
 * Timeline — Displays the 5 key election phases with state-specific
 * dates and a "Save to Profile" Firestore integration.
 * @param {object} props
 * @param {object|null} props.userProfile - The current user profile (age, state).
 * @returns {JSX.Element} The election timeline section.
 */
export default function Timeline({ userProfile }) {
  const [activeEvent, setActiveEvent] = useState(null);
  const { saveTimeline, saveStatus } = useFirestore();

  /**
   * Returns an array of display dates customized for the user's state.
   * @param {string|undefined} state - The user's selected state.
   * @returns {string[]} Array of 5 date strings for each election phase.
   */
  const getStateDates = (state) => {
    return STATE_ELECTION_DATES[state] || 
           (state ? STATE_ELECTION_DATES.Generic : STATE_ELECTION_DATES.Fallback);
  };

  const dates = getStateDates(userProfile?.state);
  const now = new Date();

  const personalizedEvents = timelineEvents.map((event, index) => {
    const dateStr = dates[index];
    let status = "upcoming";

    // Simple parsing for mock dates
    try {
      const eventDate = new Date(dateStr);
      if (!isNaN(eventDate.getTime())) {
        status = eventDate < now ? "past" : "upcoming";
      } else if (dateStr.includes("Phase")) {
        // Fallback for non-specific dates
        status = "upcoming";
      }
    } catch {
      status = "upcoming";
    }

    return {
      ...event,
      date: dateStr,
      status: status,
    };
  });

  const defaultActiveIndex = personalizedEvents.findIndex(
    (event) => event.status === "upcoming",
  );
  const highlightedIndex = activeEvent
    ? personalizedEvents.findIndex((event) => event.id === activeEvent)
    : defaultActiveIndex >= 0
      ? defaultActiveIndex
      : personalizedEvents.length - 1;
  const timelineProgress =
    personalizedEvents.length > 1
      ? `${(highlightedIndex / (personalizedEvents.length - 1)) * 100}%`
      : "0%";

  const handleSave = () => {
    saveTimeline(userProfile, personalizedEvents);
  };

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <div className="section-header">
          <h2>
            Election <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-muted">
            {userProfile?.state
              ? `Here are the critical dates for ${userProfile.state}.`
              : "Stay on top of critical dates to ensure your voice is heard."}
          </p>
          {userProfile?.state && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="btn btn-primary btn-sm glass-panel"
                style={{ cursor: saveStatus === "saving" ? "not-allowed" : "pointer" }}
              >
                {saveStatus === "saving" ? "Saving..." : "Save to Profile"}
              </button>
            </div>
          )}
        </div>

        {saveStatus === "success" && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in glass-panel border-green-400">
            <CheckCircle2 size={20} />
            <span className="font-medium">Timeline saved successfully!</span>
          </div>
        )}
        
        {saveStatus === "error" && (
          <div className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in glass-panel border-red-400">
            <span className="font-medium">Failed to save timeline.</span>
          </div>
        )}

        <div className="timeline-container">
          <div className="timeline-track">
            <div className="timeline-line"></div>
            <div
              className="timeline-line-fill"
              style={{ height: timelineProgress }}
            ></div>
          </div>

          {personalizedEvents.map((event, index) => (
            <div
              key={event.id}
              role="article"
              tabIndex={0}
              aria-label={`Election Phase ${event.id}: ${event.title}`}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${activeEvent === event.id ? "active" : ""} ${event.status}`}
              onMouseEnter={() => setActiveEvent(event.id)}
              onMouseLeave={() => setActiveEvent(null)}
              onFocus={() => setActiveEvent(event.id)}
              onBlur={() => setActiveEvent(null)}
            >
              <div className="timeline-dot">
                <div className="timeline-dot-ring"></div>
                <Calendar size={16} />
              </div>

              <div className="timeline-content glass-panel">
                <div className="timeline-eyebrow">
                  Election Phase {event.id}
                </div>
                <div className="timeline-date">{event.date}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="timeline-card-footer">
                  <div className={`status-badge ${event.status}`}>
                    {event.status === "past" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    <span>
                      {event.status === "past" ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Timeline.propTypes = {
  /** The user profile object containing age and state. */
  userProfile: PropTypes.shape({
    age: PropTypes.string,
    state: PropTypes.string,
    hasVoterId: PropTypes.bool,
  }),
};

Timeline.defaultProps = {
  userProfile: null,
};
