from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str
    
class RetrievedChunk(BaseModel):
    content: str
    metadata: dict


class ChatResponse(BaseModel):
    chunks: list[RetrievedChunk]