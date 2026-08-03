import UploadBox from "../components/UploadBox";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { useState } from "react";
import { askQuestion } from "../services/api";

function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! Upload your document(s) on the left, then ask me anything about them here."
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSend = async (question) => {
    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    try {
      setIsGenerating(true);
      const response = await askQuestion(question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          sources: response.sources,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Something went wrong while generating the answer. Please make sure the backend server is running and the embedding models are loaded.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col p-4 sm:p-6 lg:p-8">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="flex-shrink-0 mb-6 flex items-center justify-between border-b border-slate-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-lg shadow-indigo-600/30">
            <svg className="h-5.5 w-5.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.23 13.438l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25v6.75M12 3h.008v.008H12V3zm0 2.25h.008v.008H12V5.25c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5a7.5 7.5 0 007.5-7.5h-1.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-100 to-indigo-400 bg-clip-text text-transparent">
              DocuMind AI
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Premium RAG Knowledge Engine</p>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch overflow-hidden min-h-0">
        {/* Left Panel - Upload (4 Cols) */}
        <aside className="lg:col-span-4 h-full flex flex-col overflow-hidden min-h-0">
          <UploadBox />
        </aside>

        {/* Right Panel - Chat (8 Cols) */}
        <main className="lg:col-span-8 flex flex-col h-full gap-4 overflow-hidden min-h-0">
          <ChatWindow messages={messages} isGenerating={isGenerating} />

          <ChatInput onSend={handleSend} />
        </main>
      </div>
    </div>
  );
}

export default Home;