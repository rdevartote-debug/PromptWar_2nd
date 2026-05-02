/** 
 * electionData.js
 * Contains all static text data for the IndiaVoteAssist application.
 */

/** @constant {object[]} Data for the ELI15 (Explain Like I'm 15) dictionary. */
export const ELI15_TERMS = [
  {
    id: "evm",
    term: "EVM (Electronic Voting Machine)",
    iconName: "Cpu",
    simpleExplanation:
      "Think of it like a giant, super-secure calculator. Instead of adding numbers, it adds up votes. You press a blue button next to the candidate you like, and the machine safely stores your vote.",
    whyImportant: "It stops invalid votes and makes counting much faster.",
  },
  {
    id: "vvpat",
    term: "VVPAT (Voter Verified Paper Audit Trail)",
    iconName: "FileText",
    simpleExplanation:
      "It's like a receipt printer attached to the EVM. When you press the button to vote, this machine prints a small slip of paper showing who you voted for. You can see it through a glass window for 7 seconds before it drops into a sealed box.",
    whyImportant:
      "It proves to you that the machine recorded your vote correctly.",
  },
  {
    id: "constituency",
    term: "Constituency",
    iconName: "MapIcon",
    simpleExplanation:
      "Imagine your school dividing everyone into smaller groups or 'houses' to elect a house captain. A constituency is just a specific area (like a group of neighborhoods) that gets to elect one person to represent them in the government.",
    whyImportant:
      "It ensures every part of the country has a voice in the parliament or state assembly.",
  },
  {
    id: "nota",
    term: "NOTA (None Of The Above)",
    iconName: "XCircle",
    simpleExplanation:
      "It's a button at the very bottom of the EVM. Pressing it means 'I don't think any of the candidates listed are good enough.' It's a way to officially register your protest.",
    whyImportant:
      "It gives voters a voice even when they don't support any candidate.",
  },
];

/** @constant {object[]} The base timeline events for the election process. */
export const TIMELINE_BASE_EVENTS = [
  {
    id: 1,
    title: "Announcement of Elections",
    date: "Phase 1",
    description:
      "The Election Commission announces the schedule. The Model Code of Conduct (MCC) comes into immediate effect.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Nomination Filing",
    date: "Phase 2",
    description:
      "Candidates file their nomination papers with the Returning Officer. After scrutiny, candidates can withdraw.",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Campaign Period",
    date: "Phase 3",
    description:
      "Political parties and candidates campaign through public meetings, rallies, and media. Ends 48 hours before polling.",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Polling Dates",
    date: "Phase 4",
    description:
      "Voting takes place across different regions (often in multiple phases for general elections). EVMs and VVPATs are used.",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Counting & Results",
    date: "Final Phase",
    description:
      "Votes are counted on a designated day under heavy security, and the results are officially declared by the ECI.",
    status: "upcoming",
  },
];

/** @constant {object} Map of state-specific election dates for demonstration. */
export const STATE_ELECTION_DATES = {
  "Maharashtra": ["March 15, 2026", "April 2, 2026", "April 3 - April 17, 2026", "April 19, 2026", "May 23, 2026"],
  "Tamil Nadu": ["March 15, 2026", "March 25, 2026", "March 26 - April 10, 2026", "April 12, 2026", "May 23, 2026"],
  "Uttar Pradesh": ["March 15, 2026", "April 10, 2026", "April 11 - May 5, 2026", "May 7 (Phase 1)", "May 23, 2026"],
  "Karnataka": ["March 15, 2026", "April 5, 2026", "April 6 - April 24, 2026", "April 26, 2026", "May 23, 2026"],
  "West Bengal": ["March 15, 2026", "April 12, 2026", "April 13 - May 10, 2026", "May 12 (Phase 1)", "May 23, 2026"],
  "Bihar": ["March 15, 2026", "April 8, 2026", "April 9 - May 5, 2026", "May 7 (Phase 1)", "May 23, 2026"],
  "Delhi": ["March 15, 2026", "May 1, 2026", "May 2 - May 15, 2026", "May 17, 2026", "May 23, 2026"],
  "Generic": ["March 15, 2026", "April 15, 2026", "April 16 - May 10, 2026", "May 12, 2026", "May 23, 2026"],
  "Fallback": ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Final Phase"]
};

/** @constant {object[]} Initial greeting messages for the chat. */
export const CHAT_INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "Namaste! I'm your Indian Election Assistant. I can help you with registration steps, finding your polling booth, or understanding documents needed for voting. How can I help you today?",
  },
];

/** @constant {string[]} Quick reply suggestions for the user. */
export const CHAT_QUICK_REPLIES = [
  "How do I vote in India?",
  "What documents are needed for voter ID?",
  "How do I check my polling booth?",
];
