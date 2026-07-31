# Document Service Coordinator (Flow Control)
# - Controls end-to-end processing pipeline for uploaded files
# - Step 1: Call Loader to extract document text
# - Step 2: Call Chunker to split text into passages
# - Step 3: Call Embeddings to generate vector representations
# - Step 4: Call VectorStore to persist vectors & metadata in ChromaDB
import os
from pathlib import Path
from fastapi import UploadFile


UPLOAD_DIR = Path("data/uploads")


async def save_document(file: UploadFile):

    UPLOAD_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    return str(file_path)