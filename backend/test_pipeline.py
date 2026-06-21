from app.services.ai_pipeline_service import (
    AIPipelineService
)

pipeline = AIPipelineService()

result = pipeline.process_incident(
    "Database timeout causing payment failures"
)

print(result)