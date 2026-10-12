"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const QUICK_PROMPTS = [
  "What is the procedure for Traditional Council appeals?",
  "Draft a formal Notice of Hearing sitting for a stool dispute.",
  "What constitute grounds for a chieftaincy gazette challenge?",
  "How do we record sitting minutes under Act 759?",
];

export default function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        "Greetings. I am the **VRHC Registry & Judicial Assistant**. How may I assist you with case intake, chieftaincy procedures under Act 759, or sitting preparations today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const payload = newHistory
        .filter((m) => m.id !== "intro")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to contact AI assistant");
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I could not formulate a response. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: `⚠️ ${errorMessage}. Please check your connection or try again.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="vrhc-ai-launcher"
        type="button"
        className={`ai-fab ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle VRHC AI Assistant"
        title="Ask VRHC Registry AI"
      >
        <span className="ai-fab-icon">{isOpen ? "✕" : "✨"}</span>
        <span className="ai-fab-label">VRHC AI</span>
        {!isOpen && hasUnread && <span className="ai-fab-badge" />}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <aside className="ai-chat-window" aria-label="VRHC AI Assistant Chat">
          {/* Header */}
          <div className="ai-chat-head">
            <div className="ai-chat-head-info">
              <div className="ai-chat-avatar">⚖️</div>
              <div>
                <div className="ai-chat-title">
                  VRHC Judicial Assistant
                  <span className="ai-online-dot" title="Online" />
                </div>
                <div className="ai-chat-sub">Act 759 & Registry Guide · Powered by Gemini</div>
              </div>
            </div>
            <button
              type="button"
              className="ai-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div className="ai-chat-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`ai-msg-bubble ${m.role === "user" ? "user-bubble" : "bot-bubble"}`}
              >
                <div className="ai-msg-content">
                  {m.content.split("\n").map((line, i) => (
                    <p key={i} style={{ margin: "4px 0" }}>
                      {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </p>
                  ))}
                </div>
                <span className="ai-msg-time">{m.time}</span>
              </div>
            ))}

            {isLoading && (
              <div className="ai-msg-bubble bot-bubble">
                <div className="ai-typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="ai-msg-time">Consulting VRHC records…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="ai-quick-prompts">
              <span className="ai-quick-label">Suggested Inquiries:</span>
              <div className="ai-quick-scroll">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="ai-prompt-chip"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input */}
          <form
            className="ai-chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              id="ai-chat-text-input"
              type="text"
              className="ai-chat-input"
              placeholder="Ask anything about chieftaincy cases, filings, or Act 759..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              id="ai-chat-send-btn"
              type="submit"
              className="ai-chat-send"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
