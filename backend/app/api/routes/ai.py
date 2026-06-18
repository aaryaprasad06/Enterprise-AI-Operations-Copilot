from fastapi import APIRouter

from app.ai.resolution_service import (
    ResolutionService
)

router = APIRouter()

resolution_service = ResolutionService()


@router.post("/analyze")
def analyze_incident(incident: dict):

    return (
        resolution_service.analyze_incident(
            incident["message"]
        )
    )