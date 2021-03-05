import os

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False


def notifyWhatsApp(timestamp, mobile, userNotifyDict):
    # This function must return True as an acknowledgedment to the notification
    # server that the notification method executed successfully

    if(AH_DEBUG):
        print(mobile)
        print(userNotifyDict)

    return False