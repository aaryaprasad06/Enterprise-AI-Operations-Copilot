from app.services.classification_service import (
    classify_incident
)

from app.ai.resolution_service import (
    ResolutionService
)


class AIPipelineService:

    def __init__(self):
        self.resolution_service = (
            ResolutionService()
        )

    def process_incident(
        self,
        incident_description: str
    ):

        # Step 1: Classification
        category = classify_incident(
            incident_description
        )

        # Step 2: RCA + Resolution Analysis
        analysis = (
            self.resolution_service
            .analyze_incident(
                incident_description
            )
        )

        return {
            "category": category.value,
            "root_cause": analysis.get(
                "root_cause"
            ),
            "recommended_actions": analysis.get(
                "recommended_actions",
                []
            ),
            "confidence": analysis.get(
                "confidence",
                0
            )
        }