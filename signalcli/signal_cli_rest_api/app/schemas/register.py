from typing import Optional

from pydantic import BaseModel


class Verification(BaseModel):
    verification_code: str
    pin: Optional[str] = None


class Registration(BaseModel):
    voice_verification: bool = False
