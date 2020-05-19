import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Widget from "./Widget";
import withWidget from "../../SystemComponents/Widgets/withWidget";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
});

/**
 * The TextUpdate Component is a wrapper on the JavaScript <b>div</b> container tag.
 * The component is implemented with zero margins and enabled to grow to the width of its parent container.<br/><br/>
 * The margins and spacing must be controlled from the parent component.<br/><br/>
 * More information on JavaScript <b>div</b> tag:
 * https://www.w3schools.com/tags/tag_div.asp<br/><br/>
 */
function TextUpdate(props) {
  let style = {
    borderRadius: 2,
    padding: 1,
    background: props.alarmColor !== "" ? props.alarmColor : undefined,
  };
  let label = props.label !== undefined ? props.label + ": " : "";
  let content;
  if (props.connection) {
    content = (
      <span style={style}>{label + props.value + " " + props.units}</span>
    );
  } else {
    content = props.label;
  }
  return <div>{content}</div>;
}

export default withWidget(withStyles(styles, { withTheme: true })(TextUpdate), {
  readOnly: true,
});
