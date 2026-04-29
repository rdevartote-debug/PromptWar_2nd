import { useState, useRef, useEffect } from "react";
import { Bot, User, Sparkles, Mic, Send } from "lucide-react";

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

// Offline fallback knowledge base for when API is unavailable
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

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Namaste! I'm your Indian Election Assistant. I can help you with registration steps, finding your polling booth, or understanding documents needed for voting. How can I help you today?",
  },
];

const QUICK_REPLIES = [
  "How do I vote in India?",
  "What documents are needed for voter ID?",
  "How do I check my polling booth?",
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("electionChatHistory");
    return saved ? JSON.parse(saved) : initialMessages;
  });
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isOnline, setIsOnline] = useState(false); // tracks if Gemini is available
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatInstance = useRef(null);
  const messageIdRef = useRef(initialMessages.length + 1);
  const initialHistoryRef = useRef(messages);
  const handleSendMessageRef = useRef(null);

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim() || isTyping) return;

    const newUserMessage = {
      id: messageIdRef.current++,
      sender: "user",
      text: text,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      let responseText;

      if (chatInstance.current && isOnline) {
        // Online mode â€” use Gemini API
        const result = await chatInstance.current.sendMessage({
          message: text,
        });
        responseText = result.text;
      } else {
        // Offline mode â€” use built-in knowledge base
        await new Promise((resolve) => setTimeout(resolve, 600)); // simulate thinking
        responseText = getOfflineResponse(text);
      }

      const newBotMessage = {
        id: messageIdRef.current++,
        sender: "bot",
        text: responseText,
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("AI Error:", error);

      // On API failure, fall back to offline response
      setIsOnline(false);
      chatInstance.current = null;

      await new Promise((resolve) => setTimeout(resolve, 400));
      const fallbackResponse = getOfflineResponse(text);

      const fallbackMessage = {
        id: messageIdRef.current++,
        sender: "bot",
        text: fallbackResponse,
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  useEffect(() => {
    const initAI = async () => {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) {
        console.warn(
          "No API key found. Running in offline mode with built-in knowledge base.",
        );
        return;
      }

      try {
        const { GoogleGenAI } = await import("@google/genai");
        const cleanKey = API_KEY.trim();

        if (!cleanKey.startsWith("AIza")) {
          console.warn(
            "API key doesn't start with 'AIza'. Running in offline mode.",
          );
          return;
        }

        const ai = new GoogleGenAI({ apiKey: cleanKey });

        // Convert existing message history to SDK format
        const history = initialHistoryRef.current
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
        console.log("✅ Gemini AI initialized successfully (online mode)");
      } catch (err) {
        console.warn("Gemini init failed, using offline mode:", err.message);
      }
    };

    initAI();
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    localStorage.setItem("electionChatHistory", JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-IN"; // Optimized for Indian English

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsRecording(false);
        // Automatically send after a short delay for better UX
        setTimeout(() => handleSendMessageRef.current?.(transcript), 500);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setInputValue("");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const renderMessageText = (text) => {
    return text.split("\n").map((line, i) => {
      // Basic markdown-like link parsing [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(
            <span key={`text-${i}-${lastIndex}`}>
              {line.substring(lastIndex, match.index)}
            </span>,
          );
        }
        parts.push(
          <a
            key={`link-${i}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {match[1]}
          </a>,
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(
          <span key={`text-${i}-end`}>{line.substring(lastIndex)}</span>,
        );
      }

      // Handle bold **text**
      const finalParts = parts.length > 0 ? parts : [line];

      return (
        <span key={i}>
          {finalParts.map((part) => {
            if (typeof part === "string") {
              const boldParts = part.split(/\*\*(.*?)\*\*/g);
              return boldParts.map((bp, bIdx) =>
                bIdx % 2 === 1 ? <strong key={bIdx}>{bp}</strong> : bp,
              );
            }
            return part;
          })}
          {i !== text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <section id="assistant" className="assistant-section py-20">
      <div className="container">
        <div className="section-header text-center mb-12">
          <div className="section-kicker">
            <Sparkles className="text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {isOnline ? "AI-Powered Assistant" : "Election Knowledge Base"}
            </span>
          </div>
          <h2 className="text-gradient">Ask the Assistant</h2>
          <p className="text-muted">
            {isOnline
              ? "Have a specific question about voting in India? Our AI is here to help 24/7."
              : "Ask common questions about Indian elections. Powered by a built-in knowledge base."}
          </p>
        </div>

        <div className="chat-container glass-panel">
          <div className="chat-aura chat-aura-1"></div>
          <div className="chat-aura chat-aura-2"></div>
          <div
            className="chat-messages"
            ref={chatContainerRef}
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === "bot" ? (
                    <Bot size={20} />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="message-content">
                  {msg.sender === "bot"
                    ? renderMessageText(msg.text)
                    : msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot typing">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <div className="quick-replies">
              {QUICK_REPLIES.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleSendMessage(reply)}
                  disabled={isTyping}
                >
                  {reply}
                </button>
              ))}
            </div>

            <form
              className="chat-input-area"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isRecording
                    ? "Listening..."
                    : "E.g., What is the Model Code of Conduct?"
                }
                className="chat-input"
                disabled={isRecording || isTyping}
              />
              <button
                type="button"
                className={`btn btn-icon mic-btn ${isRecording ? "recording" : ""}`}
                onClick={toggleRecording}
                disabled={isTyping}
                title="Voice Input"
                aria-label="Toggle voice input"
              >
                <Mic
                  size={24}
                  strokeWidth={isRecording ? 3 : 2}
                  aria-hidden="true"
                />
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-icon send-btn"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={20} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
