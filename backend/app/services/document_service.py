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


async def save_document(file: UploadFile):

    # Create upload directory if it doesn't exist
    UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    # Save uploaded file
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    print(f"\n📄 File Saved: {file.filename}")

    # --------------------------
    # Load PDF
    # --------------------------

    documents = load_pdf(file_path)

    print(f"📚 Pages Loaded: {len(documents)}")

    # --------------------------
    # Chunk Documents
    # --------------------------

    chunks = split_documents(documents)

    print(f"✂️ Chunks Created: {len(chunks)}")

    # --------------------------
    # Store in Vector DB
    # --------------------------

    add_documents(chunks)

    print("✅ Stored in ChromaDB")

    return str(file_path)