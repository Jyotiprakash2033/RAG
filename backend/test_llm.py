from app.rag.llm import llm

response = llm.invoke("What is Retrieval Augmented Generation?")

print(response.content)