
<img src="img/WidgetCreationDiagram.svg"  >


Generic Widget pass a function to its children:
In the child component the following varaibles and callbacks are exposed though the props:

Update documentation later on....

``` js static
 // Variables and components.
      alarmColor: this.getAlarmColor(pvName),
      alarmSeverity: this.getAlarmSeverity(pvName),
      connection: this.isConnectionReady(),
      connectionList: this.getConnections(),
      disabled: this.getDisabled(),
      enumStrs: this.getStringValue(pvName),
      label: this.getLabel(pvName),
      min: this.getMin(pvName),
      max: this.getMax(pvName),
      offColor: this.getOffColor(),
      onColor: this.getOnColor(),
      precision: this.getPrec(pvName),
      pvName: pvName,
      pvList: this.pvNames,
      timestamp: this.getTimestamp(pvName),
      timestampList: this.getTimestampList(),
      units: this.getUnits(pvName),
      value: this.getValue(pvName),
      valueList: this.getValueList(),
      // Callbacks.
      onUpdateWidgetBlur: this.handleOnBlur,
      onUpdateWidgetFocus: this.handleOnFocus,
      onUpdateWidgetState: this.handleStateUpdate,
```

Generic Widget example that creates a span and display the EPICS pv's value:

```js static
 import GenericWidget from "path to GenericWidget";
  function ExampleComponent(props){
      const {value}=props;
      return(
      <span>{value}</span>
      )
  }
  class Example extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GenericWidget {...this.props}>
        {(widgetProps) => {
          return (
            <ExampleComponent {...this.props} {...widgetProps} />
          )
        }
        }
      </GenericWidget>
    )
  }
}
Example.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
   /** If defined, then the DataConnection debugging information will be displayed*/
  debug: PropTypes.bool,
}

Example.defaultProps = {
  debug: false,
 
};

export default Example;
```

Example usage:
``` js static


 <Example 
    pv='pva://$(device):test$(id)'
    macros={{'$(device)':'testIOC','$(id)':'2'}}
</Example>
```