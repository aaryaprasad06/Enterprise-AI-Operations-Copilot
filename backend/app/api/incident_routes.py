from fastapi import APIRouter

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)

from fastapi import Depends
from sqlalchemy.orm import Session

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