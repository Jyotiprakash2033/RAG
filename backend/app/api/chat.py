# API Endpoint: Chat & Question Answering
# - Handles POST requests for user chat queries
# - Calls Retriever to fetch relevant context chunks from ChromaDB
# - Builds prompt with retrieved context via Prompt module
# - Sends prompt to LLM and returns/streams response to user


from fastapi import APIRouter

from app.schemas.chat import ChatRequest
from app.rag.retriever import retrieve_documents
from app.rag.generator import generate_answer

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/")
def chat(request: ChatRequest):

    # Retrieve relevant chunks
    documents = retrieve_documents(
        query=request.question
    )

    # Merge chunks into one context
    context = "\n\n".join(
        doc.page_content
        for doc in documents
    )

    # Generate answer
    answer = generate_answer(
        question=request.question,
        context=context,
    )

    return {
            "answer": answer,
            "sources": [
                {
                    "content": doc.page_content,
                    "metadata": doc.metadata
                    }
            for doc in documents
        ]
    }


# from fastapi import APIRouter

# from app.schemas.chat import (
#     ChatRequest,
#     ChatResponse,
#     RetrievedChunk
# )

# from app.rag.retriever import retrieve_documents

# router = APIRouter(prefix="/chat", tags=["Chat"])

# @router.post("/", response_model=ChatResponse)
# def chat(request: ChatRequest):

#     documents = retrieve_documents(
#         query=request.question
#     )

#     chunks = [
#         RetrievedChunk(
#             content=doc.page_content,
#             metadata=doc.metadata
#         )
#         for doc in documents
#     ]

#     return ChatResponse(chunks=chunks)