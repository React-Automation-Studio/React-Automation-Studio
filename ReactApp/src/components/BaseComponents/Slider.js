import React, { useRef } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import Widget from "../SystemComponents/Widgets/Widget";
import RCSlider, { Range } from 'rc-slider';

import uuid from 'uuid';
//import 'rc-slider/assets/index.css';
const styles = (theme) => {
  const backgroundColor = theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'; //copied from material ui textfield 
  return (

    {
      root: {
        width: 300,
      },
      slider: {
        // padding: "30px 0px ",
        color: "primary",
      },
      rangeLabel: {
        paddingBottom: theme.spacing(1) * 1,
        marginBottom: theme.spacing(1) * 1,
      },
      sliderDiv: {
        width: "100%",
        height: "100%",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        padding: theme.spacing(2),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
      },
      '@global': {
        '.rc-slider': {
          position: 'relative',
          height: 14,
          padding: '5px 0',
          width: '100%',
          borderRadius: 6,
          touchAction: 'none',
          boxSizing: 'border-box',
          webkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
        },
        '.rc-slider *': {
          boxSizing: 'border-box',
          webkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
        },
        '.rc-slider-rail': {
          position: 'absolute',
          width: '100%',
          backgroundColor: backgroundColor,
          height: 4,
          borderRadius: 6
        },
        '.rc-slider-track': {
          position: 'absolute',
          left: '0',
          height: 4,
          borderRadius: 6,
          backgroundColor: theme.palette.primary.main
        },
        '.rc-slider-handle': {
          position: 'absolute',
          width: 14,
          height: 14,
          cursor: 'grab',
          fallbacks: [
            {
              cursor: '-webkit-grab'
            },
            {
              cursor: 'pointer'
            }
          ],
          marginTop: -5,
          borderRadius: '50%',
          //border: 'solid 2px #96dbfa',
          border: 'solid 2px ' + theme.palette.primary.main,
          backgroundColor: theme.palette.primary.main,
          touchAction: 'pan-x'
        },
        '.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging': {
          borderColor: '#57c5f7',
          boxShadow: '0 0 0 5px #96dbfa'
        },
        '.rc-slider-handle:focus': {
          outline: 'none'
        },
        '.rc-slider-handle-click-focused:focus': {
          borderColor: theme.palette.primary.light,
          boxShadow: 'unset'
        },
        '.rc-slider-handle:hover': {
          borderColor: theme.palette.primary.light,
        },
        '.rc-slider-handle:active': {
          borderColor: theme.palette.primary.light,
          boxShadow: '0 0 5px ' + theme.palette.primary.light,
          cursor: 'grabbing',
          fallbacks: [
            {
              cursor: '-webkit-grabbing'
            }
          ]
        },
        '.rc-slider-mark': {
          position: 'absolute',
          top: 18,
          left: '0',
          width: '100%',
          fontSize: 12
        },
        '.rc-slider-mark-text': {
          position: 'absolute',
          display: 'inline-block',
          verticalAlign: 'middle',
          textAlign: 'center',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          color: theme.palette.text.primary
        },
        '.rc-slider-mark-text-active': {
          color: theme.palette.text.primary
        },
        '.rc-slider-step': {
          position: 'absolute',
          width: '100%',
          height: 4,
          background: 'transparent'
        },
        '.rc-slider-dot': {
          position: 'absolute',
          bottom: -2,
          marginLeft: -4,
          width: 8,
          height: 8,
          border: '2px solid #e9e9e9',
          backgroundColor: '#fff',
          cursor: 'pointer',
          borderRadius: '50%',
          verticalAlign: 'middle'
        },
        '.rc-slider-dot-active': {
          borderColor: theme.palette.primary.main
        },
        '.rc-slider-dot-reverse': {
          marginRight: -4
        },
        '.rc-slider-disabled': {
          // backgroundColor: theme.palette.grey[500]
        },
        '.rc-slider-disabled .rc-slider-track': {
          backgroundColor: theme.palette.grey[500]

        },
        '.rc-slider-disabled .rc-slider-handle, .rc-slider-disabled .rc-slider-dot': {
          borderColor: theme.palette.grey[500],
          boxShadow: 'none',
          backgroundColor: theme.palette.grey[500],
          cursor: 'not-allowed'
        },
        '.rc-slider-disabled .rc-slider-mark-text, .rc-slider-disabled .rc-slider-dot': {
          cursor: 'not-allowed !important'
        },
        '.rc-slider-vertical': {
          width: 14,
          height: '100%',
          padding: '0 5px'
        },
        '.rc-slider-vertical .rc-slider-rail': {
          height: '100%',
          width: 4
        },
        '.rc-slider-vertical .rc-slider-track': {
          left: 5,
          bottom: '0',
          width: 4
        },
        '.rc-slider-vertical .rc-slider-handle': {
          marginLeft: -5,
          touchAction: 'pan-y'
        },
        '.rc-slider-vertical .rc-slider-mark': {
          top: '0',
          left: 18,
          height: '100%'
        },
        '.rc-slider-vertical .rc-slider-step': {
          height: '100%',
          width: 4
        },
        '.rc-slider-vertical .rc-slider-dot': {
          left: 2,
          marginBottom: -4
        },
        '.rc-slider-vertical .rc-slider-dot:first-child': {
          marginBottom: -4
        },
        '.rc-slider-vertical .rc-slider-dot:last-child': {
          marginBottom: -4
        },
        '.rc-slider-tooltip-zoom-down-enter, .rc-slider-tooltip-zoom-down-appear': {
          animationDuration: '0.3s',
          animationFillMode: 'both',
          display: 'block !important',
          animationPlayState: 'paused',
          transform: 'scale(0, 0)',
          animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        },
        '.rc-slider-tooltip-zoom-down-leave': {
          animationDuration: '0.3s',
          animationFillMode: 'both',
          display: 'block !important',
          animationPlayState: 'paused',
          animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
        },
        '.rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active, .rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active': {
          animationName: 'rcSliderTooltipZoomDownIn',
          animationPlayState: 'running'
        },
        '.rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active': {
          animationName: 'rcSliderTooltipZoomDownOut',
          animationPlayState: 'running'
        },
        '@keyframes rcSliderTooltipZoomDownIn': {
          '0%': {
            opacity: '0',
            transformOrigin: '50% 100%',
            transform: 'scale(0, 0)'
          },
          '100%': {
            transformOrigin: '50% 100%',
            transform: 'scale(1, 1)'
          }
        },
        '@keyframes rcSliderTooltipZoomDownOut': {
          '0%': {
            transformOrigin: '50% 100%',
            transform: 'scale(1, 1)'
          },
          '100%': {
            opacity: '0',
            transformOrigin: '50% 100%',
            transform: 'scale(0, 0)'
          }
        },
        '.rc-slider-tooltip': {
          position: 'absolute',
          left: -9999,
          top: -9999,
          visibility: 'visible',
          boxSizing: 'border-box',
          webkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
        },
        '.rc-slider-tooltip *': {
          boxSizing: 'border-box',
          webkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
        },
        '.rc-slider-tooltip-hidden': {
          display: 'none'
        },
        '.rc-slider-tooltip-placement-top': {
          padding: '4px 0 8px 0'
        },
        '.rc-slider-tooltip-inner': {
          padding: '6px 2px',
          minWidth: 24,
          height: 24,
          fontSize: 12,
          lineHeight: '1',
          color: '#fff',
          textAlign: 'center',
          textDecoration: 'none',
          backgroundColor: '#6c6c6c',
          borderRadius: 6,
          boxShadow: '0 0 4px #d9d9d9'
        },
        '.rc-slider-tooltip-arrow': {
          position: 'absolute',
          width: '0',
          height: '0',
          borderColor: 'transparent',
          borderStyle: 'solid'
        },
        '.rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow': {
          bottom: 4,
          left: '50%',
          marginLeft: -4,
          borderWidth: '4px 4px 0',
          borderTopColor: '#6c6c6c'
        }
      }

    })
};


