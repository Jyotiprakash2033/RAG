import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatWindow({ messages, isGenerating }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1 || isGenerating) {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  }, [messages, isGenerating]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/20 backdrop-blur-xl p-4 sm:p-6 shadow-2xl relative"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col h-full items-center justify-center text-slate-500 py-10">
          <div className="p-4 bg-slate-900/40 rounded-full border border-slate-800/60 mb-3">
            <svg className="w-8 h-8 text-indigo-500/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-400">Your chat history is empty</p>
          <p className="text-xs text-slate-600 mt-1">Upload a PDF and start asking questions!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isGenerating && (
            <div className="flex gap-3 mb-6 justify-start">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-md animate-pulse">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096M9 21h3.75m-6.75-3a3 3 0 003 3h4.5a3 3 0 003-3v-6a3 3 0 00-3-3H9a3 3 0 00-3 3v6zM12 3v1.5m6.364.364l-1.06 1.06M21 12h-1.5m-.364 6.364l-1.06-1.06M12 21v-1.5m-6.364-.364l1.06-1.06M3 12h1.5m.364-6.364l1.06 1.06" />
                </svg>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl rounded-bl-none px-4.5 py-3.5 backdrop-blur-md shadow-xl flex items-center gap-1.5">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce-subtle [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce-subtle [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce-subtle"></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatWindow;