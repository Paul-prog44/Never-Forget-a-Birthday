from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import Optional



class FriendCreate(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    date_of_birth: date
    # created_at: datetime
    notification_active: Optional[bool] = False
    auto_send_email: Optional[bool] = False

class FriendResponse(BaseModel):
    id: int
    user_id: int
    firstname: str
    lastname: str
    email: EmailStr
    date_of_birth: date
    created_at: datetime
    notification_active: Optional[bool] = False
    auto_send_email: Optional[bool] = False