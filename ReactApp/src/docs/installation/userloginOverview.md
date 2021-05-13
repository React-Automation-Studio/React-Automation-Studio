If it is intended to run the application locally on a pc then no authentication is needed and the users' system login will protect access.

If access is required on a mobile device or from another pc then is encourage to enable HTTPS and user authentication.


To enable secure transmission of usernames and passwords it is highly recommend to enabled HTTPS as in section 3.3.

With this release the authentication  feature is quite open for customization. The authentication is handled in python backend and the authentication procedure can easily be modified to use another authentication procedure.

The current authentication method works as follows:

_Note: The administrator must first enable login ability and setup the users and access rights as described in 3.1._

The administrator page in 3.1 is used to create users or link with an external authenticator.


If the system is configured correctly then the user will be directed to the login page initially.

They will be prompted to enter the username and password or authenticate useing the external authenticator.

The username and password or token is then  transmitted to the backend for authentication. If authenticated, the server returns  encrypted Jason web token (JWT) in the form on an access and refresh token. This is used to keep the user logged in between session. No username or password is stored in the browser. The user must logout in order cancel the session.


If the access token is invalid the user will be redirected to the login screen. The default access, and refresh token expiry is 300 seconds and 1 week. By default the access token and refresh tokens are rfreshed once a minute.

All tokens of all users can also be invalidated by declaring a new secret key in the  environment variable: `SECRET_PWD_KEY` . If the `SECRET_PWD_KEY`  is not defined then a predefined key will be used .

For every process variable write the access rights are first checked to confirm if the process variable can be written to. And for every user at the initial data connection to each process variable the read access rights are checked.

If no read access rights are granted the widget on the client will display "connecting" permanently. And if no write access is granted the widget is indicated as read only.
