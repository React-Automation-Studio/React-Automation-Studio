The alarm handler can be configured to notify a user when an alarm is triggered. Currently the alarm handler can only notify via email or the Signal messenger app. In future we hope to expand this to SMS and WhatsApp.

**Email notification**<br/>
The alarm server uses the Python [smtplib module](https://docs.python.org/3/library/smtplib.html) to define an SMTP client session object that is used to send mail to a machine with an SMTP or ESMTP listener daemon.

The SMTP server settings are configured through environment variables as shown in the section <b>Setting up email notifications</b>. The `SMTP_USER` and `SMTP_PASS` variables do not need to be declared if the smtp server does not require login. Once the SMTP server settings have been configured correctly, users that have been set to notify via email in the user notification setup (see section <b>User notification view
</b>) will be notified via email.

**Signal notification**<br/>
The alarm server uses the Python [signal-cli-rest-api](https://github.com/SebastianLuebke/signal-cli-rest-api) to interact with the Signal command line interface through http requests.

The Signal server settings are configured through environment variables as shown in the section <b>Setting up Signal notifications</b>. The Signal account must subsequently be linked to the server as described in the same section. Once the Signal server has been linked correctly, users that have been set to notify via Signal in the user notification setup (see section <b>User notification view </b>) will be notified via Signal.

All notification events, including failures to notify, are logged in the global alarm handler log and can be viewed in the front end (user interface).
