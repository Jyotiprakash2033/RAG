# RAG Retriever Specification
# - Queries ChromaDB using user query vector
# - Performs similarity search (cosine similarity / Euclidean distance)
# - Filters and ranks top-k matching document chunks
# - Formats retrieved passages for prompt injection
from langchain_core.documents import Document

from app.rag.vector_store import vector_store


def retrieve_documents(
    query: str,
    k: int = 7
) -> list[Document]:
    """
    Retrieve the most relevant document chunks.
    """
    
    documents = vector_store.max_marginal_relevance_search(
        query=query,
        k=k,
        
    )

    print("\n========== RETRIEVED DOCUMENTS ==========\n")

    for i, doc in enumerate(documents):
        print(f"\n--- CHUNK {i+1} ---")
        print(doc.page_content)

    return documents