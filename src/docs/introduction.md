React Automation Studio is a new software platform to enable the control of large scientific equipment through EPICS.

The system implements a modern tool chain with a React frontend with integrated Material-UI and ReactVis components and real time Socket-IO data transfer to a Python based PyEpics backend.
Installation occurs as a progressive web application. This enables efficient and responsive cross platform and cross device operation.


![picture](img/softwareStack.png)

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
