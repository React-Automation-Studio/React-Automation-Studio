from typing import List, Optional

from pydantic import BaseModel

from .message import AttachmentIn


class GroupCreate(BaseModel):
    name: str
    members: List[str] = []
    avatar: Optional[AttachmentIn] = None


class GroupUpdate(BaseModel):
    name: Optional[str]
    members: List[str] = []
    avatar: Optional[AttachmentIn] = None


class GroupOut(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = None
    members: List[str] = []
    blocked: bool = False
    active: bool = True
