from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.repositories.service_repository import (
    ServiceRepository
)

from app.schemas.service import (
    ServiceCreate,
    ServiceResponse
)

router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


@router.post(
    "/",
    response_model=ServiceResponse
)
def create_service(
    service: ServiceCreate,
    db: Session = Depends(get_db)
):
    repository = ServiceRepository(db)

    return repository.create_service(
        service
    )