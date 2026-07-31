# Main FastAPI Application Setup
# - Initializes FastAPI application instance
# - Configures CORS middleware for frontend communication
# - Registers API routers (/api/upload, /api/chat)
# - Exposes root and health check endpoints
# uvicorn app.main:app --reload

from contextlib import asynccontextmanager
from fastapi import FastAPI
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

