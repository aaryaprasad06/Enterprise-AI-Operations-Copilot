import hashlib


def generate_fingerprint(
    service_name: str,
    message: str
) -> str:
    raw = f"{service_name}:{message}"

    return hashlib.sha256(
        raw.encode()
    ).hexdigest()