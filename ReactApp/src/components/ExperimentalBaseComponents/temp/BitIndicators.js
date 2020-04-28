import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, FormControlLabel, SvgIcon } from "@material-ui/core";
import { Lens } from "@material-ui/icons";
import PropTypes from "prop-types";
import withWidget from "../../SystemComponents/Widgets/withWidget";

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
class BitIndicators extends React.Component {
  render() {
    let bitArray = [];
    let bitLabels = [];
    let bitStyles = [];

    let bitLabelPos =
      this.props.bitLabelPlacement !== undefined
        ? this.props.bitLabelPlacement
        : this.props.horizontal
        ? "top"
        : "end";
    const place = bitLabelPos.charAt(0).toUpperCase() + bitLabelPos.slice(1);

    for (let n = 0; n < this.props.numberOfBits; n++) {
      bitArray.push(
        this.props.connection ? this.props.value & Math.pow(2, n) : 0
      );
      bitLabels.push(
        this.props.bitLabels === undefined
          ? "Bit " + n
          : this.props.bitLabels[n]
      );
      bitStyles.push({ ["margin" + place]: this.props.theme.spacing(1) });
    }
    if (this.props.reverseBits) {
      bitLabels = bitLabels.reverse();
      bitArray = bitArray.reverse();
      bitStyles = bitStyles.reverse();
    }

    let bits = bitArray.map((value, index) => {
      let color = this.props.disabled
        ? "disabled"
        : value !== 0
        ? this.props.onColor
        : this.props.offColor;
      return (
        <Grid
          item
          key={index + bitLabels[index]}
          xs={!this.props.horizontal ? 12 : undefined}
        >
          <FormControlLabel
            className={this.props.classes.FormControl}
            disabled={this.props.disabled}
            label={bitLabels[index]}
            labelPlacement={bitLabelPos}
            control={
              <SvgIcon size="small" style={bitStyles[index]} color={color}>
                {this.props.children === undefined ? (
                  <Lens />
                ) : (
                  this.props.children
                )}
              </SvgIcon>
            }
          />
        </Grid>
      );
    });
    return (
      <Grid
        key={this.props.pvName}
        container
        spacing={this.props.horizontal ? 2 : 0}
        alignItems="flex-start"
        direction={this.props.horizontal ? "row" : "column"}
      >
        <Grid key={this.props.label} item xs={12}>
          {this.props.label}
        </Grid>
        {bits}
      </Grid>
    );
  }

  /**
   * Specific props type and default values for this widgets.
   * They extends the ones provided for a generic widget.
   */
  static propTypes = {
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
  };

  static defaultProps = {
    numberOfBits: 8,
    horizontal: false,
    reverseBits: false,
  };
}

export default withWidget(
  withStyles(styles, { withTheme: true })(BitIndicators),
  { readOnly: true }
);
