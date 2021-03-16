import subprocess
import _thread
from os import environ
from time import sleep
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from app.config import settings

try:
    SIGNAL_CLI_REST_API_PORT = environ['SIGNAL_CLI_REST_API_PORT']
except:
    print("SIGNAL_CLI_REST_API_PORT not defined, defaulting to port 8000")
    SIGNAL_CLI_REST_API_PORT = str(8000)


def startUvicornThread():
    subprocess.call(
        "uvicorn signal_cli_rest_api.app.main:app --host \"127.0.0.1\" --port "+SIGNAL_CLI_REST_API_PORT, shell=True)


class ChangeHandler(FileSystemEventHandler):
    def on_created(self, event):
        filepath = event.src_path
        subprocess.call("chmod 777 "+filepath, shell=True)


_thread.start_new_thread(startUvicornThread, ())

event_handler = ChangeHandler()
observer = Observer()
observer.schedule(event_handler, settings.signal_config_path +
                  "/data", recursive=False)
observer.start()

try:
    while True:
        sleep(1)
finally:
    observer.stop()
    observer.join()
