from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from app.core.database import get_db
from app.models.incident import Incident

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/severity")
def severity_distribution(
    db: Session = Depends(get_db)
):
    incidents = db.query(
        Incident
    ).all()

    result = {}

    for incident in incidents:
        severity = incident.severity.value

        result[severity] = (
            result.get(severity, 0) + 1
        )

    return result

@router.get("/category")
def category_distribution(
    db: Session = Depends(get_db)
):
    incidents = db.query(
        Incident
    ).all()

    result = {}

    for incident in incidents:
        category = incident.category.value

        result[category] = (
            result.get(category, 0) + 1
        )

    return result

@router.get("/status")
def status_distribution(
    db: Session = Depends(get_db)
):
    incidents = db.query(
        Incident
    ).all()

    result = {}

    for incident in incidents:

        status = (
            incident.status.value
        )

        result[status] = (
            result.get(status, 0) + 1
        )

    return result

@router.get("/services")
def service_analytics(
    db: Session = Depends(get_db)
):
    incidents = db.query(
        Incident
    ).all()

    result = {}

    for incident in incidents:

        service_name = (
            incident.service.name
        )

        result[service_name] = (
            result.get(service_name, 0)
            + incident.occurrence_count
        )

    return result

@router.get("/trends")
def incident_trends(
    db: Session = Depends(get_db)
):

    incidents = db.query(
        Incident
    ).all()

    trend = {}

    for incident in incidents:

        date = (
            incident.created_at
            .date()
            .isoformat()
        )

        trend[date] = (
            trend.get(date, 0)
            + incident.occurrence_count
        )

    return trend