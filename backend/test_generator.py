from app.rag.generator import generate_answer

context = """
Deadlock is a situation where two or more
processes wait indefinitely for each other.
"""

answer = generate_answer(
    question="What is deadlock?",
    context=context,
)

print(answer)