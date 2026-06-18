from app.ai.chroma_service import ChromaService

db = ChromaService()

results = db.search_similar(
    "database connection timeout"
)

print(results)