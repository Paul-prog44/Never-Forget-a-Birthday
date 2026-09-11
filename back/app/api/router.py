from fastapi import APIRouter
from app.api.endpoints import users, auth, friends

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(friends.router, prefix="/friends", tags=["Friends"])