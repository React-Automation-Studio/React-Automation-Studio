import React, { useState } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";

import GenericWidget from "../SystemComponents/Widgets/GenericWidget";
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  FormControl: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
  Button: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

/**
 * The ToggleButton Component is a wrapper on the Material-UI Button component. The ToggleButton will ouput a value of
 *'1' or '0' to the process variable when pressed. A '1' by default represents an 'ON' or 'true' state and a '0' an 'Off' or 'false' state.
 * If the `momentary` property is define then a '1' will be output for 100 ms before returning to '0'. <br/><br/>
 * The ToggleButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/
 */
// class ToggleButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.turnOff = this.turnOff.bind(this);
//     this.handleMouseUp = this.handleMouseUp.bind(this);
//     this.handleMouseDown = this.handleMouseDown.bind(this);
//     this.handlePointerLeave = this.handlePointerLeave.bind(this);
//     this.handleButtonClick = this.handleButtonClick.bind(this);
//     this.clicked = false;
//   }

//   /**
//    * When clicking the button, not in momentary mode,
//    * set the PV to the oppisite of the actual value.
//    */
//   handleButtonClick() {
//     let value = this.props.value === 0 ? 1 : 0;
//     this.props.onUpdateWidgetState({
//       value: value,
//       outputValue: value,
//       newValueTrigger: 1,
//     });
//     window.navigator.vibrate(1);
//   }

//   /**
//    * When in momentary mode, detect down action on mouse click.
//    * When in this this state write 1 to the corresponding PV.
//    */
//   handleMouseDown() {
//     if (this.props.debug) {
//       console.log("mouseDown");
//     }
//     this.clicked = true;
//     this.props.onUpdateWidgetState({
//       value: 1,
//       outputValue: 1,
//       newValueTrigger: 1,
//     });
//   }

//   /**
//    * When in momentary mode, detect up action on mouse click.
//    * When in this this state write 0 to the corresponding PV  after 100ms.
//    */
//   handleMouseUp() {
//     if (this.props.debug) {
//       console.log("mouseUp");
//     }
//     setTimeout(this.turnOff, 100);
//   }

//   /**
//    * When the pointer leave the widget, also if the down action persists,
//    * write 0 to the corresponding PV after 100ms.
//    */
//   handlePointerLeave() {
//     if (this.props.debug) {
//       console.log("mouseLeave");
//     }
//     if (this.clicked) {
//       setTimeout(this.turnOff, 100);
//     }
//   }

//   /**
//    * Function to set to zero the value and to false the click state.
//    */
//   turnOff() {
//     if (this.props.debug) {
//       console.log("turnoff");
//     }
//     this.clicked = false;
//     this.props.onUpdateWidgetState({
//       value: 0,
//       outputValue: 0,
//       newValueTrigger: 1,
//     });
//   }

//   render() {
//     let momentary =
//       this.props.momentary !== undefined ? this.props.momentary : false;
//     let value = this.props.value;
//     const {classes}=this.props;
//     return (
//       <FormControlLabel
//         key={this.props.pvName}
//         className={classes.FormControl}
//         disabled={this.props.disabled}
//         label={this.props.label}
//         labelPlacement={this.props.labelPlacement}
//         control={
//           <Button
//             className={classes.Button}
//             fullWidth={true}
//             variant="contained"
//             color={value === 1 ? this.props.onColor : this.props.offColor}
//             onClick={momentary ? undefined : this.handleButtonClick}
//             onPointerUp={momentary ? this.handleMouseUp : undefined}
//             onPointerDown={momentary ? this.handleMouseDown : undefined}
//             onPointerLeave={momentary ? this.handlePointerLeave : undefined}
//           >
//             {this.props.enumStrs[value === 1 ? value : 0]}
//           </Button>
//         }
//       />
//     );
//   }
function ToggleButtonComponent(props) {
  const [clicked,setclicked]=useState(0);
  function turnOff() {
        if (props.debug) {
          console.log("turnoff");
        }
       setclicked(false);
        props.onUpdateWidgetState({
          value: 0,
          outputValue: 0,
          newValueTrigger: 1,
        });
      }
    function handleMouseUp() {
    if (props.debug) {
      console.log("mouseUp");
    }
    setTimeout(turnOff, 100);
  }
  function handleButtonClick() {
    let value = props.value === 0 ? 1 : 0;
    props.onUpdateWidgetState({
      value: value,
      outputValue: value,
      newValueTrigger: 1,
    });
    window.navigator.vibrate(1);
  }
    function handleMouseDown() {
    if (props.debug) {
      console.log("mouseDown");
    }
    
    setclicked(false);
    props.onUpdateWidgetState({
      value: 1,
      outputValue: 1,
      newValueTrigger: 1,
    });
  }
    function handlePointerLeave() {
    if (props.debug) {
      console.log("mouseLeave");
    }
    if (clicked) {
      setTimeout(turnOff, 100);
    }
  }

  const { classes } = props;
  const { value } = props;
  let momentary =props.momentary !== undefined ? props.momentary : false;
  return (
    <FormControlLabel
      key={props.pvName}
      className={classes.FormControl}
      disabled={props.disabled}
      label={props.label}
      labelPlacement={props.labelPlacement}
      control={
        <Button
          className={classes.Button}
          fullWidth={true}
          variant="contained"
          color={value === 1 ? props.onColor : props.offColor}
          onClick={momentary ? undefined : handleButtonClick}
          onPointerUp={momentary ? handleMouseUp : undefined}
          onPointerDown={momentary ? handleMouseDown : undefined}
          onPointerLeave={momentary ? handlePointerLeave : undefined}
        >
          {props.enumStrs[value === 1 ? value : 0]}
        </Button>
      }
    />
  )
}
class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GenericWidget {...this.props}>
        {(widgetProps) => {
          return (
            <ToggleButtonComponent {...this.props} {...widgetProps} />
          )
        }
        }
      </GenericWidget>
    )
  }
}

/**
 * Specific props type and default values for this widgets.
 * They extends the ones provided for a generic widget.
 */
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
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string,
   /** label placement*/
  labelPlacement:PropTypes.oneOf(['start', 'top','bottom','end']),
  
};

ToggleButton.defaultProps = {
 
  debug: false,
  color: 'primary',
  labelPlacement:'end', 
  usePvLabel: false
};



export default withStyles(styles, { withTheme: true })(ToggleButton);
