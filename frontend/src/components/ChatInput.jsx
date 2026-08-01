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
      className="mt-4 flex gap-3"
    >

      <input
        type="text"
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
        placeholder="Ask something about your documents..."
        className="flex-1 rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />


      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Send
      </button>


    </form>
  );
}


export default ChatInput;