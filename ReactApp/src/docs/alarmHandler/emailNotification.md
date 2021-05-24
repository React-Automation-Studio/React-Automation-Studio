To enable email notifications the SMTP server settings must be set through environment variables.

Edit .env file and set server settings (in this example login credentials have been omitted as the server does not require login):
```bash
    SMTP_HOST=smtpserver.lab.edu
    SMTP_PORT=12345
    SMTP_SENDER=alarmnotifier@lab.edu
```

If you require server login set .env file as:
```bash
    SMTP_HOST=smtpserver.lab.edu
    SMTP_PORT=12345
    SMTP_SENDER=alarmnotifier@lab.edu
    SMTP_USER=username
    SMTP_PASS=password
```