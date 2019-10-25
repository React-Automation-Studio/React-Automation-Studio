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




const styles = theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
  TextField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    borderRadius: 4
  }

});
/**
 * The TextUpdateMultiplePVs Component is a wrapper on the JavaScript <b>div</b> container tag. The component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * More information on JavaScript <b>div</b> tag:
 * https://www.w3schools.com/tags/tag_div.asp<br/><br/>
 * This component displays the values of multiple PVs. <br/><br/>
 */
class TextUpdateMultiplePVs extends React.Component {
  constructor(props) {
    super(props);
    let state={}
    let pv;
    let pvname;
    let pvs={};
    for (pv in this.props.pvs){
      pvname=this.props.pvs[pv];
      if (typeof this.props.macros !== 'undefined'){

        let macro;
        for (macro in this.props.macros){
          pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
        }
      }
  //    console.log(pvname)

      pvs[pvname]={label:"", initialized: false,pvname:pvname,value:"",char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0};
    }
    state['pvs']=pvs;
    this.state=state;






  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
  this.multipleDataConnections=this.multipleDataConnections.bind(this);
  this.test=this.test.bind(this);
}


handleInputValue = (inputValue,pvname,initialized,severity)=>{
//  console.log("test");
//  console.log("value: ",inputValue);
//  console.log("pvname:", pvname);
  let pvs=this.state.pvs;

  pvs[pvname].value=inputValue;
  pvs[pvname].initialized=initialized;
  pvs[pvname].severity=severity;

  this.setState({pvs:pvs});


  //state.pvs[pvname].inputValue=inputValue;
  //pvData.pvs[pvname].initialized=initialized;
  //pvData.pvs[pvname].severity=severity;

  //console.log("pvData:",pvData)

  //this.setState(pvData);

}


handleMetadata =  pvname=>(metadata) =>{

    let pvs=this.state.pvs;
    pvs[pvname].metadata=metadata;
    this.setState({pvs:pvs});
  //  console.log("metadata",metadata)

}



handleInputValueLabel=pvname=>(inputValue)=>{

  let pvs=this.state.pvs;
  pvs[pvname].label=inputValue;
  this.setState({pvs:pvs});

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

handleChange = name => event => {
  this.setState({
    [name]: event.target.value,
  });
};
test(){
}


test =testvalue=>{
  //console.log("test",testvalue);
}

multipleDataConnections = () => {
  //this.test("test1");
  //this.handleInputValue();
  let pv;
  let DataConnections=[];
  for (pv in this.state.pvs){
  //  console.log(this.state.pvs[pv].pvname);
    DataConnections.push(
      <div key= {pv.toString()}>
        <DataConnection
          pv={this.state.pvs[pv].pvname}
          handleInputValue={this.handleInputValue}
          handleMetadata={this.handleMetadata(this.state.pvs[pv].pvname)}
        />
        { this.props.usePvLabel===true && <DataConnection

          pv={pv.toString()+".DESC"}

          handleInputValue={this.handleInputValueLabel(this.state.pvs[pv].pvname)}

                                               />    }
        {this.state.pvs[pv].initialized&&<div>
          {this.props.usePvLabel===true?this.state.pvs[pv].label+': ':""}
          {this.state.pvs[pv].value}
          </div>}
          {(this.state.pvs[pv].initialized===false)&&<div>
            {'Connecting to: '+this.state.pvs[pv].pvname}
            </div>}
      </div>
        )
 }

 return DataConnections;
}


render() {

  return (

    <React.Fragment>
      {this.multipleDataConnections()}

    </React.Fragment>



      )
      }

    }
      TextUpdateMultiplePVs.propTypes = {
        /** Array of process variables to be displayed, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
        pvs: PropTypes.array.isRequired,
        /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
        macros:PropTypes.object,
        /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
        usePvLabel:PropTypes.bool,
    
      };

      TextUpdateMultiplePVs.contextType=AutomationStudioContext;
          export default withStyles(styles)(TextUpdateMultiplePVs)
