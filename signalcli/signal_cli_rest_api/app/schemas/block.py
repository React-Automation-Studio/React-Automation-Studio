from typing import List, Optional

from pydantic import BaseModel


class Block(BaseModel):
    numbers: List[str]
    group: Optional[bool] = False
