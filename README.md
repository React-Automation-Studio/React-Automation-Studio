# Introduction

React Automation Studio is a new software platform to enable the control of large scientific equipment through EPICS.

The system has been containerised with Docker and version controlled as a mono-repository using Git.


This repository is the master repository which  contains the code base and demos for each the component and interactive UI's that depend on the demo IOC micro service.



The repository can be checked out and the demos can be explored. Contributors can also add components and add in features. The master repository is available at:

**Master repository:**

https://github.com/wduckitt/React-Automation-Studio


If you wish to customize the project and create user interfaces for your EPICS control system then you should clone the boiler plate repository at which pulls in this code base as a Git submodule:

**Boiler plate repository:**

 https://github.com/wduckitt/React-Automation-Studio-Example-Project-1




Each of the Docker containers are deployed as micro services and environment variables can be configured to deploy the system on different ports, or to enable user authentication and authorisation or to serve the application on a unique URL or on the localhost. Separate Docker commands exist to load the development and production version. These containerised environments allows for precise versioning of packages used and prevents deployment dependency issues.

The software stack for React Automation Studio is shown in Fig. 1 and an overview of the system components are give below:

![picture](./ReactApp/img/softwareStack.png)

*Fig 1. The current software stack and an example mobile layout*

An overview of the system components are give below:

*1. pvServer*

This is the python process variable server. It is layered on the Flask and  Flask-Socket-IO web application frameworks to serve the EPICS process variables to clients.

Communication between clients and the pvServer occurs between the data connection wrapper in the client components and the pvServer as follows:

The client initially makes a Socket-IO connection to the pvServer. Depending if authentication is enabled the client will first be authenticated, thereafter the  data connection wrapper will emit Socket-IO events to the pvServer requesting access to the EPICS variable.

Depending on the clients access rights, access is either denied or the socket connection is placed in a Socket-IO room with read-only or read-write privileges but with same name as PV. EPICS CA to the required process variables are established and the PyEpics PV is stored in a list, the connection and value change call backs of the PyEpics CA are used to emit meta-data, connection status and value changes to the read-only and read-write rooms. The PV name is used as the event name.

In the data connection layer of the clients components, an event listener that is tied to the PV name is registered on the Socket-IO connection for each instantiation of the component. This allows efficient asynchronous update of each listening component when the pvServer emits the PVs event update.

The only difference between the read-only and read-write rooms is that the write-access field of the meta-data has been changed to read-only based on the access rights and that for a read-write room the write access field is inherited from security rights defined by the EPICS IOC or gateway.

Similarly for writes to an EPICS variable, depending on the access rights, the client is either granted  or denied permission to write to the variable.

*2. React frontend*

React was chosen to develop the frontend for the PWA as it enables us to develop the frontend in a single language, i.e JavaScript  as opposed to conventional web development in HTML, JavaScript and CSS. The UI interfaces that we have created are highly responsive and offer a real-time experience as is shown in the example of a mobile view in in Fig. 1.

We have integrated selected components from the Material-UI React component framework and the React-visgraphing framework with our system to create user interfaces with the same features that we use in our current CS-Studio operator interfaces. These components have been integrated with a data connection layer which handles, input and output, meta-data for labels, limits, precision, alarm sensitivity and initialisation from the pvServer.

Some components can handle multiple PVs such as the graph or single PVs such as text inputs. For each of the components the PVs name can be declared using macros. The macros are replaced at component instantiation. This allows the  design of complex user interfaces that can be reused by simply grouping the components and changing the global macro to point to another system.


![picture](./ReactApp/img/contextMenu.png)

*Fig 2. An example of a context menu and a diagnostic probe user interface*

Many of the components such as TextInputs and TextOutputs have embedded diagnostic features such as a context menu and diagnostic probe as shown in figure 2.

![picture](./ReactApp/img/beamline.png)

*Fig 3. An example of a desktop beamline control system ui*

Apart form mobile UIs complex UIs suitable for desktop systems can also be created as is shown in figure 3.


*3. Styleguide*

A lot of effort was put into the documentation and a style guide based on React Styleguidedist and is used as the help function and to document the use of all the components from the source files. The current style guide is also  interactive with a demo IOC. All the properties of each of the components are documented and examples of their usage are shown.

*4. Access rights and Administration*

The URL, protocol selection for HTTPS or HTTP , authentication and server ports are controlled through the environment variables.

If React Automation Studio is installed on the localhost then there is no need to enable authentication as the host authentication system will protect access.

In this release, and with authentication enabled, the user name and password are managed through an administrator Docker environment through the command line. Passwords are stored on the server in encrypted format using Bcrypt. In future releases this may be replaced by a web based administration page. The default authentication procedure can easily be modified to suite a different environment and point to an authentication server. The client is kept authenticated using an encrypted Jason Web Token (JWT). This JWT is used to check authorisation and access rights for every PV request and write. If the JWT is invalidated by the server then user will be required to login.

