import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuList from '@material-ui/core/MenuList';

import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {LanDisconnect} from 'mdi-material-ui/';
import FormLabel from '@material-ui/core/FormLabel';
const styles = theme => ({
  root: {

    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    border: 1,

  },
  FormControl: {
    width:'100%',
    height:'100%',
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto',


  },
  button: {

    //backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    border: 1,
    //borderRadius: 4,
    borderColor: theme.palette.grey[700],
    borderStyle:'solid',
    marginTop:-1
  },
  buttonLastHorizontal: {
    borderStyle:'solid',
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomRightRadius: 4,
    borderTopRightRadius:4,
    //backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    marginLeft:-1,
  },
  buttonFirstHorizontal: {
    borderStyle:'solid',
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius:4,
    //backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  buttonMiddleHorizontal: {
    borderStyle:'solid',
    borderColor: theme.palette.grey[700],
    border: 1,
    marginLeft:-1,
    //backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  buttonLastVertical: {
    borderStyle:'solid',
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius:4,
    //backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    marginTop:-1,
  },
  buttonFirstVertical: {
    borderStyle:'solid',
    borderColor: theme.palette.grey[700],
    border: 1,
    borderTopRightRadius: 4,
    borderTopLeftRadius:4,
    //backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  buttonMiddleVertical: {
    borderStyle:'solid',
    borderColor: theme.palette.grey[700],
    border: 1,
    marginTop:-1,
    //backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  listVertical:{
    // border: 1,
    // borderRadius:4,
    // borderStyle:'solid',
    // borderColor: theme.palette.grey[700],
    width:'100%',
    height:'100%',
  },
  listHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    height:'100%',
  },

});

/**
* The RadioButtonGroup Component is a wrapper on the Material-UI List component. The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
* The margins and spacing must be controlled from the parent component.<br/><br/>
* Material-UI List Demos:
* https://material-ui.com/demos/lists<br/><br/>
* Material-UI List API:
* https://material-ui.com/api/list

*/
class RadioButtonGroup extends React.Component {
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
    ['selectedIndex']: -1,
    ['newValueTrigger']:0,
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
  // this.handleListItemClick= this.handleListItemClick.bind(this);
  this.getRadioButtonItems= this.getRadioButtonItems.bind(this);
  this.handleChange=this.handleChange.bind(this);
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
//
// handleListItemClick=(event, item)=>{
//   // console.log(item)
//   this.setState({
//     ['value']: item,
//     ['outputValue']: item
//   });
// };


handleChange =(event) => {
  this.setState({
    ['value']: event.target.value,
    ['outputValue']: event.target.value,
    ['newValueTrigger']:this.state.newValueTrigger+1
  });

};



getRadioButtonItems = (enum_strs, classes, disabled) => {
  //this.test("test1");
  //this.handleInputValue();

  let radioButtonItems=[];

  let i=0;


  for (i=0 ; i<(enum_strs.length);i++){
    //console.log("linedata: ", this.state.pvs[pv].linedata);
    const item=enum_strs[i];
    if(this.props.debug){
      //  console.log("item:",item,'i:',i)
    }

    radioButtonItems.push(

      <React.Fragment key={i.toString()}>
        <FormControlLabel
          value={item}
          control={<Radio color="primary" />}
          label={item.toString()}
          labelPlacement="start"
        />



      </React.Fragment>
    )


  }

  //console.log(DataConnections[0]);
  return radioButtonItems;
}




render() {
  const {classes}= this.props;
  //  console.log('classes Selection List',classes)
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

  }else{
    enum_strings=['Connecting to']
  }
  //   console.log("this.state.metadata.enum_strs",this.state.metadata.enum_strs)
  //   console.log("enum_strings",enum_strings)
  //  {enum_strings.map((item) =>
  //    <React.Fragment>
  //      <ListItem  button key={item.toString()} value={item} selected={this.state.value==item} onClick={event => this.handleListItemClick(event, item)}> <ListItemText primary= {item}/> </ListItem>
  //      <Divider />
  //    </React.Fragment>
  //  )}

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
  let disabled=write_access===false?true:false;
  return (

    <React.Fragment>
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        handleInputValue={this.handleInputValue}
        handleMetadata={this.handleMetadata}
        outputValue=  {this.state.outputValue}
        newValueTrigger={this.state.newValueTrigger}
        useStringValue={true}
        debug={this.props.debug}
        handleInputValueLabel={this.handleInputValueLabel}
        intialLocalVariableValue={this.props.intialLocalVariableValue}
      />

      {initialized===true &&
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{usePvLabel===true? this.state['label']:this.props.label}</FormLabel>
          <RadioGroup  value={value} onChange={this.handleChange}>
            {this.getRadioButtonItems(enum_strings, classes, disabled)}
          </RadioGroup>

        </FormControl>


      }






      {(initialized===false||initialized==='undefined') &&

        <FormControl  disabled component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            <LanDisconnect style={{color:this.props.theme.palette.error.main,verticalAlign: "middle"}} fontSize='small'/>
          </FormLabel>
          <RadioGroup  aria-label="gender" name="gender2" value={value} onChange={this.handleChange}>
            {this.getRadioButtonItems([this.state.pvname], classes, disabled)}
          </RadioGroup>

        </FormControl>




      }
    </React.Fragment>
)
}
}


RadioButtonGroup.propTypes = {
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
  /** If defined, sets the selection list to be in a horizontal orientation*/
  horizontal: PropTypes.bool,
  /** If defined, this array of strings overides the default EPICS MBBI/O pv strings and are displayed as the choices in the RadioButtonGroup component*/
  custom_selection_strings: PropTypes.array,
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string

};

RadioButtonGroup.defaultProps = {
  debug:false,
  alarmSensitive:false,
  usePvLabel:false,
  horizontal:false,
};


export default withStyles(styles,{withTheme:true})(RadioButtonGroup)
