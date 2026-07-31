# Document Service Coordinator (Flow Control)
# - Controls end-to-end processing pipeline for uploaded files
# - Step 1: Call Loader to extract document text
# - Step 2: Call Chunker to split text into passages
# - Step 3: Call Embeddings to generate vector representations
# - Step 4: Call VectorStore to persist vectors & metadata in ChromaDB
from pathlib import Path

from fastapi import UploadFile

from app.rag.loader import load_pdf
from app.rag.chunker import split_documents
from app.rag.vector_store import add_documents

UPLOAD_DIR = Path("data/uploads")


async def save_file(file: UploadFile) -> Path:
    """
    Save uploaded file to disk.
    """

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    print(f"📄 File saved: {file.filename}")

    return file_path


def process_document(file_path: Path):
    """
    Load, chunk and index the document.
    """

    documents = load_pdf(file_path)

    print(f"📚 Loaded Pages : {len(documents)}")

    chunks = split_documents(documents)

    print(f"✂️ Total Chunks : {len(chunks)}")

    add_documents(chunks)

    print("✅ Indexed into ChromaDB")


async def save_document(file: UploadFile):
    """
    Complete ingestion pipeline.
    """

    file_path = await save_file(file)

    process_document(file_path)

    return file_path