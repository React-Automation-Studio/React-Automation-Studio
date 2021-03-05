from io import BytesIO
from typing import Any

import pyqrcode
from fastapi import APIRouter
from starlette.responses import StreamingResponse

from signal_cli_rest_api.app.schemas import Registration, Verification
from signal_cli_rest_api.app.utils import run_signal_cli_command

router = APIRouter()


@router.post("/{number}/link")
async def link_device(number: str) -> Any:
    response = await run_signal_cli_command(["link"], False)
    response = response.rstrip(b"\n")
    buf = BytesIO()
    qr = pyqrcode.create(response, error="L")
    qr.png(buf, scale=3)
    buf.seek(0)  # important here!
    return StreamingResponse(buf, media_type="image/png")


@router.post("/{number}/update-account")
async def update_account(number: str) -> Any:
    response = await run_signal_cli_command(["-u", number, "updateAccount"])
    return response


@router.post("/{number}", response_model=Registration)
async def register_number(registration: Registration, number: str) -> Any:
    """
    register a new number
    """

    cmd = ["-u", number, "register"]

    if registration.voice_verification:
        cmd.append("--voice")

    await run_signal_cli_command(cmd)
    return registration


@router.post("/{number}/verify", response_model=Verification)
async def verify_registration(verification: Verification, number: str) -> Any:
    """
    verify a registration, using the installation pin is currently not supported by signal-cli
    """

    cmd = ["-u", number, "verify", verification.verification_code]

    if verification.pin:
        cmd.extend(["-p", verification.pin])

    await run_signal_cli_command(cmd)
    return verification
