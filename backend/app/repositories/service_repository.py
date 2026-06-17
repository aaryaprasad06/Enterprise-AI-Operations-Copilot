from sqlalchemy.orm import Session
from app.models.service import Service
from app.schemas.service import ServiceCreate


class ServiceRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_service(
        self,
        service_data: ServiceCreate
    ) -> Service:

        service = Service(
            name=service_data.name,
            owner_team=service_data.owner_team,
            environment=service_data.environment
        )

        self.db.add(service)

        self.db.commit()

        self.db.refresh(service)

        return service
    
    def get_by_name(self, name: str):
        return (
            self.db.query(Service)
            .filter(Service.name == name)
            .first()
        )
    