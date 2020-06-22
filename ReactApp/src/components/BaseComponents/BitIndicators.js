import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControlLabel, SvgIcon } from "@material-ui/core";
import { Lens } from "@material-ui/icons";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  FormControl: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});


const BitIndicatorsComponent = (props) => {



  let onColor = props.theme.palette.primary.main;
  let offColor = props.theme.palette.grey[300];
  if (typeof props.onColor !== 'undefined') {
    if (props.onColor === 'primary') {
      onColor = props.theme.palette.primary.main;
    }
    else if (props.onColor === 'secondary') {
      onColor = props.theme.palette.secondary.main;
    }
    else if (props.onColor === 'default') {
      onColor = props.theme.palette.grey[300];
    }
    else {
      onColor = props.onColor;
    }
  }

  if (typeof props.offColor !== 'undefined') {
    if (props.offColor === 'primary') {
      offColor = props.theme.palette.primary.main;
    }
    else if (props.offColor === 'secondary') {
      offColor = props.theme.palette.secondary.main;
    }
    else if (props.offColor === 'default') {
      offColor = props.theme.palette.grey[300];
    }
    else {
      offColor = props.offColor;
    }
  }

  let bitArray = [];
  let bitLabels = [];
  let bitStyles = [];


  let bitLabelPos =
    props.bitLabelPlacement !== undefined
      ? props.bitLabelPlacement
      : props.horizontal
        ? "top"
        : "end";
  const place = bitLabelPos.charAt(0).toUpperCase() + bitLabelPos.slice(1);

  for (let n = 0; n < props.numberOfBits; n++) {
    bitArray.push(
      props.initialized ? props.value & Math.pow(2, n) : 0
    );
    if (props.usePvBitLabels===false){
    bitLabels.push(
      
        props.bitLabels === undefined
          ? "Bit " + n
          : props.bitLabels[n]
      


    );
    }
    else{
      if(n<props.enumStrs.length){
        bitLabels[n]=props.enumStrs[n];
      }
    }
    bitStyles.push({ ["margin" + place]: props.theme.spacing(1) });
  }
  if (props.reverseBits) {
    bitLabels = bitLabels.reverse();
    bitArray = bitArray.reverse();
    bitStyles = bitStyles.reverse();
  }

  let bits = bitArray.map((value, index) => {
    // eslint-disable-next-line eqeqeq 
    let color = !props.initialized? props.theme.palette.grey[300]: value != 0 ? onColor     : offColor;
    return (
      <Grid
        item
        key={index.toString()}
        xs={!props.horizontal ? 12 : undefined}
      >
        <FormControlLabel
          className={props.classes.FormControl}
          disabled={props.disabled}
          label={bitLabels[index]}
          labelPlacement={bitLabelPos}
          control={
            <SvgIcon size="small"  style={{...bitStyles[index], color: color }} {...props.muiSvgIconProps}>
              {props.children === undefined ? (
                <Lens />
              ) : (
                  props.children
                )}
            </SvgIcon>
          }
        />
      </Grid>
    );
  });
  
  return (
    <Grid
      key={props.pvName}
      container
      spacing={props.horizontal ? 2 : 0}
      alignItems="flex-start"
      direction={props.horizontal ? "row" : "column"}
    >
      <Grid key={props.label} item xs={12}>
      {props.initialized?props.label:<span>{props.disconnectedIcon}{" "+props.pvName}</span>}
      </Grid>
      {bits}
    </Grid>
  );
}



/**
 * The BitIndicators Component is a wrapper on multiple SvgIcon components.
 * Each SvgIcon component indicates the value of each of the bits of the PV Value.
 * <br/><br/>
 * Material-UI SvgIcon Demos:
 * https://material-ui.com/style/icons/<br/><br/>
 * Material-UI SvgIcon API:
 * https://material-ui.com/api/svg-icon/<br/><br/>
 * A custom Icon can used by importing it in the parent and assigning it as a child <br/><br/>
 */
const BitIndicators = (props) => {
  return (
    <Widget {...props} component={BitIndicatorsComponent} />
  )
}


BitIndicators.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,

  /** local variable initialization value*/
  initialLocalVariableValue: PropTypes.string,
  /** If defined, then the Data initialized debugging information will be displayed*/
  debug: PropTypes.bool,
  /** label placement*/
  labelPlacement: PropTypes.oneOf(['start', 'top', 'bottom', 'end']),
  /** Custom label to be used, if  `usePvLabel` is not defined. */
  label: PropTypes.string,
  // Array of custom bit labels.
  bitLabels: PropTypes.array,
  // If defined, the position of the bit labels relative to the widget.
  bitLabelPlacement: PropTypes.oneOf(["start", "end", "top", "bottom"]),
  // Number of bits to indicate.
  numberOfBits: PropTypes.number,
  // Display bits horizontally.
  horizontal: PropTypes.bool,
  // Reverse bits order.
  reverseBits: PropTypes.bool,
  /** Any of the MUI Svg Icon can applied by defining them as an object*/
   
  muiSvgIconProps: PropTypes.object,
  /** Directive to use the  PV Bit Labels .
   * 
   */
  usePvBitLabels: PropTypes.bool,
};

BitIndicators.defaultProps = {
  numberOfBits: 8,
  horizontal: false,
  reverseBits: false,
  onColor:'primary',
  offColor:'default',
  usePvBitLabels:false
};
export default withStyles(styles, { withTheme: true })(BitIndicators);
