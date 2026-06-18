import chromadb


class ChromaService:

    def __init__(self):

        self.client = chromadb.PersistentClient(
            path="chroma_db"
        )

        self.collection = (
            self.client.get_or_create_collection(
                name="incident_knowledge"
            )
        )

    def add_incident(
        self,
        incident_id: str,
        document: str,
        metadata: dict
    ):

        self.collection.add(
            ids=[incident_id],
            documents=[document],
            metadatas=[metadata]
        )

    def search_similar(
        self,
        query: str,
        limit: int = 3
    ):

        return self.collection.query(
            query_texts=[query],
            n_results=limit
        )