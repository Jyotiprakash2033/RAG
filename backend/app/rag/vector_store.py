# Vector Store (ChromaDB) Interface
# - Initializes persistent ChromaDB client pointing to backend/chroma_db/
# - Manages collection creation, retrieval, and deletion
# - Stores embedded chunks along with metadata and IDs

from pathlib import Path

from langchain_chroma import Chroma
from langchain_core.documents import Document

from app.rag.embeddings import embedding_model


VECTOR_DB_PATH = Path("data/vector_db")
COLLECTION_NAME = "documents"


vector_store = Chroma(
    collection_name=COLLECTION_NAME,
    embedding_function=embedding_model,
    persist_directory=str(VECTOR_DB_PATH),
)


def add_documents(documents: list[Document]):
    vector_store.add_documents(documents)


def similarity_search(query: str, k: int = 4):
    return vector_store.similarity_search(query, k=k)

def similarity_search_with_score(query: str, k: int = 5):
    return vector_store.similarity_search_with_score(query, k=k)