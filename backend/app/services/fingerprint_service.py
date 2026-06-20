import hashlib
import re


def generate_fingerprint(
    service: str,
    message: str
):

    normalized = (
        message.lower()
    )

    normalized = re.sub(
        r'[^a-z0-9\s]',
        '',
        normalized
    )

    normalized = (
        " ".join(
            normalized.split()
        )
    )

    content = (
        f"{service.lower()}:{normalized}"
    )

    return hashlib.sha256(
        content.encode()
    ).hexdigest()