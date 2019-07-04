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
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'

import ContextMenu from '../SystemComponents/ContextMenu';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
const styles = theme => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  input:{
    color:theme.palette.grey[500],
  },
  cssLabel: {
    '&$cssFocused': {
      color: theme.palette.grey[500],
    },
  },
  cssFocused: {

  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.grey[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing(1) * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },

  TextFieldSeverity0: {
    width: '100%',

    fontWeight: 500,
    borderRadius: 4,
    //marginTop:theme.spacing(1),
  },


  TextFieldSeverity1: {
    width: '100%',

    //marginTop:theme.spacing(1),



    fontWeight: 500,
    borderRadius: 4,
    //backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
      background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+deepOrange['400'] +' 99%)'
  },
  TextFieldSeverity2: {
    width: '100%',

    //marginTop:theme.spacing(1),

    fontWeight: 500,
    borderRadius: 4,
    //backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
  background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+red['800'] +' 99%)'
  }

});
/**
 * The TextOutput Component is a wrapper on the Material-UI contained TextField component in read-only mode. The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://material-ui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://material-ui.com/api/text-field

 */
class TextOutput extends React.Component {
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
    ['timestamp']:undefined,
    openContextMenu: false,
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
  this.handleContextMenuClose= this.handleContextMenuClose.bind(this);

}


