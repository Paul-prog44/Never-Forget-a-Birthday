from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

class UserService:
    @staticmethod
    def get_by_email(db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_by_id(db: Session, user_id: int) -> User | None:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def create(db: Session, user_in: UserCreate) -> User:
        # TODO: HACHAGE DU MDP
        db_user = User(**user_in.model_dump())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user