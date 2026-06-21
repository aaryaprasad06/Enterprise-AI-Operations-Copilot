from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.incident import Incident

from groq import Groq
import os

router = APIRouter(
    prefix="/executive",
    tags=["Executive Summary"]
)

@router.get("/summary")
def executive_summary(
    db: Session = Depends(get_db)
):

    incidents = db.query(
        Incident
    ).all()

    incident_text = "\n".join(
        [
            f"{i.title} - {i.severity}"
            for i in incidents
        ]
    )

    client = Groq(
        api_key=os.getenv(
            "GROQ_API_KEY"
        )
    )

    prompt = f"""
You are a CIO dashboard assistant.

Incidents:

{incident_text}

Provide:

1. Overall platform health
2. Main risk areas
3. Recommended leadership actions

Maximum 150 words.
"""

    response = (
        client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
    )

    return {
        "summary":
        response.choices[0]
        .message.content
    }