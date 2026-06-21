import json

from app.models.incident_analysis import (
    IncidentAnalysis
)


class AnalysisRepository:

    def __init__(self, db):
        self.db = db

    def create_analysis(
        self,
        incident_id,
        root_cause,
        recommended_actions,
        confidence
    ):

        analysis = IncidentAnalysis(
            incident_id=incident_id,
            root_cause=root_cause,
            recommended_actions=json.dumps(
                recommended_actions
            ),
            confidence=confidence
        )

        self.db.add(analysis)
        self.db.commit()
        self.db.refresh(analysis)

        return analysis