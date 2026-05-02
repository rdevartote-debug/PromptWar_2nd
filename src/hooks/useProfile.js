import { useState, useCallback } from "react";

/**
 * @typedef {Object} VoterProfile
 * @property {string} age - The user's age category (e.g., "18-25").
 * @property {string} state - The user's state of residence in India.
 * @property {boolean|null} hasVoterId - Whether the user already possesses a Voter ID card.
 * @property {string} [language] - The user's preferred language code (en, hi, etc.).
 */

/**
 * @typedef {Object} ElectionEvent
 * @property {number} id - Unique identifier for the election phase.
 * @property {string} title - The name of the phase (e.g., "Polling Date").
 * @property {string} date - The localized date string for the phase.
 * @property {string} description - A detailed explanation of what happens in this phase.
 * @property {"upcoming"|"current"|"past"} status - The temporal status of the phase.
 */

/** @constant {string} localStorage key for persisting user profile */
const PROFILE_STORAGE_KEY = "voterProfile_v3";

/**
 * Checks whether the user profile has all required fields.
 * @param {VoterProfile|null} profile - The user profile object.
 * @returns {boolean} True if the profile contains age and state.
 */
const hasRequiredProfile = (profile) => Boolean(profile?.age && profile?.state);

/**
 * @typedef {Object} UseProfileReturn
 * @property {VoterProfile|null} userProfile - The current authenticated or local voter profile.
 * @property {function(VoterProfile): void} updateProfile - Function to persist and update the user profile.
 * @property {boolean} isComplete - Flag indicating if all mandatory profile fields are present.
 */

/**
 * useProfile — Custom hook for managing the user's election profile and local persistence.
 * @returns {UseProfileReturn} Profile state and persistence methods.
 */
export function useProfile() {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("useProfile: Failed to parse profile from storage", e);
      return null;
    }
  });

  const updateProfile = useCallback((profile) => {
    setUserProfile(profile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    window.scrollTo(0, 0);
  }, []);

  const isComplete = hasRequiredProfile(userProfile);

  return { userProfile, updateProfile, isComplete };
}
