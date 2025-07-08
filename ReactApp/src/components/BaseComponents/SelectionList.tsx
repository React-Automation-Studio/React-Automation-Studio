import React from "react";
import {
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Widget from "../SystemComponents/Widgets/Widget";

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
  const theme = useTheme();

  // Create border colors based on theme
  const borderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)"; //copied from material ui textfield
  const customBorderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0,0)"
      : "rgba(255, 255, 255, 0)";

  // Create sx objects for styling
  const formControlSx = {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const buttonFirstHorizontalSx = {

    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    textAlign: "center",
    "&:hover": {
      borderStyle: "solid",
      borderColor: theme.palette.text.primary,
      border: 1,
    },
  };

  const buttonLastHorizontalSx = {
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + customBorderColor,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    textAlign: "center",
    marginLeft: -0.125,
    "&:hover": {
      borderStyle: "solid",
      borderColor: theme.palette.text.primary,
      border: 1,
    },
  };

  const buttonMiddleHorizontalSx = {
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + customBorderColor,
    marginLeft: -0.125,
    textAlign: "center",
    "&:hover": {
      borderStyle: "solid",
      borderColor: theme.palette.text.primary,
      border: 1,
    },
  };

  const buttonFirstVerticalSx = {
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    textAlign: "center",
    "&:hover": {
      borderStyle: "solid",
      borderColor: theme.palette.text.primary,
      border: 1,
    },
  };

  const buttonLastVerticalSx = {
    borderRight: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderTop: "1px solid " + customBorderColor,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    textAlign: "center",
    marginTop: -0.125,
    "&:hover": {
      borderStyle: "solid",
      borderColor: theme.palette.text.primary,
      border: 1,
    },
  };

  const buttonMiddleVerticalSx = {
    borderRight: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderTop: "1px solid " + customBorderColor,
    marginTop: -0.125,
    textAlign: "center",
    "&:hover": {
      borderStyle: "solid",
      borderColor: theme.palette.text.primary,
      border: 1,
    },
  };

  const listVerticalSx = {
    width: "100%",
    height: "100%",
    padding: theme.spacing(1),
  };

  const listHorizontalSx = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    padding: theme.spacing(1),
  };
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
      let itemSx;
      if (props.horizontal) {
        itemSx =
          idx === 0
            ? buttonFirstHorizontalSx
            : idx === enumStrs.length - 1
              ? buttonLastHorizontalSx
              : buttonMiddleHorizontalSx;
      } else {
        itemSx =
          idx === 0
            ? buttonFirstVerticalSx
            : idx === enumStrs.length - 1
              ? buttonLastVerticalSx
              : buttonMiddleVerticalSx;
      }
      return (
        <ListItem sx={itemSx} key={item.toString()} disablePadding>
          <ListItemButton
            sx={{ height: "100%" }}
            value={item}
            selected={value === item}
            onClick={
              props.disabled ? undefined : () => handleListItemClick(item)
            }
          >
            <ListItemText primary={item} sx={{ textAlign: "center" }} />
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
      sx={formControlSx}
      disabled={props.disabled}
      control={
        <List
          sx={
            props.horizontal ? listHorizontalSx : listVerticalSx
          }
          component="nav"
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
