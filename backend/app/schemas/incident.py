from datetime import datetime
from pydantic import BaseModel
from app.models.incident_category import IncidentCategory


from app.models.incident_enums import (
    IncidentSeverity,
    IncidentStatus
)
from app.schemas.service import ServiceResponse

class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: IncidentSeverity
    service_id: int
    fingerprint: str
    category: IncidentCategory


class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    category: IncidentCategory

    severity: IncidentSeverity
    status: IncidentStatus

    fingerprint: str
    occurrence_count: int

    service: ServiceResponse

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True