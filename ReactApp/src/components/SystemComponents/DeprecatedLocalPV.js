import React from 'react'
import AutomationStudioContext from './AutomationStudioContext';
import { withStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
const styles = theme => ({
  body1: theme.typography.body1,



});
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-computed-key*/
class DeprecatedLocalPV extends React.Component {
  constructor(props) {
    super(props);

    let pvname;
    if (typeof this.props.macros !== 'undefined'){
      let macro;
      pvname=this.props.pv;
      for (macro in this.props.macros){
        pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
      }
      this.state ={
        'id': uuidv4(),
        'initialized':false,
        'pvname':pvname,
        'interalValue':' ',
        'inputValue':this.props.value,
        'pv':{initialized: false,pvname:"",value:"",char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
        units: "V",precision: 0}};
      }
      else{
        pvname=this.props.pv;
        this.state ={ 'initialized':false,
        'pvname':pvname,
        'interalValue':' ',
        'pv':{initialized: false,pvname:"",value:"",char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
        units: "V",precision: 0}};
      }
      this.updatePVData= this.updatePVData.bind(this);
      //  this.testFunction= this.testFunction.bind(this);
      this.test=this.test.bind(this);
    }
    handleInputValue(){
      this.props.handleInputValue(this.state.internalValue,this.state.pvname,this.state.initialized,this.state.severity);
    }
    handleMetadata(){
      if (typeof this.props.handleMetadata !== 'undefined'){
        this.props.handleMetadata(this.state['pv']);

      }
      this.props.handleInputValue(this.state.internalValue,this.state.pvname,this.state.initialized,this.state.severity);
    }

    updatePVData(msg){
      //  console.log("state: ",this.state);
      //    console.log("msg: ", msg)
      if (this.props.debug===true){
        console.log('updateDate is active');
      }
      if (msg.connected==='0'){
        this.setState(
          {
            initialized:false
          },
          this.handleInputValue
        );

        if (this.props.debug===true){
          console.log('not connected');
        }
      }
      else{
        if (msg.newmetadata=='False'){
          this.setState({['internalValue']: this.props.useStringValue===true? msg.char_value:msg.value,
          severity: msg.severity},
        this.handleInputValue);
          if (this.props.debug===true){
            console.log('no metadata');
          }
        }
        else {
          if (this.props.debug===true){
            console.log('New metadata connected');
          }
          this.setState(
            {'pv':{pvname:msg.pvname,value: msg.value,char_value: msg.char_value,alarmColor:"",enum_strs:msg.enum_strs,lower_disp_limit: msg.lower_disp_limit,upper_disp_limit: msg.upper_disp_limit,
            lower_warning_limit:msg.lower_warning_limit,upper_warning_limit: msg.upper_warning_limit,lower_ctrl_limit:msg.lower_ctrl_limit,upper_ctrl_limit:msg.upper_ctrl_limit,units: msg.units,precision: parseInt(msg.precision),severity:msg.severity, write_access:msg.write_access,read_access:msg.read_access},
            ['internalValue']: this.props.useStringValue===true? msg.char_value:msg.value,
            initialized:true ,
            severity: msg.severity},
            this.handleMetadata
          );
          //        if (typeof this.props.handleMetadata !== 'undefined'){
          //          this.props.handleMetadata(this.state['pv']);
          //        }
          //  console.log(msg);
        }
        // if (this.state.pvname.includes('loc://')){
        //   console.log('fire');
        //   this.props.handleInputValue(21312,this.state.pvname,true,0)
        // }
        // else{
        //   this.props.handleInputValue(this.state.internalValue,this.state.pvname,this.state.initialized,this.state.severity);
        // }
      }

      if (this.props.debug===true){
        console.log('state',this.state);
      }
    }

    //testFunction(msg){

    //  if (this.props.debug===true){
    //    console.log(msg)
    //   console.log('testFunction')

    // }
    // }
    test(){
      console.log('changed');
    }
    componentDidMount() {
      let socket=this.context.socket;

        if (typeof this.context.localVariables[this.state.pvname]==='undefined'){
          let msg={ value:typeof this.props.initialValue==='undefined'?0:this.props.initialValue,
          connected:'1',
          newmetadata:'True',
          pvname:this.state.pvname,
          char_value: typeof this.props.initialValue==='undefined'?0:this.props.initialValue,
          enum_strs:"",
          lower_disp_limit:typeof this.props.min==='undefined'?0:this.props.min,
          upper_disp_limit:typeof this.props.max==='undefined'?0:this.props.max,
          lower_warning_limit:typeof this.props.min==='undefined'?0:this.props.min,
          upper_warning_limit:typeof this.props.max==='undefined'?0:this.props.max,
          lower_ctrl_limit:typeof this.props.min==='undefined'?0:this.props.min,
          upper_ctrl_limit:typeof this.props.max==='undefined'?0:this.props.max,
          units:typeof this.props.units==='undefined'?"":this.props.units,
          precision:1,
          severity:0,
          write_access:true,
          read_access:true,

        };


        this.context.updateLocalVariable(this.state.pvname,msg);
        this.updatePVData(this.context.localVariables[this.state.pvname]);
      }
      else{

        //this.context.localVariables[this.state.pvname].newmetadata='True';
        this.updatePVData(this.context.localVariables[this.state.pvname]);
      //  console.log(this.state)

      }



    //  socket.on(this.state.pvname,this.testFunction);




  }

  componentWillUnmount(){

    //  socket.removeListener(this.state.pvname,this.testFunction);

    //    if (this.props.debug===true){
    //    }
  }
  componentDidUpdate(prevProps) {
  //  console.log("prevProps.value,this.props.value,this.state.internalValue",prevProps.value,this.props.value,this.state.internalValue)
    const value =this.state.internalValue
    const pvname =this.state.pvname
    const initialized= this.state.initialized;
    if (initialized===true){
      if  ((this.props.value != prevProps.value)&&(this.props.value != value)){
      //  console.log('updatePVData')
        this.updatePVData(this.context.localVariables[this.state.pvname]);
      }
      if (typeof this.props.outputValue !== 'undefined'){
        if  ((this.props.outputValue != prevProps.outputValue)&&(this.props.outputValue != value)){

            let msg=this.context.localVariables[this.state.pvname];
            if(this.props.useStringValue){
              msg.char_value=this.props.outputValue;
                msg.value=this.props.outputValue;
            } else{
              msg.value=this.props.outputValue;
            }
            this.context.updateLocalVariable(this.state.pvname,msg);
            this.updatePVData(this.context.localVariables[this.state.pvname]);

        }
        else{
          if (typeof this.props.newValueTrigger !== 'undefined'){
            if (this.props.newValueTrigger!=prevProps.newValueTrigger)
            {

                let msg=this.context.localVariables[this.state.pvname];
                if(this.props.useStringValue){
                  msg.char_value=this.props.outputValue;
                  msg.value=this.props.outputValue;
                } else{
                  msg.value=this.props.outputValue;
              }
                this.context.updateLocalVariable(this.state.pvname,msg);
                this.updatePVData(this.context.localVariables[this.state.pvname]);

            }

          }
        }
      }
    }




  }


  render() {

    const {classes} =this.props;
    if (this.props.debug===true){
      console.log('state',this.state);
    }
    const value =this.state.internalValue
    const pvname =this.state.pvname
    const initialized= this.state.initialized;
    const propsvalue=this.props.value;

    if (this.props.debug===true){

      if (initialized===true){


        return (
          <div className={classes.body1}>
            <div>{"EPICS Debug Info:" }</div>
            <div>{"Python server variable: " +pvname }</div>
            <div>{"PV name: " +pvname.replace("pva://","") }</div>
            <div>{"Initial Value: " +this.props.initialValue }</div>
            <div>{"context Variable Value: " +propsvalue }</div>
            <div>{"Current Value: " +this.state.internalValue }</div>
            <div>{"New Value from parent component: " +this.props.outputValue }</div>
          </div>

        );
      }
      else return ( <div style={{background: "#eee", padding: "20px", margin: "20px"}}>
        <div>{"EPICS Debug Info:" }</div>
        <div>{"Connecting to Python server variable: " +pvname }</div>
      </div>);
    }
    return <React.Fragment  ></React.Fragment>;
  }
}

DeprecatedLocalPV.contextType=AutomationStudioContext;
export default withStyles(styles)(DeprecatedLocalPV)
