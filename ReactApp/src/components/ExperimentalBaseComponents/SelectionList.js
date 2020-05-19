import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import GenericWidget from "../SystemComponents/Widgets/GenericWidget";


const styles = (theme) => ({
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
    borderColor: theme.palette.grey[700],
    borderStyle: "solid",
    marginTop: -1,
  },
  buttonLastHorizontal: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    textAlign: "center",
    marginLeft: -1,
  },
  buttonFirstHorizontal: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    textAlign: "center",
  },
  buttonMiddleHorizontal: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    marginLeft: -1,
    textAlign: "center",
  },
  buttonLastVertical: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    textAlign: "center",
    marginTop: -1,
  },
  buttonFirstVertical: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    textAlign: "center",
  },
  buttonMiddleVertical: {
    borderStyle: "solid",
    borderColor: theme.palette.grey[700],
    border: 1,
    marginTop: -1,
    textAlign: "center",
  },
  listVertical: {
    width: "100%",
    height: "100%",
  },
  listHorizontal: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
});

/**
 * The SelectionList Component is a wrapper on the Material-UI List component.
 * The List component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * Material-UI List Demos:
 * https://material-ui.com/demos/lists<br/><br/>
 * Material-UI List API:
 * https://material-ui.com/api/list
 */
const SelectionListComponent=(props)=> {

  /**
   * Store the new item value in the correct PV's state.
   * @param {String} value
   */
  const handleListItemClick=(value)=> {
    props.onUpdateWidgetState({
      value: value,
      outputValue: value,
      newValueTrigger: 1,
    });
  }

  /**
   * Create a list with the value in enumStrs.
   * @param {array} enumStrs
   */
  const getListItems=(enumStrs, value)=> {
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
          onClick={() => handleListItemClick(item)}
        >
          <ListItemText primary={item} />
        </ListItem>
      );
    });
    return listItems;
  }



  let itemList = getListItems(props.enumStrs, props.value);

  return (
    <FormControlLabel
      key={props.pvName}
      className={props.classes.FormControl}
      control={
        <List
          className={
            props.horizontal
              ? props.classes.listHorizontal
              : props.classes.listVertical
          }
          component="nav"
          disabled={props.disabled}
          variant="outlined"
          disablePadding={true}
        >
          {itemList}
        </List>
      }
      label={props.label}
      labelPlacement={props.labelPlacement}
    />
  );
}

const SelectionList = (props) => {
  return (
    <GenericWidget {...props} useStringValue={true} component={SelectionListComponent}/>
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
  /** Directive to fill the label with the value contained in the  EPICS pv's DESC field. */
  usePvLabel: PropTypes.bool,
  /** Directive to use the units contained in the  EPICS pv's CttonGroup component
  custom_selection_strings: PropTypes.array,
  
    /** Material-UI TextField variant*/
  // Display list horizontally.
  horizontal: PropTypes.bool,

};

SelectionList.defaultProps = {
  horizontal: false,

};


export default withStyles(styles, { withTheme: true })(SelectionList);
