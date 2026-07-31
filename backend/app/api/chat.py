# API Endpoint: Chat & Question Answering
# - Handles POST requests for user chat queries
# - Calls Retriever to fetch relevant context chunks from ChromaDB
# - Builds prompt with retrieved context via Prompt module
# - Sends prompt to LLM and returns/streams response to user