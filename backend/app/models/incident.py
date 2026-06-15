from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Enum
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
from app.models.incident_enums import (
    IncidentSeverity,
    IncidentStatus
)


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(String)

    severity = Column(
        Enum(IncidentSeverity),
        nullable=False
    )

    status = Column(
        Enum(IncidentStatus),
        nullable=False,
        default=IncidentStatus.OPEN
    )

    service_id = Column(
        Integer,
        ForeignKey("services.id"),
        nullable=False
    )

    fingerprint = Column(
        String,
        nullable=False
    )

    occurrence_count = Column(
        Integer,
        default=1
    )

    first_seen_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    last_seen_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    service = relationship(
        "Service",
        back_populates="incidents"
    )