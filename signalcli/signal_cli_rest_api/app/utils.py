import asyncio
import base64
from typing import Any, List

import aiofiles
import httpx
from fastapi import HTTPException

from .config import settings
from .schemas import AttachmentIn

ALGORITHM = "HS256"


def read_groups(groups_string: str):
    groups = []
    for group in groups_string.split("\n"):
        if group == "":
            continue

        # remove unwanted characters
        chars_to_remove = ["[", "]", ","]

        for char in chars_to_remove:
            group = group.replace(char, "")

        splitted = group.split(" ")
        active_index = splitted.index("Active:")

        id = splitted[1]
        name = " ".join(splitted[3 : active_index - 1])
        active = True if splitted[active_index + 1] == "true" else False
        blocked = True if splitted[active_index + 3] == "true" else False
        members = []

        try:
            members_index = splitted.index("Members:")
            members = splitted[members_index + 1 :]
        except ValueError:
            pass

        groups.append(
            {
                "id": id,
                "name": name,
                "active": active,
                "blocked": blocked,
                "members": members,
            }
        )
                   
    return groups


async def save_attachment(attachment: AttachmentIn):
    if attachment.url is None and attachment.content is None:
        raise HTTPException(status_code=422)
    async with aiofiles.open(f"{settings.signal_upload_path}{attachment.filename}", "wb") as file:
        content = b""
        if attachment.url:
            async with httpx.AsyncClient() as client:
                r = await client.get(attachment.url, allow_redirects=True)
                if r.status_code != 200:
                    raise HTTPException(status_code=400, detail="Downloading image failed")
                content = r.content
        elif attachment.content:
            content = base64.b64decode(attachment.content)

        await file.write(content)


async def run_signal_cli_command(cmd: List[str], wait: bool = True) -> Any:
    base_cmd = ["signal-cli", "--config", settings.signal_config_path]

    full_cmd = " ".join(base_cmd + cmd)

    process = await asyncio.subprocess.create_subprocess_shell(full_cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)

    if wait:
        stdout, stderr = await process.communicate()
        if stderr:
            raise HTTPException(status_code=500, detail=f"Starting signal-cli process failed: {stderr.decode()}")
        return stdout.decode()

    return await process.stdout.readline()
