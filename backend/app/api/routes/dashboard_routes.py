from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.incident_repository import IncidentRepository

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):

    repo = IncidentRepository(db)

    incidents = repo.list_incidents()

    total_incidents = len(incidents)

    critical_incidents = len(
        [
            i
            for i in incidents
            if i.severity.value == "CRITICAL"
        ]
    )

    total_occurrences = sum(
        i.occurrence_count
        for i in incidents
    )

    database_incidents = len(
        [
            i
            for i in incidents
            if i.category.value == "DATABASE"
        ]
    )

    infrastructure_incidents = len(
        [
            i
            for i in incidents
            if i.category.value == "INFRASTRUCTURE"
        ]
    )

    return {
        "total_incidents": total_incidents,
        "critical_incidents": critical_incidents,
        "database_incidents": database_incidents,
        "infrastructure_incidents": infrastructure_incidents,
        "total_occurrences": total_occurrences
    }