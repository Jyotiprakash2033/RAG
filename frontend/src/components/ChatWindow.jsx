import ChatMessage from "./ChatMessage";

function ChatWindow({ messages }) {
  return (
    <div className="mt-8 h-[500px] overflow-y-auto rounded-lg border bg-gray-50 p-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          Ask a question to start chatting.
        </div>
      ) : (
        messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
          />
        ))
      )}
    </div>
  );
}

export default ChatWindow;