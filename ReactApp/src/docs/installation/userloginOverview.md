Enabling user login, authentication and https

If it is intended to run the application locally on a pc then no authentication is needed and the users' system login will protect access.

If access is required on a mobile device or from another pc then is encourage to enable HTTPS and user authentication.


To enable secure transmission of usernames and passwords it is highly recommend to enabled HTTPS as in section 3.3.

With this release the authentication  feature is quite open for customization. The authentication is handled in python backend and the authentication procedure can easily be modified to use another authentication procedure.

The current authentication method works as follows:

_Note: The administrator must first enable login ability and setup the users and access rights as described in in the next section._

The administration utility in the next section is used to create users and store the passwords in an encrypted format using Bcrypt.

The usernames and passwords are stored in json format in USERS/users.json file.

Only the administration utility should be used to edit this file.

The access rights for each user are managed in the USERS/pvAccess.json file.
Configuring this file is described in 3.2.

If the system is configured correctly then the user will be directed to the login page initially.

They will be prompted to enter the username and password.

The username and password is then  transmitted to the backend for authentication. If authenticated, the server returns an encrypted Jason web token (JWT). This is used to keep the user logged in between session. No username or password is stored in the browser. The user must logout in order cancel the session.

The JWT can also be invalidated by changing the username/ password in the administration utility.

If the JWT is invalid the user will be redirected tot he login screen.

All JWT's of all users can also be invalidated by declaring a new secret key in the USERS/SECRET_PWD_KEY file. If the SECRET_PWD_KEY file is not defined then a random key will be used and the JWTs will change everytime the server restarts.

For every process variable write the access rights are first checked to confirm if the process variable can be written to. And for every user at the initial data connection to each process variable the read access rights are checked.

If no read access rights are granted the widget on the client will display "connecting" permanently. And if no write access is granted the widget is indicated as read only.
