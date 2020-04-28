import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, SvgIcon } from "@material-ui/core";
import { Lens } from "@material-ui/icons";

import withWidget from "../SystemComponents/Widgets/withWidget";

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
});

/**
 * The StyledIconIndicator Component is a wrapper on the Material-UI contained SvgIcon component.
 * The SvgIcon component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI SvgIcon Demos:
 * https://material-ui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://material-ui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
function StyledIconIndicator(props) {
  
  

  let onColor=props.theme.palette.primary.main;
  let offColor=props.theme.palette.grey[50];
  if (typeof props.onColor !== 'undefined'){
    if(props.onColor==='primary'){
      onColor=props.theme.palette.primary.main;
    }
    else if(props.onColor==='secondary'){
        onColor=props.theme.palette.secondary.main;
    }
    else if(props.onColor==='default'){
         onColor=props.theme.palette.grey[50];
        }
    else
       {
     onColor=props.onColor;
   }
  }

  if (typeof props.offColor !== 'undefined'){
    if(props.offColor==='primary'){
      offColor=props.theme.palette.primary.main;
    }
    else if(props.offColor==='secondary'){
        offColor=props.theme.palette.secondary.main;
    }
    else if(props.offColor==='default'){
         offColor=props.theme.palette.grey[50];
        }
    else
       {
     offColor=props.offColor;
   }
  }
  let iconStyle={};
  if (typeof props.labelPlacement !=='undefined'){
    if(props.labelPlacement=="top"){
      iconStyle['marginTop']=props.theme.spacing(1);
    }else   if(props.labelPlacement=="end"){
      iconStyle['marginRight']=props.theme.spacing(1);
    }
    else   if(props.labelPlacement=="start"){
      iconStyle['marginLeft']=props.theme.spacing(1);
    }
    else   if(props.labelPlacement=="bottom"){
      iconStyle['marginBottom']=props.theme.spacing(1);
    }
  }
 

  let color = props.disabled
    ? props.theme.palette.grey[50]
    : props.value === 1
    ? onColor
    : offColor;

    iconStyle['color']=color;

  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.FormControl}
      disabled={props.disabled}
      label={props.label}
      labelPlacement={props.labelPlacement}
      control={
        <SvgIcon size="small" style={iconStyle} >
          {props.children === undefined ? <Lens /> : props.children}
        </SvgIcon>
      }
    />
  );
}

export default withWidget(
  withStyles(styles, { withTheme: true })(StyledIconIndicator),
  { readOnly: true }
);
