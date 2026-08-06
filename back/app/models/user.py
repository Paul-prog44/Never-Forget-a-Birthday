from datetime import datetime, date
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String, ForeignKey, DateTime, Date, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

if TYPE_CHECKING:
    from app.models.role import Role
    from app.models.friend import Friend
    from app.models.email import Email

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    firstname: Mapped[Optional[str]] = mapped_column(String(50))
    lastname: Mapped[Optional[str]] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    date_of_birth: Mapped[Optional[date]] = mapped_column(Date)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)

    # Relations
    role: Mapped["Role"] = relationship(back_populates="users")
    friends: Mapped[List["Friend"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    emails: Mapped[List["Email"]] = relationship(back_populates="user", cascade="all, delete-orphan")