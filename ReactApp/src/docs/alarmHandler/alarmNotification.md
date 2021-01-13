The alarm handler can be configured to notify a user when an alarm is triggered. Currently the alarm handler can only notify via email. In future we hope to expand this to SMS and WhatsApp.

**Email notification**<br/>
The alarm server uses the Python [smtplib module](https://docs.python.org/3/library/smtplib.html) to define an SMTP client session object that can be used to send mail to any machine with an SMTP or ESMTP listener daemon.

The SMTP server settings are configured through environment variables as shown in the section <b>Setting Up Alarm Server</b>.