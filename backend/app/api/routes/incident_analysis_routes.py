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

from app.ai.resolution_service import (
    ResolutionService
)

from app.ai.rca_service import (
    RCAService
)

@router.get(
    "/{incident_id}/report"
)
def incident_report(
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

    timeline = {
        "first_seen": incident.first_seen_at,
        "last_seen": incident.last_seen_at,
        "occurrences": incident.occurrence_count,
        "status": incident.status
    }

    rca_service = RCAService()

    similar_incidents = (
        rca_service.find_similar_incidents(
            incident.description
        )
    )

    resolution_service = (
        ResolutionService()
    )

    analysis = (
        resolution_service.analyze_incident(
            incident.description
        )
    )

    executive_summary = (
        f"Incident '{incident.title}' "
        f"has occurred "
        f"{incident.occurrence_count} time(s). "
        f"Root cause identified as "
        f"{analysis['root_cause']}. "
        f"Current status is "
        f"{incident.status}."
    )

    return {
        "incident": {
            "id": incident.id,
            "title": incident.title,
            "description": incident.description,
            "severity": incident.severity,
            "category": incident.category,
            "status": incident.status
        },
        "timeline": timeline,
        "analysis": analysis,
        "similar_incidents": similar_incidents,
        "executive_summary": executive_summary
    }