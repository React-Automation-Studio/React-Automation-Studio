Current Release: V5.0.0

# Introduction

This is the codesanbox.io demo of React-Automation-Studio.

You can use it to evaluate the latest version without checking it out locally.

It's a forked version of the master repo with the environment set up to run in codesandbox.io.

Once you are done playing, the master repository is available at:

**Master repository:**

https://github.com/React-Automation-Studio/React-Automation-Studio


If you wish to customize the project and create user interfaces for your EPICS control system then you should clone the boiler plate repository at which pulls in this code base as a Git submodule:

**Boiler plate repository:**

https://github.com/React-Automation-Studio/React-Automation-Studio-Example-Project-1

If you wish to create a standalone AlarmHandler project you should clone this project:

**AlarmHandler Boiler plate repository:**

https://github.com/React-Automation-Studio/React-Automation-Studio-Alarm-Handler-Standalone



# Contributing

Site specific components and app screens should be kept in your repository. If you wish to contribute to the main repository for bug fixes then this must be done in  the main repository at https://github.com/React-Automation-Studio/React-Automation-Studio. If you wish to add in new components then please create them in the staging folder. If the new component requires custom EPICS code then please add it to the demo IOC.

# Contact

Contact us at Github Discussions: https://github.com/React-Automation-Studio/React-Automation-Studio/discussions

# Cite us

If you use React Automation Studio in your research, please cite us as follows:

```
@inproceedings{duckitt:icalepcs2023-fr2bco01,
  author       = {W. Duckitt and J.K. Abraham and D. Marcato and G. Savarese},
  title        = {{React Automation Studio: Modern Scientific Control with the Web}},
% booktitle    = {Proc. ICALEPCS'23},
  booktitle    = {Proc. 19th Int. Conf. Accel. Large Exp. Phys. Control Syst. (ICALEPCS'23)},
  eventdate    = {2023-10-09/2023-10-13},
  pages        = {1643--1649},
  paper        = {FR2BCO01},
  language     = {english},
  keywords     = {EPICS, controls, interface, GUI, framework},
  venue        = {Cape Town, South Africa},
  series       = {International Conference on Accelerator and Large Experimental Physics Control Systems},
  number       = {19},
  publisher    = {JACoW Publishing, Geneva, Switzerland},
  month        = {01},
  year         = {2024},
  issn         = {2226-0358},
  isbn         = {978-3-95450-238-7},
  doi          = {10.18429/JACoW-ICALEPCS2023-FR2BCO01},
  url          = {https://jacow.org/icalepcs2023/papers/fr2bco01.pdf},
  abstract     = {{React Automation Studio is a progressive web application framework that enables the control of large scientific equipment through EPICS from any smart device connected to a network. With built-in advanced features such as reusable widgets and components, macro substitution, OAuth 2.0 authentication, access rights administration, alarm-handing with notifications, diagnostic probes and archived data viewing, it allows one to build modern, secure and fully responsive control user interfaces and overview screens for the desktop, web browser, TV, mobile and tablet devices. A general overview of React Automation Studio and its features as well as the system architecture, implementation, community involvement and future plans for the system is presented. }},
}
```
or: https://doi.org/10.18429/JACoW-ICALEPCS2023-FR2BCO01

 and:

 ```
 @InProceedings{duckitt:cyclotrons2019-tha03,
  author       = {W. Duckitt and J.K. Abraham},
  title        = {{React Automation Studio: A New Face to Control Large  Scientific Equipment}},
  booktitle    = {Proc. Cyclotrons'19},
  pages        = {285--288},
  paper        = {THA03},
  language     = {english},
  keywords     = {EPICS, controls, GUI, interface, cyclotron},
  venue        = {Cape Town, South Africa},
  series       = {International Conference on Cyclotrons and their Applications},
  number       = {22},
  publisher    = {JACoW Publishing, Geneva, Switzerland},
  month        = {jun},
  year         = {2020},
  isbn         = {978-3-95450-205-9},
  doi          = {10.18429/JACoW-Cyclotrons2019-THA03},
  url          = {http://jacow.org/cyclotrons2019/papers/tha03.pdf},
  note         = {https://doi.org/10.18429/JACoW-Cyclotrons2019-THA03},
}
 ```
 or: https://doi.org/10.18429/JACoW-Cyclotrons2019-THA03


# FAQ

### 1.   Which operating systems are supported?

  The client is web based and can be accessed from any modern browser on any modern OS..

  We currently only build and test on Ubuntu and Chrome. We unfortunately don't have the time to test on the other systems. In theory all up to date Linux systems should be supported.

### 2.  Are other systems such as  Windows or Mac OS supported?

  The docker containers for RAS run in network  mode host. This is done to enable EPICS to communicate seamlessly with any IOC's on the same subnet as the host. Other OSes such as Windows may not support the host mode and will run in the bridged mode. This may break the communication between the micro services. It is therefore recommended to run the RAS containers on a Linux VM that is minimally running Ubuntu Server. Please ensure the the VM network interface is assigned an IP on the same subnet as your EPICS network in order for communication with the IOC's to occur seamlessly.



