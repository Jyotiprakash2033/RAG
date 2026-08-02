from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import ChatPromptTemplate


# rag_prompt = ChatPromptTemplate.from_template(

# """
# You are a document question answering assistant.

# IMPORTANT RULES:
# 1. Use ONLY the information from the Context.
# 2. Do NOT use your own knowledge.
# 3. Do NOT guess.
# 4. If the answer is not present in the Context, reply:
# "I couldn't find that information in the uploaded documents."
# 5. When the question asks for a list, include ALL matching items.

# Context:
# ----------------
# {context}
# ----------------

# Question:
# {question}

# Answer:
# """
# )

rag_prompt = ChatPromptTemplate.from_template(
"""
You are a document assistant.

Rules:
1. Answer only from the context.
2. For list questions, include ALL matching items.
3. Do not omit items from the context.
4. Preserve original names.

Context:
{context}

Question:
{question}

Answer:
"""
)