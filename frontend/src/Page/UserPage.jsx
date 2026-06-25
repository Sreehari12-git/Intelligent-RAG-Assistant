import { useState, useRef, useEffect } from "react";
import { askQuestion, getChatHistory } from "../api/chat";
import { useNavigate } from "react-router-dom";
import { getMe, logout } from "../api/auth";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = ["Summarise this document", "Key takeaways?", "Compare Q2 vs Q3"];

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function UserPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your Gnapi Assistant. Ask me anything about your documents.", time: formatTime() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem("deviceId", deviceId);
    }
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const deviceId = localStorage.getItem("deviceId");
      if (!deviceId) return;
      const history = await getChatHistory(deviceId);
      if (history.length > 0) {
        const formatted = history.flatMap((item) => [
          { role: "user", text: item.question, time: formatTime() },
          { role: "bot", text: item.answer, time: formatTime() },
        ]);
        setMessages(formatted);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const data = await getMe();
      if (data) setUser(data);
    };
    checkUser();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      navigate("/chat");
    }
  };

  const handleCancel = () => {
    setLoading(false);
    setMessages((prev) => prev.slice(0, -1));
  };

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;
    const deviceId = localStorage.getItem("deviceId");
    const userMessage = { role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const answer = await askQuestion({ question: text, deviceId });
      setMessages((prev) => [...prev, { role: "bot", text: answer, time: formatTime() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Please try again.", time: formatTime() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "U";

  return (
    <div className="flex flex-col h-screen bg-[#0F0E1A]">

      <header className="bg-[#1A1830] border-b border-[#2A2740] px-5 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6C5CE7] flex items-center justify-center text-white text-xs font-medium tracking-wide select-none flex-shrink-0">
            GA
          </div>
          <div>
            <p className="text-sm font-medium text-[#E8E6FF] leading-tight">Gnapi Assistant</p>
            <p className="text-xs text-[#6B6A8A] flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Online · Ready to help
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-[#252340] border border-[#3D3860] rounded-full py-1 pl-1.5 pr-3">
                <div className="w-6 h-6 rounded-full bg-[#6C5CE7] text-white text-[10px] font-medium flex items-center justify-center">
                  {initials}
                </div>
                <span className="text-xs font-medium text-[#A89FE8]">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-[#6B6A8A] px-3 py-1.5 rounded-lg border border-[#2A2740] bg-[#1A1830] hover:bg-[#252340] hover:text-[#A89FE8] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-white bg-[#6C5CE7] hover:bg-[#5A4DD4] px-4 py-1.5 rounded-lg transition-colors"
            >
              Sign in as Admin
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-medium flex-shrink-0 ${
                msg.role === "bot"
                  ? "bg-[#6C5CE7] text-white"
                  : "bg-[#252340] text-[#A89FE8]"
              }`}
            >
              {msg.role === "bot" ? "GA" : initials}
            </div>

            <div className={`flex flex-col gap-1 max-w-[70%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#6C5CE7] text-white rounded-2xl rounded-br-[4px]"
                    : "bg-[#1E1C35] text-[#D8D5F5] border border-[#2A2740] rounded-2xl rounded-bl-[4px]"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              {msg.time && (
                <span className="text-[10.5px] text-[#3D3860] px-1">{msg.time}</span>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6C5CE7] flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">
              AI
            </div>
            <div className="bg-[#1E1C35] border border-[#2A2740] px-4 py-3 rounded-2xl rounded-bl-[4px]">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-[#3D3860] rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-[#3D3860] rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-[#3D3860] rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {!loading && messages.length <= 1 && (
        <div className="flex gap-2 flex-wrap px-4 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-[#2A2740] bg-[#1A1830] text-[#A89FE8] hover:bg-[#252340] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <footer className="bg-[#1A1830] border-t border-[#2A2740] px-4 py-3 flex-shrink-0">
        <div
          className={`flex items-end gap-2 bg-[#0F0E1A] border rounded-2xl px-4 py-2 transition-all ${
            loading
              ? "border-[#2A2740] opacity-60"
              : "border-[#2A2740] focus-within:border-[#6C5CE7] focus-within:ring-2 focus-within:ring-[#6C5CE7]/10"
          }`}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message…"
            disabled={loading}
            className="flex-1 resize-none bg-transparent border-none text-sm text-[#D8D5F5] placeholder-[#3D3860] focus:outline-none max-h-32 overflow-y-auto leading-relaxed py-1"
          />

          {loading ? (
            <button
              onClick={handleCancel}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-red-900/30 hover:bg-red-900/50 text-red-400 flex items-center justify-center transition-colors mb-0.5"
              aria-label="Cancel"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#6C5CE7] hover:bg-[#5A4DD4] disabled:bg-[#252340] disabled:text-[#3D3860] text-white flex items-center justify-center transition-colors mb-0.5"
              aria-label="Send"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          )}
        </div>

        <p className="text-center text-[11px] text-[#3D3860] mt-2">
          <kbd className="font-mono bg-[#252340] border border-[#3D3860] rounded px-1 py-0.5 text-[10px] text-[#6B6A8A]">Enter</kbd> to send
          &nbsp;·&nbsp;
          <kbd className="font-mono bg-[#252340] border border-[#3D3860] rounded px-1 py-0.5 text-[10px] text-[#6B6A8A]">Shift+Enter</kbd> for new line
        </p>
      </footer>
    </div>
  );
}

export default UserPage;