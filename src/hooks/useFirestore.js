import { useState, useCallback } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

/**
 * @typedef {Object} UseFirestoreReturn
 * @property {function(import('./useProfile').VoterProfile, import('./useProfile').ElectionEvent[]): Promise<void>} saveTimeline - Function to save a user's election timeline to the cloud.
 * @property {"idle"|"saving"|"success"|"error"} saveStatus - The current operation status for UI feedback.
 * @property {string|null} error - Any error message encountered during Firestore operations.
 */

/**
 * useFirestore — Custom hook for interacting with Firebase Firestore for voter data persistence.
 * @returns {UseFirestoreReturn} Hook state and methods.
 */
export function useFirestore() {
  const [saveStatus, setSaveStatus] = useState("idle");
  const [error, setError] = useState(null);

  /**
   * Saves user timeline data to Firestore user_timelines collection.
   * @param {import('./useProfile').VoterProfile} profile - The user profile containing age and state.
   * @param {import('./useProfile').ElectionEvent[]} events - The list of personalized election phases to save.
   * @returns {Promise<void>}
   */
  const saveTimeline = useCallback(async (profile, events) => {
    if (!profile?.state) return;
    
    setSaveStatus("saving");
    setError(null);

    try {
      await addDoc(collection(db, "user_timelines"), {
        state: profile.state,
        age: profile.age,
        events: events,
        savedAt: new Date(),
        // Note: For full enterprise AppSec, request.auth.uid should be added here
        // once authentication is implemented.
      });
      
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("useFirestore: Failed to save timeline", err);
      setError(err.message);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, []);

  return { saveTimeline, saveStatus, error };
}
