from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.token import Token
from app.services.auth_service import AuthService
from app.core.security import create_access_token
from app.schemas.user import UserLogin, UserRegisterResponse, UserCreate, UserResponse, UserUpdate
from app.services.user_service import UserService
from app.api.deps import get_current_user 
from app.models.user import User




router = APIRouter()

@router.post("/login", response_model=UserRegisterResponse)
def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
    ):
    
    user = AuthService.authenticate_user(db, email=login_data.email, password=login_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})

    return {
            "user": user,
            "token": {
                "access_token": access_token,
                "token_type": "bearer"
            }
        }

@router.post("/register", response_model=UserRegisterResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = UserService.get_by_email(db, email=user_in.email)
    if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un utilisateur avec cet email existe déjà."
            )

    new_user = AuthService.create(db=db, user_in=user_in)
    access_token = create_access_token(data={"sub": str(new_user.id)})
    
    return {
         "user": new_user,
         "token": {
              "access_token": access_token,
              "token_type": "bearer"
         }
    }

@router.patch("/update", response_model=UserResponse, status_code=status.HTTP_200_OK)
def update(new_data: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    update_user = UserService.update(db, current_user, new_data)

    return update_user
      

@router.get("/profile",response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_profile(current_user = Depends(get_current_user)):
        return current_user