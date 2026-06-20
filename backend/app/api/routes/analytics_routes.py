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