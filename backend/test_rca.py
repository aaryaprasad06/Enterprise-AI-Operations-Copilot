from app.ai.rca_service import RCAService


rca = RCAService()

results = rca.find_similar_incidents(
    "Postgres database timeout"
)

print(results)