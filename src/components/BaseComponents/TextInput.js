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
import ContextMenu from '../SystemComponents/ContextMenu';




const styles = theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  TextFieldSeverity0: {
    width: '100%',
    //marginTop:theme.spacing(1),




    fontWeight: 500,
    borderRadius: 4,

  },
  TextFieldSeverity1: {
    width: '100%',


    //marginTop:theme.spacing(1),

    fontWeight: 500,
    borderRadius: 4,
    //backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
    background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, #FF8E53 99%)'//'green'
  },
  TextFieldSeverity2: {
    width: '100%',

    //marginTop:theme.spacing(1),


    fontWeight: 500,
    borderRadius: 4,
    //backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
    background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, #E20101 99%)'//'green'
  }
});
/**
 * The TextInput Component is a wrapper on the Material-UI contained TextField component. The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI TextField Demos:
 * https://material-ui.com/demos/text-fields<br/><br/>
 * Material-UI TextField API:
 * https://material-ui.com/api/text-field

 */
class TextInput extends React.Component {
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
    openContextMenu: false,
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
  this.handleContextMenuClose= this.handleContextMenuClose.bind(this);

}


handleInputValue(inputValue,pvname,initialized,severity){
  if(this.props.debug===true){
    console.log('inputValue',inputValue);
    console.log('pvname',pvname);
    console.log('initialized',initialized);
    console.log('severity',severity);

  }
  //console.log("severity: ",severity);

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
  let value=this.state.value;
  if (typeof this.props.usePrecision !== 'undefined'){
    if (this.props.usePrecision==true){
      if (typeof this.props.prec !== 'undefined'){
        value=parseFloat(value).toFixed(this.props.prec);
      }
      else
      value=parseFloat(value).toFixed(parseInt(this.state.metadata.precision));

    }

  }
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


  if (value>max){
    value=max;
  }else if (value<min) {
   value=min;
  }
}
  if (event.key === 'Enter') {
    this.setState({['outputValue']:value});
  }
}


handleOnBlur= event =>{
  this.setState({['hasFocus']:false,
  ['value']:this.state['inputValue'],
  ['metadata'] :this.state['newMetadata'] });
}

handleChange = name => event => {
  let value=event.target.value;

  this.setState({
    [name]: value,
  });
};


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
  const severity=this.state.severity;
  let units="";
  const initialized=this.state.initialized;
  let value=this.state.value;
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

    if (value!==""){
      if (this.state.hasFocus===false){
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







  const style ={

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

  const  openContextMenu  = this.state.openContextMenu;

  const pvs=[{pvname:this.state.pvname,
             initialized:this.state.initialized,
             value:value}]
             if(this.props.debug){
             console.log('textinput pvs',pvs)
             console.log(this.state.metadata)
           }
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
          className={textFieldClassName}
          value={value}
          onKeyPress={this.catchReturn('value')}
          onFocus={event=>this.handleOnFocus(event)}
          onBlur={event=>this.handleOnBlur(event)}
          onChange={this.handleChange('value')}
          label={usePvLabel===true? this.state['label']:this.props.label}

          fullWidth={true}
          margin="none"
          variant="outlined"
          disabled={write_access===false?true:false}
          InputProps={{

            endAdornment: <InputAdornment position="end">{units} {this.props.children} </InputAdornment>,

          }}
        />
      }

      {(initialized===false||initialized==='undefined') &&
      <TextField
        key={this.state.pvname+' disconnected' + this.state['label']+this.props.label}
        inputRef={node => {
          this.anchorEl = node;
        }}
        aria-owns={openContextMenu ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onContextMenu={this.handleToggleContextMenu}
        value={this.state.pvname}
        label={"Connecting to: "}
        fullWidth={true}
        margin="none"
        variant="outlined"

        className={textFieldClassName}
        InputProps={{
            readOnly: true,}}
      />}
        <ContextMenu
          disableProbe={this.props.disableProbe}
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

TextInput.propTypes = {
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

};




export default withStyles(styles)(TextInput)
