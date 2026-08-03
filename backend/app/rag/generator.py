from app.rag.llm import llm
from app.rag.prompt import rag_prompt


def generate_answer(
    question: str,
    context: str,
) -> str:
    """
    Generate an answer using the retrieved context.
    """
    print("\n========== CONTEXT SENT TO LLM ==========")
    print(context)

    messages = rag_prompt.format_messages(
        question=question,
        context=context,
    )
    print("\n========== PROMPT SENT TO LLM ==========\n")

    for msg in messages:
        print(msg.type.upper())
        print(msg.content)
        print("-" * 80)
    response = llm.invoke(messages)

    return response.content