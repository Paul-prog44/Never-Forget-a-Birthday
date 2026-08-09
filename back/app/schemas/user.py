from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    firstname: str
    lastname: str
    date_of_birth: Optional[date] = None
    role_id: int

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    firstname: str
    lastname: str
    role_id: int
    created_at: datetime

    # Permet à Pydantic de lire les modèles SQLAlchemy
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str