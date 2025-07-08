import React, { useState, useContext } from "react";
import AutomationStudioContext from "../../../SystemComponents/AutomationStudioContext";
import DataConnection from "../../../SystemComponents/DataConnection";
import { useTheme } from "@mui/material/styles";

import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";

const HarpRangeSelection = (props) => {
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  const [state, setState] = useState({
    xrange: {
      inputValue: 1,
      initialized: false,
      pvname: "",
      severity: 0,
      metadata: {},
    },
    yrange: { inputValue: 1, initialized: false, pvname: "", severity: 0 },
  });

  const handleInputValue = (name) => (inputValue, pvname, initialized, severity) => {
    let pv = state[name];
    pv.inputValue = inputValue;
    pv.pvname = pvname;
    pv.initialized = initialized;
    pv.severity = severity;

    setState(prev => ({ ...prev, [name]: pv }));
  };

  const handleMetadata = (name) => (metadata) => {
    let pv = state[name];
    pv.metadata = metadata;
    setState(prev => ({ ...prev, [name]: pv }));
  };

  const handleInputValueLabel = (inputValue) => {
    setState(prev => ({ ...prev, label: inputValue }));
  };

  const handleOnFocus = (event) => {
    setState(prev => ({ ...prev, hasFocus: true }));
  };

  const catchReturn = (stateVar) => (event) => {
    if (event.key === "Enter") {
      setState(prev => ({ ...prev, outputValue: prev.value }));
    }
  };

  const handleOnBlur = (event) => {
    setState(prev => ({
      ...prev,
      hasFocus: false,
      value: prev["inputValue"],
      metadata: prev["newMetadata"],
    }));
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    let xRangePV = state["xrange"];
    let yRangePV = state["yrange"];
    let value;
    switch (event.target.value) {
      case " 20 -  200 uA":
        value = 1;

        break;
      case "  2 -   20 uA":
        value = 2;
        break;
      case "200 - 2000 nA":
        value = 3;
        break;
      case " 20 -  200 nA":
        value = 4;
        break;
      case "  2 -   20 nA":
        value = 5;
        break;
      case "200 - 2000 pA":
        value = 6;
        break;
    }

    console.log(value);
    xRangePV.inputValue = value;
    yRangePV.inputValue = value;
    setState(prev => ({
      ...prev,
      xrange: xRangePV,
      yrange: yRangePV,
    }));
  };

  let yrangePV;
  if (props.onlyX === true) {
    yrangePV = props.systemName + ":xrange";
  } else {
    yrangePV = props.systemName + ":yrange";
  }

  let xrangePV;
  if (props.onlyY === true) {
    xrangePV = props.systemName + ":yrange";
  } else {
    xrangePV = props.systemName + ":xrange";
  }

  const initialized =
    state.xrange.initialized && state.yrange.initialized;

  let value = state.xrange.inputValue;
  let enum_strings = {};

  if (initialized) {
    switch (parseInt(state.xrange.inputValue)) {
      case 1:
        value = " 20 -  200 uA";
        break;
      case 2:
        value = "  2 -   20 uA";
        break;
      case 3:
        value = "200 - 2000 nA";
        break;
      case 4:
        value = " 20 -  200 nA";
        break;
      case 5:
        value = "  2 -   20 nA";
        break;
      case 6:
        value = "200 - 2000 pA";
        break;
    }
  }

  enum_strings = [
    " 20 -  200 uA",
    "  2 -   20 uA",
    "200 - 2000 nA",
    " 20 -  200 nA",
    "  2 -   20 nA",
    "200 - 2000 pA",
  ];

  let write_access = false;

  if (initialized) {
    if (typeof state.xrange.metadata !== "undefined") {
      if (typeof state.xrange.metadata.write_access !== "undefined") {
        write_access = state.xrange.metadata.write_access;
      }
    }
  }

  return (
    <React.Fragment>
      <DataConnection
        pv={xrangePV}
        handleInputValue={handleInputValue("xrange")}
        handleMetadata={handleMetadata("xrange")}
        outputValue={state["xrange"].inputValue}
      />
      <DataConnection
        pv={yrangePV}
        handleInputValue={handleInputValue("yrange")}
        handleMetadata={handleMetadata("yrange")}
        outputValue={state["yrange"].inputValue}
      />

      {initialized === true && (
        <TextField
          disabled={write_access === false ? true : false}
          select
          sx={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500,
            borderRadius: 4,
          }}
          value={value}
          onKeyPress={catchReturn("value")}
          onFocus={(event) => handleOnFocus(event)}
          onBlur={(event) => handleOnBlur(event)}
          onChange={handleChange("value")}
          label={props.label}
          margin="normal"
          variant="outlined"
        >
          {enum_strings.map((item, index) => (
            <MenuItem key={item.toString()} value={item}>
              {" "}
              {item}{" "}
            </MenuItem>
          ))}
        </TextField>
      )}

      {(initialized === false || initialized === "undefined") && (
        <TextField
          value={""}
          label={"Connecting to:" + xrangePV}
          disabled={true}
          margin="normal"
          variant="outlined"
        />
      )}
    </React.Fragment>
  );
};

export default HarpRangeSelection;

/* eslint-disable eqeqeq */
