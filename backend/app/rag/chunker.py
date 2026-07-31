# Text Chunker Specification
# - Receives raw text/documents from loader
# - Splits long text into smaller chunks (e.g. RecursiveCharacterTextSplitter)
# - Configures chunk size (e.g. 500-1000 tokens) and chunk overlap (e.g. 50-100 tokens)
# - Preserves metadata for each generated chunk

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)


def split_documents(documents: list[Document]) -> list[Document]:
    """
    Split LangChain Document objects into smaller chunks.
    """
    return text_splitter.split_documents(documents)