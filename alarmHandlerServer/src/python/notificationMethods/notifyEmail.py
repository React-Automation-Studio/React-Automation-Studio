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
    print("SMTP host and port defined")
except:
    print("SMTP host or port not defined!")
    print("Using Python built-in debugging mail server")
    print("Emails will only be printed to the terminal and not actually sent out")
    subprocess.call(
        "python -m smtpd -c DebuggingServer -n localhost:1025 &", shell=True)
    SMTP_HOST = 'localhost'
    SMTP_PORT = 1025

try:
    SMTP_USER = os.environ['SMTP_USER']
    SMTP_PASS = os.environ['SMTP_PASS']
    smtpAuth = True
    print("SMTP user/password set, login required")
except:
    print("SMTP user/password not set, login not required")


def notifyEmail(email, userNotifyDict):
    # This function must return True as an acknowledgedment to the notification
    # server that the notification method executed successfully

    if(AH_DEBUG):
        print(email)
        print(userNotifyDict)

    msg = MIMEMultipart()
    msg['From'] = "epicsalarmtest@tlabs.ac.za"
    msg['To'] = email
    msg['Subject'] = "Hello world..."
    # msg.attach(MIMEText(email_body_text, 'html', 'utf-8'))
    msg.attach(MIMEText("Hello world...", 'html', 'utf-8'))
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
