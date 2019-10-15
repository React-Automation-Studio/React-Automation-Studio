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
  Button: {
    width:'100%',
   height:'100%',
   marginTop:'auto',
   marginBottom:'auto',
    marginLeft:'auto',
   marginRight:'auto',
  //  width:'100%',
//    marginTop:'auto',
//    marginLeft:'auto',
//    marginRight:'auto',
//    marginBottom:'auto',

  },
});
/**
 * The ToggleButton Component is a wrapper on the Material-UI Button component. The ToggleButton will ouput a value of
 *'1' or '0' to the process variable when pressed. A '1' by default represents an 'ON' or 'true' state and a '0' an 'Off' or 'false' state.
 * If the `momentary` property is define then a '1' will be output for 100 ms before returning to '0'. <br/><br/>
  *The ToggleButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/

 */
class ToggleButton extends React.Component {
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
    this.turnOff= this.turnOff.bind(this);

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













handleButtonChange =event => {
  //console.log(event)
  this.setState({ ['value']: event?1:0});
};


handleButtonClick = event => {
  //console.log(event)

  this.setState({ ['value']: this.state['value']==0?1:0});
  window.navigator.vibrate(1);
};

turnOff=()=>{
  console.log("turnoff")
  this.setState({ ['value']: 0});
}
handleMouseDown = (event) => {
  console.log('mouseDown',event)

  this.setState({ ['value']: 1});
};
handleMouseUp = (event) => {
  //console.log(event)
//  console.log('mouseUp',event)
   setTimeout(this.turnOff, 100);

};

handleTouchStart = (event) => {
  console.log('TouchStart',event)

  this.setState({ ['value']: 1});
};
handleTouchEnd = (event) => {
  //console.log(event)
  console.log('TouchEnd ',event)
  this.setState({ ['value']: 0});
};
handleOnBlur = (event) => {
  console.log('blur',event)

  this.setState({ ['value']: 0});
};

handleOnMouseLeave =(event) => {
  console.log('handleOnMouseLeave',event)

  this.setState({ ['value']: 0});
};

handleNothing =  (event) => {
  console.log('nothing',event)

  //event.preventDefault();
};
handleOnFocus =  (event) => {
  console.log('handleOnFocus',event)

  //event.preventDefault();
};

handleToggleContextMenu = (event) => {
//   console.log(event.type)




  event.preventDefault();
}
render() {
  let momentary;
  if (typeof this.props.momentary !== 'undefined'){
    momentary=this.props.momentary;

  } else {

    momentary=false;
  }

  const {classes}= this.props;
  const pv = this.props.pv;
  const macros=  this.props.macros;
  const usePvLabel= this.props.usePvLabel;
  const mylabel= this.props.label;
  const usePrecision= this.props.prec;

  const severity=this.state.severity;
  let units="";
  const initialized=this.state.initialized;
  const value=this.state.value;
  let enum_strings={};
  if(initialized){




    if (typeof this.props.custom_selection_strings !== 'undefined'){
      enum_strings=this.props.custom_selection_strings;

    } else {

      enum_strings=this.state.metadata.enum_strs;
    }

  }













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

    <React.Fragment>
      <DataConnection
        pv={pv}
        macros={macros}
        usePvLabel={usePvLabel}
        usePrecision={usePrecision}
        handleInputValue={this.handleInputValue}
        handleMetadata={this.handleMetadata}
        outputValue=  {this.state.value}
        useStringValue={false}
        handleInputValueLabel={this.handleInputValueLabel}
      />


      {initialized===true &&
        <React.Fragment>

        {  (momentary===false)&&<FormControlLabel className={classes.FormControl}
            control={
              <Button disabled={write_access===false?true:false} fullWidth= {true} variant="contained" color={this.state['value']==1?"primary":"default" }className={classes.Button} onClick={this.handleButtonClick } onFocus={this.handleOnFocus} onContextMenu={this.handleToggleContextMenu}>


                {this.state['value']==0?enum_strings[0]:enum_strings[1]}

              </Button>

            }
            label={usePvLabel===true? this.state['label']:this.props.label}
            labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
          />}

          {  (momentary===true)&&<FormControlLabel className={classes.FormControl}
              control={
                <Button disabled={write_access===false?true:false} fullWidth= {true} variant="contained" color={this.state['value']==1?"primary":"default" }className={classes.Button} onPointerUp={this.handleMouseUp} onPointerDown={this.handleMouseDown} onClick={this.handleNothing} onDoubleClick={this.handleNothing} onPointerLeave={this.handleMouseUp} onContextMenu={this.handleToggleContextMenu}>


                  {this.state['value']==0?enum_strings[0]:enum_strings[1]}

                </Button>

              }
              label={usePvLabel===true? this.state['label']:this.props.label}
              labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
            />}


      </React.Fragment>
      }

      {(initialized===false||initialized==='undefined') &&
      <FormControlLabel className={classes.FormControl}
          control={
            <Button disabled={true} fullWidth= {true} variant="contained" color={this.state['value']==1?"primary":"default" }className={classes.Button} onClick={this.handleButtonClick } onFocus={this.handleOnFocus} onContextMenu={this.handleToggleContextMenu}>


              {this.state.pvname}

            </Button>

          }
          label={'Connecting to: '}
          labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
        />
      }


      </React.Fragment>

)
}
}

ToggleButton.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,



  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */

  debug:PropTypes.bool,
  /** Custom color to be used, must be derived from Material UI theme color's*/
  color: PropTypes.string,
  /** If defined then component will act as momentary button*/
  momentary:PropTypes.bool,
  /** An array of custom strings to be displayed on the button for a value of 0 or 1  i.e. ['Off','On'], If not defined then EPICS enum_strs will be used*/
  custom_selection_strings:PropTypes.array,
};

ToggleButton.defaultProps = {
    alarmSensitive:false,
    debug: false,
    color: 'primary',

    usePvLabel: false
};

export default withStyles(styles)(ToggleButton)
