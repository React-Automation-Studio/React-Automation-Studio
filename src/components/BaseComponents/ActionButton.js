import React from 'react'
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import DataConnection from '../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  Button: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',

  }

});
/**
 * The ActionButton Component is a wrapper on the Material-UI Button component. The ActionButton will ouput the `actionValue` to the process variable when pressed. The ActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/

 */
class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state={['value'] : "0",
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

  this.setState({ ['value']: this.props.actionValue,
                  ['newValueTrigger']:this.state.newValueTrigger+1});
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
          newValueTrigger={this.state.newValueTrigger}

          handleInputValueLabel={this.handleInputValueLabel}
          debug={this.props.debug}
        />

      {initialized===true &&
        <div>

          <FormControlLabel className={classes.Button}
            control={
              <Button disabled={write_access===false?true:false} size={"small"} variant="contained" color={typeof this.props.color==='undefined'?"primary":this.props.color} className={classes.Button}  onClick={this.handleButtonClick('value')}>


                {this.props.actionString}

              </Button>
            }
            label={usePvLabel===true? this.state['label']:this.props.label}
            labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
          />


        </div>
      }

      {(initialized===false||initialized==='undefined') &&
      <div>

        <FormControlLabel className={classes.Button}
          control={
            <Button disabled={true} size={"small"} variant="contained" color={typeof this.props.color==='undefined'?"primary":this.props.color} className={classes.Button}  onClick={this.handleButtonClick('value')}>

            {this.state.pvname}


            </Button>
          }
            label={"Connecting to: "}
          labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
        />


      </div>
      }


    </div>

)
}
}

ActionButton.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel:PropTypes.bool,

  /** Custom color to be used, must be derived from Material UI them color's*/
  color: PropTypes.string,

  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,

  /** Postion of label*/
  labelPlacement:  PropTypes.oneOf(['top', 'bottom','start','end']),

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue:PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,

};

ActionButton.defaultProps = {
    debug: false,
    color: 'primary',
    useStringValue: false,
    usePvLabel: false
};

ActionButton.contextType=AutomationStudioContext;
export default withStyles(styles)(ActionButton)
