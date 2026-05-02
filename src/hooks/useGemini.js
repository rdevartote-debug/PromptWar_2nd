import { useState, useRef, useEffect, useCallback } from "react";

/**
 * @typedef {Object} ChatMessage
 * @property {number} id - Unique message ID.
 * @property {"bot"|"user"} sender - The author of the message.
 * @property {string} text - The actual message content.
 */

/**
 * @typedef {Object} UseGeminiReturn
 * @property {function(string): Promise<string>} sendMessage - Async function to send a message to Gemini or fallback.
 * @property {boolean} isTyping - Loading state indicating AI is processing.
 * @property {boolean} isOnline - Indicates if the live Gemini API is successfully initialized.
 * @property {string|null} error - Any error messages encountered during interaction.
 */

/** @constant {string} The system instruction for the Gemini AI model. */
const SYSTEM_INSTRUCTION = `You are the "Indian Election Assistant", a helpful, neutral, and non-political AI guide designed to help Indian citizens understand the election process. 

Your goals are:
1. Explain voter registration (NVSP portal, Form 6, etc.).
2. Explain Voter ID (EPIC) application and tracking.
3. Help users check their name in the electoral roll.
4. Explain constituencies, EVMs, VVPATs, and NOTA.
5. Provide information on polling day processes and counting.
6. Use simple, jargon-free language (ELI15 style when appropriate).
7. Stay strictly neutral. Do not support any political party or candidate.
8. If a question is unrelated to Indian elections, politely steer the conversation back to election topics.
9. Support multiple Indian languages if the user speaks in them (Hindi, Marathi, Tamil, etc.).
10. Use bullet points and clear steps for instructions.`;

