from typing import Any, List

from fastapi import APIRouter

from signal_cli_rest_api.app.config import settings
from signal_cli_rest_api.app.schemas import GroupCreate, GroupOut, GroupUpdate
from signal_cli_rest_api.app.utils import (read_groups, run_signal_cli_command,
                                           save_attachment)

router = APIRouter()


@router.get("/{number}", response_model=List[GroupOut])
async def get_groups(number: str, detailed: bool = False) -> Any:
    """
    get groups
    """

    cmd = ["-u", number, "listGroups"]

    if detailed:
        cmd.append("-d")

    response = await run_signal_cli_command(cmd)

    groups = read_groups(response)

    return groups


@router.post("/{number}", status_code=201, response_model=GroupOut)
async def create_group(group: GroupCreate, number: str) -> Any:
    """
    Create Group
    """

    cmd = ["updateGroup", "-n", group.name]

    if group.avatar:
        cmd.append("-a")
        await save_attachment(group.avatar)
        cmd.append(f"{settings.signal_upload_path}{group.avatar.filename}")

    cmd += ["-m"]
    cmd += group.members

    response = await run_signal_cli_command(cmd)

    return GroupOut(**group.dict(), id=response.split('"')[1])


@router.put("/{number}/{id}", response_model=GroupOut)
async def edit_group(id: str, group: GroupUpdate, number: str) -> Any:
    """
    Edit a group. You can't remove a member from a group
    """

    cmd = ["-u", number, "updateGroup", "-g", id]

    if group.name:
        cmd += ["-n", group.name]

    if group.avatar:
        cmd.append("-a")
        await save_attachment(group.avatar)
        cmd.append(f"{settings.signal_upload_path}{group.avatar.filename}")

    if len(group.members) > 0:
        cmd += ["-m"]
        cmd += group.members

    await run_signal_cli_command(cmd)

    return GroupOut(**group.dict(), id=id)


@router.delete("/{number}/{id}")
async def leave_group_by_id(id: str, number: str) -> Any:
    """
    leave a group by id
    """

    cmd = ["-u", number, "quitGroup", "-g", id]

    await run_signal_cli_command(cmd)

    return id
