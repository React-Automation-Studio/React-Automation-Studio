import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Widget from "../SystemComponents/Widgets/Widget";
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Typography } from '@material-ui/core';
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
  

    const content=(props)=>{
       
        let pvs=props.pvsData;
        let data=[];
        let pv;
        let textFieldClassName;
        for (pv in pvs){
         
          if (pvs[pv].initialized){
          if (props.alarmSensitive==true){
            if (pvs[pv].severity==1){
              textFieldClassName=classes.TextFieldSeverity1;
              //  background_color='linear-gradient(45deg, #FFFFFF 1%, #FF8E53 99%)';
            }
            else if(pvs[pv].severity==2){
              textFieldClassName=classes.TextFieldSeverity2;
              //  background_color='linear-gradient(45deg, #FFFFFF 1%, #E20101 99%)';
            }
            else {
              textFieldClassName=classes.TextFieldSeverity0;
              //  background_color='white';
            }
          }
          let units=pvs[pv].units?" "+pvs[pv].units:"";
          let value=pvs[pv].value;
          data.push(<Typography className={textFieldClassName} >{pvs[pv].label+": " + value +  units}</Typography>)
        }
        else{
          data.push(<Typography>{props.disconnectedIcon}{" "+pvs[pv].pvName}</Typography>)
        }
      }
      return data;
      
    }
 

  return <React.Fragment>{content(props)}</React.Fragment>;
}

const TextUpdateMultiplePVs =(props)=>{
  return (
    <Widget {...props} component={TextUpdateMultiplePVsComponent}/>
       
    
  )
}
export default withStyles(styles, { withTheme: true })(TextUpdateMultiplePVs)
