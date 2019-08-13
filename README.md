# Introduction

React Automation Studio is a new software platform to enable the control of large scientific equipment through EPICS.

The system implements a modern tool chain with a React frontend with integrated Material-UI and ReactVis components and real time Socket-IO data transfer to a Python based PyEpics backend.
Installation occurs as a progressive web application. This enables efficient and responsive cross platform and cross device operation.

The current software stack is show in Fig1.

![picture](img/softwareStack.png)
*Fig 1. The current software stack*

This React Automation Studio is built in 4 components:

*1. pvServer*

This is the python process variable server. Process variable requests are made from the multiple connected clients, the pvServer makes a connection to the EPICS process variable and serves the process variable meta data and live values to clients through socket-IO events.

The pvServer support user login and authentication and can be enabledby altering the environment variables.

*2. React frontend*

 The React frontend is  integrated with Material-UI and ReactVis components that have data a connection wrapper around them that allow connection to the pvServer through a single socket.

 Some components can handle multiple PVs such as the graph or single PVs such as text inputs. For each of the components the PVs name can me declared using macros. The macros are replaced at run time.
 This allows  the complex design of user interfaces that can be reused by simply grouping the components and changing the global macro to point to another system.

 By using Material-UI's grid layout system responsive UI's can be implemented  across platforms and across multiple devices.

A lot of effort was put into the documentation and the style guide should be launched to view how to use and instantiate the components.



*3. Styleguide*

The style guide is based on Reactstyleguidedist and is used to document the use of all the components from the source files. The current style guide is interactive with the demo IOC.

*4. Demo Epics IOC*

The repository comes with a demonstration IOC that enables the frontend demos to connect live to a real time system.



# 1 Installation
The development and production versions of React Automation Studio have been containerized with Docker.

It is advised to only use the containerized version.



Prerequisites: git , latest version of docker-ce and docker compose

To install docker-ce follow:

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

And docker-compose:

https://docs.docker.com/compose/install/


1st clone this repo


Then in React Automation Studio installation folder run:
```bash
touch .env
```
# 2 Launching the Docker compose files
The systems uses Docker to create isolated production and development environments. There are three docker-compose configuration files.

```bash
docker-compose  up
```
or
```bash
docker-compose -f docker-compose.yaml up
```
Will launch the compiled production version without the demoIOC's and styleguide


```bash
docker-compose -f docker-compose-dev.yml up
```
Will launch the development version with the demoIOC's and styleguide.
And:

```bash
docker-compose -f docker-compose-administator.yml run administrator
```
will launch the username, login and password administration functions environment.

Initially to check that everything is working only bring up the production version by running

```bash
docker-compose  up
```

This installation process of all the docker images may take a while (20-30min) the first time. There after it is fast as all the repeated build and up commands uses cached installations. The longest process is the installation of the node modules. Do not be deterred by the red warnings.

This default installation will serve the  app at http://127.0.0.1:9000 and the style guide at http://127.0.0.1:6060.


To launch the development environment make sure the production version is stopped,and the run :
```bash
docker-compose -f docker-compose-dev.yml up
```
This will launch the pvServer, demo IOC ,style guide and the React Development environment. As with the production version the first run may take awhile. There after it is fast as all the repeated build and up commands uses cached installations.

The react development environment app will be served on http://127.0.0.1:3000 and the styleguide at http://127.0.0.1:6060.

The source can then be edited using your favorite editor like Atom, when the file is saved the project automatically recompiles and the web page is refreshed. It is recommended to only work in the
/src/components/staging/ folders.

Bug fixes and contributions can be submitted via pull requests.

To change the URL, ports, and enable user authentication See section 6.1 and 6.2




# 3 Enabling user login, authentication and https

If it is intended to run the application locally on a pc then no authentication is needed and the users' system login will protect access.

If access is required on a mobile device or from another pc then is encourage to enable HTTPS and user authentication.


To enable secure transmission of usernames and passwords it is highly recommend to enabled HTTPS as in section 3.3.

With this release the authentication  feature is quite open for customization. The authentication is handled in python backend and the authentication procedure can easily be modified to use another authentication procedure.

The current authentication method works as follows:

_Note: The administrator must first enable login ability and setup the users and access rights as described in 3.1._

The administration utility in 3.1 is used to create users and store the passwords in an encrypted format using Bcrypt.

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




## 3.1 Enabling login and authentication

First cd to React Automation Studio installation directory

Set up the .env to enable login:
```bash
cd ..
ls .env
```
If the .env file exists in the root folder, then edit it and set :
```bash
REACT_APP_EnableLogin=true
```
If the .env file does not exist in the root folder, then:
```bash
cp example.env .env
```
 then edit .env and set:
