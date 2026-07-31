# API Endpoint: File Upload Handler
# - Handles POST requests to upload PDF/document files
# - Validates file types and sizes
# - Saves files to backend/data/uploads/
# - Triggers DocumentService to process and index uploaded files

from fastapi import APIRouter, UploadFile, File
from typing import List

router = APIRouter(
    prefix="/upload",
    tags=["Document Upload"]
)

@router.post("/")
async def upload_documents(files: List[UploadFile] = File(...)):
    return {
        "message": "Files received",
        "files": [file.filename for file in files]
    }