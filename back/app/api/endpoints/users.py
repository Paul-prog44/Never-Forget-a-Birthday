from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.services.user_service import UserService
from app.services.auth_service import AuthService
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()

#Duplicate with auth/register, To be removed
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = UserService.get_by_email(db, email=user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un utilisateur avec cet email existe déjà."
        )
    return AuthService.create(db=db, user_in=user_in)

@router.get("/profile",response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_profile(current_user:User = Depends(get_current_user)):
        return current_user

@router.patch("/update", response_model=UserResponse, status_code=status.HTTP_200_OK)
def update(new_data: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    email_already_exists = UserService.check_new_email(db, email=new_data.email, id=current_user.id)
    if email_already_exists:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un utilisateur avec cet email existe déjà."
            )
    
    updated_user = UserService.update(db, current_user, new_data)

    return updated_user

@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
def delete(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    success = UserService.delete(db = db, user_id=current_user.id)

    if not success: 
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND, 
                        detail="Votre compte n'a pas été retrouvé"
                    )
    
    return None