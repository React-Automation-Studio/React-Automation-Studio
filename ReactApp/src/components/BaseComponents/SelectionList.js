import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Widget from "../SystemComponents/Widgets/Widget";


const styles = (theme) => {
  const borderColor =
    theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'; //copied from material ui textfield 
  const borderColorTop =
    theme.palette.type === 'light' ? 'rgba(0, 0, 0,0)' : 'rgba(255, 255, 255, 0)';
  return ({
    root: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      border: 1,
    },
    FormControl: {
      width: "100%",
      height: "100%",
      marginTop: "auto",
      marginBottom: "auto",
      marginLeft: "auto",
      marginRight: "auto",
      
    },
    button: {
      textAlign: "center",
      border: 1,
      borderColor: borderColor,
      borderStyle: "solid",
      marginTop: -1,
    },
    buttonLastHorizontal: {
      borderRight: '1px solid '+ borderColor ,
      borderTop: '1px solid '+ borderColor ,
      borderBottom: '1px solid '+ borderColor ,
      borderLeft: '1px solid '+ borderColorTop ,
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
      textAlign: "center",
      marginLeft: -1,
      '&:hover' : {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
      
      },
    },
    buttonFirstHorizontal: {
      borderStyle: "solid",
      borderColor: borderColor,
      border: 1,
      borderBottomLeftRadius: 4,
      borderTopLeftRadius: 4,
      textAlign: "center",
      '&:hover' : {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
     
      },
    },
    buttonMiddleHorizontal: {
     
      borderRight: '1px solid '+ borderColor ,
      borderTop: '1px solid '+ borderColor ,
      borderBottom: '1px solid '+ borderColor ,
      borderLeft: '1px solid '+ borderColorTop ,
      marginLeft: -1,
      textAlign: "center",
      '&:hover' : {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
      
      },
    },
    buttonLastVertical: {
      borderRight: '1px solid '+ borderColor ,
      borderLeft: '1px solid '+ borderColor ,
      borderBottom: '1px solid '+ borderColor ,
      borderTop: '1px solid '+ borderColorTop ,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
      textAlign: "center",
      marginTop: -1,
      '&:hover' : {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
      
      },
    },
    buttonFirstVertical: {
      borderStyle: "solid",
      borderColor: borderColor,
      border: 1,
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
      textAlign: "center",
      '&:hover' : {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
       
      },
    },
    buttonMiddleVertical: {
      borderRight: '1px solid '+ borderColor ,
      borderLeft: '1px solid '+ borderColor ,
      borderBottom: '1px solid '+ borderColor ,
      borderTop: '1px solid '+ borderColorTop ,
      marginTop: -1,
      textAlign: "center",
      '&:hover' : {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
       
      },
    },
    listVertical: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(1)
    },
    listHorizontal: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      padding: theme.spacing(1),
      
    },
  }
  )

};

/**
 * The SelectionList Component is a wrapper on the Material-UI List component.
 * The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI List Demos:
 * https://material-ui.com/demos/lists<br/><br/>
 * Material-UI List API:
 * https://material-ui.com/api/list
 */
const SelectionListComponent = (props) => {

  /**
   * Store the new item value in the correct PV's state.
   * @param {String} value
   */
  const handleListItemClick = (value) => {
    props.handleImmediateChange(value);
  }

  /**
   * Create a list with the value in enumStrs.
   * @param {array} enumStrs
   */
  const getListItems = (enumStrs, value) => {
    let { classes } = props;
    let listItems = enumStrs.map((item, idx) => {
      let className;
      if (props.horizontal) {
        className =
          idx === 0
            ? classes.buttonFirstHorizontal
            : idx === enumStrs.length - 1
              ? classes.buttonLastHorizontal
              : classes.buttonMiddleHorizontal;
      } else {
        className =
          idx === 0
            ? classes.buttonFirstVertical
            : idx === enumStrs.length - 1
              ? classes.buttonLastVertical
              : classes.buttonMiddleVertical;
      }
      return (
        <ListItem
          key={item.toString()}
          className={className}
          button
          value={item}
          selected={value === item}
          onClick={props.disabled ? undefined : () => handleListItemClick(item)}
        >
          <ListItemText primary={item} />
        </ListItem>
      );
    });
    return listItems;
  }



  let itemList = getListItems(props.initialized ? props.enumStrs : ["N/A", "Disconnected"], props.initialized ? props.value : "Disconnected");

  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.FormControl}
      disabled={props.disabled}
      control={
        <List
          className={
            props.horizontal
              ? props.classes.listHorizontal
              : props.classes.listVertical
          }
          component="nav"

          variant="outlined"
          disablePadding={true}
        >
          {itemList}
        </List>
      }
      label={props.formControlLabel}
      labelPlacement={props.labelPlacement}
    />
  );
}

const SelectionList = (props) => {
  return (
    <Widget {...props} useStringValue={true} component={SelectionListComponent} />
  )

}

/**
 * Specific props type and default values for this widgets.
 * They extends the ones provided for a generic widget.
 */
SelectionList.propTypes = {
  /** Name of the process variable, NB must contain correct prefix ie: pva://  eg. 'pva://$(device):test$(id)'*/
  pv: PropTypes.string.isRequired,
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros: PropTypes.object,
  

  /**  Display list horizontally.*/
  horizontal: PropTypes.bool,


  /** If defined, this array of strings overides the default EPICS MBBI/O pv strings and are displayed as the choices in the RadioButtonGroup component*/

  custom_selection_strings: PropTypes.array,
  /** label placement*/
  labelPlacement: PropTypes.oneOf(['start', 'top', 'bottom', 'end']),
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel: PropTypes.bool,
  /**
 * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, NB must contain correct prefix ie: pva:// eg. 'pva://$(device):test$(id)'.
 */
  labelPv: PropTypes.string,

};

SelectionList.defaultProps = {
  horizontal: false,
  labelPlacement: 'top'
};


export default withStyles(styles, { withTheme: true })(SelectionList);
