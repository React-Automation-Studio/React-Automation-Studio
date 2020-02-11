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
import Switch from '@material-ui/core/Switch';
import debounce from 'lodash.debounce';
import Typography from '@material-ui/core/Typography';
import { Slider } from '@material-ui/core'

import {LanDisconnect} from 'mdi-material-ui/';





const styles  = theme =>({
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px ',
    color:'primary'
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1) * 2
  },
  sliderDiv: {

    paddingRight: theme.spacing(1)*3,
    paddingLeft: theme.spacing(1)*3
  }
});
/**
 * The SimpleSlider Component is a wrapper on the Material-UI contained Slider component. The SimpleSlider component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI Slider Demos:
 * https://material-ui.com/components/slider/<br/><br/>
 * Material-UI Slider API:
 * https://material-ui.com/api/slider/

 */
class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state={['value'] : 0,
    ['inputValue'] : 0,
    ['outputValue'] : 0,
    ['hasFocus']:false,
    ['label']:"Undefined",
    ['pvname']:"Undefined",
    ['intialized']:false,
    ['metadata']:{},
    ['severity']:'',
    newValueTrigger:0
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
  this.handleOnDragEnd=this.handleOnDragEnd.bind(this);
  this.handleOnDragStart=this.handleOnDragStart.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleChangeCommited = this.handleChangeCommited.bind(this);
  this.emitChangeDebounced = debounce(this.emitChange, 10);
  this.valuetext=this.valuetext.bind(this);
}



handleInputValue(inputValue,pvname,initialized,severity){
  //console.log("severity: ",severity);
  if(initialized){
  if (this.state['hasFocus']===false){
    this.setState({['outputValue']	 :parseFloat(inputValue),
    ['inputValue']:parseFloat(inputValue),
    ['pvname']:pvname,
    ['initialized']:initialized,
    ['severity']:severity});
  }
  else {  this.setState(
  {['inputValue']:inputValue,
  ['pvname']:pvname,
  ['initialized']:initialized,
  ['severity']:severity});
}
}
else{
  this.setState({['pvname']:pvname,
  ['initialized']:initialized,}
  );
}
}



handleMetadata(metadata){


  this.setState({['metadata']	 :metadata});



}



handleInputValueLabel(inputValue){


  this.setState({['label']:inputValue});

}



componentDidMount() {
}


componentWillUnmount() {

  //  console.log("simple slider component willunmount called")

}









handleOnFocus= event =>{
  this.setState({['hasFocus']:true});
}





handleOnDragStart= (event) =>{
  //console.log("input has focus");
  this.setState({['hasFocus']:true});
  // console.log("this.state['hasFocus']: ",this.state['hasFocus']);
}
handleOnDragEnd= (event) =>{
  //console.log("input has lost focus");
  this.setState({['hasFocus']:false});
  // console.log("this.state['hasFocus']: ",this.state['hasFocus']);
}

emitChange(value) {
  this.setState({outputValue:value,newValueTrigger:this.state.newValueTrigger+1});

}

handleChange = (event, value) => {
  //console.log("handleChange")
  this.setState({hasFocus:true});
   this.emitChangeDebounced(value);
};

handleChangeCommited = (event, value) => {
  this.setState({hasFocus:false,outputValue:value,inputValue:value});

  //console.log("onChangeCommitted")
  //this.emitChangeDebounced(value);

};

valuetext= value =>()=> {
 return `${value}`;
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
      units=typeof this.props.units!=='undefined'?this.props.units:"";
    }

    if (value!==""){
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
  let min=0;
  let max=0;
  if(initialized){

    if (typeof this.state.metadata !== 'undefined'){
      if (typeof this.state.metadata.write_access !== 'undefined'){
        write_access=this.state.metadata.write_access;
      }
      if (typeof this.state.metadata.read_access !== 'undefined'){
        read_access=this.state.metadata.read_access;
      }
    }


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
  }
  //console.log('max',max)
  //console.log('min',min)
  //console.log('metadata',this.state.metadata)
//  console.log('this.state.outputValue',this.state.outputValue)
  let disabled=write_access===false?true:false;
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
        useStringValue={useStringValue}
        newValueTrigger={this.state.newValueTrigger}
        handleInputValueLabel={this.handleInputValueLabel}
        intialLocalVariableValue={this.props.intialLocalVariableValue}
      />

      {initialized===true &&
        <div className={classes.sliderDiv}>
          <div className={classes.rangeLabel}>
            <Typography id="subtitle2">{usePvLabel===true? this.state['label']+": ":this.props.label+" "+units} {+this.state.outputValue+" "+units}</Typography>
          </div>

          <Slider

            className={classes.slider}
            disabled={disabled}
            value={this.state.outputValue}
            aria-labelledby="label"
            onChange={this.handleChange}
            onDragStart={this.handleOnDragStart}
            onDragEnd={this.handleOnDragEnd}
            max={max}
            min={min}
            marks={typeof this.props.marks!=='undefined'?this.props.marks:[{value:min,label:min+" "+units},{value:max,label:max+" "+units}]}
            valueLabelDisplay={this.props.showThumbValue===true?"on":undefined}

            step={typeof this.props.step !== 'undefined'?this.props.step:undefined}
            onChangeCommitted={this.handleChangeCommited}

          />

        </div>
      }

      {(initialized===false||initialized==='undefined') &&
        <div className={classes.sliderDiv}>
          <div className={classes.rangeLabel}>
            <Typography id="subtitle2">{<span> <LanDisconnect style={{color:this.props.theme.palette.error.main,verticalAlign: "middle"}} fontSize='small'/> {this.state['pvname']} </span> }</Typography>

          </div>

          <Slider
            className={classes.slider}
            disabled
            value={this.state.outputValue}
            aria-labelledby="label"
            onChange={this.handleChange}


            max={max}
            min={min}
            step={typeof this.props.step !== 'undefined'?this.props.step:undefined}


          />


        </div>
      }
    </div>




      )
}
    }


    SimpleSlider.propTypes = {

      /** Array of the process variables, NB must contain correct prefix ie: pva://  eg. ['pva://$(device):test$(id0)','pva://$(device):test$(id1)']*/
      pv: PropTypes.string.isRequired,
        /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id0)':'1','$(id1)':'2'}}*/
        macros:PropTypes.object,
        /** Directive to use the HOPR and LOPR EPICS fields to limit the maximum and minimum values that can be contained in the value. */
        usePvMinMax:PropTypes.bool,
        /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
        usePvLabel:PropTypes.bool,

        /** Custom  minimum to be used */
        min:PropTypes.number,
        /** Custom maximum to be used */
        max:PropTypes.number,
        /** custom markers: in format : [{value: uservalue1,label:userlabel1},{value: uservalue...,label:userlabel...}*/
        marks: PropTypes.array,
        /** show thumb with value */
        showThumbValue:PropTypes.bool,
        /** If defined, then the DataConnection debugging information will be displayed*/
        debug:PropTypes.bool,
        /** If defined, the value will be increment or decremented in the define step intervals*/
        step:PropTypes.number,
        /** local variable intialization value*/
        intialLocalVariableValue:PropTypes.string


      };

      SimpleSlider.defaultProps = {

          debug:false,
          step:1,
          marks:undefined,
          showThumbValue:false

      };



      export default withStyles(styles,{withTheme:true})(SimpleSlider)
