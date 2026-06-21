from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import Text
from sqlalchemy import ForeignKey

from app.core.database import Base


class IncidentAnalysis(Base):

    __tablename__ = "incident_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    incident_id = Column(
        Integer,
        ForeignKey("incidents.id"),
        nullable=False
    )

    root_cause = Column(
        Text,
        nullable=False
    )

    recommended_actions = Column(
        Text,
        nullable=False
    )

    confidence = Column(
        Float,
        nullable=False
    )