from fastapi import APIRouter
from app.ai.resolution_service import ResolutionService

router = APIRouter(
    prefix="/analysis",
    tags=["AI Analysis"]
)

@router.post("/")
def analyze_incident(
    incident_text: str
):
    service = ResolutionService()

    result = service.analyze_incident(
        incident_text
    )

    return {
        "analysis": result
    }