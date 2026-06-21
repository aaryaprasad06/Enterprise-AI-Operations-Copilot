from app.services.classification_service import classify_incident
from app.ai.chroma_service import search_similar_incidents
from app.ai.rca_service import generate_rca
from app.ai.resolution_service import generate_resolution


def process_incident(incident: dict):

    result = {}

    # Step 1: Classification
    category = classify_incident(
        incident["title"]
    )

    result["category"] = category

    # Step 2: Similar Incident Search
    similar_incidents = search_similar_incidents(
        incident["description"]
    )

    result["similar_incidents"] = similar_incidents

    # Step 3: RCA
    rca = generate_rca(
        incident,
        similar_incidents
    )

    result["root_cause"] = rca

    # Step 4: Resolution
    resolution = generate_resolution(
        incident,
        rca
    )

    result["resolution"] = resolution

    return result