# Embeddings Generator Specification
# - Initializes embedding model (e.g. HuggingFace / OpenAI / SentenceTransformers)
# - Generates dense vector embeddings for text chunks during ingestion
# - Generates query embeddings for incoming user questions


import os

# Set HF mirror to bypass network connection resets to huggingface.co on Windows
os.environ.setdefault("HF_ENDPOINT", "https://hf-mirror.com")

from langchain_huggingface import HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)