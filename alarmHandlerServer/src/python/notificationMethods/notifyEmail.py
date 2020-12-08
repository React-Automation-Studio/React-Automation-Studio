import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from pytz import timezone

smtpAuth = False

try:
    AH_DEBUG = bool(os.environ['AH_DEBUG'])
except:
    AH_DEBUG = False

try:
    AH_TZ = os.environ['AH_TZ']
    localtz = timezone(AH_TZ)
except:
    localtz = None

try:
    SMTP_HOST = os.environ['SMTP_HOST']
    SMTP_PORT = os.environ['SMTP_PORT']
    SMTP_SENDER = os.environ['SMTP_SENDER']
    print("Email SMTP settings configured")
except:
    SMTP_HOST = ''
    SMTP_PORT = ''
    SMTP_SENDER = ''
    print("Email SMTP settings not configured!")
    print("Email notifications will not be sent")

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
            if(not localtz):
                body = body + \
                    "<span style=\"font-size: 0.875em;\"><b>**WARNING**</b></span> \
                    <br/> \
                    <span style=\"font-size: 0.875em;\">Local timezone for alarm handler not set. All times shown are timezone UTC.</span> \
                    <br/> \
                    <br/>"
            body = body + \
                "<table> \
                <tr> \
                <th colspan=\"4\" style=\"text-align: left\">"+displayArea+"</th> \
                </tr>"
        else:
            body = body + \
                "<tr><td>"+" "+"</td></tr> \
                <tr> \
                <th colspan=\"4\" style=\"text-align: left\">"+displayArea+"</th> \
                </tr>"
        for pvname in userNotifyDict[area]:
            for item in userNotifyDict[area][pvname]:
                timestamp = item["timestamp"]
                entry = item["entry"]
                message = entry.split(pvname+' - ')[1]
                if("DISCONNECTED" in message):
                    formattedAlarm = "<span><b style=\"background-color:rgb(198,40,40); color:rgb(255,255,255); padding:2;\">DISCONNECTED</b></span>"
                    shortMessage = ""
                else:
                    alarm, shortMessage = message.split(" triggered, ")
                    if("MINOR_ALARM" in message):
                        formattedAlarm = "<span><b style=\"background-color:rgb(255,138,101); color:rgb(255,255,255); padding:2;\">" + \
                            alarm+"</b></span>"
                    else:
                        formattedAlarm = "<span><b style=\"background-color:rgb(198,40,40); color:rgb(255,255,255); padding:2;\">" + \
                            alarm+"</b></span>"
                # Time zone localisation
                if(localtz):
                    str_time = datetime.fromisoformat(timestamp).astimezone(localtz).strftime(
                        "%H:%M:%S %a, %d %b %Y")
                else:
                    str_time = datetime.fromisoformat(timestamp).strftime(
                        "%H:%M:%S %a, %d %b %Y")+" (UTC)"
                # Time zone localisation
                body = body + \
                    "<tr> \
                        <td><u>"+str_time+":</u>  "+"</td> \
                        <td><b>"+pvname+"</b></td> \
                        <td>"+formattedAlarm+"</td> \
                        <td>"+shortMessage+"</td> \
                    </tr>"

    body = body + \
        "</table>"

    if(localtz):
        body = body + \
            "<br/> \
            <span style=\"font-size: 0.875em;\">NOTE: All times shown are timezone "+AH_TZ+"</span>"
    else:
        body = body + \
            "<br/> \
            <span style=\"font-size: 0.875em;\"><b>**WARNING**</b></span> \
            <br/> \
            <span style=\"font-size: 0.875em;\">Local timezone for alarm handler not set. All times shown are timezone UTC.</span>"

    return """ \
            <html>
                <body>
                    {body}
                </body>
            </html>""".format(**locals())


def notifyEmail(timestamp, email, userNotifyDict):
    # This function must return True as an acknowledgedment to the notification
    # server that the notification method executed successfully

    timestamp = datetime.fromisoformat(timestamp)

    if(AH_DEBUG):
        print("###-EMAIL NOTIFY-###")
        print(timestamp.strftime('%a, %d %b %Y at %H:%M:%S UTC'))
        print(email)
        print(userNotifyDict)

    msg = MIMEMultipart()
    msg['From'] = SMTP_SENDER
    msg['To'] = email
    # Time zone localisation
    if(localtz):
        str_time = timestamp.astimezone(localtz).strftime(
            '%a, %d %b %Y at %H:%M:%S')
    else:
        str_time = timestamp.strftime(
            '%a, %d %b %Y at %H:%M:%S')+" (UTC)"
    # Time zone localisation
    msg['Subject'] = "Alarm Notification: " + str_time
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