handleInputValue(inputValue,pvname,initialized,severity, timestamp){
  //console.log("severity: ",severity);

  if (this.state['hasFocus']===false){
    this.setState({['value']	 :inputValue,
    ['inputValue']:inputValue,
    ['pvname']:pvname,
    ['initialized']:initialized,
    ['severity']:severity,
    ['timestamp']:timestamp,});
  }
  else {  this.setState({['inputValue']:inputValue,
  ['pvname']:pvname,
  ['initialized']:initialized,
  ['severity']:severity,
  ['timestamp']:undefined,});
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
focused








handleOnFocus= event =>{
  this.setState({['hasFocus']:true});
}
focused
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
  this.setState({
    [name]: event.target.value,
  });
};
test(){
}




handleContextMenuClose = event => {


   this.setState({ openContextMenu: false });
 };

 handleToggleContextMenu = (event) => {
//   console.log(event.type)

     this.setState(state => ({ openContextMenu: !state.openContextMenu }));


   event.preventDefault();
 }


render() {
  const {classes}= this.props;
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const usePvLabel= this.props.usePvLabel;
  const mylabel= this.props.label;
  const usePrecision= this.props.prec;
  const useStringValue=this.props.useStringValue;
  let severity=this.state.severity;
  let units="";
  const initialized=this.state.initialized;
    let value;

  if(initialized){
//    console.log('this.state.timestamp',this.state.timestamp)
    if(typeof this.props.displayMetaData==='undefined'){
      if(typeof this.props.displayTimeStamp!=='undefined'){
        let mydate = new Date(this.state.timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = mydate.getFullYear();
       let month = months[mydate.getMonth()];
    let date = mydate.getDate();
    let hour = mydate.getHours();
    let min = mydate.getMinutes();
    let sec = mydate.getSeconds();
    let ms = mydate.getMilliseconds()


    if( min<10){
      min='0'+min;

    }

    if( sec<10){
      sec='0'+sec;

    }
      value=date + ' ' + month + ' ' + year + ' ' +hour + ':' + min + ':' + sec ;



      }
      else{
        value=this.state.value;
      }
  }else {

    value=this.state.metadata[this.props.displayMetaData];
    if (this.props.debug){
      console.log('metadata:',this.state.metadata)
    }
  }
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

  }

  if (typeof this.props.useStringSeverityMatch !== 'undefined'){
    if (this.props.useStringSeverityMatch==true){

      if (typeof this.props.StringSeverity !== 'undefined'){
        let string;
        for (string in this.props.StringSeverity){
    //      console.log(this.props.StringSeverity[string].stringMatch)
          if (value==this.props.StringSeverity[string].stringMatch){
            severity=this.props.StringSeverity[string].severity;
            break;
          }

        }

      }
    }
  }

  let textFieldClassName;
  let background_color='';
  if (typeof this.props.alarmSensitive !== 'undefined'){
    if (this.props.alarmSensitive==true){
      if (severity==1){
        textFieldClassName=classes.TextFieldSeverity1;
        //  background_color='linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
      }
      else if(severity==2){
        textFieldClassName=classes.TextFieldSeverity2;
        //  background_color='linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
      }
      else {
        textFieldClassName=classes.TextFieldSeverity0;
        //  background_color='white';
      }
    }

  }







  const style = {
    background: background_color,
    borderRadius: 4,

  };
  //console.log(units)
   const  openContextMenu  = this.state.openContextMenu;
   const pvs=[{pvname:this.state.pvname,
              initialized:this.state.initialized,
            value:value}]
            //  console.log(this.props.theme)
  return (

    <React.Fragment>
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        intialLocalVariableValue={this.props.intialLocalVariableValue}
        handleInputValue={this.handleInputValue}
        handleMetadata={this.handleMetadata}
        outputValue=  {this.state.outputValue}
        useStringValue={useStringValue}
        debug={this.props.debug}
        handleInputValueLabel={this.handleInputValueLabel}
      />

      {initialized===true &&

        <TextField
          key={this.state.pvname+' connected'+ this.state['label']+this.props.label}
          inputRef={node => {
              this.anchorEl = node;
          }}
          aria-owns={openContextMenu ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onContextMenu={this.handleToggleContextMenu}
          color='secondary'
          className={textFieldClassName}
          value={value}
          fullWidth={true}
          onFocus={event=>this.handleOnFocus(event)}
          onBlur={event=>this.handleOnBlur(event)}
          onChange={this.handleChange('value')}
          label={usePvLabel===true? this.state['label']:this.props.label}
          margin='none'
          variant="outlined"
          InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
          InputProps={{
            classes: {
           root: classes.cssOutlinedInput,
           focused: classes.cssFocused,
           input:classes.input,
           notchedOutline: classes.notchedOutline,
         },
              readOnly: true,
            endAdornment: <InputAdornment position="end">{units} {this.props.children} </InputAdornment>,

          }}
        />


      }

      {((initialized===false)) &&
        <TextField
          key={this.state.pvname+' disconnected' }
          inputRef={node => {
              this.anchorEl = node;
          }}
          aria-owns={openContextMenu ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onContextMenu={this.handleToggleContextMenu}
          color='secondary'
          className={textFieldClassName}
          value={this.state.pvname}
          label={"Connecting to:"}
          fullWidth={true}
          onFocus={event=>this.handleOnFocus(event)}
          onBlur={event=>this.handleOnBlur(event)}
          onChange={this.handleChange('value')}
          disabled
          margin='none'
          variant="outlined"
          InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
          InputProps={{
            classes: {
           root: classes.cssOutlinedInput,
           focused: classes.cssFocused,
           input:classes.input,
           notchedOutline: classes.notchedOutline,
         },
              readOnly: true,
            endAdornment: <InputAdornment position="end">{units} {this.props.children} </InputAdornment>,

          }}
        />}


      <ContextMenu
        open={openContextMenu}
        anchorEl={this.anchorEl}
        pvs={pvs}
        handleClose={this.handleContextMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
      />

    </React.Fragment>

  )
}
}

TextOutput.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's EGU field. */
  usePvUnits: PropTypes.bool,
  /** Directive to round the value. */
  usePrecision:PropTypes.bool,
  /** Custom precision to round the value too, if not defined then the EPICS PREC field will be used, if `usePrecision` is defined. */
  prec:PropTypes.number,
  /** Custom units to be used, if `usePvUnits` is not defined. */
  units:PropTypes.string,
  /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
  usePvMinMax:PropTypes.bool,
  /** Directive to use the EPICS alarm severity status to alter the fields backgorund color  */
  alarmSensitive:PropTypes.bool,
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  /** Custom minimum to be used, if `usePvMinMax` is not defined. */
  min:PropTypes.number,
  /** Custom maximum to be used, if `usePvMinMax` is not defined. */
  max:PropTypes.number,
  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue:PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** If defined, then the timestamp of the PV will be displayed instead of its value*/
  displayTimeStamp:PropTypes.bool,
  /** If defined, then the Metadata property of the PV will be displayed instead of its value as defined by the input string eg. displayMetaData={'lower_disp_limit'} */
  displayMetaData:PropTypes.string,


};

TextOutput.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(TextOutput)
