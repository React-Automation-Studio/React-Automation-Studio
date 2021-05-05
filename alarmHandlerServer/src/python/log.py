import logging
import os
from logging.handlers import RotatingFileHandler
from datetime import datetime
from pytz import utc, timezone

try:
    AH_TZ = os.environ['AH_TZ']
    localtz = timezone(AH_TZ)
except:
    localtz = None

log_formatter = logging.Formatter(
    '%(asctime)s %(levelname)s %(funcName)s(%(lineno)d) %(message)s')

if(localtz):
    def customTimeZone(*args):
        converted = datetime.now(utc).astimezone(localtz)
        return converted.timetuple()
    log_formatter.converter = customTimeZone

logFile = './log/AHLogFile'

my_handler = RotatingFileHandler(logFile, mode='a', maxBytes=8*1024*1024,
                                 backupCount=2, encoding=None, delay=0)
my_handler.setFormatter(log_formatter)
my_handler.setLevel(logging.INFO)

app_log = logging.getLogger('root')
app_log.setLevel(logging.INFO)

app_log.addHandler(my_handler)
