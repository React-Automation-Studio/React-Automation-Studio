import os
from typing import Any

from fastapi import APIRouter, BackgroundTasks

from signal_cli_rest_api.app.config import settings
from signal_cli_rest_api.app.schemas import ProfileUpdate
from signal_cli_rest_api.app.utils import (run_signal_cli_command,
                                           save_attachment)

router = APIRouter()


@router.put("/{number}", response_model=ProfileUpdate)
async def update_profile(profile: ProfileUpdate, number: str, background_tasks: BackgroundTasks) -> Any:
    """
    updates your profile
    """

    cmd = ["-u", number, "updateProfile"]

    if profile.name:
        cmd += ["--n", profile.name]

    if profile.remove_avatar:
        cmd.append("--remove-avatar")
    elif profile.avatar:
        cmd.append("--avatar")
        await save_attachment(profile.avatar)
        attachment_path = f"{settings.signal_upload_path}{profile.avatar.filename}"
        cmd.append(attachment_path)
        background_tasks.add_task(os.remove, attachment_path)

    await run_signal_cli_command(cmd)

    return profile
