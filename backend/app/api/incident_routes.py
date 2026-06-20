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
from app.schemas.incident_status import (
    IncidentStatusUpdate
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

from app.models.incident_enums import (
    IncidentStatus
)

@router.put(
    "/{incident_id}/status"
)
def update_incident_status(
    incident_id: int,
    status: IncidentStatus,
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

    return repository.update_status(
        incident,
        status
    )

@router.patch(
    "/{incident_id}/status"
)
def update_incident_status(
    incident_id: int,
    payload: IncidentStatusUpdate,
    db: Session = Depends(get_db)
):

    repository = IncidentRepository(db)

    incident = repository.update_status(
        incident_id,
        payload.status
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return incident