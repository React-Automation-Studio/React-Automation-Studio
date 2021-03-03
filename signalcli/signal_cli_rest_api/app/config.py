import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    signal_config_path: str = os.environ.get(
        "SIGNAL_CONFIG_PATH", os.path.expanduser("~/.local/share/signal-cli")
    )
    signal_upload_path: str = f"{signal_config_path}/uploads/"
    signal_attachments_path: str = f"{signal_config_path}/attachments/"


settings = Settings()