# Changelog
  V5.0.0 Friday 02 February 2024 Major Updates:
  <ul>
    <li>Package updates to Backend modules</li>
    <li>Updated to Epics 7 and Python 3.12.1</li>
    <li>Moved from Create-react-app to Vite</li>
    <li>Package updates to all Node modules</li>
    <li>Updated to the latest Node LTS</li>
    <li>MUI has been updated to the latest packages</li>

  </ul>
  New Features:
  <ul>
    <li>
      Docker multi-stage builds for speed improvements
    </li>
    <li>
      Preview of an AreaDector Appliance user interface with included simulation
    </li>
    <li>
      Named MongoDb volumes for easier management
    </li>
  </ul>
  Breaking Changes:
  <ul>
    <li>
      See the migration guide to migrate from V4.0.3 to V5.0.0
    </li>
  </ul>

 [Migrate from V4.0.3 to V5.0.0](docs/migrate-from-V4-to-V5.md)

  <br />
V4.0.3 Friday 20 October 2023 Minor Updates:
<ul>
  <li>Package updates to all Node modules</li>
  <li>Updated to the latest Node LTS</li>
  <li>MUI has been updated to the latest packages</li>
  <li>Package updates to pVServer Python packages</li>
</ul>
Minor Bug Fixes and Updates:
<ul>
  <li>
    Fixed pvServer Flask, Werkzeug dependencies.
  </li>
</ul>

<br />



V4.0.2 Thursday 13 July 2023 Minor Updates:
<ul>
  <li>Package updates to all Node modules</li>
  <li>Updated to the latest Node LTS</li>
  <li>MUI has been updated to the latest packages</li>

</ul>
Minor Bug Fixes and Updates:
<ul>
  <li>
    A few minor bug fixes to the pvServer
  </li>
</ul>

<br />

V4.0.1 Friday 24 March 2023 Minor Updates:

<ul>
  <li>Package updates to all Node modules</li>
  <li>Updated to the latest Node LTS</li>
  <li>MUI has been updated to the latest packages</li>
  <li>Changed the contact information to Github Discussions: https://github.com/React-Automation-Studio/React-Automation-Studio/discussions</li>

</ul>
Minor Bug Fixes and Updates:
<ul>
  <li>A few minor bug fixes to the slider and the context menu</li>

