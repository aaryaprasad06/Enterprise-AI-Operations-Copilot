from app.ai.chroma_service import ChromaService

db = ChromaService()

db.add_incident(
    incident_id="1",
    document="Postgres database timeout connection failure",
    metadata={
        "category": "DATABASE",
        "severity": "CRITICAL"
    }
)

print("Incident stored")