from datetime import datetime, date
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String, ForeignKey, DateTime, Date, Boolean, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.email import Email

class Friend(Base):
    __tablename__ = "friends"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    firstname: Mapped[str] = mapped_column(String(50), nullable=False)
    lastname: Mapped[Optional[str]] = mapped_column(String(50))
    email: Mapped[Optional[str]] = mapped_column(String(100))
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    last_update: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())
    notification_active: Mapped[bool] = mapped_column(Boolean, default=True)
    auto_send_email: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relations
    user: Mapped["User"] = relationship(back_populates="friends")
    emails: Mapped[List["Email"]] = relationship(back_populates="friend", cascade="all, delete-orphan")