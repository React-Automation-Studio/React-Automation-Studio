React Automation Studio is a new software platform to enable the control of large scientific equipment through EPICS.

The system has been containerized with Docker and version controlled as a mono-repository using Git.


This repository is the master repository which  contains the code base and demos for each the component and interactive UI's that depend on the demo IOC micro service.



The repository can be checked out and the demos can be explored. Contributors can also add components and add in features. The master repository is available at:

**Master repository:**

https://github.com/wduckitt/React-Automation-Studio


If you wish to customize the project and create user interfaces for your EPICS control system then you should clone the boiler plate repository at which pulls in this code base as a Git submodule:

**Boiler plate repository:**

 https://github.com/wduckitt/React-Automation-Studio-Example-Project-1




Each of the Docker containers are deployed as micro services and environment variables can be configured to deploy the system on different ports, or to enable user authentication and authorisation or to serve the application on a unique URL or on the localhost. Separate Docker commands exist to load the development and production version. These containerised environments allows for precise versioning of packages used and prevents deployment dependency issues.

The microservices that form part of React Automation Studio are shown in Fig. 1 and an overview of the system components are give below:

<img src="img/microServices.png"  width="75%">

*Fig 1. The microservices that form part of React Automation Studio*

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

React was chosen to develop the frontend for the PWA as it enables us to develop the frontend in a single language, i.e JavaScript  as opposed to conventional web development in HTML, JavaScript and CSS. The UI interfaces that we have created are highly responsive and offer a real-time experience as is shown in the example of a mobile view in in Fig. 2.

<img src="img/MobileView.png" alt="drawing" width="35%"/>

*Fig 2. An example of a Mobile View.

We have integrated selected components from the Material-UI React component framework and the React-vis graphing framework with our system to create user interfaces with the same features that we use in our current CS-Studio operator interfaces. These components have been integrated with a data connection layer which handles, input and output, meta-data for labels, limits, precision, alarm sensitivity and initialization from the pvServer.

Some components can handle multiple PVs such as the graph or single PVs such as text inputs. For each of the components the PVs name can be declared using macros. The macros are replaced at component instantiation. This allows the  design of complex user interfaces that can be reused by simply grouping the components and changing the global macro to point to another system.



<img src="img/contextMenu.png" alt="drawing" width="90%"/>


*Fig 3. An example of a context menu and a diagnostic probe user interface*

Many of the components such as TextInputs and TextOutputs have embedded diagnostic features such as a context menu and diagnostic probe as shown in figure 3.

<img src="img/beamline.png" alt="drawing" width="90%"/>

*Fig 4. An example of a desktop beamline control system ui*

Apart form mobile UIs complex UIs suitable for desktop systems can also be created as is shown in figure 4.


*3. Styleguide*

A lot of effort was put into the documentation and a style guide based on React Styleguidedist and is used as the help function and to document the use of all the components from the source files. The current style guide is also  interactive with a demo IOC. All the properties of each of the components are documented and examples of their usage are shown.

*4. Access rights and Administration*

The URL, protocol selection for HTTPS or HTTP , authentication and server ports are controlled through the environment variables.

If React Automation Studio is installed on the localhost then there is no need to enable authentication as the host authentication system will protect access.

Since Release V3.0.0 React-Automation-Studio supports web based administration of user access rights. It also supports  external authentication through Active Directory and Google and local authentication. For the local authentication passwords are stored in the database using encrypted format using Bcrypt. The client is kept authenticated using an encrypted Jason Web Token (JWT) resfresh and access tokens. When serve over HTTPS, the refresh tokens are store in cookie with http only mode and the access tokens are kep in memory. This access token is used to check authorisation and access rights for every PV request and write. If the JWT is invalidated by the server then user will be required to login.

Access rights can be controlled though web based administrator which contains user access groups,roles and rules for defining PV access using regular expressions in the same way that the EPICS Gatewayaccess is defined. All of the components in React Automation studio currently indicate access rights to the PV.

*5. MongoDB*

Since V2.0.0, React-Automation-Studio is integrated with MongoDB to store persistent data. The PyMongo driver is used within the pvServer to connect to a MongoDB replica set.

React hooks are available that setup a watch, perform an update or an insert to MongoDB replica set within the pvServer.

See the documentation in the style guide.

Currently the Alarm Handler component  and LoadSave component make use of the MongoDB database.

*6. AlarmHandler*

As of Release 3.0.0 the RAS AlarmHandler component is considered production ready.

The alarm handler is seeded through JSON files that populate the MongoDB alarm handler database. This database is also used to persist all alarm events and activity logs.

The alarm handler front end UI allows users to configure all aspects of the alarms and search through the entire alarm log. Alarm areas, subAreas and pvs can also be added/removed from the front end by alarmAdmin role users. 

A user notification platform has also been created for the alarm handler. This platform allows a user to target specific pvs to be notified about using javascript regular expressions. At present users can be notified via email and Signal messenger. In future we hope to expand this to SMS and WhatsApp.

*7. Since Release 3.0.0, Nginx serves the static files for ReactApp and the styleguide, it also handles the transport layer security and performs load balancing. Scripts were created to dynamically configure Nginx based on the enviroment variables in Section 3.
For load balancing, Nginx balances between 3 pvServers in the production versions and 1 in the dev versions.