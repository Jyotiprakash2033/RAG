import UploadBox from "../components/UploadBox";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { useState } from "react";
import { askQuestion } from "../services/api";
function Home() {

const [messages,setMessages] = useState([
  {
    role:"assistant",
    content:"Hello! Ask me anything about your documents."
  }
]);
const handleSend = async (question)=>{

  // Add user message immediately
  setMessages(prev=>[
    ...prev,
    {
      role:"user",
      content:question
    }
  ]);


  try {

    const response = await askQuestion(question);


    setMessages(prev=>[
      ...prev,
      {
        role:"assistant",
        content:response.answer,
        sources:response.sources
      }
    ]);


  } catch(error){

    console.error(error);


    setMessages(prev=>[
      ...prev,
      {
        role:"assistant",
        content:"❌ Something went wrong while generating answer."
      }
    ]);

  }

};
  return (
    <div className="mx-auto max-w-5xl p-8">

      <h1 className="mb-8 text-4xl font-bold">
        RAG CHATBOT
      </h1>


      <UploadBox />


      <ChatWindow 
        messages={messages}
      />
      <ChatInput 
        onSend={handleSend}
      />


    </div>
  );
}

export default Home;