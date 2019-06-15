import React from 'react'
import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
import DataConnection from '../../../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';


import Select from '@material-ui/core/Select';



const styles = theme => ({

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

class HarpRangeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state={'xrange':{'inputValue':1,'initialized':false,'pvname':"",'severity':0,['metadata']:{},},
                'yrange':{'inputValue':1,'initialized':false,'pvname':"",'severity':0}
  }
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);

}


handleInputValue=name=>(inputValue,pvname,initialized,severity)=>{
//  console.log("name: ",name,pvname,inputValue);
  let pv=this.state[name];
  pv.inputValue=inputValue;
  pv.pvname=pvname;
  pv.initialized=initialized;
  pv.severity=severity;

this.setState({[name]:pv});

}


handleMetadata=name=>(metadata)=>{
  let pv=this.state[name];
  pv.metadata=metadata;
  this.setState({[name]:pv});

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

handleChange = name => event => {
  console.log(event.target.value)
  let xRangePV=this.state['xrange'];
  let yRangePV=this.state['yrange'];
  let value;
  switch(event.target.value) {


    case ' 20 -  200 uA':
    value=1;

    break;
    case '  2 -   20 uA':
    value=2;
    break;
    case '200 - 2000 nA':
    value=3;
    break;
    case ' 20 -  200 nA':
    value=4;
    break;
    case '  2 -   20 nA':
    value=5;
    break;
    case '200 - 2000 pA':
    value=6;
    break;


    // code block
  }
  console.log(value)
xRangePV.inputValue=value;
yRangePV.inputValue=value;
this.setState({xrange:xRangePV,
               yrange:yRangePV });

};









render() {
//   console.log(this.state)
//   console.log(this.props.systemName)
   const xrangePV='pva://'+this.props.systemName+':xrange';
   const yrangePV='pva://'+this.props.systemName+':yrange';
//   console.log(xrangePV)
  const {classes}= this.props;

  const initialized=this.state.xrange.initialized&&this.state.yrange.initialized;


  let value=this.state.xrange.inputValue;
  let enum_strings={};

  if(initialized){


    switch(parseInt(this.state.xrange.inputValue)) {


      case 1 :
      value=' 20 -  200 uA';

      break;
      case 2:
      value='  2 -   20 uA';
      break;
      case 3:
      value='200 - 2000 nA';
      break;
      case 4:
      value=' 20 -  200 nA';
      break;
      case 5:
      value='  2 -   20 nA';
      break;
      case 6:
      value='200 - 2000 pA';
      break;


      // code block
    }


    }
    // console.log(this.state.metadata.enum_strs)


      enum_strings=[
        ' 20 -  200 uA',
        '  2 -   20 uA',
        '200 - 2000 nA',
        ' 20 -  200 nA',
        '  2 -   20 nA',
        '200 - 2000 pA',
    ];



  //   console.log("this.state.metadata.enum_strs",this.state.metadata.enum_strs)
  //   console.log("enum_strings",enum_strings)



  const style = {
    background: 'white',
    borderRadius: 4,

  };







  let write_access=false;
  let read_access=false;
  if(initialized){

    if (typeof this.state.xrange.metadata !== 'undefined'){
      if (typeof this.state.xrange.metadata.write_access !== 'undefined'){
        write_access=this.state.xrange.metadata.write_access;
      }
      if (typeof this.state.xrange.metadata.read_access !== 'undefined'){
        read_access=this.state.xrange.metadata.read_access;
      }
    }
  }


  return (

    <React.Fragment>

      <DataConnection
        pv={xrangePV}
        handleInputValue={this.handleInputValue('xrange')}
        handleMetadata={this.handleMetadata('xrange')}
        outputValue=  {this.state['xrange'].inputValue}
        />
        <DataConnection
          pv={yrangePV}
          handleInputValue={this.handleInputValue('yrange')}
          handleMetadata={this.handleMetadata('yrange')}
          outputValue=  {this.state['yrange'].inputValue}
          />


      {initialized===true &&
        <TextField
          disabled={write_access===false?true:false}

          select
          className={classes.TextField}
          value={value}
          onKeyPress={this.catchReturn('value')}
          onFocus={event=>this.handleOnFocus(event)}
          onBlur={event=>this.handleOnBlur(event)}
          onChange={this.handleChange('value')}
          label={this.props.label}
          margin="normal"
          variant="outlined"

        >
          {enum_strings.map((item,index) =>
            <MenuItem key={item.toString()} value={item}> {item} </MenuItem>
          )}
        </TextField>


      }

      {(initialized===false||initialized==='undefined') &&
        <TextField
          value={""}
          label={"Connecting to:"+xrangePV}
          disabled={true}
          margin="normal"
          variant="outlined"
        />}



    </React.Fragment>

  )
}
}

HarpRangeSelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

HarpRangeSelection.contextType=AutomationStudioContext;
export default withStyles(styles)(HarpRangeSelection)
