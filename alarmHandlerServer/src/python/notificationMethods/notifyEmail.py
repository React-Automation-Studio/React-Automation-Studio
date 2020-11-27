import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
import subprocess

smtpAuth = False

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

try:
    SMTP_HOST = os.environ['SMTP_HOST']
    SMTP_PORT = os.environ['SMTP_PORT']
    SMTP_SENDER = os.environ['SMTP_SENDER']
    print("Email SMTP settings configured")
except:
    print("Email SMTP settings not configured!")
    print("Using Python built-in debugging mail server")
    print("Emails will only be printed to the terminal and not actually sent out")
    subprocess.call(
        "python -m smtpd -c DebuggingServer -n localhost:1025 &", shell=True)
    SMTP_HOST = 'localhost'
    SMTP_PORT = 1025
    SMTP_SENDER = 'alarmdb@lab.edu'

try:
    SMTP_USER = os.environ['SMTP_USER']
    SMTP_PASS = os.environ['SMTP_PASS']
    smtpAuth = True
    print("SMTP user/password set, login required")
except:
    print("SMTP user/password not set, login not required")


def composeEmailBody(userNotifyDict):
    body = ""
    for area in userNotifyDict:
        if("=" in area):
            displayArea = area.replace("=", " > ")
        else:
            displayArea = area
        if(body == ""):
            body = body+"<font size=\"3\"><b>"+displayArea+"</b></font><br/><br/>"
        else:
            body = body+"<br/><br/><font size=\"3\"><b>"+displayArea+"</b></font><br/><br/>"
        for pvname in userNotifyDict[area]:
            timestamp = userNotifyDict[area][pvname]["timestamp"]
            entry = userNotifyDict[area][pvname]["entry"]
            message = entry.split(pvname+' - ')[1]
            if("DISCONNECTED" in message):
                formattedMessage = "<span><b style=\"background-color:rgb(198,40,40); color:rgb(255,255,255); padding:2;\">DISCONNECTED</b></span>"
            else:
                alarm, shortMessage = message.split(" triggered, ")
                if("MINOR_ALARM" in message):
                    formattedMessage = "<span><b style=\"background-color:rgb(255,138,101); color:rgb(255,255,255); padding:2;\">"+alarm+"</b> triggered, " + \
                        shortMessage+"</span>"
                else:
                    formattedMessage = "<span><b style=\"background-color:rgb(198,40,40); color:rgb(255,255,255); padding:2;\">"+alarm+"</b> triggered, " + \
                        shortMessage+"</span>"
            str_time = datetime.fromtimestamp(timestamp).strftime(
                "%H:%M:%S %a, %d %b %Y")
            body = body + "<font size=\"2\"><u>"+str_time + \
                ":</u> <b>"+pvname+"</b> - "+formattedMessage+"</font><br/>"

    return """<html>
                <body>
                    {body}
                </body>
            < /html >""".format(**locals())


def notifyEmail(timestamp, email, userNotifyDict):
    # This function must return True as an acknowledgedment to the notification
    # server that the notification method executed successfully

    timestamp = datetime.fromtimestamp(timestamp)

    if(AH_DEBUG):
        print("###-EMAIL NOTIFY-###")
        print(timestamp.strftime('%a, %d %b %Y at %H:%M:%S'))
        print(email)
        print(userNotifyDict)

    msg = MIMEMultipart()
    msg['From'] = SMTP_SENDER
    msg['To'] = email
    msg['Subject'] = "Alarm Notification: " + \
        timestamp.strftime('%a, %d %b %Y at %H:%M:%S')
    email_body = composeEmailBody(userNotifyDict)
    msg.attach(MIMEText(email_body, 'html', 'utf-8'))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            if(AH_DEBUG):
                server.set_debuglevel(2)
            # identify ourselves, prompting server for supported features
            server.ehlo()
            # If we can encrypt this session, do it
            if server.has_extn('STARTTLS'):
                server.starttls()
                server.ehlo()  # re-identify ourselves over TLS connection
            if(smtpAuth):
                server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(msg['From'], msg['To'], msg.as_string())
            server.quit()
        print("Successfully sent email to", email)
        return True
    except:
        print("Failed to send email to", email, ". Verify SMTP settings.")
        return False