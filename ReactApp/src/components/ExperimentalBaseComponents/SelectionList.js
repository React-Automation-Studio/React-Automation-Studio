import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import withWidget from "../SystemComponents/Widgets/withWidget";

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
class SelectionList extends React.Component {
  constructor(props) {
    super(props);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  /**
   * Store the new item value in the correct PV's state.
   * @param {String} value
   */
  handleListItemClick(value) {
    this.props.onUpdateWidgetState({
      value: value,
      outputValue: value,
      newValueTrigger: 1,
    });
  }

  /**
   * Create a list with the value in enumStrs.
   * @param {array} enumStrs
   */
  getListItems(enumStrs, value) {
    let { classes } = this.props;
    let listItems = enumStrs.map((item, idx) => {
      let className;
      if (this.props.horizontal) {
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
          value={idx}
          selected={this.props.useStringValue ? value === item : value === idx}
          onClick={() => this.handleListItemClick(item)}
        >
          <ListItemText primary={item} />
        </ListItem>
      );
    });
    return listItems;
  }

  render() {
    let itemList = this.getListItems(this.props.enumStrs, this.props.value);
    return (
      <FormControlLabel
        key={this.props.pvName}
        className={this.props.classes.FormControl}
        control={
          <List
            className={
              this.props.horizontal
                ? this.props.classes.listHorizontal
                : this.props.classes.listVertical
            }
            component="nav"
            disabled={this.props.disabled}
            variant="outlined"
            disablePadding={true}
          >
            {itemList}
          </List>
        }
        label={this.props.label}
        labelPlacement={this.props.labelPos}
      />
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
    //If defined, this array of strings overides the default EPICS MBBI/O
    //pv strings and are displayed as the choices in the RadioButtonGroup component
    custom_selection_strings: PropTypes.array,
    // Display list horizontally.
    horizontal: PropTypes.bool,
  };

  static defaultProps = {
    horizontal: false,
  };
}

export default withWidget(withStyles(styles, { withTheme: true })(SelectionList));
