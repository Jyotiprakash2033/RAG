from app.rag.llm import llm
from app.rag.prompt import rag_prompt


def generate_answer(
    question: str,
    context: str,
) -> str:
    """
    Generate an answer using the retrieved context.
    """

    messages = rag_prompt.format_messages(
        question=question,
        context=context,
    )

    response = llm.invoke(messages)

    return response.content