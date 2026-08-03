# RAG Retriever Specification
# - Queries ChromaDB using user query vector
# - Performs similarity search (cosine similarity / Euclidean distance)
# - Filters and ranks top-k matching document chunks
# - Formats retrieved passages for prompt injection
from langchain_core.documents import Document
from app.rag.vector_store import vector_store

def retrieve_documents(query: str, k: int = 5) -> list[Document]:

    results = vector_store.similarity_search_with_score(
        query=query,
        k=k
    )

    documents = []

    print("\n========== RETRIEVED DOCUMENTS ==========\n")

    for i, (doc, score) in enumerate(results):
        print(f"--- CHUNK {i+1} ---")
        print(f"Score: {score}")
        print(doc.page_content)
        print("-" * 50)

        documents.append(doc)

    return documents