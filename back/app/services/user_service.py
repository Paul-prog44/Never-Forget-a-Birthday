from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserUpdate
from app.core.security import get_password_hashpassword


class UserService:
    @staticmethod
    def get_by_email(db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_by_id(db: Session, user_id: int) -> User | None:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def update(db: Session, db_user: User, user_data: UserUpdate) -> User:
        update_data = user_data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(db_user, field, value)

        db.commit()
        db.refresh(db_user)

        return db_user