import ReactMarkdown from "react-markdown";

 function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-xl px-4 py-3 shadow-md ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border"
        }`}
      >
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatMessage;