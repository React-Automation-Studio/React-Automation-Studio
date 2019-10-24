import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
////import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';


import Select from '@material-ui/core/Select';



const styles = theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  TextField: {
    width: '100%',


    fontWeight: 500,
    borderRadius: 4,
  //  background:theme.palette.background.default
  }

});

/**
 * The SelectionInput Component is a wrapper on the Material-UI TextField component. The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://material-ui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://material-ui.com/api/text-field

 */
class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state={['value'] : "",
    ['inputValue'] : "",
    ['outputValue'] : "",
    ['hasFocus']:false,
    ['label']:"Undefined",
    ['pvname']:"Undefined",
    ['intialized']:false,
    ['metadata']:{},
    ['severity']:'',
    ['newValueTrigger']:0
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);

}


handleInputValue(inputValue,pvname,initialized,severity){
  // console.log("severity: ",severity);

  if (this.state['hasFocus']===false){
    this.setState({['value']	 :inputValue,
    ['inputValue']:inputValue,
    ['pvname']:pvname,
    ['initialized']:initialized,
    ['severity']:severity});
  }
  else {  this.setState({['inputValue']:inputValue,
  ['pvname']:pvname,
  ['initialized']:initialized,
  ['severity']:severity});
}
}


handleMetadata(metadata){

  if (this.state['hasFocus']===false){
    this.setState({['metadata']	 :metadata,
    ['newMetadata']:metadata});
  }
  else {  this.setState({['newMetadata']:metadata});

}
}



handleInputValueLabel(inputValue){

  this.setState({['label']:inputValue});

}



componentDidMount() {
}


componentWillUnmount() {
//console.log("selectioninput CWU",this.state.pvname)
}









handleOnFocus= event =>{
  this.setState({['hasFocus']:true});
}

catchReturn= stateVar => event =>{
  if (event.key === 'Enter') {
    this.setState({['outputValue']:this.state['value']});
  }
}


handleOnBlur= event =>{
  this.setState({['hasFocus']:false,
  ['value']:this.state['inputValue'],
  ['metadata'] :this.state['newMetadata'] });
}

handleChange = name => event => {
//  console.log('value',event.target.value)
  this.setState({
    ['value']: event.target.value,
    ['outputValue']: event.target.value,
    ['newValueTrigger']:this.state.newValueTrigger+1
  });
};









render() {
  const {classes}= this.props;
  const {theme}= this.props;
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const usePvLabel= this.props.usePvLabel;
  const mylabel= this.props.label;
  const usePrecision= this.props.prec;
  const useStringValue=true;
  const severity=this.state.severity;
  let units="";
  const initialized=this.state.initialized;
  let value=this.state.value;
  let enum_strings={};
  if(initialized){
    if(this.props.usePvUnits===true){
      if (typeof this.state.metadata !== 'undefined'){
        if (typeof this.state.metadata.units !== 'undefined'){
          units=this.state.metadata.units;
        }
        else{
          units="";
        }
      }
      else {
        units="";
      }

    }
    else {
      units=this.props.units;
    }
    if (typeof this.props.usePrecision !== 'undefined'){
      if (this.props.usePrecision==true){
        if (typeof this.props.prec !== 'undefined'){
          value=parseFloat(value).toFixed(this.props.prec);
        }
        else
        value=parseFloat(value).toFixed(parseInt(this.state.metadata.precision));

      }

    }
    // console.log(this.state.metadata.enum_strs)
    if (typeof this.props.custom_selection_strings !== 'undefined'){
      enum_strings=this.props.custom_selection_strings;

    } else {

      enum_strings=this.state.metadata.enum_strs;
    }

  }
  //   console.log("this.state.metadata.enum_strs",this.state.metadata.enum_strs)
  //   console.log("enum_strings",enum_strings)


  let background_color='';
  if (typeof this.props.alarmSensitive !== 'undefined'){
    if (this.props.alarmSensitive==true){
      if (severity==1){
        background_color='linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
      }
      else if(severity==2){
        background_color='linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
      }
      else background_color='white';
    }

  }







  const style = {
    background: background_color,
    borderRadius: 4,

  };
  const display_strings=enum_strings


  let write_access=false;
  let read_access=false;
  if(initialized){

    if (typeof this.state.metadata !== 'undefined'){
      if (typeof this.state.metadata.write_access !== 'undefined'){
        write_access=this.state.metadata.write_access;
      }
      if (typeof this.state.metadata.read_access !== 'undefined'){
        read_access=this.state.metadata.read_access;
      }
    }
  }
  return (

    <div>
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        handleInputValue={this.handleInputValue}
        handleMetadata={this.handleMetadata}
        outputValue=  {this.state.outputValue}
        useStringValue={true}
        newValueTrigger={this.state.newValueTrigger}
        debug={this.props.debug}
        handleInputValueLabel={this.handleInputValueLabel}
        intialLocalVariableValue={this.props.intialLocalVariableValue}
      />

      {initialized===true &&
        <TextField
          disabled={write_access===false?true:false}
          key={this.state.pvname+' connected'+ this.state['label']+this.props.label}
          select
          className={classes.TextField}
          value={value}
          onKeyPress={this.catchReturn('value')}
          onFocus={event=>this.handleOnFocus(event)}
          onBlur={event=>this.handleOnBlur(event)}
          onChange={this.handleChange('value')}
          label={usePvLabel===true? this.state['label']:this.props.label}
          margin="none"
          variant="outlined"
          InputProps={{

            endAdornment: <InputAdornment style={{marginRight:theme.spacing(1)}} position="end">{typeof units==='undefined'?units:units.toString() +" "} {this.props.children} </InputAdornment>,

          }}>

          {enum_strings.map((item) =>
            <MenuItem key={item.toString()} value={item}> {item} </MenuItem>
          )}
        </TextField>


      }

      {(initialized===false||initialized==='undefined') &&


        <TextField
          disabled={true}
          key={this.state.pvname+' disconnected'+ this.state['label']+this.props.label}
          select
          className={classes.TextField}
          value={this.state['pvname']}

          label={'Connecting to:'}
          margin="none"
          variant="outlined"
          InputProps={{

            endAdornment: <InputAdornment position="end">{units} {this.props.children} </InputAdornment>,

          }}>

          <MenuItem  value={this.state['pvname']}> {this.state['pvname']} </MenuItem>
          )
        </TextField>
      }



    </div>

  )
}
}

SelectionInput.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive:PropTypes.bool,
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** If defined, this array of strings overides the default EPICS MBBI/O pv strings and are displayed as the choices in the SelectionInput component*/
  custom_selection_strings: PropTypes.array,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */
  usePvUnits: PropTypes.bool,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units:PropTypes.string,
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string

};

SelectionInput.defaultProps = {
    debug:false,
    alarmSensitive:false,
    usePvLabel:false,
    usePvUnits:false,
};

SelectionInput.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(SelectionInput)
