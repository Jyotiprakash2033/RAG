# Document Loader Specification
# - Reads raw uploaded files from data/uploads/
# - Parses text from PDFs, text files, or markdown documents
# - Extracts document metadata (filename, page numbers, created date)
from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document


def load_pdf(pdf_path: Path) -> list[Document]:
    """
    Load a PDF and return one Document object per page.
    """

    loader = PyPDFLoader(str(pdf_path))

    documents = loader.load()

    return documents