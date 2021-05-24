The props that are forwarded to he child component are detailed in the table below:

| Forwarded Props |Type |Default | Description |
|:-:|:-|
|props|object|| all the props provided to the widget as describe in the props&methods section below.
|initialized|bool|false|true if all the pvs specified in the pv and pvs props are initialized, and all the forwarded props are valid,
|pvName|string|""| The name of the pv after the macros have been applied. Valid after initialization.
|value|any|""| The pv value. Valid after initialization.
|min|number||The derived min value from usePvMinMax or min prop. Valid after initialization.
|max|number||The derived max value from usePvMinMax or max prop. Valid after initialization.
|label|string||The derived label from usePvLabel or label prop. Valid after initialization.
|formControlLabel|||The derived formControlLabel  *logic:* ` initialized?label :<span>{disconnectedIcon}{" "+pvName}</span>` Feed this directly into the label prop of a formControlLabel component.
|units|number||The derived units from usePvUnits or units prop. Valid after initialization,
|disabled|bool|true|Disabled is derived from `initialized !== true  OR readOnly` ,
|readOnly|bool|true| False if the widget has write access to the pv or pvs.
|alarmSeverity|number|0| pv alarm severity, 0=no alarm, 1=minor alarm, 2=major alarm.
|enumStrs||| enumerator strings  derived from the pv's metadata.enum_strings or custom_selection_strings
|disconnectedIcon|svgIcon||: Use the disconnectedIcon to indicated if the pv is not initialized
|handleChange|callback|| The handleChange can called from any components handleChange callback, it accepts a value, and updates the widgets value state variable with it. The value is not written to the pv value until the handleCommitChange callback is called.
|handleCommitChange|callback||The handleCommitChange callback commits the value in widget's state and writes it out to the pv and all the pvs values
|handleImmediateChange|callback||The handleImmediateChange can be called from any components onChange callback, it accepts a value, and updates the widgets value state variable with it and then writes out the value to the pv.
|handleFocus|callback||The handleFocus callback sets the widgets focus to true. Connect to any components onFocus callback
|handleBlur|callback||The handleBlur callback sets the widgets focus to false. Connect to any components onBlur callback
|pvData|Object||An object that contains the PV component derived from pv prop. Valid after initialization.
|pvsData|Array of Objects||And object that contains an array of all the PV components derived from pvs prop. Valid after initialization.      
      

For Examples on how to use the widget see the simple example below or have a look at any of the components in the base components folder.
Simple example usage:

```js static
 import { withStyles } from "@material-ui/core/styles";
 import Widget from "path to Widget";
 const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
 })

  const ExampleComponent=(props)=>{
      const {value,initialized}=props;
      const content=initialized?<span>{value}</span>:props.formControlLabel;
      return(
        {content}
      )
  }
  const Example=(props)=>{
    return (
      <Widget {...props} component= {ExampleComponent}/>

    )
  }

Example.propTypes = {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
   /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
}

Example.defaultProps = {
  debug: false,
 
};

export default withStyles(styles, { withTheme: true })(Example)

```