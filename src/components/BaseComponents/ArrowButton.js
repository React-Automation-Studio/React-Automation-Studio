import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const styles = theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  Button: {

    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',

  }

});
/**
 * *DEPRECIATED in favour of ThumbWheel Component*. The ArrowButton Component is a wrapper on the Material-UI Button component.
 * The ArrowButton will ouput the `actionValue` to the process variable defined by `pv` when pressed. By coontrolling the placement of the label and by using multiple components a ThumbWheel can be produced.
 * The ArrowButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/

 */
class ArrowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state={['value'] : "0",
    ['label']:"Undefined",
    ['pvname']:"Undefined",
    ['intialized']:false,
    ['metadata']:{},
    ['severity']:''
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);

}


handleInputValue(inputValue,pvname,initialized,severity){
  // console.log("severity: ",severity);

  this.setState({    ['value']	 :inputValue,

  ['pvname']:pvname,
  ['initialized']:initialized,
  ['severity']:severity});


}


handleMetadata(metadata){


  this.setState({['metadata']:metadata});


}



handleInputValueLabel(inputValue){

  this.setState({['label']:inputValue});

}



componentDidMount() {
}


componentWillUnmount() {

}















handleButtonClick = name => event => {
  //console.log(event.target.checked)
  let min;
  let max;
  if (this.state.initialized===true){
  if (typeof this.props.usePvMinMax === 'undefined'){
    if (typeof this.props.min !== 'undefined'){
      min=this.props.min;
    }
    if (typeof this.props.max !== 'undefined'){
      max=this.props.max;
    }
  }else{
    if(this.props.usePvMinMax == false)
    {
      if (typeof this.props.min !== 'undefined'){
        min=this.props.min;
      }
      if (typeof this.props.max !== 'undefined'){
        max=this.props.max;
      }
    }
    else {
      max=this.state.metadata.upper_disp_limit;
      min=this.state.metadata.lower_disp_limit;
    }

  }

  let old_value=parseFloat(this.state['value']);
  let new_value=old_value+parseFloat(this.props.actionValue);
  if (new_value>max){
    new_value=max;
  }else if (new_value<min) {
   new_value=min;
  }

console.log("hello",this.state.metadata)
  this.setState({ ['value']: new_value});
}
};


render() {
  const {classes}= this.props;
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const usePvLabel= this.props.usePvLabel;
  const mylabel= this.props.label;
  const usePrecision= this.props.prec;
  const useStringValue=this.props.useStringValue;
  const severity=this.state.severity;
  let units="";
  const initialized=this.state.initialized;
  const value=this.state.value;
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




  }




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
        outputValue=  {this.state.value}
        useStringValue={useStringValue}
        handleInputValueLabel={this.handleInputValueLabel}
      />
      {initialized===true &&


        <FormControlLabel className={classes.Button}
          control={
            <Button disabled={write_access===false?true:false} size='small' variant="contained" color={"primary"} className={classes.Button} onClick={this.handleButtonClick('value')}>

              {parseFloat(this.props.actionValue) >=0?<ExpandLess  />:<ExpandMore  />}
              {/* {this.props.actionString} */}

            </Button>
          }
          label={this.props.label}
          labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
        />



      }

      {(initialized===false||initialized==='undefined') &&
        <Button variant="contained" color="primary" disabled className={classes.button} >
          {"Connecting to:"+this.state['pvname']}
        </Button>
      }


    </div>

)
}
}

ArrowButton.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,

  /** Custom color to be used, must be derived from Material UI them color's*/
  color: PropTypes.string,

  /** Custom label to be used */
  label: PropTypes.string,

  /** Postion of label*/
  labelPlacement:  PropTypes.oneOf(['top', 'bottom','start','end']),

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue:PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min:PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max:PropTypes.number,

  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax:PropTypes.bool,

};

ArrowButton.defaultProps = {
    debug: false,
    color: 'primary',
    useStringValue: false,
    usePvLabel: false
};
export default withStyles(styles)(ArrowButton)