```bash
REACT_APP_EnableLogin=true
```
Make sure that the other parameters in the file are correct. Or see 4.1:

The administration utility is used to create users and store the passwords in an encrypted format using Bcrypt.

The usernames and passwords are stored in json format in USERS/users.json file.

Only the administration utility should be used to edit this file.


To launch the admin utility:
```bash
docker-compose -f docker-compose-administator.yml run administrator
```

There are five scripts than can be run:

To add a user launch:
```bash
admin-add-user
```
To change a user password:
```bash
admin-change-user-password
```
To confirm a user password:
```bash
admin-check-user-password
```
To delete a user launch:
```bash
admin-del-user
```
To list all users launch:
```bash
admin-list-users
```
## 3.2 Enabling user access rights

The access rights for each user are managed in the USERS/pvAccess.json file.

The pvAccess.json file an be created by placing the contents of the example.pvAccess.json in a new pvAccess.json file.

The rules defined in the pvAccess.json file are loaded each time pv Server is restarted.

For every process variable write, the access rights are first checked to confirm if the process variable can be written to. And for every user at the initial data connection to each process variable the read access rights are checked.

If no read access rights are granted the widget on the client will display "connecting" permanently. And if no write access is granted the widget is indicated as read only.

Regular expression rules are used to evaluate the read and write access rights.

The order in which the user access groups and rules are defined are important. The lowest priority is at the top  and highest priority which can overwrite the previously defined rules is at the bottom.

For example in the default user access group, the rules disables write access and enable read access for all usernames and process variables:

```json
"DEFAULT":
    {
      "usernames":["*"],
      "rules":
      [
        { "rule":"[0-9].*",                   "read":true,  "write":false },
        { "rule":"[a-z].*",                   "read":true,  "write":false },
        { "rule":"[A-Z].*",                   "read":true,  "write":false }


      ]
    }
```
To enable write access for everyone one could change the default to as follows.
```json
"DEFAULT":
    {
      "usernames":["*"],
      "rules":
      [
        { "rule":"[0-9].*",                   "read":true,  "write":true },
        { "rule":"[a-z].*",                   "read":true,  "write":true },
        { "rule":"[A-Z].*",                   "read":true,  "write":true }


      ]
    }
```

Although it is more ingenious to create separate user access groups and to define access for specific users. The example below first denies user1 and user2 access to all process variables and enables read access to all pvs that start with "pva://testIOC:Harp1", "pva://testIOC:FC2" and "pva://testIOC:amplitude". And only enables write access for "pva://testIOC:amplitude".

```json
"UAG1":
{
  "usernames":["user1","user2"],
  "rules":
  [
    { "rule":"[0-9].*",                   "read":false,  "write":false },
    { "rule":"[a-z].*",                   "read":false,  "write":false },
    { "rule":"[A-Z].*",                   "read":false,  "write":false },
    { "rule":"^pva://testIOC:Harp1",      "read":true, "write":false },
    { "rule":"^pva://testIOC:FC2",        "read":true,  "write":false },
    { "rule":"^pva://testIOC:amplitude",  "read":true,  "write":true }

  ]
}
```

In theory, all regular expression allowed by Python regex can be used although this has not been tested. More examples are available at: https://www.w3schools.com/python/python_regex.asp



## 3.3 Enabling https
The system is by default configured to serve the socket connections and client webserver over HTTP on localhost.

To enable secure login and installation as a PWA, a certificate and key needs to be installed that is bound to your hostname and the .env environment variables need to be edited to serve overs HTTPS and via the correct hostname.

Inside the React Automation Studio installation folder:

```bash
ls .env
```
If it exists edit the .env file, otherwise copy example.env to .env and set

```bash

REACT_APP_PyEpicsServerBASEURL=https://customURL
REACT_APP_EnableLogin=false
REACT_APP_FrontendServerPORT=9000
REACT_APP_PyEpicsServerPORT=5000
REACT_APP_PyEpicsServerStyleguidePORT=5001
REACT_APP_StyleguideServerPORT=6060
REACT_APP_EnableLoginStyleguide=false
```
to https and the correct hostname

The certificates need to be placed in the the React Automation Studio installation folder under the certificates folder.

The certificate needs to be called: server.cer And the key needs to be called: server.key The .gitignore will prevent them from being copied to the repository



The pvServer and node development environment, will need to be restarted, and the production environments will need to be rebuilt.

Both the pvServer and the node clientserver will automatically detect the change.

The built client will be then served  https://customURL:9000/, the styleguide at https://customURL:6060/ and the dev client at http://127.0.0.1:3000/ or http://hostip:3000/
