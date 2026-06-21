from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.repositories.incident_repository import (
    IncidentRepository
)

from app.services.ai_pipeline_service import (
    AIPipelineService
)

router = APIRouter(
    prefix="/incident-analysis",
    tags=["Incident Analysis"]
)


@router.get("/{incident_id}")
def analyze_incident(
    incident_id: int,
    db: Session = Depends(get_db)
):

    repository = IncidentRepository(db)

    incident = repository.get_incident_by_id(
        incident_id
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    pipeline = AIPipelineService()

    analysis = pipeline.process_incident(
        incident.description
    )

    return {
        "incident_id": incident.id,
        "title": incident.title,
        "analysis": analysis
    }

@router.get("/{incident_id}/timeline")
def incident_timeline(
    incident_id: int,
    db: Session = Depends(get_db)
):
    repository = IncidentRepository(db)

    incident = repository.get_incident_by_id(
        incident_id
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return {
        "incident_id": incident.id,
        "title": incident.title,
        "first_seen": incident.first_seen_at,
        "last_seen": incident.last_seen_at,
        "occurrences": incident.occurrence_count,
        "status": incident.status
    }