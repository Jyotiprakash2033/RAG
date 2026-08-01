# Main FastAPI Application Setup
# - Initializes FastAPI application instance
# - Configures CORS middleware for frontend communication
# - Registers API routers (/api/upload, /api/chat)
# - Exposes root and health check endpoints
# uvicorn app.main:app --reload

import os

# Configure HF mirror to prevent connection reset errors when downloading HuggingFace models on Windows
os.environ.setdefault("HF_ENDPOINT", "https://hf-mirror.com")

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.chat import router as chat_router

@asynccontextmanager
async def lifespan(app: FastAPI):

    # Startup logic
    print("🚀 RAG Backend Started Successfully")
    print("🌐 Local URL: http://127.0.0.1:8000")
    print("📚 Swagger Docs: http://127.0.0.1:8000/docs")
  

    yield

    # Shutdown logic
    print("🛑 RAG Backend shutting down...")

app = FastAPI(
    title="Multi Document RAG API",
    description="Basic RAG system with PDF upload and question answering",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "message": "RAG Backend is running"
    }







# older approach
# from fastapi import FastAPI

# app = FastAPI(
#     title="Multi Document RAG API",
#     description="Basic RAG system with PDF upload and question answering",
#     version="1.0.0"
# )
# @app.on_event("startup")
# def startup_event():
#     print("🚀 RAG Backend Started Successfully")
#     print("🌐 Local URL: http://127.0.0.1:8000")
#     print("📚 Swagger Docs: http://127.0.0.1:8000/docs")
    


# @app.get("/")
# def root():
#     return {
#         "message": "RAG Backend is running"
#     }