function SliderComponent(props) {
  const emitChangeDebounced = useRef(debounce(value => emitChange(value), 10)).current;

  /**
   * Write value on the PV using emitChangeDebounced function.
   * This function store the value and then wait for 10ms
   * before it can be triggered again.
   * @param {Event} event
   * @param {float} value
   */
  function handleChange(value) {
    props.handleFocus();
    //debounce(emitChange(value), 10)
    emitChangeDebounced(value);
  }

  /**
   * Save value on the state.
   * @param {string} value
   */
  function emitChange(value) {

    props.handleImmediateChange(value)
  }

  /**
   * When stop moving the slider save the reached value.
   * @param {Event} event
   * @param {float} value
   */
  function handleChangeCommited(value) {

    props.handleImmediateChange(value);
    props.handleBlur();

  }


  let content, marks;
  if (props.initialized) {
    content = (
      <Typography className={props.classes.rangeLabel}>
        {props.label} {props.value} {props.units}
      </Typography>
    );
  } else {
    content = (
      <Typography className={props.classes.rangeLabel}>
        {props.disconnectedIcon}{" " + props.pvName}
      </Typography>
    );
  }
  let min = props.min !== undefined ? parseFloat(props.min) : 0;

  let max = props.max !== undefined ? parseFloat(props.max) : 100;

  let units = props.units ? props.units : ""
  if (props.marks !== undefined) {
    marks = props.marks;
  } else {
    marks = {

      [min]: min + " " + units,

      [max]: max + " " + units,

    }
  }

  return (


    <div 
  
    className={props.classes.sliderDiv}
      style={{ display: 'flex', height: '100%', flexDirection: 'column', }}>


      {content}
      <RCSlider

        
        // aria-labelledby="label"
        disabled={props.disabled}
        vertical={props.vertical}
        value={props.initialized ? parseFloat(props.value) : 0}
        min={props.initialized ? parseFloat(min) : undefined}
        max={props.initialized ? parseFloat(max) : undefined}
        marks={props.initialized ? marks : undefined}
        // valueLabelDisplay={props.showThumbValue ? "on" : "off"}
        step={props.step !== undefined ? props.step!=0?props.step:undefined : undefined}
        onChange={handleChange}
        onAfterChange={handleChangeCommited}
      />


    </div>
  );



}

