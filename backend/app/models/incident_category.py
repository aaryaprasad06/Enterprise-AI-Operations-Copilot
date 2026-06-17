from enum import Enum


class IncidentCategory(str, Enum):
    DATABASE = "DATABASE"
    APPLICATION = "APPLICATION"
    INFRASTRUCTURE = "INFRASTRUCTURE"
    NETWORK = "NETWORK"
    SECURITY = "SECURITY"
    UNKNOWN = "UNKNOWN"