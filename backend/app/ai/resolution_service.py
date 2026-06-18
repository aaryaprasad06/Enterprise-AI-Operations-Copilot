import os
import json

from dotenv import load_dotenv

load_dotenv()

from groq import Groq

from app.ai.rca_service import RCAService


class ResolutionService:

    def __init__(self):

        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

        self.rca = RCAService()

    def analyze_incident(
        self,
        incident_description: str
    ):

        similar = self.rca.find_similar_incidents(
            incident_description
        )

        historical_context = ""

        if similar["documents"]:

            docs = similar["documents"][0]

            historical_context = "\n".join(docs)

        prompt = f"""
You are a senior Site Reliability Engineer.

Current Incident:
{incident_description}

Historical Similar Incidents:
{historical_context}

Return ONLY valid JSON.

Format:

{{
    "root_cause": "string",
    "recommended_actions": [
        "action1",
        "action2",
        "action3"
    ],
    "confidence": 0
}}

Do not return markdown.
Do not return explanations.
Return JSON only.
"""

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content

        return json.loads(content)