import os

from log import app_log

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False


def notifySMS(timestamp, mobile, userNotifyDict):
    # This function must return True as an acknowledgedment to the notification
    # server that the notification method executed successfully

    app_log.info(mobile)
    # app_log.info(str(userNotifyDict))

    return False