Access rights can be controlled though a JSON file which contains user access groups and rules for defining PV access using regular expressions in the same way that the EPICS Gatewayaccess is defined. All of the components in React Automation studio currently indicate access rights to the PV.





# 1 Installation
The development and production versions of React Automation Studio have been containerized with Docker.

It is advised to only use the containerized version.



Prerequisites: git , latest version of docker-ce and docker compose

To install docker-ce on Unbuntu 18.04 follow:

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

And docker-compose:

https://docs.docker.com/compose/install/


1st clone this repo:

```bash
git  clone https://github.com/wduckitt/React-Automation-Studio.git

```

Then in React Automation Studio installation folder run:
```bash
touch .env
```
# 2 Launching the Docker compose files
The systems uses Docker to create isolated production and development environments. There are several docker-compose configuration files.


```bash
docker-compose  up
```
or
```bash
docker-compose -f docker-compose.yml up
```
Will launch the compiled production version with the demoIOC's and styleguide



```bash
docker-compose -f docker-compose-dev.yml up
```
Will launch the development version with the demoIOC's and styleguide.



```bash
docker-compose -f docker-compose-administator.yml run administrator

```
will launch the username, login and password administration functions environment.


And:

```bash
docker-compose -f docker-compose-dev-styleguide-dev.yml up
```
Will launch the development version of the styleguide.

**Note**: Any of the above containers can be rebuilt by add **--build** at the end of the command.






**Initially to check that everything is working only bring up the production version by running**

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


# 4 Folder structure
This section has some notes on  systems folder structure:

The installation folder is referenced below  as:
```bash
./
```
`./administrator`contains the source files for the user administration utility

Inside: `./certificates`the certificates according to 3.3 are placed.

Inside: `./docker`the docker files that build the conatiners that are used by the docker-compose files are placed.

Inside: `./epics`the demo  IOC that interacts with the Demo react screens is located.

`./frontendServer`contains the source files for Node Express serves that serves the client UIs.

`./pvServer`contains the source files for EPCIS process variable server.



`./ReactApp`contains the source files for the web app. They can be edited as is described in Section 2.

`./styleguideServer`contains the source files for Node Express serves that serves the style guide.

`./users` contains the user access configuration files as per section 3.

# 5 Running the web app as PWA

The automatic PWA installation notification is currently disabled. Installation can still occur manually.

On a mobile running Chrome, whilst viewing the website, click on the 3 dots at the top right and then click add to home. Follow the onscreen instructions to install.

On a desktop running Chrome, whilst viewing the website, click on the 3 dots at the top right and the click more tools and then create shortcut. Tick open as window and then create and the PWA will be installed on your desktop.

**Note**: Unless HTTPS is enabled then when viewing the PWA, a banner at the top stating that the webapp is unsecure will appear,

# 6 Theme and color scheme
The theme and color scheme is currently hard coded but can be edited in `ReactApp/src/App.js` on line 66.

# 7 Contributing

Site specific components and app screens should be kept in your repository. If you wish to contribute to the main repository for bug fixes then this must be done in  the main repository at https://github.com/wduckitt/React-Automation-Studio. If you wish to add in new components then please create them in the staging folder. If the new component requires custom EPICS code then please add it to the demo IOC.

# 8 Contact

Contact us at rasadmin@tlabs.ac.za

# Changelog

**V1.2.3 Wednesday 11 March 2020**
Node 12.16.1 LTS
Material UI 4.9.5
React-style-guidist 11.0.1
Fixed height props and added in an aspect ratio in the progress bar and tank components
**V1.2.1 Monday 17 February 2020**
Minor updates

Updated to React-Scripts 3.4.0

**V1.2.0 Tuesday 11 February 2020**
Major updates

Updated to React 16.12.0
Updated to Material-UI 4.9.2
Updated to Node LTS 12.15.0

Changed the version of Python in pvServer to 3.7.5 from 3.7







**V1.1.0 Thursday 28 November 2019**
Note: The compile of PyEpics breaks with the latest version of the Python 3.7 docker image and appears to be an issue in Python 3.7.6.
Either fix the dockerfile to version 3.7.5 or move to React Automation Studio V1.2.0 -11 February 2020


Changed disconnection indicators for all components

Components added:
BitIndicators
GraphXY
GraphY

Components to be deprecated in future:
GraphMultiplePVs, replacement is GraphY

Major package updates:

Updated to React 16.11.0
Updated to Material-UI 4.7.0
Updated to Node LTS 12.13.1

**V1.01 Friday 25 October 2019**

Minor bug fix to Selection List and Radio Button Group components

Updates to documentation, explanations of initial local variable value properties that were missing from some components.

**V1.00 Monday 21 October 2019**
Initial Public Release
