from pydantic import BaseModel

from app.models.incident_enums import (
    IncidentStatus
)

class IncidentStatusUpdate(BaseModel):
    status: IncidentStatus