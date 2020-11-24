import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
import subprocess

smtpAuth = False

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
    SMTP_STARTTLS = bool(os.environ['SMTP_STARTTLS'])
except:
    SMTP_STARTTLS = False

try:
    SMTP_USER = os.environ['SMTP_USER']
    SMTP_PASS = os.environ['SMTP_PASS']
    smtpAuth = True
    print("SMTP user/password set, login required")
except:
    print("SMTP user/password not set, login not required")


def notifyEmail(userNotifyDict):
    # This function must return True as an acknowledgedment to the notification server
    # that the notification method executed successfully

    msg = MIMEMultipart()
    msg['From'] = "epicsalarmtest@tlabs.ac.za"
    msg['To'] = "jabraham@tlabs.ac.za"
    msg['Subject'] = "Hello world..."
    # msg.attach(MIMEText(email_body_text, 'html', 'utf-8'))
    msg.attach(MIMEText("hello", 'html', 'utf-8'))
    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            if(SMTP_STARTTLS):
                server.starttls()
            if(smtpAuth):
                server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(msg['From'], msg['To'], msg.as_string())
            server.quit()
        return True
    except:
        return False
