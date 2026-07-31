# API Endpoint: File Upload Handler
# - Handles POST requests to upload PDF/document files
# - Validates file types and sizes
# - Saves files to backend/data/uploads/
# - Triggers DocumentService to process and index uploaded files

from fastapi import APIRouter, UploadFile, File
from typing import List

from app.services.document_service import save_document


router = APIRouter(
    prefix="/upload",
    tags=["Document Upload"]
)


@router.post("/")
async def upload_documents(
    files: List[UploadFile] = File(...)
):

    saved_files = []

    for file in files:

        path = await save_document(file)

        saved_files.append(path)


    return {
        "message": "Files uploaded successfully",
        "files": saved_files
    }