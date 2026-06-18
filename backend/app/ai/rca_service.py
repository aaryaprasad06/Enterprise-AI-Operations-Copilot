from app.ai.chroma_service import ChromaService


class RCAService:

    def __init__(self):

        self.chroma = ChromaService()

    def find_similar_incidents(
        self,
        incident_description: str
    ):

        results = self.chroma.search_similar(
            query=incident_description,
            limit=3
        )

        return results