from sqlalchemy.orm import Session
from sqlalchemy.sql import func
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
            category=incident_data.category,
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
    
    def get_by_fingerprint(self, fingerprint: str):
        return (
            self.db.query(Incident).filter(
                Incident.fingerprint==fingerprint
            ).first()
        )
    
    def increment_occurrence(self, incident: Incident):
        incident.occurrence_count+=1
        incident.last_seen_at= func.now()
        self.db.commit()
        self.db.refresh(incident)
        return incident
    
    def update_status(self, incident_id: int, status):
        incident = (
            self.get_incident_by_id(
            incident_id
            )
        )

        if incident:
            incident.status = status
            self.db.commit()
            self.db.refresh(incident)

        return incident