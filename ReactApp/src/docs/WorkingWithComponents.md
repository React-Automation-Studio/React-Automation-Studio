The next sections list all the components that can be used in React-Automation-Studio.

Usage examples  and all the properties for all the components are given. The components are all interactive with the Demo IOC.

The documentation is still a work in progress,so let us know if spot something that is not clear.

Of all the properties for the components the `pv`  property is  always required. Macros can be used and must be defined in the `macros` property.

To connect to EPICS, the `pv` property must contain the prefix `pva://` eg. `pva://$(device):test$(id)`

Local variables are supported by using the prefix `loc://`.

**Note:** Local variables are only valid in the current window.

In future, new protocols may be added by defining new prefixes.

Currently only the base components are documented.

In future releases the system components will be documented, as well as the SVG components that are used in the beam line control system examples.
A strategy to create your own components  will also be documented. For now you will need to browse the source code to see how it is done...

The TextInput component should form a good base for creating new components with a single PV and the TextUpdateMultiplePVs and GraphY components for creating components with multiple PVs.
