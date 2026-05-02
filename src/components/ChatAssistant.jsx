import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Bot, User, Sparkles, Mic, Send } from "lucide-react";
import { useGemini } from "../hooks/useGemini";

import { CHAT_INITIAL_MESSAGES as initialMessages, CHAT_QUICK_REPLIES as QUICK_REPLIES } from "../constants/electionData";


/**
 * ChatAssistant — A Gemini-powered AI chatbot (with offline fallback)
 * that answers voter queries about the Indian election process.
 * @returns {JSX.Element} The chat assistant section.
 */
export default function ChatAssistant() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("electionChatHistory");
    return saved ? JSON.parse(saved) : initialMessages;
  });
  const [inputValue, setInputValue] = useState("");

  /**
   * Sanitizes user input by stripping HTML tags and script elements.
   * @param {string} input - The raw input string.
   * @returns {string} The sanitized string.
   */
  const sanitizeInput = (input) => {
    if (typeof input !== "string") return input;
    return input.replace(/<[^>]*>?/gm, "").trim();
  };

  const { sendMessage, isTyping, isOnline } = useGemini(messages);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageIdRef = useRef(messages.length + 1);
  const handleSendMessageRef = useRef(null);

  /**
   * Processes and sends a message to either Gemini AI or the offline fallback.
   * @param {string} text - The message text to send.
   */
  const handleSendMessage = async (text = inputValue) => {
    const sanitizedText = sanitizeInput(text);
    if (!sanitizedText || isTyping) return;

    const newUserMessage = {
      id: messageIdRef.current++,
      sender: "user",
      text: sanitizedText,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    const responseText = await sendMessage(sanitizedText);

    const newBotMessage = {
      id: messageIdRef.current++,
      sender: "bot",
      text: responseText,
    };

    setMessages((prev) => [...prev, newBotMessage]);
  };

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  /** Scrolls the chat container to the bottom. */
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
        console.error("ChatAssistant: Speech recognition error", event.error);
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

  /** Toggles the voice input recording state. */
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

  /**
   * Renders message text with support for bold formatting and links.
   * @param {string} text - The raw message text.
   * @returns {JSX.Element[]} Array of span/anchor elements.
   */
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

ChatAssistant.propTypes = {};