/**
* The Slider Component is a wrapper on the rc-slider contained Slider component. The Slider component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
* The margins and spacing must be controlled from the parent component.<br/><br/>
* For the vertical slider, the parent container must have a fixed height.
*
*/
const Slider = (props) => {

  return (
    <Widget  {...props} component={SliderComponent} name={"Slider"} />
  )
}

/**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
Slider.propTypes = {

  /**
   * If defined, then the DataConnection and
   * the widget debugging information will be displayed.
   */


  debug: PropTypes.bool,

  /**
   * Local variable intialization value.
   * When using loc:// type PVs.
   */
  initialLocalVariableValue: PropTypes.string,
  /**
   * Custom label to be used, if  usePvLabel is not defined.
   */
  label: PropTypes.string,
  /**
  * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
  */
  labelPv: PropTypes.string,
  /**
   * Values of macros that will be substituted in the pv name.
   * eg. {{'$(device)':'testIOC','$(id)':'2'}}
   */
  macros: PropTypes.object,
  /**
   * Custom maximum to be used, if usePvMinMax is not defined.
   */
  max: PropTypes.number,
  /**
   * Custom PV to define the maximum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  maxPv: PropTypes.string,
  /**
   * Custom minimum value to be used, if usePvMinMax is not defined.
   */
  min: PropTypes.number,
  /**
   * Custom PV to define the minimum to be used, usePvMinMax must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  minPv: PropTypes.string,


  /**
   * Custom precision to round the value.
   */
  prec: PropTypes.number,
  /**
   * Custom PV to define the precision to be used, usePvPrecision must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  precPv: PropTypes.string,



  /**
   * Custom units to be used, if usePvUnits is not defined.
   */

  units: PropTypes.string,
  /**
   * Custom PV to define the units to be used, usePvUnits must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
   */
  unitsPv: PropTypes.string,
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
   * When using EPICS, the RAS pv's metadata is conventionally derived from the pyEpics PV in the pvserver. 
   * The pyEpics metadata is unfortunately static and the values used will be the intial values that pvserver receives when it connects the first time. 
   * This is sufficient in most cases except when the user wants to dynamically update the metaData.
   * In this case a direct connection can be made to all the pv fields by setting useMetadata to false. 
   * If any of the metadata pvs are defined i.e unitsPv then the PV makes a new data  connection to this alternate pv and will
   * use the value provided by this pv as the units. 
   * The same is the case for the precPV, labelPv, alarmPv, unitsPv and minPv.
   * By setting useMetadata to false also enables connection to other variables as defined by different protocols.
   */
  useMetadata: PropTypes.bool,
  /**
   * Directive to use the pv metadata's HOPR and LOPR fields or the minPv and maxPv values
   * to limit the maximum and minimum values
   * that can be contained in the value.
   * If not defined it uses the custom mina nd max as defined by the min and max prop.
   */
  usePvMinMax: PropTypes.bool,
  /**
   * Directive to round the value using the precision field of the PV metadata or precPv.
   * If not defined it uses the custom precision as defined by the prec prop.
   */
  usePvPrecision: PropTypes.bool,
  /**
   * Directive to use the units contained in the   pv metdata's EGU field or unitsPv.
   *  If not defined it uses the custom units as defined by the units prop.
   */


  usePvUnits: PropTypes.bool,



  /**
   * If defined, then the string representaion of the number can be formatted
   * using the mathjs format function
   * eg. numberFormat={{notation: 'engineering',precision: 3}}.
   * See https://mathjs.org/docs/reference/functions/format.html for more examples
   */
  numberFormat: PropTypes.object,


  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string,

  /**  Custom markers in format:
  {value1: label1,value2...:label2...}*/
  marks: PropTypes.object,
  /** If defined, the value will be increment or decremented
   * in the define step intervals
   */

  step: PropTypes.number,
};

Slider.defaultProps = {
//  showThumbValue: false,
  step: 1,

};

export default withStyles(styles, { withTheme: true })(Slider);
