# RAG Retriever Specification
# - Queries ChromaDB using user query vector
# - Performs similarity search (cosine similarity / Euclidean distance)
# - Filters and ranks top-k matching document chunks
# - Formats retrieved passages for prompt injection
from langchain_core.documents import Document

from app.rag.vector_store import vector_store


def retrieve_documents(
    query: str,
    k: int = 5
) -> list[Document]:
    """
    Retrieve the most relevant document chunks.
    """

    documents = vector_store.similarity_search(
        query=query,
        k=k
    )

    return documents