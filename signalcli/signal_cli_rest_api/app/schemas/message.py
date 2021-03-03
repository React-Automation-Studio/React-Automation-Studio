from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel


class AttachmentIn(BaseModel):
    url: Optional[str] = None
    filename: str
    content: Optional[Any] = None


class MessageOutgoing(BaseModel):
    text: str
    receivers: List[str]
    group: bool = False
    groupId: str
    attachments: List[AttachmentIn] = []


class MessageSent(MessageOutgoing):
    timestamp: datetime


class AttachmentOut(BaseModel):
    contentType: str
    filename: Optional[str] = None
    id: str
    size: int


class GroupInfo(BaseModel):
    groupId: str
    members: Optional[List[str]] = None
    name: Optional[str] = None


class DataMessage(BaseModel):
    timestamp: str
    message: Optional[str] = None
    expiresInSeconds: int
    attachments: Optional[List[AttachmentOut]] = None
    groupInfo: Optional[GroupInfo] = None


class Envelope(BaseModel):
    source: str
    sourceDevice: int
    relay: Any
    timestamp: str
    isReceipt: bool
    dataMessage: Optional[DataMessage] = None


class MessageIncoming(BaseModel):
    envelope: Envelope
    syncMessage: Any
    callMessage: Any
    receiptMessage: Any


class ReactionOut(BaseModel):
    receiver: str
    group: bool = False
    target_number: str
    target_timestamp: str
    emoji: str
