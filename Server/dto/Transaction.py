import pydantic
from pydantic import BaseModel
from typing import Optional
from datetime import date


class Transaction(BaseModel):
    id: Optional[int] = None
    amount: int = 0
    category: str
    vendor: str
    tr_date: Optional[date]
