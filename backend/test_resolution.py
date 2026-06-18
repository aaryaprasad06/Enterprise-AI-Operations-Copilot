from app.ai.resolution_service import (
    ResolutionService
)

service = ResolutionService()

result = service.analyze_incident(
    "Postgres database timeout"
)

print(result)