from app.kafka.consumer import KafkaConsumerService

consumer = KafkaConsumerService()

consumer.consume_messages()