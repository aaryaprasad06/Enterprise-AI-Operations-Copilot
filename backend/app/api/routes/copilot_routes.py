from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.resolution_service import ResolutionService

router = APIRouter(
    prefix="/copilot",
    tags=["AI Copilot"]
)


class CopilotRequest(BaseModel):
    question: str


@router.post("/ask")
def ask_copilot(
    request: CopilotRequest
):

    service = ResolutionService()

    result = service.analyze_incident(
        request.question
    )

    return {
        "question": request.question,
        "answer": result
    }