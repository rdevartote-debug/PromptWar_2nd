import React, { useState, useRef, useEffect } from 'react';
import { Globe, Calendar, CheckCircle2, Clock, BookOpen, Cpu, FileText, Map as MapIcon, XCircle, Search, MapPin, Phone, ExternalLink, Send, Bot, User, Sparkles, Mic, CreditCard, CheckCircle, UserPlus, Map, Vote, BarChart, ChevronRight, ChevronLeft } from 'lucide-react';
import './index.css';

// ========== Header.jsx ==========
function Header() {
  return (
    <header className="header glass-panel">
      <div className="container header-container">
        <div className="logo">
          <div className="logo-icon">🇮🇳</div>
          <span className="logo-text">India<span className="text-gradient">VoteAssist</span></span>
        </div>
        <nav className="nav-links">
          <div className="language-selector">
            <Globe size={18} className="text-muted" />
            <select className="language-select">
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>
          <a href="#journey">Journey</a>
          <a href="#eli15">Learn</a>
          <a href="#assistant" className="btn btn-primary btn-sm">Ask Assistant</a>
        </nav>
      </div>
    </header>
  );
}

// ========== Hero.jsx ==========
function Hero({ userProfile }) {
  let welcomeTitle = "Making a Difference";
  let welcomeMessage = "Navigate the election process with ease. Understand the timeline, learn the steps to vote, and ask our AI assistant any questions you have.";

  if (userProfile) {
    if (userProfile.age === '18-21') {
      welcomeTitle = "Your First Election";
      welcomeMessage = "Welcome to your first election! Let's get you registered and ready to make your voice heard.";
    } else if (userProfile.age === 'under18') {
      welcomeTitle = "Future Voter";
      welcomeMessage = "Welcome future voter! Let's learn about the democratic process so you're ready when your time comes.";
    } else if (userProfile.age === 'over21') {
      welcomeTitle = "Making a Difference";
      welcomeMessage = "Welcome back! Let's get you ready for election day and ensure your voter details are up to date.";
    }
  }

  return (
    <section className="hero">
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="badge">2026 Elections</div>
          <h1>Your Guide to <span className="text-gradient">{welcomeTitle}</span></h1>
          <p className="hero-subtitle">
            {welcomeMessage}
          </p>
          <div className="hero-actions">
            <a href="#journey" className="btn btn-primary">Start the Guide</a>
            <a href="#timeline" className="btn btn-secondary">View Timeline</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
          <div className="glass-panel stat-card card-1">
            <span className="stat-number">4</span>
            <span className="stat-label">Simple Steps</span>
          </div>
          <div className="glass-panel stat-card card-2">
            <span className="stat-number">24/7</span>
            <span className="stat-label">AI Assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== Timeline.jsx ==========
const timelineEvents = [
  {
    id: 1,
    title: 'Announcement of Elections',
    date: 'Phase 1',
    description: 'The Election Commission announces the schedule. The Model Code of Conduct (MCC) comes into immediate effect.',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Nomination Filing',
    date: 'Phase 2',
    description: 'Candidates file their nomination papers with the Returning Officer. After scrutiny, candidates can withdraw.',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Campaign Period',
    date: 'Phase 3',
    description: 'Political parties and candidates campaign through public meetings, rallies, and media. Ends 48 hours before polling.',
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Polling Dates',
    date: 'Phase 4',
    description: 'Voting takes place across different regions (often in multiple phases for general elections). EVMs and VVPATs are used.',
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Counting & Results',
    date: 'Final Phase',
    description: 'Votes are counted on a designated day under heavy security, and the results are officially declared by the ECI.',
    status: 'upcoming'
  }
];

function Timeline({ userProfile }) {
  const [activeEvent, setActiveEvent] = useState(null);

  // Helper function to get mock dates based on state
  const getStateDates = (state) => {
    // Return specific mock dates for demonstration purposes
    if (state === 'Maharashtra') {
      return ['March 15, 2026', 'April 2, 2026', 'April 3 - April 17, 2026', 'April 19, 2026', 'May 23, 2026'];
    } else if (state === 'Tamil Nadu') {
      return ['March 15, 2026', 'March 25, 2026', 'March 26 - April 10, 2026', 'April 12, 2026', 'May 23, 2026'];
    } else if (state === 'Uttar Pradesh') {
      return ['March 15, 2026', 'April 10, 2026', 'April 11 - May 5, 2026', 'May 7 (Phase 1)', 'May 23, 2026'];
    } else if (state === 'Karnataka') {
      return ['March 15, 2026', 'April 5, 2026', 'April 6 - April 24, 2026', 'April 26, 2026', 'May 23, 2026'];
    } else if (state === 'West Bengal') {
      return ['March 15, 2026', 'April 12, 2026', 'April 13 - May 10, 2026', 'May 12 (Phase 1)', 'May 23, 2026'];
    } else if (state === 'Bihar') {
      return ['March 15, 2026', 'April 8, 2026', 'April 9 - May 5, 2026', 'May 7 (Phase 1)', 'May 23, 2026'];
    } else if (state === 'Delhi') {
      return ['March 15, 2026', 'May 1, 2026', 'May 2 - May 15, 2026', 'May 17, 2026', 'May 23, 2026'];
    } else if (state) {
      // Generic specific dates for other selected states
      return ['March 15, 2026', 'April 15, 2026', 'April 16 - May 10, 2026', 'May 12, 2026', 'May 23, 2026'];
    }
    // Fallback if no state selected
    return ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Final Phase'];
  };

  const dates = getStateDates(userProfile?.state);
  const now = new Date();

  const personalizedEvents = timelineEvents.map((event, index) => {
    const dateStr = dates[index];
    let status = 'upcoming';

    // Simple parsing for mock dates
    try {
      const eventDate = new Date(dateStr);
      if (!isNaN(eventDate.getTime())) {
        status = eventDate < now ? 'past' : 'upcoming';
      } else if (dateStr.includes('Phase')) {
        // Fallback for non-specific dates
        status = 'upcoming';
      }
    } catch {
      status = 'upcoming';
    }

    return {
      ...event,
      date: dateStr,
      status: status
    };
  });

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <div className="section-header">
          <h2>Election <span className="text-gradient">Timeline</span></h2>
          <p className="text-muted">
            {userProfile?.state
              ? `Here are the critical dates for ${userProfile.state}.`
              : 'Stay on top of critical dates to ensure your voice is heard.'}
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {personalizedEvents.map((event, index) => (
            <div
              key={event.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${activeEvent === event.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveEvent(event.id)}
              onMouseLeave={() => setActiveEvent(null)}
            >
              <div className="timeline-dot">
                <Calendar size={16} />
              </div>

              <div className="timeline-content glass-panel">
                <div className="timeline-date">{event.date}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className={`status-badge ${event.status}`}>
                  {event.status === 'past' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                  <span>{event.status === 'past' ? 'Completed' : 'Upcoming'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const JOURNEY_STEPS = [
  {
    id: 1,
    title: "Eligibility",
    icon: <CheckCircle />,
    description: "To vote in India, you must be a citizen of India and 18 years of age or older as of January 1st of the year the electoral roll is revised.",
    action: "Check your age and citizenship status."
  },
  {
    id: 2,
    title: "Voter Registration",
    icon: <UserPlus />,
    description: "Register online via the National Voters' Service Portal (NVSP) or Voter Portal using Form 6.",
    action: "Visit voters.eci.gov.in to apply."
  },
  {
    id: 3,
    title: "Voter ID (EPIC)",
    icon: <CreditCard />,
    description: "Once registered, your Electors Photo Identity Card (EPIC) will be mailed to you. You can also download the digital version (e-EPIC).",
    action: "Track your application status online."
  },
  {
    id: 4,
    title: "Electoral Roll",
    icon: <Search />,
    description: "Before voting day, verify your name in the electoral roll (voter list) of your constituency. Even with an EPIC, you can only vote if your name is on the list.",
    action: "Search your name in the ECI Voter List."
  },
  {
    id: 5,
    title: "Constituencies",
    icon: <Map />,
    description: "India is divided into constituencies for Lok Sabha (national) and Vidhan Sabha (state). You will vote for a representative for your specific area.",
    action: "Find out your Parliamentary & Assembly constituencies."
  },
  {
    id: 6,
    title: "Polling Day",
    icon: <Vote />,
    description: "Go to your designated polling booth. Press the button against the candidate of your choice on the Electronic Voting Machine (EVM) and check the VVPAT slip.",
    action: "Carry your EPIC or other approved ID."
  },
  {
    id: 7,
    title: "Vote Counting",
    icon: <BarChart />,
    description: "Votes are counted under strict security on a designated day. The candidate with the most votes in the constituency wins.",
    action: "Follow the election results on ECI website or news."
  }
];

function GuidedJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < JOURNEY_STEPS.length - 1) setActiveStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  return (
    <section className="guided-journey-section py-20" id="journey">
      <div className="container">
        <div className="section-header text-center mb-12">
          <h2 className="text-gradient">Your Election Journey</h2>
          <p className="text-muted">A step-by-step guide from registration to result day.</p>
        </div>

        <div className="journey-layout">
          {/* Tracker Map */}
          <div className="journey-tracker">
            <div className="tracker-line"></div>
            {JOURNEY_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`tracker-node ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <div className="node-icon">{step.icon}</div>
                <div className="node-label">Step {step.id}</div>
              </div>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="journey-content glass-panel">
            <div className="step-badge">Step {JOURNEY_STEPS[activeStep].id} of {JOURNEY_STEPS.length}</div>

            <div className="step-header">
              <div className="step-icon-large text-gradient">
                {JOURNEY_STEPS[activeStep].icon}
              </div>
              <h3 className="step-title">{JOURNEY_STEPS[activeStep].title}</h3>
            </div>

            <p className="step-description">{JOURNEY_STEPS[activeStep].description}</p>

            <div className="step-action">
              <strong>Tip:</strong> {JOURNEY_STEPS[activeStep].action}
            </div>

            <div className="step-controls">
              <button
                className="btn btn-secondary"
                onClick={prevStep}
                disabled={activeStep === 0}
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={nextStep}
                disabled={activeStep === JOURNEY_STEPS.length - 1}
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== ELI15.jsx ==========
const ELI15_TERMS = [
  {
    id: 'evm',
    term: 'EVM (Electronic Voting Machine)',
    icon: <Cpu />,
    simpleExplanation: "Think of it like a giant, super-secure calculator. Instead of adding numbers, it adds up votes. You press a blue button next to the candidate you like, and the machine safely stores your vote.",
    whyImportant: "It stops invalid votes and makes counting much faster."
  },
  {
    id: 'vvpat',
    term: 'VVPAT (Voter Verified Paper Audit Trail)',
    icon: <FileText />,
    simpleExplanation: "It's like a receipt printer attached to the EVM. When you press the button to vote, this machine prints a small slip of paper showing who you voted for. You can see it through a glass window for 7 seconds before it drops into a sealed box.",
    whyImportant: "It proves to you that the machine recorded your vote correctly."
  },
  {
    id: 'constituency',
    term: 'Constituency',
    icon: <MapIcon />,
    simpleExplanation: "Imagine your school dividing everyone into smaller groups or 'houses' to elect a house captain. A constituency is just a specific area (like a group of neighborhoods) that gets to elect one person to represent them in the government.",
    whyImportant: "It ensures every part of the country has a voice in the parliament or state assembly."
  },
  {
    id: 'nota',
    term: 'NOTA (None Of The Above)',
    icon: <XCircle />,
    simpleExplanation: "It's a button at the very bottom of the EVM. Pressing it means 'I don't think any of the candidates listed are good enough.' It's a way to officially register your protest.",
    whyImportant: "It gives voters a voice even when they don't support any candidate."
  }
];

function ELI15() {
  const [activeTerm, setActiveTerm] = useState(ELI15_TERMS[0].id);

  return (
    <section className="eli15-section py-20" id="eli15">
      <div className="container">
        <div className="section-header text-center mb-12">
          <div className="section-kicker">
            <BookOpen className="text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Explain Like I'm 15</span>
          </div>
          <h2 className="text-gradient">Election Terms Simplified</h2>
          <p className="text-muted">No jargon. Just simple explanations of important voting concepts.</p>
        </div>

        <div className="eli15-grid">
          <div className="terms-list">
            {ELI15_TERMS.map(term => (
              <button
                key={term.id}
                className={`term-btn ${activeTerm === term.id ? 'active' : ''}`}
                onClick={() => setActiveTerm(term.id)}
              >
                <span className="term-icon">{term.icon}</span>
                <span className="term-name">{term.term}</span>
              </button>
            ))}
          </div>

          <div className="term-explanation glass-panel">
            {ELI15_TERMS.map(term => (
              <div
                key={term.id}
                className={`explanation-content animate-fade-in ${activeTerm === term.id ? 'block' : 'hidden'}`}
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

// ========== PollingInfo.jsx ==========
function PollingInfo() {
  return (
    <section className="polling-info-section py-20" id="polling-info">
      <div className="container">
        <div className="glass-panel polling-info-card">
          <div className="section-header polling-info-header">
            <div className="polling-info-icon">
              <MapPin size={48} className="text-primary" />
            </div>
            <h2>Find Your Polling Booth</h2>
            <p className="text-muted polling-info-copy">
              The Election Commission of India provides multiple ways to find your constituency and exact polling booth location. Do this a few days before the election.
            </p>
          </div>

          <div className="info-options">
            <div className="info-option-card">
              <Search className="option-icon" />
              <h3>Online Search</h3>
              <p>Visit the official ECI Electoral Search portal to find your details using your EPIC number.</p>
              <a
                href="https://electoralsearch.eci.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Search Online <ExternalLink size={16} />
              </a>
            </div>

            <div className="info-option-card">
              <Phone className="option-icon" />
              <h3>Voter Helpline</h3>
              <p>Call the toll-free national voter helpline for assistance or use the Voter Helpline App.</p>
              <a href="tel:1950" className="btn btn-secondary">
                Call 1950
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== AssistantChat.jsx ==========
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

For more detailed or specific questions, please ensure your Gemini API key is configured correctly.`
};

function getOfflineResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('how') && (q.includes('vote') || q.includes('voting'))) return OFFLINE_RESPONSES.vote;
  if (q.includes('register') || q.includes('registration') || q.includes('form 6') || q.includes('nvsp')) return OFFLINE_RESPONSES.register;
  if (q.includes('document') || q.includes('id proof') || q.includes('id card') || q.includes('voter id') || q.includes('epic')) return OFFLINE_RESPONSES.documents;
  if (q.includes('evm') || q.includes('voting machine') || q.includes('electronic')) return OFFLINE_RESPONSES.evm;
  if (q.includes('vvpat') || q.includes('paper trail') || q.includes('audit')) return OFFLINE_RESPONSES.vvpat;
  if (q.includes('nota') || q.includes('none of the above')) return OFFLINE_RESPONSES.nota;
  if (q.includes('booth') || q.includes('polling') || q.includes('station') || q.includes('where do i')) return OFFLINE_RESPONSES.booth;
  if (q.includes('constituency') || q.includes('lok sabha') || q.includes('vidhan sabha') || q.includes('mla') || q.includes('mp')) return OFFLINE_RESPONSES.constituency;
  if (q.includes('mcc') || q.includes('model code') || q.includes('code of conduct') || q.includes('campaign')) return OFFLINE_RESPONSES.mcc;
  if (q.includes('hello') || q.includes('hi') || q.includes('namaste') || q.includes('hey')) {
    return "Namaste! 🙏 I'm your Indian Election Assistant. I can help you understand voter registration, polling day procedures, EVMs, VVPAT, and much more. What would you like to know?";
  }

  return OFFLINE_RESPONSES.default;
}

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: "Namaste! I'm your Indian Election Assistant. I can help you with registration steps, finding your polling booth, or understanding documents needed for voting. How can I help you today?"
  }
];

const QUICK_REPLIES = [
  "How do I vote in India?",
  "What documents are needed for voter ID?",
  "How do I check my polling booth?"
];

function AssistantChat() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('electionChatHistory');
    return saved ? JSON.parse(saved) : initialMessages;
  });
  const [inputValue, setInputValue] = useState('');
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
      sender: 'user',
      text: text
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let responseText;

      if (chatInstance.current && isOnline) {
        // Online mode â€” use Gemini API
        const result = await chatInstance.current.sendMessage({
          message: text
        });
        responseText = result.text;
      } else {
        // Offline mode â€” use built-in knowledge base
        await new Promise(resolve => setTimeout(resolve, 600)); // simulate thinking
        responseText = getOfflineResponse(text);
      }

      const newBotMessage = {
        id: messageIdRef.current++,
        sender: 'bot',
        text: responseText
      };

      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error("AI Error:", error);

      // On API failure, fall back to offline response
      setIsOnline(false);
      chatInstance.current = null;

      await new Promise(resolve => setTimeout(resolve, 400));
      const fallbackResponse = getOfflineResponse(text);

      const fallbackMessage = {
        id: messageIdRef.current++,
        sender: 'bot',
        text: fallbackResponse
      };
      setMessages(prev => [...prev, fallbackMessage]);
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
        console.warn("No API key found. Running in offline mode with built-in knowledge base.");
        return;
      }

      try {
        const { GoogleGenAI } = await import("@google/genai");
        const cleanKey = API_KEY.trim();

        if (!cleanKey.startsWith('AIza')) {
          console.warn("API key doesn't start with 'AIza'. Running in offline mode.");
          return;
        }

        const ai = new GoogleGenAI({ apiKey: cleanKey });

        // Convert existing message history to SDK format
        const history = initialHistoryRef.current
          .filter((msg, index) => !(index === 0 && msg.sender === 'bot'))
          .map(msg => ({
            role: msg.sender === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
          }));

        chatInstance.current = ai.chats.create({
          model: "gemini-2.0-flash",
          history: history,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            maxOutputTokens: 1000,
          }
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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    localStorage.setItem('electionChatHistory', JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Optimized for Indian English

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsRecording(false);
        // Automatically send after a short delay for better UX
        setTimeout(() => handleSendMessageRef.current?.(transcript), 500);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
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
      setInputValue('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const renderMessageText = (text) => {
    return text.split('\n').map((line, i) => {
      // Basic markdown-like link parsing [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(<span key={`text-${i}-${lastIndex}`}>{line.substring(lastIndex, match.index)}</span>);
        }
        parts.push(
          <a key={`link-${i}-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(<span key={`text-${i}-end`}>{line.substring(lastIndex)}</span>);
      }

      // Handle bold **text**
      const finalParts = parts.length > 0 ? parts : [line];

      return (
        <span key={i}>
          {finalParts.map((part) => {
            if (typeof part === 'string') {
              const boldParts = part.split(/\*\*(.*?)\*\*/g);
              return boldParts.map((bp, bIdx) =>
                bIdx % 2 === 1 ? <strong key={bIdx}>{bp}</strong> : bp
              );
            }
            return part;
          })}
          {i !== text.split('\n').length - 1 && <br />}
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
              {isOnline ? 'AI-Powered Assistant' : 'Election Knowledge Base'}
            </span>
          </div>
          <h2 className="text-gradient">Ask the Assistant</h2>
          <p className="text-muted">
            {isOnline
              ? "Have a specific question about voting in India? Our AI is here to help 24/7."
              : "Ask common questions about Indian elections. Powered by a built-in knowledge base."
            }
          </p>
        </div>

        <div className="chat-container glass-panel">
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-content">
                  {msg.sender === 'bot' ? renderMessageText(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot typing">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-content typing-indicator">
                  <span></span><span></span><span></span>
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

            <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRecording ? "Listening..." : "E.g., What is the Model Code of Conduct?"}
                className="chat-input"
                disabled={isRecording || isTyping}
              />
              <button
                type="button"
                className={`btn btn-icon mic-btn ${isRecording ? 'recording' : ''}`}
                onClick={toggleRecording}
                disabled={isTyping}
                title="Voice Input"
              >
                <Mic size={24} strokeWidth={isRecording ? 3 : 2} />
              </button>
              <button type="submit" className="btn btn-primary btn-icon send-btn" disabled={!inputValue.trim() || isTyping}>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== PersonalizedGuidance.jsx ==========
const STATES = [
  // 28 States
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  // 8 Union Territories
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

function PersonalizedGuidance({ onComplete }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: '',
    state: '',
    hasVoterId: null
  });

  const handleNext = () => setStep(prev => prev + 1);

  const finishOnboarding = () => {
    onComplete(profile);
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal glass-panel animate-fade-in">
        <div className="onboarding-progress">
          <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        <div className="onboarding-header">
          <h2>Welcome to your Election Guide</h2>
          <p>Let's personalize your experience</p>
        </div>

        <div className="onboarding-body">
          {step === 1 && (
            <div className="step-content animate-fade-in">
              <User className="step-icon" size={48} />
              <h3>How old are you?</h3>
              <div className="options-grid">
                <button
                  className={`option-card ${profile.age === 'under18' ? 'selected' : ''}`}
                  onClick={() => { setProfile({ ...profile, age: 'under18' }); handleNext(); }}
                >
                  Under 18
                  <span>Future voter</span>
                </button>
                <button
                  className={`option-card ${profile.age === '18-21' ? 'selected' : ''}`}
                  onClick={() => { setProfile({ ...profile, age: '18-21' }); handleNext(); }}
                >
                  18-21
                  <span>First-time voter! 🎉</span>
                </button>
                <button
                  className={`option-card ${profile.age === 'over21' ? 'selected' : ''}`}
                  onClick={() => { setProfile({ ...profile, age: 'over21' }); handleNext(); }}
                >
                  Over 21
                  <span>Experienced voter</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-fade-in">
              <MapPin className="step-icon" size={48} />
              <h3>Where do you live?</h3>
              <p className="subtitle">We'll show you specific instructions for your state</p>
              <select
                className="state-select"
                value={profile.state}
                onChange={(e) => {
                  setProfile({ ...profile, state: e.target.value });
                  setTimeout(handleNext, 300); // Slight delay for UX
                }}
              >
                <option value="">Select your state</option>
                {STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="step-content animate-fade-in">
              <CreditCard className="step-icon" size={48} />
              <h3>Do you have a Voter ID (EPIC)?</h3>
              <div className="options-grid">
                <button
                  className={`option-card ${profile.hasVoterId === true ? 'selected' : ''}`}
                  onClick={() => { setProfile({ ...profile, hasVoterId: true }); handleNext(); }}
                >
                  Yes, I have it
                </button>
                <button
                  className={`option-card ${profile.hasVoterId === false ? 'selected' : ''}`}
                  onClick={() => { setProfile({ ...profile, hasVoterId: false }); handleNext(); }}
                >
                  No, I need to apply
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content text-center animate-fade-in">
              <CheckCircle2 className="step-icon text-success" size={64} />
              <h3>All set!</h3>
              <p>We've customized your guide based on your profile.</p>
              {profile.state && <p className="profile-summary">Region: {profile.state}</p>}
              {profile.age === '18-21' && <p className="profile-summary">Focus: First-Time Voter Guide</p>}
              {profile.hasVoterId === false && <p className="profile-summary">Priority: Voter ID Application</p>}

              <button className="btn btn-primary onboarding-cta" onClick={finishOnboarding}>
                Go to Dashboard
              </button>

              <div className="onboarding-actions">
                {profile.hasVoterId === false && (
                  <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="action-link">
                    Apply for Voter ID (Form 6) →
                  </a>
                )}
                {profile.age === '18-21' && (
                  <a href="https://www.eci.gov.in/voter/voter-education/" target="_blank" rel="noopener noreferrer" className="action-link">
                    First-Time Voter Guide →
                  </a>
                )}
                <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="action-link">
                  Search Name in Voter List →
                </a>
              </div>
            </div>
          )}
        </div>

        {step > 1 && step < 4 && (
          <div className="onboarding-footer">
            <button className="btn-text" onClick={() => setStep(prev => prev - 1)}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}


// ========== App.jsx ==========
function App() {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('voterProfile_v2');
    return saved ? JSON.parse(saved) : null;
  });

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('voterProfile_v2', JSON.stringify(profile));
    window.scrollTo(0, 0);
  };


  return (
    <>
      <Header />
      {!userProfile && <PersonalizedGuidance onComplete={handleOnboardingComplete} />}

      <main className="app-shell" style={{ filter: !userProfile ? 'blur(4px)' : 'none', transition: 'filter 0.3s ease' }}>
        <Hero userProfile={userProfile} />
        <Timeline userProfile={userProfile} />
        <GuidedJourney />
        <ELI15 />
        <PollingInfo />
        <AssistantChat />
      </main>


      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2026 Election Assistant. Built for educational purposes.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
