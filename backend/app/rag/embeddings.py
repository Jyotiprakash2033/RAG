# Embeddings Generator Specification
# - Initializes embedding model (e.g. HuggingFace / OpenAI / SentenceTransformers)
# - Generates dense vector embeddings for text chunks during ingestion
# - Generates query embeddings for incoming user questions


from langchain_huggingface import HuggingFaceEmbeddings


embedding_model = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)