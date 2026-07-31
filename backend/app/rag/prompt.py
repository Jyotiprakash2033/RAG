# Prompt Template Specification
# - Defines system prompt and context template for LLM
# - Combines retrieved context passages with user query
# - Ensures LLM bases answers strictly on retrieved context

from langchain_core.prompts import ChatPromptTemplate

rag_prompt = ChatPromptTemplate.from_template(
    """
You are a helpful AI assistant.

Answer the user's question ONLY using the provided context.

If the answer is not present in the context, say:
"I couldn't find that information in the uploaded documents."

Context:
{context}

Question:
{question}

Answer:
"""
)