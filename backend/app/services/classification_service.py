from app.models.incident_category import (
    IncidentCategory
)


def classify_incident(
    message: str
) -> IncidentCategory:

    message = message.lower()

    if any(
        keyword in message
        for keyword in [
            "database",
            "sql",
            "postgres",
            "mysql",
            "timeout"
        ]
    ):
        return IncidentCategory.DATABASE

    if any(
        keyword in message
        for keyword in [
            "500",
            "503",
            "application",
            "exception",
            "crash"
        ]
    ):
        return IncidentCategory.APPLICATION

    if any(
        keyword in message
        for keyword in [
            "cpu",
            "memory",
            "disk"
        ]
    ):
        return IncidentCategory.INFRASTRUCTURE

    if any(
        keyword in message
        for keyword in [
            "network",
            "dns",
            "connection reset"
        ]
    ):
        return IncidentCategory.NETWORK

    if any(
        keyword in message
        for keyword in [
            "unauthorized",
            "breach",
            "attack"
        ]
    ):
        return IncidentCategory.SECURITY

    return IncidentCategory.UNKNOWN