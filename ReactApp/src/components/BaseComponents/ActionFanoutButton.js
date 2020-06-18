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
import {LanDisconnect} from 'mdi-material-ui/';


const styles = theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },


});
/**
 * The ActionFanoutButton Component is a wrapper on the Material-UI Button component.
 *The ActionButton will output the `actionValue` to all the process variable defined by `dataPVs` when pressed.
 *The ActionButton component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Button Demos:
 * https://material-ui.com/demos/buttons/<br/><br/>
 * Material-UI Button API:
 * https://material-ui.com/api/button/

 */
class ActionFanoutButton extends React.Component {
  constructor(props) {
    super(props);
    let state={}
    let pv;
    let pvname;
    let dataPVs={};
    for (pv in this.props.dataPVs){
      pvname=this.props.dataPVs[pv];
      if (typeof this.props.macros !== 'undefined'){

        let macro;
        for (macro in this.props.macros){
          pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
        }
      }
      //    console.log(pvname)

      dataPVs[pvname]={label:"", initialized: false,pvname:pvname,value:[],char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0};
    }
  state.value="0";
  state['dataPVs']=dataPVs;
  state['newValueTrigger']=0;
  this.state=state;
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
  this.multipleDataConnections=this.multipleDataConnections.bind(this);

}


handleInputValue=(inputValue,pvname,initialized,severity)=>{
  // console.log("severity: ",severity);
  if (initialized===true){
    let dataPVs=this.state.dataPVs;
    dataPVs[pvname].inputValue=inputValue;
    dataPVs[pvname].initialized=initialized;
    dataPVs[pvname].severity=severity;
    this.setState({dataPVs:dataPVs});
  }
  else {
     let dataPVs=this.state.dataPVs;
     dataPVs[pvname].initialized=false;
     this.setState({dataPVs:dataPVs});
  }


}


handleMetadata =  pvname=>(metadata) =>{

  let dataPVs=this.state.dataPVs;
  dataPVs[pvname].metadata=metadata;
  this.setState({dataPVs:dataPVs});
  //  console.log("metadata",metadata)

}



handleInputValueLabel=pvname=>(inputValue)=>{

  let dataPVs=this.state.dataPVs;
  dataPVs[pvname].label=inputValue;
  this.setState({dataPVs:dataPVs});

}



componentDidMount() {
  console.warn("Component is deprecated, use the ActionButton instead")
}


componentWillUnmount() {

}













handleButtonChange = name => event => {
  //console.log(event.target.checked)
  this.setState({ value: event.target.checked?1:0});
};


handleButtonClick = name => event => {
//  console.log(event)

  this.setState({ value: this.props.actionValue,
                  ['newValueTrigger']:this.state.newValueTrigger+1});
};

multipleDataConnections = () => {
  //this.test("test1");
  //this.handleInputValue();
  let pv;
  let DataConnections=[];
  for (pv in this.state.dataPVs){
    //console.log("linedata: ", this.state.pvs[pv].linedata);
    DataConnections.push(

        <DataConnection
          key={'pv'+pv.toString()}
          pv={this.state.dataPVs[pv].pvname}
          handleInputValue={this.handleInputValue}
          handleMetadata={this.handleMetadata(this.state.dataPVs[pv].pvname)}
          outputValue={this.state.value}
          newValueTrigger={this.state.newValueTrigger}
          intialLocalVariableValue={this.props.intialLocalVariableValue}
        />


    )
  }
  //console.log(DataConnections[0]);
  return DataConnections;
}


render() {
  //console.log("ActionFanoutButton",this.state.value)
  const {classes}= this.props;

  const mylabel= this.props.label;

  const severity=this.state.severity;


  const value=this.state.value;
  let pv;
  let DataConnections=[];
  let initialized=true;
  let write_access=false;
  let read_access=false;
  let disconnectedPVs="";






  for (pv in this.state.dataPVs){

    initialized=initialized&&this.state.dataPVs[pv].initialized;
    if(this.state.dataPVs[pv].initialized==false){
      disconnectedPVs+=this.state.dataPVs[pv].pvname+" ";
    }

  }

  if (initialized===true){
    write_access=true;
    read_access=true;
    for (pv in this.state.dataPVs){

      write_access=write_access&&this.state.dataPVs[pv].metadata.write_access;

      read_access=read_access&&this.state.dataPVs[pv].metadata.read_access;

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

  return (

    <React.Fragment>
      {this.multipleDataConnections()}


      {initialized===true &&


          <FormControlLabel  style={{width:"100%", margin:0}}
            control={
              <Button  disabled={write_access===false?true:false} fullWidth={true} variant="contained" color={"primary"} className={classes.button} onClick={this.handleButtonClick('value')}>


                {this.props.actionString}

              </Button>
            }
            label={this.props.label}
            labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
          />



      }

      {(initialized===false||initialized==='undefined') &&
      <FormControlLabel  style={{width:"100%", margin:0}}
        control={
          <Button  disabled={true} fullWidth={true} variant="contained" color={"primary"} className={classes.button} onClick={this.handleButtonClick('value')}>

          {disconnectedPVs}


          </Button>
        }
        label={<LanDisconnect style={{color:this.props.theme.palette.error.main,verticalAlign: "middle"}} fontSize='small'/>}
        labelPlacement={typeof this.props.labelPlacement !== 'undefined'? this.props.labelPlacement:"top"}
      />
      }


    </React.Fragment>

)
}
}

ActionFanoutButton.propTypes = {
  /** Names of the process variables, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  dataPVs: PropTypes.array.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros:PropTypes.object,

  /** Custom color to be used, must be derived from Material UI them color's*/
  color: PropTypes.string,

  /** Custom label to be used */
  label: PropTypes.string,

  /** Position of label*/
  labelPlacement:  PropTypes.oneOf(['top', 'bottom','start','end']),

  /** If defined, then the string value of the EPICS enumerator type will be forced to be used, if not defined the the enumerator index is used */
  useStringValue:PropTypes.bool,
  /** If defined, then the DataConnection debugging information will be displayed*/
  debug:PropTypes.bool,
  /** local variable intialization value*/
  intialLocalVariableValue:PropTypes.string


};

ActionFanoutButton.defaultProps = {
    debug: false,
    color: 'primary',
    useStringValue: false,
    usePvLabel: false
};

ActionFanoutButton.contextType=AutomationStudioContext;
export default withStyles(styles,{withTheme:true})(ActionFanoutButton)
