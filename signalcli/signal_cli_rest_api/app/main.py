import os

from fastapi import FastAPI

from signal_cli_rest_api.app.api.api_v1.api import api_router

from .config import settings

app = FastAPI(title="signal-cli-rest-api")

app.include_router(api_router)


@app.on_event("startup")
async def startup_event():
    if not os.path.exists(settings.signal_upload_path):
        os.makedirs(settings.signal_upload_path)
