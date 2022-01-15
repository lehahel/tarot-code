from uuid import uuid4
from datetime import datetime

class Code:
    def __init__(
        self,
        id: uuid,
        text: str,
        created_at: datetime,
    ):
        self.id = id
        self.text = text
        self.created_at = created_at