/** @constant {object} Offline fallback knowledge base for when API is unavailable. */
const OFFLINE_RESPONSES = {
  vote: `Here's how to vote in India:

**Step 1:** Make sure you are registered. Visit the National Voters' Service Portal (NVSP) at **voters.eci.gov.in**.

**Step 2:** Find your polling booth using the Electoral Search at **electoralsearch.eci.gov.in** or call **1950**.

**Step 3:** On polling day, carry your **EPIC (Voter ID)** or any approved photo ID (Aadhaar, Passport, DL, etc.).

**Step 4:** At the booth, get your finger inked, press the button on the **EVM** next to your candidate, and verify on the **VVPAT** slip.

**Step 5:** Your vote is done! Results are declared on counting day.`,

  register: `To register as a voter in India:

**Online Method:**
• Visit **voters.eci.gov.in**
• Click "Register as New Voter"
• Fill **Form 6** with your details
• Upload a passport-size photo and address proof
• Submit and note your reference number

**Offline Method:**
• Get Form 6 from your nearest Electoral Registration Office (ERO)
• Fill it out and submit with documents

**Eligibility:** You must be an Indian citizen and at least **18 years old** as of January 1st of the year the roll is revised.

**Tracking:** You can track your application at the same portal using your reference number.`,

  documents: `Documents needed for Voter ID (EPIC) application:

**Mandatory:**
• Passport-size photograph
• Proof of age (Birth certificate, Marksheet, Passport)
• Proof of address (Aadhaar, Utility bill, Ration card, Rent agreement)

**Accepted IDs at polling booth (any one):**
• EPIC (Voter ID Card)
• Aadhaar Card
• Passport
• Driving License
• PAN Card
• Service ID with photo (for govt employees)
• Bank/Post Office passbook with photo
• MNREGA Job Card

You do **not** need Aadhaar specifically — any one of these will work.`,

  evm: `**EVM (Electronic Voting Machine)**

Think of it as a secure digital ballot box. It has two parts:
• **Ballot Unit** — where you see candidate names and press the blue button
• **Control Unit** — operated by the presiding officer

**How it works:**
1. The officer presses a button to allow one vote
2. You press the blue button next to your candidate
3. A beep confirms your vote
4. The VVPAT prints a slip showing your choice (visible for 7 seconds)

**Security:** EVMs are standalone machines with no internet, WiFi, or Bluetooth. They cannot be hacked remotely.`,

  vvpat: `**VVPAT (Voter Verified Paper Audit Trail)**

It's a printer attached to the EVM. When you press the vote button:
1. A paper slip prints showing the candidate name and symbol
2. You can see it through a glass window for **7 seconds**
3. It drops into a sealed box

**Why it matters:** It proves your vote was recorded correctly. In case of disputes, VVPAT slips can be counted to verify EVM results.

The Supreme Court has mandated VVPAT verification in a random sample of booths.`,

  nota: `**NOTA — None Of The Above**

NOTA is the last button on every EVM. Pressing it means: "I came to vote, but I don't support any of the listed candidates."

**Key facts:**
• NOTA was introduced in **2013** after a Supreme Court ruling
• Your identity is still protected (secret ballot)
• Even if NOTA gets the most votes, the candidate with the next highest votes wins
• It's a way to officially register your protest

**It matters** because it sends a message to political parties about voter dissatisfaction.`,

  booth: `**How to find your polling booth:**

**Method 1 — Online:**
• Visit **electoralsearch.eci.gov.in**
• Search by EPIC number or by name
• Your booth address and constituency will be shown

**Method 2 — SMS:**
• Send SMS: **EPIC <your_voter_id_number>** to **1950**

**Method 3 — App:**
• Download the **Voter Helpline App** from Play Store / App Store
• Search your details

**Method 4 — Call:**
• Call the toll-free number **1950**

Do this a few days before polling day, not on the day itself!`,

  constituency: `**What is a Constituency?**

India is divided into geographic areas called constituencies:

• **Lok Sabha (Parliamentary):** 543 constituencies across India. Each elects 1 MP to the national parliament.
• **Vidhan Sabha (Assembly):** Each state is divided into assembly constituencies. Each elects 1 MLA to the state legislature.

**Your constituency** depends on your registered address. You can only vote in the constituency where your name appears in the electoral roll.

Find yours at **electoralsearch.eci.gov.in**.`,

  mcc: `**Model Code of Conduct (MCC)**

The MCC is a set of rules that comes into effect the moment elections are announced. It applies to all parties and candidates.

**Key rules:**
• No use of government resources for campaigning
• No hate speech, caste or communal appeals
• No distribution of money, liquor, or gifts to voters
• Campaign stops **48 hours** before polling
• No victory processions without permission
• Exit polls cannot be published until the last phase of voting is over

The **Election Commission of India** enforces the MCC and can take action against violators.`,

  default: `I'm currently running in offline mode, but I can still help with common questions about Indian elections!

Try asking about:
• **"How do I vote?"** — Step-by-step voting guide
• **"How to register?"** — Voter registration process
• **"What documents do I need?"** — Required IDs
• **"What is EVM?"** — Electronic Voting Machine explained
• **"What is VVPAT?"** — Paper audit trail explained
• **"What is NOTA?"** — None of the Above option
• **"Find my polling booth"** — How to locate your booth
• **"What is a constituency?"** — Parliamentary & Assembly seats
• **"What is MCC?"** — Model Code of Conduct

For more detailed or specific questions, please ensure your Gemini API key is configured correctly.`,
};

/**
 * Returns a static response based on keywords in the user query.
 * @param {string} query - The user's input message.
 * @returns {string} The matched offline response.
 */
function getOfflineResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("how") && (q.includes("vote") || q.includes("voting")))
    return OFFLINE_RESPONSES.vote;
  if (
    q.includes("register") ||
    q.includes("registration") ||
    q.includes("form 6") ||
    q.includes("nvsp")
  )
    return OFFLINE_RESPONSES.register;
  if (
    q.includes("document") ||
    q.includes("id proof") ||
    q.includes("id card") ||
    q.includes("voter id") ||
    q.includes("epic")
  )
    return OFFLINE_RESPONSES.documents;
  if (
    q.includes("evm") ||
    q.includes("voting machine") ||
    q.includes("electronic")
  )
    return OFFLINE_RESPONSES.evm;
  if (q.includes("vvpat") || q.includes("paper trail") || q.includes("audit"))
    return OFFLINE_RESPONSES.vvpat;
  if (q.includes("nota") || q.includes("none of the above"))
    return OFFLINE_RESPONSES.nota;
  if (
    q.includes("booth") ||
    q.includes("polling") ||
    q.includes("station") ||
    q.includes("where do i")
  )
    return OFFLINE_RESPONSES.booth;
  if (
    q.includes("constituency") ||
    q.includes("lok sabha") ||
    q.includes("vidhan sabha") ||
    q.includes("mla") ||
    q.includes("mp")
  )
    return OFFLINE_RESPONSES.constituency;
  if (
    q.includes("mcc") ||
    q.includes("model code") ||
    q.includes("code of conduct") ||
    q.includes("campaign")
  )
    return OFFLINE_RESPONSES.mcc;
  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("namaste") ||
    q.includes("hey")
  ) {
    return "Namaste! 🙏 I'm your Indian Election Assistant. I can help you understand voter registration, polling day procedures, EVMs, VVPAT, and much more. What would you like to know?";
  }

  return OFFLINE_RESPONSES.default;
}

/**
 * useGemini — Custom hook to manage Gemini AI chat interactions and offline fallbacks.
 * @param {ChatMessage[]} initialHistory - The initial message history for the AI context.
 * @returns {UseGeminiReturn} Hook state and methods.
 */
export function useGemini(initialHistory = []) {
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [error, setError] = useState(null);
  const chatInstance = useRef(null);
  const historyRef = useRef(initialHistory);

  useEffect(() => {
    historyRef.current = initialHistory;
  }, [initialHistory]);

  useEffect(() => {
    const initAI = async () => {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) {
        console.warn("useGemini: No API key found. Running in offline mode.");
        return;
      }

      try {
        const { GoogleGenAI } = await import("@google/genai");
        const cleanKey = API_KEY.trim();

        if (!cleanKey.startsWith("AIza")) {
          console.warn("useGemini: Invalid API key format.");
          return;
        }

        const ai = new GoogleGenAI({ apiKey: cleanKey });

        // Convert existing message history to SDK format
        const history = historyRef.current
          .filter((msg, index) => !(index === 0 && msg.sender === "bot"))
          .map((msg) => ({
            role: msg.sender === "bot" ? "model" : "user",
            parts: [{ text: msg.text }],
          }));

        chatInstance.current = ai.chats.create({
          model: "gemini-2.0-flash",
          history: history,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            maxOutputTokens: 1000,
          },
        });
        setIsOnline(true);
        console.log("useGemini: Gemini AI initialized successfully");
      } catch (err) {
        console.error("useGemini: Gemini initialization failed", err);
        setError(err.message);
      }
    };

    initAI();
  }, []);

  /**
   * Processes and sends a message to the Gemini API or retrieves an offline response.
   * @param {string} text - The raw text message from the user.
   * @returns {Promise<string>} The AI's response text.
   */
  const sendMessage = useCallback(async (text) => {
    setIsTyping(true);
    setError(null);

    try {
      if (chatInstance.current && isOnline) {
        const result = await chatInstance.current.sendMessage({
          message: text,
        });
        setIsTyping(false);
        return result.text;
      } else {
        // Offline fallback
        await new Promise((resolve) => setTimeout(resolve, 600));
        setIsTyping(false);
        return getOfflineResponse(text);
      }
    } catch (err) {
      console.error("useGemini: Send error", err);
      setError(err.message);
      setIsOnline(false);
      chatInstance.current = null;
      
      // Secondary fallback on error
      await new Promise((resolve) => setTimeout(resolve, 400));
      setIsTyping(false);
      return getOfflineResponse(text);
    }
  }, [isOnline]);

  return { sendMessage, isTyping, isOnline, error };
}
