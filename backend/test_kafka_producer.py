from app.kafka.producer import KafkaProducerService


producer = KafkaProducerService()

producer.send_incident_event(
    {
        "service": "payment-service",
        "severity": "critical",
        "message": "CPU usage exceeded 95 percent"
    }
)