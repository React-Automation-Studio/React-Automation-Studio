import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";

import GenericWidget from "../SystemComponents/Widgets/GenericWidget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    color: theme.palette.grey[500],
  },
  cssLabel: {
    "&$cssFocused": {
      color: theme.palette.grey[500],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: theme.palette.grey[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing(1) * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  textField: {
    width: "100%",
    fontWeight: 500,
    borderRadius: 4,
  },
});

/**
 *  The TextOutput Component is a wrapper on the Material-UI contained TextField component in read-only mode.
 *  The TextField component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 *  The margins and spacing must be controlled from the parent component.<br/><br/>
 *  Material-UI TextField Demos:
 *  https://material-ui.com/demos/text-fields<br/><br/>
 *  Material-UI TextField API:
 *  https://material-ui.com/api/text-field
 */
function TextOutput(props) {
  const { classes } = props;
  let inputProps = {
    classes: {
      root: classes.cssOutlinedInput,
      focused: classes.cssFocused,
      input: classes.input,
      notchedOutline: classes.notchedOutline,
    },
    readOnly: true,
  };
  let inputLabelProps = {
    classes: {
      root: classes.cssLabel,
      focused: classes.cssFocused,
    },
  };


  return (
    <GenericWidget  {...props} readOnly= {true}>
      {(widgetProps) => {
        let inputProps = {};
        if (widgetProps.connection) {
          inputProps["endAdornment"] = (
            <InputAdornment position="end">
              {props.units} {props.children}
            </InputAdornment>
          );
        }

        let style;
        if (widgetProps.alarmColor !== "") {
          style = {
            background:
              "linear-gradient(45deg, " +
              props.theme.palette.background.default +
              " 1%, " +
              widgetProps.alarmColor +
              " 99%)",
          };
        }


        return (
          <TextField
            className={classes.textField}
            style={style}
            key={widgetProps.pvName}
            //aria-owns={state.openContextMenu ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            value={widgetProps.value}
            fullWidth={true}
            onFocus={widgetProps.onUpdateWidgetFocus}
            onBlur={widgetProps.onUpdateWidgetBlur}
            label={widgetProps.label}
            margin="none"
            variant="outlined"
            disabled={widgetProps.disabled}
            InputLabelProps={inputLabelProps}
            InputProps={inputProps}
          />
        )
      }}

    </GenericWidget>
  );
}

export default withStyles(styles, { withTheme: true })(TextOutput);
