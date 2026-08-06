from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlalchemy import Text, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.friend import Friend

class Email(Base):
    __tablename__ = "emails"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    friend_id: Mapped[int] = mapped_column(ForeignKey("friends.id"), nullable=False)
    sent_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    content: Mapped[Optional[str]] = mapped_column(Text)

    # Relations
    user: Mapped["User"] = relationship(back_populates="emails")
    friend: Mapped["Friend"] = relationship(back_populates="emails")