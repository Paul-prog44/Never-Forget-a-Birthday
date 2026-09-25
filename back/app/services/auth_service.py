from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import verify_password, get_password_hashpassword

class AuthService:
    @staticmethod
    def authenticate_user(db:Session, email: str, password: str) -> User | None:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    @staticmethod
    def create(db: Session, user_in: UserCreate) -> User:
        user_data= user_in.model_dump()
        user_data["password"] = get_password_hashpassword(user_data["password"])

        db_user = User(**user_data)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user