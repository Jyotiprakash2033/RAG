import { useState } from "react";

function ChatInput({ onSend }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-1.5 shadow-2xl focus-within:border-indigo-500/50 transition-all duration-300"
    >
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about your documents..."
        className="flex-1 bg-transparent px-4 py-3 text-slate-100 text-sm outline-none placeholder-slate-500"
      />

      <button
        type="submit"
        disabled={!question.trim()}
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-md hover:shadow-indigo-600/20 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
      >
        <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </form>
  );
}

export default ChatInput;