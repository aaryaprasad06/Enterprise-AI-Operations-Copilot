from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, unique=True, nullable=False)

    owner_team = Column(String, nullable=False)

    environment = Column(String, nullable=False)

    status = Column(String, default="healthy")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )