# RAS WIDGET CREATION

This document will describe the new proposed logic to create a *widget in React.

# LOGIC

The main components used to represent a Widget, a component connected to one or more PVs, are **ContextMenu, DataConnection, EpicsPV, LocalPV and Widget**. The following schema represents their interconnections.

![picture](./WidgetCreationDiagram.svg)

The **CustomContainer** is the component in charge of sending to **Widget** the correct props. 

The **Widget** component creates the standard state properties and class' instances to manage the behaviour of a component communicating with one or multiple PVs. This component defines the methods used to access the PVs' data and the methods to set the common widget properties (based on received *props* and the component's actual state). This component sets **CustomComponent** as its child. Moreover it forward to **CustomComponent** the **Widget**'s props and a subset of its state.

The **CostumComponent** performs operations over the received props and render the developer component.

The **ContextMenu** component allows to show the context menu (right click on mouse) and it can redirect the user to the probe page.

The **DataConnection** component is a dispatcher between the **LocalPV** and the **EpicsPV** component. Each **DataConnection** is linked to a single PV. This component does not have a graphical section. This component includes **ReactAutomationStudioContext** in order to correctly use the **LocalPV** component.

The **EpicsPV** component manages the communication with the python server; it sends and receieves information from the associated PV.

# CREATE YOUR WIDGET

In order to create your personal widget (a component connecting to one or more PVs), you need to follow these steps.

- After your **CustomComponent**'s definition, you have to create the component that will be used by the user: **CustomContainer**. You have to use the **Widget** class and create a **HOC** component. In the following an example:

    This way you are exporting, as the default class for this component, the **CustomContainer** function. That function will create a **Widget** with child your **CustomComponent**. **Widget** will establish all the connections with the PVs in a trasparent way.

    Because you exported this function as the **default** function you can import it with the name that you prefer.

      
    
    This line will import the **CustomContainer** function declared before.

- Your **CustomComponent** will have access to its own state and its props. Its props object contains the props passed to your widget when using it, the optional props passed to the **CustomContainer** component and a set of specific values, received from **Widget**, to retrieve information about the connected PVs. The set of props received from **Widget** is fixed; the accessible props are the following:

| Props | Description |
|:-:|:-|
| **alarmColor** | it returns the color associated to the current alarm state if your widget has the **alarmSensitive** props. |
| **connection** | it returns *true* if all PVs linked to this component are connected; otherwise it returns *false*. |
| **connectionList** | it is a list with the connection state of each linked PV. |
| **disabled** | based on the received props, the PVs' connection status and PVs' write access, it returns true if the component should be disabled. |
| **enumStrs** | it returns the list of possible string values. |
| **label** | it returns the label associated to the component. If the connection is not ready it returns a disconnected icon with the name of the disconnected PVs. |
| **labelPos** | it returns the label position. |
| **min** | it returns the minimum acceptable value. |
| **max** | it returns the maximum acceptable value. |
| **offColor** | it returns the color to be used when the widget is switched off (mainly used for buttons or leds). |
| **onColor** | it returns the color to be used when the widget is switched on (mainly used for buttons or leds). |
| **precision** | it returns the precision to be used. If not specified it is undefined. |
| **pvName** | it returns the PV name. |
| **pvList** | it returns the list of all PVs linked to this component. |
| **units** | it returns the units to be used. If not defined it is an empty string. |
| **value** | it returns the value to be shown on the component. If the value is a number it is already formatted using the precision or the specific format received from props. |
| **valueList** | it returns the list with the PVs' values. |
| **onUpdateWidgetBlur** | Callback to update the **Widget** *onBlur* state. |
| **onUpdateWidgetFocus** | Callback to update the **Widget** *onFocus* state. |
| **onUpdateWidgetState** | Callback to update the **Widget** *dataPVs* state. When you need to update the value on the widget you must use this callback. |
    
    Here an example on how to use the **onUpdateWidgetState** callback:

- If you want to specify a default behaviour for the **Widget** class, you can add some props or some logic to the **CustomContainer** function declared at the end of your file. Here an example:


# WIDGET COMPONENT

Each **Widget** component must received one or more PVs. For each of them developers can supply a set of macros that will be substituted at widget creation; the *createWidgetState* method (called in the constructor) executes this procedure.

**Widget** has a set of class instances and a state. The state stores the essential properties to manage user actions (i.e. open or close the menu context) and an object with the following shape: each key correspond to the name of a connected PV, each value corresponds to the data received from the **DataConnection** component.

Each custom widget can use a subset of these properties (the ones passed as props from **Widget** to your **CustomComponent**). When these are not used they do not interfer with the other variables. It may happens if you wrongly use them in your component.

When the state updates, the *render* function returns the **Widget**'s standard graphics, the **DataConnection** component, the **ContextMenu** component and your custom component. In the render function your custom widget receives the correct props (based on the **Widget**'s props and state). 

With this logic the child (developer's **CustomComponent**) will have access to all the props passed to the custom widget during its creation plus the **Widget** public properties and callbacks (discussed in the previous section).

## STATE PROPERTIES

The *createWidgetState* method creates the **Widget**'s state  in the the constructor.

When one of these properties changes it triggers a new renderization:
- *anchorEl* and *openContextMenu*: variables related to the position and the visibility of the **ContextMenu** component.
- *hasFocus*: binary flag. The widget is selected and, maybe, it is being modified by the user.
- *dataPVs*: it's an object having, as keys, the names of the connected PVs. The value associated to each key is an object with the following shape (set of properties):
  - *inputValue*: it stores the value received from the PV. (Useful if a change outside the interface happens).
  - *value*: value displayed on the interface. In temporaneous modifications (show updated value but don't send the new value to the PV) developer must use this field.
  - *outputValue*: value that will be written to the PV.
  - *metadata* and *newwMetadata*: when the PV's value changes, the widget receives the new value and a set of attributes. These attributes (extra monitored fields) are stored in this state's properties. If the widget is being modified by the user, those data are at first stored in *newMetadata*, then copied to *metadata*.
  - *initialized*: binary flag. The connection with this PV is active or not.
  - *severity*: PV's severity.
  - *timestamp*: PV's timestamp.
  - *label*: PV's *DESC* field.
  - *prec*: PV's *PREC* field.
  - *min* and *max*: they correspond respectively to the PV's *LOPR* and *HOPR* field values.
  - *newValueTrigger*: integer value to send the value to the PV also if the value does not changed at graphical level.

## CLASS INSTANCES

When the component is built for the first time, based on received props, it initializes a set of class inteances. On state's changes they may change.
- *pvNames*: it stores a list with all the PVs linked to this widget with the correct macros substitution.
- *disconnectedPVs*: everytime new data are received from a PV it updates its content with the disconnected PVs' name.
- *alarmColors*: vector of 3 colors to be used when the widget is alarm sensitive. Default values are: [nothing, orange, red].
- *writablePVs*: by default it is undefined, but developers, via props, can specify if only a subset of the given PVs is writable. Macros substitutions procedure applies also this subset.

## CALLBACKS

To manage data received from **DataConnection** or to manage user interactions, **Widget** defines some useful callbacks. The *bindWidgetCallbacks* method, called in the constructor, binds each method to a class instance. Here the callbacks and their description:
| Function | Description |
|:-:|:-|
| *handleContextMenuClose()* | It hides **ContextMenu**. |
| *handleInputField(pvName, inputValue, field)* | It updates, in the **Widget**'s state, special properties of the corresponding PV (i.e *prec, min, max* and *label*). |
| *handleInputValue(pvName, inputValue, initialized, severity, timestamp)* | It updates, in the **Widget**'s state, the properties of the corresponding PV. The updated properties are *inputValue*, *initialized*, *seveirty* and *timestamp*. If the widget is not currently selected, it stores *inputValue* also in the *value* property. Finally it updates the list of disconnected PVs. |
| *handleMetadata(pvName, metadata)* | It updates metadata values if the widget is not being modified by the user, otherwise it stores the new values in *newMetadata*. |
| *handleOnBlur()* | The widget is no more selected, udpate widget's values with the ones received from the PVs. |
| *handleOnFocus()* | The widget is currently selected. |
| *handleStateUpdate(options)* | This is the callback that will be effectively used from child component (your **CustomComponent**) to pass to **Widget** the new values. When receiving values from child it updates the **Widget**'s state. The received argument must an object. If the child compont wants to update the unique PV associated to **Widget**, it has to pass the correct properties to be updated (i.e. 'value', 'outputValue'...) and this method will update **Widget**'s state. If more PVs are linked to **Widget**, *options* must have a key for each PV the developer wants to update and each corresponding value is an object as previously described. |
| *handleToggleContextMenu(event)* | It shows **ContextMenu**. |

## GET METHODS

Some values of this component will be passed to its child as props. The component returns a unique object with all the relevant values. Inside the **Widget** class, each value is obtained through a specific *get* method. In the following, an explanation of all the get methods, is given.

| Function | Description |
|:-:|:-|
| *getAlarmColor(pvName)* | It returns the color associated to the PV's severity. |
| *getColor(color, defaultColor)* | Auxiliar function, used by *getOffColor* and *getOnColor*; it returns the correct color based on props, state and default values. |
| *getConnections()* | It returns the connection status of each PV. |
| *getContextMenu()* | It returns the **ContextMenu** component related to this widget. |
| *getDataConnection()* | It returns a list of **DataConnection** components. One for each PV linked to this widget. Moreover it defines, for each PV, if optional connections, to specific fields, should be established (such as to the *DESC* field). |
| *getDisabled()* | It returns the widget *disabled* status.  Disable widget if one PV is disconnected, or user has disabled the widget, or read access is not enabled, or the PV should be writable but it is not. If the writable list is not specified and the widget is not in *readOnly* mode all the PVs in *this.pvNames* should be writable. |
| *getDisconnectedIcon()* | Auxiliar function used by *getLabel*; it returns the icon showed when a PV is not connected to its widget. |
| *getLabel(pvName)* | It returns the widget's label. |
| *getLabelPos()* | It returns the widget's label position. |
| *getOffColor()* | It returns off color. Mainly used for leds or buttons' background. |
| *getOnColor()* | It returns on color. Mainly used for leds or buttons' background. |
| *getPvName(\[idx=0\])* | It returns the PV, at the specified index, in the array of the received PVs. If no index is specified it returns the first PV in that array. This is a special PV because it is used as default in various methods when not specified. |
| *getStringValue(pvName)* | It returns the enumeration strings associate to the PV. |
| *getTimestamp(pvName)* | It returns the timestamp associate to the PV. |
| *getTimestampList()* | It returns a list with the last timestamp of all linked PVs. |
| *getUnits(pvName)* | It returns the PV's measurement units. |
| *getValue(pvName)* | It can return one of the following: A specific metadata property (if the *displayMetaData* props is a valid one); TimeStamp (if *displayTimeStamp* props is true); Value (If the *numberFormat* is specified apply it, otherwise format value based on precision. If *prec* props is not defined, use PV's precision). It format the value when the widget is no more selected. |
| *getValueList()* | It returns a list with all the PVs' formatted values. |
| *getWidgetdetails()* | It returns an object with the following properties: **alarmColor, connection, connectionList, disabled, enumStrs, label, labelPos, min, max, offColor, onColor, precision, pvName, pvList, timestamp, timestampList, units, value, valueList, onUpdateWidgetBlur, onUpdateWidgetFocus, onUpdateWidgetState**. The last three properties are callbacks passed as props to the **Widget**'s child. |

## SET METHODS

Some values must be set before get some values. They are executed at the begin of the render method. We list them in the following.

| Function | Description |
|:-:|:-|
| *setMinMax(pvName)* | If all PVs are connected and it is specified to use the PV's min and max values it stores them in an instance variables, otherwise it uses the ones supplied from the props. They can be undefined, when this happens the logic works as if there are no limits. |
| *setPrec(pvName)* | Based on props, it chooses PV's precision or custom precision. If no precision is given it uses the value as it is. |

## OTHER METHODS

This component also has a set of auxiliar methods.

| Function | Description |
|:-:|:-|
| *changeValues()* | When receiving new values from child component it checks their validity and update the correct fields of the **Widget**'s state. |
| *isInsideLimits(value)* | It converts the received value to a float number and checks that it is inside limits; if not it cuts that value to the reached limit. |
| *isConnectionReady()* | It returns *true* if all PVs are connected to the widget. |
| *wrapComponent(ComponentName, props)* | It wraps the received component into a new component with the given parameters. |

## PROPS

This class expects a set of props. **Widget** receives these props from **CustomContainer**; for this reason it is important, for developers, to know the possible standard props that **Widget** can receive and if they have a default value. Here the list:

| Props | Type | Default Value | Description |
|:-:|:-:|:-:|:-|
| **alarmSensitive** | *bool* | false | Directive to use the EPICS alarm severity status to alter the fields background color. |
| **debug**| *bool* | false | If defined, then **Widget** (and its children) debugging information will be displayed on the console. |
| **disabled** | *bool* | false | Directive to disable the button. |
| **disableProbe** | *bool* | false | Directive to disable the probe page for a widget. |
| **displayMetaData** | *string* | undefined | If defined, then the *metadata*'s property, defined as input string, of the PV will be displayed instead of its value. eg. displayMetaData='lower_disp_limit'. |
| **displayTimeStamp** | *bool* | false | If defined, then the timestamp of the PV will be displayed instead of its value. |
| **initialLocalVariableValue** | *string* | undefined | Local variable initialization value. When using loc:// type PVs. |
| **label** | *string* | undefined | Custom label to be used, if *usePvLabel* is not defined. |
| **labelPosition**| One between **start**, **end**, **top** or **bottom** | undefined | Custom label position. |
| **macros** | *object* | undefined | Array of macros and corresponding values to substitute in the received *pv* props (PVs' names). eg. {{'$(device)':'testIOC','$(id)':'2'}} |
| **max** | *float* | undefined | Custom maximum value to be used, if *usePvMinMax* is not defined. |
| **min** | *float* | undefined | Custom minimum value to be used, if *usePvMinMax* is not defined. |
| **numberFormat** | *object* | undefined | If defined, then the string representation of the number can be formatted using the mathjs *format* function eg. numberFormat={{notation: 'engineering',precision: 3}}. See https://mathjs.org/docs/reference/functions/format.html for more examples. |
| **onColor** | *string* | primary | Custom *on* color to be used, must be derived from Material UI theme color's. |
| **offColor** | *string* | secondary | Custom *off* color to be used, must be derived from Material UI theme color's. |
| **prec** | *integer* | undefined | Custom precision to round value, if *usePvPrecision* is not defined. |
| **pv** | *array* or *string* (Required) | undefined | List of the PVs, or the single PV to which the widget will be connected. When using multiple PVs order is important because you will use this property to referce to specific PVs inside your widget. Each name must contain the correct prefix (pva:// or loc://) eg. 'pva://\$(device):test\$(id)' |
| **readOnly** | *bool* | false | Widget is in read only mode. This information influences the disable logic and the probe page appearance. |
| **stringSeverity** | object | undefined | Object with a string and the corresponding severity value. When PV's value is equal to the string, set the corresponding severity in the widget's severity. Example: { stringMatch: '1', severity: 2 }. |
| **units** | *string* | undefined | Custom units to be used, if *usePvUnits* is not defined. |
| **usePvLabel** | *bool* | false | Directive to fill the component's label with the value contained in the PV's DESC field. |
| **usePvMinMax** | *bool* | false | Directive to use the *HOPR* and *LOPR* PV's fields to limit the maximum and minimum values. |
| **usePvPrecision** | *bool* | false | Directive to round the value using the *PREC* PV's field. |
| **usePvUnits** | *bool* | false | Directive to use the units contained in the *EGU* PV's field. |
| **useStringValue** | *bool* | false | Directive to use PV's string values. |
| **writablePVs** | *array* or *string* | undefined | Array with writable PVs list. It is a subset of the PVs supplied to *pv*. |

> **WARNING**: These props must be supplied to your custom widget in order to arrive to **Widget** but they should not be used (except for extra rare cases) inside **CustomComponent**! 

# WIDGETUTILS CLASS

Some procedures may be useful in different **CustomComponent**. **WidgetUtils** class is a library exporting different hooks. Here a list of the actual hooks.

| Hook / Function | Description |
|:-:|:-|
| *getLegend(legendProps, legendColor, theme)* | It returns a *DiscreteColorLegend* to be used as legend in Graphs. |
| *formatTime(timestamp, \[extended=false\])* | It formats the received timestamp. If *extended* is *true* ot returns the complete date otherwise only hours, minutes and seconds. |
| *areArrayEqual(array1, array2)* | Check if two arrays are equals. |
| *log10Conversion(value)* | Apply log10 convertion to the given array. If one array's element is lower than, or equal to, zero it returns *null* for that value. |

# GENERAL NOTIONS AND ADVANCED LOGIC

- In your **CustomComponent** uses only the props received from **Widget** (the properties of the object returned from the *getWidgetDetails* method) and the specific custom props of your widget.
- When updating **Widget**'s state from child component always update, if you want a standard behaviour, **value** and **outputValue** fields. Remember that *value* is the value graphically displayed, and *outputValue* is the value send to the PV.
- All *BaseComponent widgets* use all the parents component's space. If you want to restrain it, you need to specify a size to the parent. Overflowing text is hidden. 
- Widget can write the *outputValue* as a string or a number (It's the same).
- When you need to check if the *value* is equal to a number, use *parseInt* or *parseFloat* methods. The 0 value may have a strange behaviour.
- Binary PVs can have a severity status but this is not controlled at graphical level.
- If you want to use your widget in *readOnly* mode pass the *readOnly* props when creating the **CustomContainer** in your file. 
- If you want to pass subset of PVs you can do this but in the **CustomContainer** definition you must group them all and pass them as a unique array to the *pv* props of **Widget**. Then, in **CustomComponent**, you will use those PVs based on the order you supplied them to the *pv* props. \[See GraphXY component for a clearer example\].
- In GraphXY if more yPVs refers to the same xPV you must supply the same xPV multiple times to the *xPVs* props. Order does matter!
- **WidgetUtils** class contains some useful methods that can be shared between different components.
- *useTimestamp* props in **GraphY** can be used only if the associated PV is an array of length 1 or not an array.
- *triggerOnSingleValueChange* can be used only when monitoring non array PVs. When *usePolling* is defined *triggerOnSingleValueChange* is not used.
- To read *HOPR*, *LOPR* and *PREC* fields the metadata logic partially works. This logic can read the initial state when connecting to the PV but when one of this fields updates the component does not receive the updates. To overcome this issue, the previous logic used to connect to the *DESC* field, has been replicated, when needed, also for *HOPR*, *LOPR* and *PREC*.
