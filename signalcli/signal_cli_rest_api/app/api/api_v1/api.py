from fastapi import APIRouter

from signal_cli_rest_api.app.api.api_v1.endpoints import (block, groups,
                                                          messages, profile,
                                                          register)

api_router = APIRouter()

api_router.include_router(block.router, prefix="/block", tags=["block"])
api_router.include_router(groups.router, prefix="/groups", tags=["groups"])
api_router.include_router(messages.router, prefix="/messages", tags=["messages"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(register.router, prefix="/register", tags=["register"])
