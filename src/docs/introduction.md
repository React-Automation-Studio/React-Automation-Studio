React Automation Studio is a new software platform to enable the control of large scientific equipment through EPICS.

The system has been containerised with Docker and version controlled as a mono-repository using Git.

Each of the Docker containers are deployed as micro services and environment variables can be configured to deploy the system on different ports, or to enable user authentication and authorisation or to serve the application on a unique URL or on the localhost. Separate Docker commands exist to load the development and production version. These containerised environments allows for precise versioning of packages used and prevents deployment dependency issues.

The software stack for React Automation Studio is shown in Fig. 1 and an overview of the system components are give below:

<img src="img/softwareStack.png"  width="75%">

*Fig 1. The current software stack and an example mobile layout.*

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



*3. Styleguide*

A lot of effort was put into the documentation and a style guide based on React Styleguidedist and is used as the help function and to document the use of all the components from the source files. The current style guide is also  interactive with a demo IOC. All the properties of each of the components are documented and examples of their usage are shown.

*4. Access rights and Administration*

The URL, protocol selection for HTTPS or HTTP , authentication and server ports are controlled through the environment variables.

If React Automation Studio is installed on the localhost then there is no need to enable authentication as the host authentication system will protect access.

In this release, and with authentication enabled, the user name and password are managed through an administrator Docker environment through the command line. Passwords are stored on the server in encrypted format using Bcrypt. In future releases this may be replaced by a web based administration page. The default authentication procedure can easily be modified to suite a different environment and point to an authentication server. The client is kept authenticated using an encrypted Jason Web Token (JWT). This JWT is used to check authorisation and access rights for every PV request and write. If the JWT is invalidated by the server then user will be required to login.

Access rights can be controlled though a JSON file which contains user access groups and rules for defining PV access using regular expressions in the same way that the EPICS Gatewayaccess is defined. All of the components in React Automation studio currently indicate access rights to the PV.
