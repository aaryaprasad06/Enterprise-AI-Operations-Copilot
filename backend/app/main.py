from fastapi import FastAPI
from app.core.config import settings
from sqlalchemy import text
from app.core.database import Base, engine
import app.models
from app.api.incident_routes import router as incident_router
from app.api.service_routes import (
    router as service_router
)
from app.api.routes.ai import router as ai_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.include_router(
    incident_router
)

app.include_router(
    ai_router,
    prefix="/ai",
    tags=["AI"]
)

from app.api.routes.analysis_routes import router as analysis_router

app.include_router(
    analysis_router
)
app.include_router(service_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {
        "message": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT
    }

@app.get("/db-health")
async def database_health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "database": "connected"
        }

    except Exception as e:
        return {
            "database": "failed",
            "error": str(e)
        }