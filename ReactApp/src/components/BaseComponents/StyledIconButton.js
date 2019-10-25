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

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import IconButton from '@material-ui/core/IconButton';
import Lens from '@material-ui/icons/Lens';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const styles = theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  FormControl: {
    width:'100%',
    height:'100%',
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto',


  },

});

/**
 * The StyledIconButton Component is a wrapper on the Material-UI contained SvgIcon component. The SvgIcon component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI SvgIcon Demos:
 * https://material-ui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://material-ui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>


 */
class StyledIconButton extends React.Component {
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
this.setState({ ['value']: this.state.value==0?1:0});

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
        intialLocalVariableValue={this.props.intialLocalVariableValue}
      />

      {initialized===true &&


        <FormControlLabel   className={classes.FormControl}
          control={
            <IconButton  disabled={((write_access===false)||this.props.disabled===true)?true:false} size='small' color={this.state['value']==1?"primary":"default" } onClick={this.handleButtonClick('value')}>

              {typeof this.props.children==='undefined'&&<Lens  />}
              {typeof this.props.children!=='undefined'&& this.props.children}


            </IconButton>
          }
          label={usePvLabel===true? this.state['label']:this.props.label}
          labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
        />



      }

      {(initialized===false||initialized==='undefined') &&

        <FormControlLabel   className={classes.FormControl}
          control={
            <IconButton  disabled={true} size='small' color={this.state['value']==1?"primary":"default" } className={classes.Button} onClick={this.handleButtonClick('value')}>

            {typeof this.props.children==='undefined'&&<Lens  />}
            {typeof this.props.children!=='undefined'&& this.props.children}



            </IconButton>
          }
          label={'Connecting to: '+this.state.pvname}
          labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
        />
      }


    </div>

)
}
}

StyledIconButton.propTypes = {
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
  /** If defined, the position of the label relative to the widget*/
  labelPlacement: PropTypes.oneOf(['start', 'end', 'top', 'bottom']),
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string


};

StyledIconButton.defaultProps = {
    labelPlacement: 'top',
    debug:false,
    alarmSensitive:false,
    usePvLabel:false,
};

StyledIconButton.contextType=AutomationStudioContext;
export default withStyles(styles)(StyledIconButton)
