from typing import Optional

from pydantic import BaseModel

from .message import AttachmentIn


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[AttachmentIn] = None
    remove_avatar: Optional[bool] = False