</ul>
Minor Breaking Changes:
<ul>
  <li>Previous version of google sign in is being deprecated (see https://developers.googleblog.com/2021/08/gsi-jsweb-deprecation.html )Solution is to replace "react-google-login" with @react-oauth/google</li>

</ul>
<br />

V4.0.0 Wednesday 3 August 2022

Major Updates:
<ul>
  <li>Update to React 18.2.0 </li>
  <li>Update to MUI 5.9.2,  see the section on breaking changes below</li>
  <li>All NodeJs packages have been updated to latest versions except react-router-dom.</li>
  <li>ReactVis was dropped and components have been updated to use Plotly.js </li>
</ul>

Minor Bug Fixes and Updates:
<ul>
  <li>Minor formatting and theme changes due  MUI update</li>
  <li>General clean up of code formatting in both pvServer and React (prior upgrading the MUI library)</li>
  <li>Addition of Poetry as Python package manager</li>
  <li>Addition of Black as a formating tool for Python. A merge request will fail if Python is not formatted accordingly. The tool Black is included into development section of Poetry.</li>
  <li>Restoration of GitHub pages build. The build excludes style guide documents because they include
    double braces ({) in examples which are treated as an output markup by Liquid.
  </li>
  <li>Minor documentation clean up: links to repositories/ projects up to date.</li>
</ul>

Breaking Changes:
<ul>
  <li>ReactVis was dropped</li>
  <li>Update to MUI 5.9.2 from Material UI 4<br/>
  Follow the migration guide at: https://mui.com/material-ui/migration/migration-v4/
  and apply the preset-safe code mods https://mui.com/material-ui/migration/migration-v4/#preset-safe
  </li>
  <li>
    If you customized any of the themes be sure to update it in line with the base themes  that come with the master repo
  </li>
  <li>Removed Deprecated ActionFanoutButton - use ActionButton instead</li>
  <li>Removed Deprecated SwitchComponent - use Switch instead</li>
  <li>Removed Deprecated SimpleSlider - use Slider instead</li>
</ul>



V3.1.0 Wednesday 25 August 2021
<br />
<br />
Minor Bug Fixes and Updates:
    <ul>
        <li>Hot fix in NodeJs Docker files for new npm registry requirements, previous releases will fail after 1 October 2021 </li>
    </ul>
<br />



V3.0.2 Monday 23 August 2021
<br />
<br />
Minor Bug Fixes and Updates:
    <ul>
        <li>pvServer: minor bug fix</li>
        <li>StyledIconIndicator: non zero values default to onColor</li>
        <li>Docker: standardised to Python 3.8.7 in all Python images</li>
    </ul>
<br />


V3.0.1 Monday 28 June 2021
<br />
<br />
Minor Bug Fixes and Updates:
    <ul>
        <li>GraphY: Fixed timestamp issue</li>
        <li>Alarmhandler:  Minor bug fixes- Implemented non blocking queue to improve Signal notification throughput</li>
        <li>Nginx: Fixed a waring on a script</li>
        <li>pvServer: minor bug fix</li>
    </ul>


<br />


V3.0.0 Monday 24 May 2021
<br />
<br />
Improvements and new features:
  <br />
  <ul>
    <li>New web based administration</li>
    <li>Nginx now serves the static files, performs the transport layer security and load balancing</li>
    <li>AlarmHandler now supports Signal notifications, improvements to the user interface</li>
    <li>Simplification of environment variables</li>
    <li>Improvement of security features, with move from Access tokens, to short lived Access tokens with Refresh tokens</li>
    <li>External Authentication via Active Directory or Google Authentication</li>
    <li>Removal of the requirement for the prefix for EPICS process variables</li>
    <li>Improvement of the MongoDb hooks</li>
    <li>Component updates:
    <ul>
        <li>GraphY is now based on Plotly</li>
        <li>GraphXY is now based on Plotly</li>
    </ul>
    </li>
    <li>Package updates</li>
    <li>Minor Bug Fixes</li>

  </ul>
Breaking changes:
<ul>
    <li>Removal of the old file based administration</li>
    <li>Environment variable names have been simplified</li>
    <li>GraphY and GraphXY background now defaults to the theme.palette.background.default value</li>

</ul>


<br />

V2.2.0 Wednesday 20 January 2021
<br />
Improvements and new features:
  <br />
  <ul>
    <li>AlarmHandler now supports email notifications</li>
    <li>New Components:
    <ul>
        <li>New ArrayContainer</li>
        <li>New LightPanel</li>
    </ul>
    <li>Upgraded to Socket.IO 3.1.0</li>
    <li>Upgraded pvServer to Flask-SocketIO 5.0.1</li>
    <li>Package updates</li>
    <li>Minor Bug Fixes</li>
    </li>
  </ul>


 V2.1.0 Tuesday 20 October 2020
<br />
  Improvements and new features:
<br />
<ul>
  <li>Added Epics Archiver Viewer component</li>
  <li>Package updates</li>
</ul>


V2.0.1 Tuesday 29 September 2020
  <br />
  Improvements and new features:
  <br />
  <ul>
    <li>Added logging to pvServer</li>
    <li>Minor bug fix to pvServer</li>
  </ul>

V2.0.0 Wednesday 5 August 2020
<br />

Improvements and new features:
<br />
<ul>
  <li>Updated to React Hooks based  components</li>
  <li>Introduction of new RasAppCore component, the logic in App.js is replaced by this component</li>
  <li>Created the new component Widget that is the base component for all Widgets.</li>
  <li>PV component substitutes old DataConnection component.</li>
  <li>Dynamic connection: When useMetadata props is false some fields, such as min, max, prec, alarm and units, are read from external PVs or an additional connection with those fields is established. By default useMetadata prop is false.</li>
  <li>New Layout with new themes.</li>
  <li>All buttons can receive and icon.</li>
  <li>All components extending MUI components can pass MUI props to the MUI components through a special prop (it changes based on the component).</li>
  <li>All components can have a tooltip.</li>
  <li>Widget base components now accept macros in the label and units</li>
  <li>Integration with MongoDb database with the addition of Mongodb hooks to setup a watch, and perform an update and insert a MongoDb document.</li>
  <li>Update of all demos to Hooks based components</li>
  <li>Update of all beam line components to Hooks based components, with new documentation</li>
  <li>Create new experimental sections to hose previews of new components</li>
  <li>Preview Components
    <ul>
      <li>
        Preview release of the Alarm Handler server and client UI
      </li>
      <li>
        Preview release of the Load/Save client UI
      </li>
    </ul>
  </li>


  <li> Deprecated Components: These components will be removed in future releases                  <br />
    <ul>
      <li>
        SimpleSlider -> Use Slider
      </li>
      <li>
        ActionFanoutButton -> Use ActionButton
      </li>
      <li>
        SwitchComponent -> Use Switch
      </li>
      </ul>
  </li>
  <li>
    Removed Component:

  <ul>
    <li>
      GraphMultiplePVs
    </li>
  </ul>
  </li>
  <li>
    Breaking Changes:

  <ul>
    <li>
    routes.js was renamed Routes.js and now contains extra logic to enable dynamic or isolated routes based on the use role.
    </li>
    <li>
    If you added extra logic to the App.js you will to adapt to the new RasAppCore component.
    </li>
  </ul>
  </li>
  <li>Packages updated in both RAS and RAS-Example-Project-1</li>

</ul>

**V1.2.4 Thursday 2 April 2020**

Minor bug fixed in the styleguide for GraphY and GraphXY
Updated to React-style-guidist 11.0.4

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
