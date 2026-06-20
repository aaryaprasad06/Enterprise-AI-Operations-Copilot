from fastapi import APIRouter

from app.ai.chroma_service import ChromaService

router = APIRouter(
    prefix="/similar",
    tags=["Similar Incidents"]
)

chroma = ChromaService()


@router.get("/")
def search_similar(
    query: str
):
    return chroma.search_similar(
        query=query
    )