import ReactMarkdown from "react-markdown";
import SourceCard from "./SourceCard";

function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Bot Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096M9 21h3.75m-6.75-3a3 3 0 003 3h4.5a3 3 0 003-3v-6a3 3 0 00-3-3H9a3 3 0 00-3 3v6zM12 3v1.5m6.364.364l-1.06 1.06M21 12h-1.5m-.364 6.364l-1.06-1.06M12 21v-1.5m-6.364-.364l1.06-1.06M3 12h1.5m.364-6.364l1.06 1.06" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-2xl rounded-2xl px-4.5 py-3 shadow-xl ${
          isUser
            ? "bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-medium rounded-br-none border border-indigo-500/20"
            : "bg-slate-900/60 border border-slate-800/80 text-slate-100 rounded-bl-none backdrop-blur-md"
        }`}
      >
        <div className={`prose prose-invert prose-sm max-w-none text-sm leading-relaxed ${isUser ? "text-slate-50" : "text-slate-200"}`}>
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
              code: ({ children }) => <code className="bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-800 text-indigo-300">{children}</code>,
              pre: ({ children }) => <pre className="bg-slate-950 p-3 rounded-lg overflow-x-auto border border-slate-800 my-2">{children}</pre>
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        
        {message.role === "assistant" && (
          <SourceCard sources={message.sources} />
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
          <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;