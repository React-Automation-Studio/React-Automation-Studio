import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Widget from "../SystemComponents/Widgets/Widget";
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  TextFieldSeverity0: {


  },
  TextFieldSeverity1: {
    borderRadius: 2,
    padding:1,
    background:deepOrange['400']
    //  background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+deepOrange['400'] +' 99%)'
  },
  TextFieldSeverity2: {
    borderRadius: 2,
    padding:1,
    background:red['800']
    //  backgroundColor:'linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)'
    //  background:'linear-gradient(45deg, '+ theme.palette.background.default+ ' 1%, '+red['800'] +' 99%)'
  }
});

/**
 * The TextUpdateMultiplePVs Component is a wrapper on the JavaScript <b>div</b> container tag.
 * The component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * More information on JavaScript <b>div</b> tag:
 * https://www.w3schools.com/tags/tag_div.asp<br/><br/>
 */
const TextUpdateMultiplePVsComponent=(props)=> {
  const {classes}=props;
  let textFieldClassName;
  let label = props.label !== undefined ? props.label + ": " : "";
  let units = props.units !== undefined ? props.units + ": " : "";
  let content;
  console.log(props)
  if (props.initialized) {
    if (props.alarmSensitive==true){
      if (props.alarmSeverity==1){
        textFieldClassName=classes.TextFieldSeverity1;
        //  background_color='linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
      }
      else if(props.alarmSeverity==2){
        textFieldClassName=classes.TextFieldSeverity2;
        //  background_color='linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
      }
      else {
        textFieldClassName=classes.TextFieldSeverity0;
        //  background_color='white';
      }
    }

    content = (
      <span className={textFieldClassName} >{label + props.value + " " + units}</span>
    );
  } else {
    content = props.formControlLabel;
  }

  // const multipleDataConnections = () => {
  //   //this.test("test1");
  //   //this.handleInputValue();
  //   let pv;
  //   let DataConnections=[];
  //   for (pv in this.state.pvs){
  //   //  console.log(this.state.pvs[pv].pvname);
  //     DataConnections.push(
  //       <div key= {pv.toString()}>
  //         <DataConnection
  //           pv={this.state.pvs[pv].pvname}
  //           handleInputValue={this.handleInputValue}
  //           handleMetadata={this.handleMetadata(this.state.pvs[pv].pvname)}
  //         />
  //         { this.props.usePvLabel===true && <DataConnection
  
  //           pv={pv.toString()+".DESC"}
  
  //           handleInputValue={this.handleInputValueLabel(this.state.pvs[pv].pvname)}
  
  //                                           />    }
  //         {this.state.pvs[pv].initialized&&<div>
  //           {this.props.usePvLabel===true?this.state.pvs[pv].label+': ':""}
  //           {this.state.pvs[pv].value}
  //         </div>}
  //         {(this.state.pvs[pv].initialized===false)&&<div>
  //           {<span> <LanDisconnect style={{color:this.props.theme.palette.error.main,verticalAlign: "middle"}} fontSize='small'/> {this.state.pvs[pv].pvname} </span>}
            
  //             </div>}
  //       </div>
  //         )
  //  }
  
  //  return DataConnections;
  // }
  

  return <div>{content}</div>;
}

const TextUpdateMultiplePVs =(props)=>{
  return (
    <Widget {...props} component={TextUpdateMultiplePVsComponent}/>
       
    
  )
}
export default withStyles(styles, { withTheme: true })(TextUpdateMultiplePVs)
