import React from "react";
import { FormControlLabel, List, ListItemButton, ListItemText,ListItem } from "@mui/material";
import Widget from "../SystemComponents/Widgets/Widget";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => {
  const borderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)"; //copied from material ui textfield
  const customBorderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0,0)"
      : "rgba(255, 255, 255, 0)";
  return {
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
      borderRight: "1px solid " + borderColor,
      borderTop: "1px solid " + borderColor,
      borderBottom: "1px solid " + borderColor,
      borderLeft: "1px solid " + customBorderColor,
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
      textAlign: "center",
      marginLeft: -1,
      "&:hover": {
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
      "&:hover": {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
      },
    },
    buttonMiddleHorizontal: {
      borderRight: "1px solid " + borderColor,
      borderTop: "1px solid " + borderColor,
      borderBottom: "1px solid " + borderColor,
      borderLeft: "1px solid " + customBorderColor,
      marginLeft: -1,
      textAlign: "center",
      "&:hover": {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
      },
    },
    buttonLastVertical: {
      borderRight: "1px solid " + borderColor,
      borderLeft: "1px solid " + borderColor,
      borderBottom: "1px solid " + borderColor,
      borderTop: "1px solid " + customBorderColor,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
      textAlign: "center",
      marginTop: -1,
      "&:hover": {
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
      "&:hover": {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
      },
    },
    buttonMiddleVertical: {
      borderRight: "1px solid " + borderColor,
      borderLeft: "1px solid " + borderColor,
      borderBottom: "1px solid " + borderColor,
      borderTop: "1px solid " + customBorderColor,
      marginTop: -1,
      textAlign: "center",
      "&:hover": {
        borderStyle: "solid",
        borderColor: theme.palette.text.main,
        border: 1,
      },
    },
    listVertical: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(1),
    },
    listHorizontal: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      padding: theme.spacing(1),
    },
  };
});

/**
 * The SelectionList Component is a wrapper on the Material-UI List component.
 * The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI List Demos:
 * https://mui.com/demos/lists<br/><br/>
 * Material-UI List API:
 * https://mui.com/api/list
 */
const SelectionListComponent = (props) => {
  const classes = useStyles();
  /**
   * Store the new item value in the correct PV's state.
   * @param {String} value
   */
  const handleListItemClick = (value) => {
    props.handleImmediateChange(value);
  };

  /**
   * Create a list with the value in enumStrs.
   * @param {array} enumStrs
   */
  const getListItems = (enumStrs, value) => {
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
        <ListItem className={className} key={item.toString()} disablePadding>
        <ListItemButton
         
          sx={{height:"100%"}}
          value={item}
          selected={value === item}
          onClick={props.disabled ? undefined : () => handleListItemClick(item)}
        >
          <ListItemText primary={item} sx={{textAlign: "center"}}/>
        </ListItemButton>
        </ListItem>
      );
    });
    return listItems;
  };

  let itemList = getListItems(
    props.initialized ? props.enumStrs : ["N/A", "Disconnected"],
    props.initialized ? props.value : "Disconnected"
  );

  return (
    <FormControlLabel
      key={props.pvName}
      className={classes.FormControl}
      disabled={props.disabled}
      control={
        <List
          className={
            props.horizontal ? classes.listHorizontal : classes.listVertical
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
};

const SelectionList = ({
  horizontal = false,
  labelPlacement = "top",
  showTooltip = false,
  ...others
}: SelectionListProps) => {
  return (
    <Widget
      {...others}
      useStringValue={true}
      component={SelectionListComponent}
      usePvMinMax={false}
      usePvPrecision={false}
      min={undefined}
      max={undefined}
      prec={undefined}
      labelPlacement={labelPlacement}
      showTooltip={showTooltip}
      componentProps={{
        horizontal,
      }}
    />
  );
};

interface SelectionListProps {
  /** Name of the process variable,  eg. '$(device):test$(id)'*/
  pv: string;
  /** Values of macros that will be substituted in the pv name eg. {{'$(device)':'testIOC','$(id)':'2'}}*/
  macros?: object;

  /**  Display list horizontally.*/
  horizontal?: boolean;

  /** If defined, this array of strings overrides the default EPICS MBBI/O pv strings and are displayed as the choices in the RadioButtonGroup component*/
  custom_selection_strings?: string[];
  /** label placement*/
  labelPlacement?: "start" | "top" | "bottom" | "end";
  /**
   * Directive to fill the component's label with
   * the value contained in the  pv metadata's DESC field or the labelPv value.
   * If not defined it uses the custom label as defined by the label prop.
   */
  usePvLabel?: boolean;
  /**
   * Custom PV to define the units to be used, usePvLabel must be set to `true` and useMetadata to `false`, eg. '$(device):test$(id)'.
   */
  labelPv?: string;
  /**
   * Tooltip Text
   */
  tooltip?: string;
  /**
   * Directive to show the tooltip
   */
  showTooltip?: boolean;
  /**
   *  Any of the MUI Tooltip props can applied by defining them as an object
   */
  tooltipProps?: object;
}

export default SelectionList;
