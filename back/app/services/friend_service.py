from sqlalchemy.orm import Session
from app.models.friend import Friend
from app.schemas.friend import FriendCreate
from typing import List

class FriendService:

    @staticmethod
    def get_by_email(db: Session, email: str, user_id: int) -> Friend | None:
        return db.query(Friend).filter(Friend.email == email, Friend.user_id == user_id).first()

    @staticmethod
    def create(db: Session, friend_in: FriendCreate, user_id: int) -> Friend:
        friend_data = friend_in.model_dump()

        db_friend = Friend(**friend_data, user_id = user_id)
        db.add(db_friend)
        db.commit()
        db.refresh(db_friend)

        return db_friend

    @staticmethod
    def delete(db: Session, friend_id: int, user_id: int) -> bool:
        
        db_friend = db.query(Friend).filter(Friend.id == friend_id, Friend.user_id == user_id).first()

        if not db_friend:
            return False

        db.delete(db_friend)
        db.commit()
        return True

    @staticmethod
    def get_all(db: Session, user_id) -> List[Friend]:
        return db.query(Friend).filter(Friend.user_id == user_id).all()

    @staticmethod
    def patch(db: Session, friend_id: int, user_id, friend_data: FriendCreate) -> Friend | None:

        db_friend = db.query(Friend).filter(Friend.id == friend_id, Friend.user_id == user_id).first()

        if not db_friend:
            return None

        updated_data = friend_data.model_dump(exclude_unset=True)

        for key, value in updated_data.items():
            setattr(db_friend, key, value)

        db.commit()
        db.refresh(db_friend)

        return db.query(Friend).filter(Friend.id == friend_id).first()