from fastapi import APIRouter

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)

from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List
from fastapi import HTTPException
from app.core.database import get_db
from app.repositories.incident_repository import IncidentRepository
from app.schemas.incident import (
    IncidentCreate,
    IncidentResponse
)

@router.post(
    "/",
    response_model=IncidentResponse
)
def create_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db)
):
    repository = IncidentRepository(db)

    return repository.create_incident(
        incident
    )

@router.get(
    "/",
    response_model=List[IncidentResponse]
)
def list_incidents(
    db: Session = Depends(get_db)
):
    repository = IncidentRepository(db)

    return repository.list_incidents()

@router.get(
    "/{incident_id}",
    response_model=IncidentResponse
)
def get_incident(
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

    return incident