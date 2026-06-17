import json

from confluent_kafka import Producer


class KafkaProducerService:
    def __init__(self):
        self.producer = Producer(
            {
                "bootstrap.servers": "localhost:9092"
            }
        )

    def delivery_report(self, err, msg):
        if err:
            print(f"Delivery failed: {err}")
        else:
            print(
                f"Message delivered to "
                f"{msg.topic()} [{msg.partition()}]"
            )

    def send_incident_event(self, event: dict):
        self.producer.produce(
            topic="incident-events",
            value=json.dumps(event),
            callback=self.delivery_report,
        )

        self.producer.flush()