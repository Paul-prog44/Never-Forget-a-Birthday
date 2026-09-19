from fastapi import APIRouter, Depends, HTTPException, status
from app.db.session import get_db
from app.schemas.friend import FriendCreate, FriendResponse
from sqlalchemy.orm import Session
from app.services.friend_service import FriendService
from app.models.user import User
from app.api.deps import get_current_user 




router = APIRouter()

@router.post("/", response_model=FriendResponse, status_code=status.HTTP_201_CREATED)
def create_friend(friend_in: FriendCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
        existing_friend = FriendService.get_by_email(db, email=friend_in.email, user_id=current_user.id)
        print(friend_in)
        if existing_friend:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Vous avez déjà un ami avec cette adresse email parmis vos contacts."
                )

        new_friend= FriendService.create(db=db, friend_in=friend_in, user_id = current_user.id)

        return new_friend

@router.delete("/{friend_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_friend(friend_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

        success = FriendService.delete(db = db, friend_id= friend_id, user_id=current_user.id)

        if not success: 
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, 
                    detail="Ami introuvable"
                )

        return None

@router.get("/", status_code=status.HTTP_200_OK)
def get_friends(db:Session = Depends(get_db), currend_user: User = Depends(get_current_user)):
        friends = FriendService.get_all(db, currend_user.id)
        for friend in friends:
                print(friend.id, friend.firstname, friend.lastname, friend.email)
        return friends
