from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate


class IncidentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_incident(
        self,
        incident_data: IncidentCreate
    ) -> Incident:

        incident = Incident(
            title=incident_data.title,
            description=incident_data.description,
            severity=incident_data.severity,
            service_id=incident_data.service_id,
            fingerprint=incident_data.fingerprint
        )

        self.db.add(incident)

        self.db.commit()

        self.db.refresh(incident)

        return incident

    def get_incident_by_id(
        self,
        incident_id: int
    ):
        return (
            self.db.query(Incident)
            .filter(Incident.id == incident_id)
            .first()
        )

    def list_incidents(self):
        return self.db.query(Incident).all()