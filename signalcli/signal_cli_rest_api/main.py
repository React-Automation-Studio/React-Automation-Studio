import subprocess
import _thread
from os import listdir, environ
from os.path import isfile, join
from time import sleep

from app.config import settings

try:
    SIGNAL_CLI_REST_API_PORT = environ['SIGNAL_CLI_REST_API_PORT']
except:
    print("SIGNAL_CLI_REST_API_PORT not defined, defaulting to port 8000")
    SIGNAL_CLI_REST_API_PORT = str(8000)


def startUvicornThread():
    subprocess.call(
        "uvicorn signal_cli_rest_api.app.main:app --host \"0.0.0.0\" --port "+SIGNAL_CLI_REST_API_PORT, shell=True)


_thread.start_new_thread(startUvicornThread, ())

onlyNumbersStart = [f for f in listdir(settings.signal_config_path+"/data")
                    if (isfile(join(settings.signal_config_path+"/data", f)) and (f.startswith('+')))]

while(True):
    sleep(1)
    onlyNumbers = [f for f in listdir(settings.signal_config_path+"/data")
                   if (isfile(join(settings.signal_config_path+"/data", f)) and (f.startswith('+')))]
    if(onlyNumbers != onlyNumbersStart):
        onlyNumbersStart = onlyNumbers
        for number in onlyNumbers:
            filePath = settings.signal_config_path+"/data/"+number
            subprocess.call("chmod 777 "+filePath, shell=True)
