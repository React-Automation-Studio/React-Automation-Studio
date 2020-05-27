Simple example usage:

```js static
 import Widget from "path to Widget";
  const ExampleComponent=(props)=>{
      const {value}=props;
      const {initialized}=props;
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