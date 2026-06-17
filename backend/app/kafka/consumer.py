import json

from confluent_kafka import Consumer

from app.core.database import SessionLocal

from app.repositories.service_repository import (
    ServiceRepository
)

from app.repositories.incident_repository import (
    IncidentRepository
)

from app.schemas.incident import IncidentCreate

from app.services.fingerprint_service import (
    generate_fingerprint
)

from app.models.incident_enums import (
    IncidentSeverity
)

from app.services.classification_service import (
    classify_incident
)


class KafkaConsumerService:

    def __init__(self):

        self.consumer = Consumer(
            {
                "bootstrap.servers": "localhost:9092",
                "group.id": "incident-consumer-group",
                "auto.offset.reset": "latest",
            }
        )

        self.consumer.subscribe(
            ["incident-events"]
        )

    def consume_messages(self):

        print(
            "Listening for incidents..."
        )

        while True:

            msg = self.consumer.poll(1.0)

            if msg is None:
                continue

            if msg.error():
                print(msg.error())
                continue

            event = json.loads(
                msg.value().decode("utf-8")
            )

            print(
                f"Received Event: {event}"
            )

            db = SessionLocal()

            try:

                service_repo = (
                    ServiceRepository(db)
                )

                incident_repo = (
                    IncidentRepository(db)
                )

                service = (
                    service_repo.get_by_name(
                        event["service"]
                    )
                )

                if not service:

                    print(
                        f"Service not found: "
                        f"{event['service']}"
                    )

                    continue

                fingerprint = (
                    generate_fingerprint(
                        event["service"],
                        event["message"]
                    )
                )

                category = classify_incident(
                    event["message"]
                )

                incident = IncidentCreate(
                    title=event["message"],
                    description=event["message"],
                    severity=IncidentSeverity(
                        event["severity"].strip().upper()
                    ),
                    category= category,
                    service_id=service.id,
                    fingerprint=fingerprint
                )

                existing_incident = (
                    incident_repo.get_by_fingerprint(
                        fingerprint
                        )
                    )

                if existing_incident:

                    updated = (
                        incident_repo.increment_occurrence(
                            existing_incident
                        )
                    )

                    print(
                        f"Existing Incident Updated: "
                        f"{updated.id} "
                        f"(count={updated.occurrence_count})"
                    )

                else:

                    created = (
                        incident_repo.create_incident(
                        incident
                        )
                    )

                    print(
                        f"Incident Created: "
                        f"{created.id}"
                    )

            finally:
                db.close()