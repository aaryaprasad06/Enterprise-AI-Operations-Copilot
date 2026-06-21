from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.incident_repository import IncidentRepository
from app.models.incident import Incident
from app.models.incident_enums import IncidentStatus
from sqlalchemy import func
from app.models.service import Service
from app.models.incident_enums import IncidentStatus

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

@router.get("/severity")
def severity_breakdown(
    db: Session = Depends(get_db)
):

    incidents = (
        db.query(Incident)
        .all()
    )

    result = {}

    for incident in incidents:

        severity = (
            incident.severity.value
        )

        result[severity] = (
            result.get(severity, 0)
            + 1
        )

    return result

@router.get("/status")
def status_breakdown(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Incident.status,
            func.count(Incident.id)
        )
        .group_by(
            Incident.status
        )
        .all()
    )

    return {
        status.value: count
        for status, count in results
    }

@router.get("/categories")
def category_breakdown(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Incident.category,
            func.count(Incident.id)
        )
        .group_by(
            Incident.category
        )
        .all()
    )

    return {
        category.value: count
        for category, count in results
    }

@router.get("/top-services")
def top_services(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Service.name,
            func.count(Incident.id)
        )
        .join(Incident)
        .group_by(
            Service.name
        )
        .order_by(
            func.count(
                Incident.id
            ).desc()
        )
        .all()
    )

    return {
        service: count
        for service, count in results
    }

@router.get("/trends")
def incident_trends(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            func.date(
                Incident.created_at
            ),
            func.count(
                Incident.id
            )
        )
        .group_by(
            func.date(
                Incident.created_at
            )
        )
        .all()
    )

    return {
        str(date): count
        for date, count in results
    }

@router.get("/mttr")
def mttr(
    db: Session = Depends(get_db)
):

    resolved_incidents = (
        db.query(Incident)
        .filter(
            Incident.status ==
            IncidentStatus.RESOLVED
        )
        .all()
    )

    if not resolved_incidents:
        return {
            "mttr_hours": 0
        }

    total_hours = 0

    for incident in resolved_incidents:

        duration = (
            incident.updated_at
            - incident.created_at
        )

        total_hours += (
            duration.total_seconds()
            / 3600
        )

    return {
        "mttr_hours": round(
            total_hours
            / len(resolved_incidents),
            2
        )
    }

@router.get("/health-score")
def health_score(
    db: Session = Depends(get_db)
):

    total = (
        db.query(Incident)
        .count()
    )

    open_incidents = (
        db.query(Incident)
        .filter(
            Incident.status ==
            IncidentStatus.OPEN
        )
        .count()
    )

    if total == 0:
        return {
            "score": 100
        }

    score = (
        (total - open_incidents)
        / total
    ) * 100

    return {
        "score": round(score, 2)
    }