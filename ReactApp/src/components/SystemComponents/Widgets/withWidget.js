import React from "react";
import { LanDisconnect } from "mdi-material-ui/";
import { format } from "mathjs";
import PropTypes from "prop-types";
import { deepOrange, red } from "@material-ui/core/colors";
import DataConnection from "../DataConnection";
import ContextMenu from "../ContextMenu";
import { formatTime } from "./WidgetUtils";

/**
 * Class with the main functions related to a widget.
 */
export default function withWidget(WrappedComponent, options = {}) {

  return class Widget extends React.Component {
    constructor(props) {
      super(props);
      this.createWidgetState();
      this.bindWidgetCallbacks();
    }

    //-----------------------------------------------------------
    //
    // CLASS CREATION METHODS
    //
    //-----------------------------------------------------------

    /**
     * Bind all callbacks in this class to the the class
     * you are creating.
     */
    bindWidgetCallbacks() {
      this.handleContextMenuClose = this.handleContextMenuClose.bind(this);

      this.handleInputValueLabel = this.handleInputValueLabel.bind(this);
      this.handleInputValue = this.handleInputValue.bind(this);
      this.handleMetadata = this.handleMetadata.bind(this);
      this.handleOnBlur = this.handleOnBlur.bind(this);
      this.handleOnFocus = this.handleOnFocus.bind(this);
      this.handleStateUpdate = this.handleStateUpdate.bind(this);
      this.handleToggleContextMenu = this.handleToggleContextMenu.bind(this);
    }

    /**
     * Add to the state the main properties to communicate with a PV.
     * At the beggining it defines a set of instance variables and substitutes
     * the macros with the correct values.
     * Then, from the PVs received through pv props, it creates an object with
     * a set of properties for each pv; each property corresponds to the main
     * information related to that PV.
     * Finally, it defines the main properties for a widget's state.
     */
    createWidgetState() {
      this.state = {};
      let dataPVs = {};
      this.pvNames = Array.isArray(this.props.pv)
        ? this.props.pv
        : [this.props.pv];
      this.disconnectedPVs = [];
      this.writablePVs = [];
      this.alarmColors = ["", deepOrange["400"], red["800"]];

      // Macro substitutions
      let macros = this.props.macros;
      if (macros !== undefined) {
        for (let i = 0; i < this.pvNames.length; i++) {
          let oldName = this.pvNames[i];
          for (let macro in macros) {
            this.pvNames[i] = this.pvNames[i].replace(
              macro.toString(),
              macros[macro].toString()
            );
          }
          if (
            this.props.writablePVs !== undefined &&
            this.props.writablePVs.includes(oldName)
          ) {
            this.writablePVs.push(this.pvNames[i]);
          }
        }
      }

      // PV state
      for (let pvName of this.pvNames) {
        dataPVs[pvName] = {
          pvname: pvName,
          value: "",
          inputValue: "",
          outputValue: "",
          initialized: false,
          metadata: {},
          newMetadata: {},
          severity: 0,
          timestamp: undefined,
          newValueTrigger: 0,
          label: "Undefined",
          max: 0,
          min: 0,
          prec: 0,
        };
      }

      // Widget's state
      this.state.dataPVs = dataPVs;
      this.state.hasFocus = false;
      this.state.openContextMenu = false;
      this.state.anchorEl = null;
    }

    //-----------------------------------------------------------
    //
    // AUXILIAR METHODS
    //
    //-----------------------------------------------------------

    /**
     * When receiving new values.
     * Check them and update che corresponing PV.
     * @param {String} pvName
     * @param {Object} elem
     * @param {Object} dataPVs
     */
    changeValues(pvName, elem, dataPVs) {
      for (let property in elem) {
        if (dataPVs[pvName].hasOwnProperty(property)) {
          if (property === "newValueTrigger") {
            dataPVs[pvName][property] += 1;
          } else if (property.toLowerCase().includes("value")) {
            let value = elem[property];
            if (elem.checkValue) {
              value = this.isInsideLimits(value);
            }
            dataPVs[pvName][property] = value;
          }
        }
      }
      return dataPVs;
    }

    /**
     * Check received value is inside PV limits.
     * Return the, eventually cropped, value.
     * @param {String} value
     */
    isInsideLimits(value) {
      let tempValue = parseFloat(value);
      if (!isNaN(tempValue)) {
        tempValue = tempValue > this.max ? this.max : tempValue;
        tempValue = tempValue < this.min ? this.min : tempValue;
        value = tempValue;
      }
      return value;
    }

    /**
     * Return true if all PVs are connected.
     * If pvName is not undefined it verifies that the specific PV is connected.
     * @param {String} pvName
     */
    isConnectionReady(pvName) {
      if (pvName !== undefined && this.pvNames.includes(pvName)) {
        return this.state.dataPVs[pvName].initialized;
      }
      return this.disconnectedPVs.length === 0;
    }

    /**
     * Wrapper to pass a set of props to a specifc component.
     * @param {string} CustomComponent
     * @param {object} props
     */
    wrapComponent(CustomComponent, props) {
      return <CustomComponent {...props} />;
    }

    //-----------------------------------------------------------
    //
    // GET METHODS
    //
    //-----------------------------------------------------------

    /**
     * Get the correct alarm color if the PV is in the alarm state.
     * Return the severity color, in this.alarmColors, associate
     * to the PV's severity.
     * If this.props.stringSeverity is not undefined, eventually
     * use the custom severity.
     * @param {String} pvName
     */
    getAlarmColor(pvName) {
      if (
        this.isConnectionReady() &&
        this.props.alarmSensitive &&
        this.alarmColors.length === 3
      ) {
        let severity = this.state.dataPVs[pvName].severity;
        if (this.props.stringSeverity !== undefined) {
          for (let elem of this.props.stringSeverity) {
            if (this.state.dataPVs[pvName].value === elem.stringMatch) {
              severity = elem.severity;
            }
          }
        }
        return this.alarmColors[severity];
      }
      return this.alarmColors[0];
    }

    /**
     * Set color based on received one.
     * If color is not valid use the default one.
     * @param {string} color
     * @param {string} defaultColor
     */
    getColor(color, defaultColor) {
      if (  this.props[color] === "primary" || this.props[color] === "secondary" ||  this.props[color] === "inherit" ) 
      {
        return this.theme !== undefined ? this.theme.palette[this.props[color]].main : this.props[color];
      }
      else if (this.props[color] === "default") {
        return this.theme !== undefined ? this.theme.palette.grey[50] : "default";
      }
      else {
        return this.props[color]
      }
    }

    /**
     * Return connections status.
     */
    getConnections() {
      return this.pvNames.map((pvName) => this.isConnectionReady(pvName));
    }

    /**
     * Return the ContextMenu component.
     */
    getContextMenu() {
      let listPVs = [];
      for (let pv in this.state.dataPVs) {
        listPVs.push(this.state.dataPVs[pv]);
      }
      return (
        <ContextMenu
          disableProbe={this.props.disableProbe}
          open={this.state.openContextMenu}
          pvs={listPVs}
          handleClose={this.handleContextMenuClose}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          probeType={options.readOnly ? "readOnly" : undefined}
        />
      );
    }

    /**
     * Return a list of DataConnection components.
     * One for each PV linked to this widget.
     * More in details it associates the value of each PV to
     * the 'outputValue' of the Widget' component.
     * Moreover it defines, for DataConnection component,
     * if optional connections to specific fields should be established.
     */
    getDataConnection() {
      let dataConnections = [];

      for (let pv in this.state.dataPVs) {
        let pvName = this.state.dataPVs[pv].pvname;
        dataConnections.push(
          <DataConnection
            key={pvName}
            pv={pvName}
            outputValue={this.state.dataPVs[pv].outputValue}
            useStringValue={this.props.useStringValue}
            intialLocalVariableValue={this.props.intialLocalVariableValue}
            newValueTrigger={this.state.dataPVs[pv].newValueTrigger}
            debug={this.props.debug}
            handleInputValue={this.handleInputValue}
            handleMetadata={this.handleMetadata}
            handleInputValueLabel={this.handleInputValueLabel(pvName)}
            usePvLabel={this.props.usePvLabel}
          />
        );
      }
      return dataConnections;
    }

    /**
     * Disable widget if one PV is disconnected,
     * or user has disabled the widget,
     * or read access is not enabled,
     * or the PV should be writable but it is not.
     * If the writable list is not specified
     * and the widget is not in readOnly mode
     * all the PVs in this.pvNames should be writable.
     */
    getDisabled() {
      let disabled = false || this.props.disabled || !this.isConnectionReady();
      if (!disabled) {
        for (let pvName of this.pvNames) {
          disabled = disabled || !this.state.dataPVs[pvName].metadata.read_access;
        }
        if (!options.readOnly) {
          let writablePVs =
            this.writablePVs.length > 0 ? this.writablePVs : this.pvNames;
          for (let pvName of writablePVs) {
            disabled =
              disabled || !this.state.dataPVs[pvName].metadata.write_access;
          }
        }
      }
      return disabled;
    }

    /**
     * Return the disconnected icon
     */
    getDisconnectedIcon() {
      let color =
        this.props.theme !== undefined
          ? this.props.theme.palette.error.main
          : "#e91e63";
      return (
        <LanDisconnect
          fontSize="small"
          style={{
            color: color,
            verticalAlign: "middle",
          }}
        />
      );
    }

    /**
     * Get widget label with the PV or the custom label if the PV
     * has been initialized, otherwise show a disconnected icon with
     * the pv name.
     * @param {String} pvName
     */
    getLabel(pvName) {
      if (this.isConnectionReady()) {
        return this.props.usePvLabel
          ? this.state.dataPVs[pvName].label
          : this.props.label;
      }
      return (
        <span>
          {this.getDisconnectedIcon()}
          {this.disconnectedPVs.toString()}
        </span>
      );
    }

    /**
     * Get OFF color.
     */
    getOffColor() {
      return this.getColor("offColor", "default");
    }

    /**
     * Get ON color.
     */
    getOnColor() {
      return this.getColor("onColor", "primary");
    }

    /**
     * Return the PV, at the specified index, in the array of the received PVs.
     * If no index is specified it returns the first PV in that array.
     * This is a special PV because it is used as default in
     * various methods when not specified.
     */
    getPvName(idx = 0) {
      return this.pvNames[idx];
    }

    /**
     * Return the enum string values based on the received props.
     * Set a default value in case none of the provided values is defined
     * or the PV is not connected.
     * @param {String} pvName
     */
    getStringValue(pvName) {
      if (this.isConnectionReady()) {
        if (this.props.custom_selection_strings !== undefined) {
          return this.props.custom_selection_strings;
        }
        if (
          this.state.dataPVs[pvName].metadata.enum_strs !== undefined &&
          this.state.dataPVs[pvName].metadata.enum_strs !== null
        ) {
          return this.state.dataPVs[pvName].metadata.enum_strs;
        }
        return ["NONE"];
      }
      return ["DISCONNECTED"];
    }

    /**
     * Return specific PV timestamp.
     * @param {String} pvName
     */
    getTimestamp(pvName) {
      return this.state.dataPVs[pvName].timestamp;
    }

    /**
     * Return a list with all the timestamps.
     */
    getTimestampList() {
      return this.pvNames.map((pvName) => this.state.dataPVs[pvName].timestamp);
    }

    /**
     * Return the units measurement.
     * @param {String} pvName
     */
    getUnits(pvName) {
      if (this.isConnectionReady()) {
        if (
          this.props.usePvUnits &&
          this.state.dataPVs[pvName].metadata !== undefined &&
          this.state.dataPVs[pvName].metadata.units !== undefined &&
          this.state.dataPVs[pvName].metadata.units !== null
        ) {
          return this.state.dataPVs[pvName].metadata.units;
        }
        if (this.props.units !== undefined) {
          return this.props.units;
        }
      }
      return "";
    }

    /**
     * It can return one of the following:
     * -  A specific metadata property
     *    (if the displayMetaData props is a valid one).
     * -  TimeStamp
     *    (if displayTimeStamp props is true).
     * -  Value.
     *    If the numberFormat is specified apply it, otherwise
     *    format value based on precision. If prec props
     *    is not defined, use PV's precision.
     *    Format value when the widget is no more selected.
     * @param {String} pvName
     */
    getValue(pvName) {
      if (this.isConnectionReady()) {
        let value = this.state.dataPVs[pvName].value;
        if (
          this.props.displayMetaData !== undefined &&
          this.state.dataPVs[pvName].hasOwnProperty(this.props.displayMetaData)
        ) {
          return this.state.dataPVs[pvName].metadata[this.props.displayMetaData];
        }
        if (this.props.displayTimeStamp) {
          return formatTime(this.state.dataPVs[pvName].timestamp, true);
        }
        if (!this.state.hasFocus && !Array.isArray(value)) {
          let tempValue = parseFloat(value);
          if (!isNaN(tempValue)) {
            if (this.props.numberFormat !== undefined) {
              return format(tempValue, this.props.numberFormat);
            }
            if (this.prec !== undefined) {
              return tempValue.toFixed(this.prec);
            }
            return tempValue;
          }
          return value.toString();
        }
        return value;
      }
      return "";
    }

    /**
     * Return a list with all PVs' values.
     */
    getValueList() {
      return this.pvNames.map((pvName) => this.getValue(pvName));
    }

    /**
     * Return all widget details in a object.
     */
    getWidgetdetails() {
      let pvName = this.getPvName();
      return {
        // Variables and components.
        alarmColor: this.getAlarmColor(pvName),
        connection: this.isConnectionReady(),
        connectionList: this.getConnections(),
        disabled: this.getDisabled(),
        enumStrs: this.getStringValue(pvName),
        label: this.getLabel(pvName),
        min: this.min,
        max: this.max,
        offColor: this.getOffColor(),
        onColor: this.getOnColor(),
        precision: this.prec,
        pvName: pvName,
        pvList: this.pvNames,
        timestamp: this.getTimestamp(pvName),
        timestampList: this.getTimestampList(),
        units: this.getUnits(pvName),
        value: this.getValue(pvName),
        valueList: this.getValueList(),
        // Callbacks.
        onUpdateWidgetBlur: this.handleOnBlur,
        onUpdateWidgetFocus: this.handleOnFocus,
        onUpdateWidgetState: this.handleStateUpdate,
      };
    }

    //-----------------------------------------------------------
    //
    // HANDLE METHODS
    //
    //-----------------------------------------------------------

    /**
     * Close context menu.
     */
    handleContextMenuClose() {
      this.setState({
        anchorEl: null,
        openContextMenu: false,
      });
    }


    handleInputValueLabel = (pvName) => (inputValue, pvname, initialized, severity, timestamp) => {
      let dataPVs = this.state.dataPVs;
      dataPVs[pvName].label = inputValue;
      this.setState({ dataPVs: dataPVs })
    }
    /**
     * Update the value and the inputValue of the corresponding PV
     * with the value read from the PV. Update the value only
     * when the widget is not selected.
     * Based on the connection status update the list of disconnected PVs.
     * @param {String} inputValue
     * @param {String} pvname
     * @param {boolean} initialized
     * @param {String} severity
     * @param {String} timestamp
     */
    handleInputValue(inputValue, pvname, initialized, severity, timestamp) {
      if (this.props.debug) {
        console.log("inputValue", inputValue);
        console.log("pvname", pvname);
        console.log("initialized", initialized);
        console.log("severity", severity);
        console.log("timestamp", timestamp);
      }
      let dataPVs = this.state.dataPVs;
      if (initialized) {
        if (!this.state.hasFocus) {
          dataPVs[pvname].value = inputValue;
        }
        dataPVs[pvname].inputValue = inputValue;
        dataPVs[pvname].pvname = pvname;
        dataPVs[pvname].initialized = initialized;
        dataPVs[pvname].severity = severity;
        dataPVs[pvname].timestamp = timestamp;
        let idx = this.disconnectedPVs.indexOf(pvname);
        if (idx !== -1) {
          this.disconnectedPVs.splice(idx, 1);
        }
      } else {
        dataPVs[pvname].initialized = initialized;
        let idx = this.disconnectedPVs.indexOf(pvname);
        if (idx === -1) {
          this.disconnectedPVs.push(pvname);
        }
      }
      this.setState({ dataPVs: dataPVs });
    }

    /**
     * Store metadata received from the PV.
     * Metadata corresponds to the PV's information.
     * When the widget is no more selected apply those values.
     * @param {Object} metadata
     */
    handleMetadata(metadata) {
      let pvname = metadata.pvname;
      let dataPVs = this.state.dataPVs;
      if (!this.state.hasFocus) {
        dataPVs[pvname].metadata = metadata;
      }
      dataPVs[pvname].newMetadata = metadata;
      this.setState({ dataPVs: dataPVs });
    }

    /**
     * Widget is no more selected.
     * Apply values that were temporary stored.
     */
    handleOnBlur() {
      let dataPVs = this.state.dataPVs;
      for (let pv in dataPVs) {
        dataPVs[pv].value = dataPVs[pv].inputValue;
        dataPVs[pv].metadata = dataPVs[pv].newMetadata;
      }
      this.setState({
        hasFocus: false,
        dataPVs: dataPVs,
      });
    }

    /**
     * Widget has been selected.
     * Store this information on the widget's state.
     */
    handleOnFocus() {
      this.setState({ hasFocus: true });
    }

    /**
     * Set specific widget state fields from outside this class.
     * @param {Object} options
     */
    handleStateUpdate(options = {}) {
      let dataPVs = this.state.dataPVs;
      for (let property in options) {
        if (this.pvNames.includes(property)) {
          let pvName = property;
          dataPVs = this.changeValues(pvName, options[property], dataPVs);
        }
      }
      dataPVs = this.changeValues(this.getPvName(), options, dataPVs);
      this.setState({
        dataPVs: dataPVs,
        hasFocus:
          options.focus !== undefined ? options.focus : this.state.hasFocus,
      });
    }

    /**
     * Open context menu. Stop event propagation.
     * @param {Event} event
     */
    handleToggleContextMenu(event) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        anchorEl: this.state.anchorEl !== null ? null : event.target,
        openContextMenu: !this.state.openContextMenu,
      });
    }

    //-----------------------------------------------------------
    //
    // SET METHODS
    //
    //-----------------------------------------------------------

    /**
     * Set min and max value.
     * If the widget should not use the PV's min and max it uses
     * the props value, also if undefined (undefined = no min and max values).
     * @param {String} pvName
     */
    setMinMax(pvName) {
      let min, max;
      if (this.isConnectionReady() && this.props.usePvMinMax) {
        min = parseInt(this.state.dataPVs[pvName].min);
        max = parseInt(this.state.dataPVs[pvName].max);
      } else {
        min = this.props.min;
        max = this.props.max;
      }
      this.min = min;
      this.max = max;
    }

    /**
     * Set Widget precision
     * @param {String} pvName
     */
    setPrec(pvName) {
      if (this.props.usePvPrecision && this.state.dataPVs[pvName] !== undefined) {
        this.prec = parseInt(this.state.dataPVs[pvName].prec);
      } else {
        this.prec = this.props.prec;
      }
    }

    //-----------------------------------------------------------
    //
    // LIFECYCLE METHODS
    //
    //-----------------------------------------------------------

    /**
     * Render method.
     */
    render() {
      let pvName = this.getPvName();
      this.setPrec(pvName);
      this.setMinMax(pvName);
      let contextMenu = this.getContextMenu();
      let dataConnections = this.getDataConnection();
      let style = {
        width: "100%",
        height: "100%",
  //      overflow: "hidden",
      };
      // Wrap child components with correct values.
      let child;
      let widgetDetails = this.getWidgetdetails();
      //if (widgetDetails !== undefined) {
      // child = this.wrapComponent(this.props.component, {
      //    ...this.props,
      //    ...widgetDetails,
      //  });
      //}
      return (
        <div
          style={style}
          onContextMenu={
            options.disableContextMenu
            ? undefined
            : this.props.disableContextMenu===true?undefined:this.handleToggleContextMenu
          }
        >
          {dataConnections}
          {contextMenu}
          <WrappedComponent {...this.props} {...widgetDetails} />
        </div>
      );
    }

    /**
     * Props definition for all widgets linked to PVs storing
     * analog values.
     */
    static propTypes = {
      /**
       * Directive to use the EPICS alarm severity status to alter the fields backgorund color.
       */
      alarmSensitive: PropTypes.bool,
      /**
       * If defined, then the DataConnection and
       * the widget debugging information will be displayed.
       */
      debug: PropTypes.bool,
      /**
       * Directive to disable the button from outside.
       */
      disabled: PropTypes.bool,
      /**
       * Directive to disable the Probe page for a widget
       */
      disableProbe: PropTypes.bool,
      /**
       * If defined, then the Metadata property, defined as input string,
       * of the PV will be displayed instead of its value.
       * eg. displayMetaData='lower_disp_limit'
       */
      displayMetaData: PropTypes.string,
      /**
       * If defined, then the timestamp of the PV will be displayed instead of its value
       */
      displayTimeStamp: PropTypes.bool,
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
       * Values of macros that will be substituted in the pv name.
       * eg. {{'$(device)':'testIOC','$(id)':'2'}}
       */
      macros: PropTypes.object,
      /**
       * Custom maximum to be used, if usePvMinMax is not defined.
       */
      max: PropTypes.number,
      /**
       * Custom minimum value to be used, if usePvMinMax is not defined.
       */
      min: PropTypes.number,
      /**
       * If defined, then the string representaion of the number can be formatted
       * using the mathjs format function
       * eg. numberFormat={{notation: 'engineering',precision: 3}}.
       * See https://mathjs.org/docs/reference/functions/format.html for more examples
       */
      numberFormat: PropTypes.object,
      /**
       * Custom on color to be used, must be derived from Material UI theme color's.
       */
      onColor: PropTypes.string,
      /**
       * Custom off color to be used, must be derived from Material UI theme color's.
       */
      offColor: PropTypes.string,
      /**
       * Custom precision to round the value.
       */
      prec: PropTypes.number,
      /**
       * List of the process variables, or the single process variable
       * to which the widget will be connected.
       * When using multiple PVs order is important beacuse you will use this property
       * to referce to specific PVs inside your widget.
       * Each name must contain the correct prefix (pva:// or loc://)
       * eg. 'pva://$(device):test$(id)'
       */
      pv: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
      /**
       * Object with a string and the corresponding severity value.
       * When PV value is equal to the string, set the corresponding severity
       * in the widget's severity.
       * Example: { stringMatch: '1', severity: 2 }.
       */
      stringSeverity: PropTypes.object,
      /**
       * Custom units to be used, if usePvUnits is not defined.
       */
      units: PropTypes.string,
      /**
       * Directive to fill the component's label with
       * the value contained in the  EPICS PV's DESC field.
       */
      usePvLabel: PropTypes.bool,
      /**
       * Directive to use the HOPR and LOPR EPICS fields
       * to limit the maximum and minimum values
       * that can be contained in the value.
       */
      usePvMinMax: PropTypes.bool,
      /**
       * Directive to round the value using the PREC field of the PV.
       * If not defined it uses the custom precision.
       */
      usePvPrecision: PropTypes.bool,
      /**
       * Directive to use the units contained in the  EPICS pv's EGU field.
       */
      usePvUnits: PropTypes.bool,
      /**
       * Directive to use PV's string values.
       */
      useStringValue: PropTypes.bool,
      /**
       * Array with writable PV list.
       * It is a subset of pv.
       */
      writablePVs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    };

    /**
     * Default props.definition for all widgets linked to
     * PVs storing analog values.
     */
    static defaultProps = {
      alarmSensitive: false,
      debug: false,
      disabled: false,
     // disableProbe: false, // in the context menu it only checks for defined and then assigns a false value
      displayTimeStamp: false,
      onColor: "primary",
      offColor: "default",
      usePvLabel: false,
      usePvMinMax: false,
      usePvPrecision: false,
      usePvUnits: false,
      useStringValue: false,
    };
  }

}
