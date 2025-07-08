import React, { useState, useContext, useEffect } from "react";

import AutomationStudioContext from "../../../SystemComponents/AutomationStudioContext";
import DataConnection from "../../../SystemComponents/DataConnection";
import { useTheme } from "@mui/material/styles";


import HarpGraphY from "./HarpGraphY";

const wireSpacing = [
  -42, -39, -36, -33, -30, -27, -24, -22, -20, -18, -16, -14, -12, -10, -9, -8,
  -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18,
  20, 22, 24, 27, 30, 33, 36, 39, 42, 43,
];

const HarpGraph = (props) => {
  const context = useContext(AutomationStudioContext);
  const theme = useTheme();

  const initializeState = () => {
    let state = {};
    let pv;
    let pvname;
    let dataPVs = {};
    for (pv in props.dataPVs) {
      pvname = props.dataPVs[pv];
      if (typeof props.macros !== "undefined") {
        let macro;
        for (macro in props.macros) {
          pvname = pvname.replace(
            macro.toString(),
            props.macros[macro].toString()
          );
        }
      }

      dataPVs[pvname] = {
        label: "",
        initialized: false,
        pvname: pvname,
        value: [],
        char_value: "",
        alarmColor: "",
        lower_disp_limit: 0,
        upper_disp_limit: 10000,
        lower_warning_limit: 4000,
        upper_warning_limit: 6000,
        units: "V",
        precision: 0,
      };
    }

    state["rangeUnits"] = "";
    state["ymax"] = "";
    state["ymax"] = 2000;
    state["rangeYmax"] = 2000;
    state["ymin"] = 0;
    state["dataPVs"] = dataPVs;
    state["openContextMenu"] = false;
    state["x0"] = 0;
    state["y0"] = 0;
    const contextPVs = [];
    for (const item in dataPVs) {
      contextPVs.push(dataPVs[item]);
    }
    state["contextPVs"] = contextPVs;

    return state;
  };

  const [state, setState] = useState(initializeState);

  const handleRangeInputValue = (inputValue, pvname, initialized, severity) => {
    if (initialized === true) {
      switch (parseInt(inputValue)) {
        case 1:
          if (!(state.rangeUnits == "uA" && state.rangeYmax == 200)) {
            setState(prev => ({ ...prev, rangeUnits: "uA", ymax: 200, rangeYmax: 200 }));
          }
          break;
        case 2:
          if (!(state.rangeUnits == "uA" && state.rangeYmax == 20)) {
            setState(prev => ({ ...prev, rangeUnits: "uA", ymax: 20, rangeYmax: 20 }));
          }
          break;
        case 3:
          if (
            !(state.rangeUnits == "nA" && state.rangeYmax == 2000)
          ) {
            setState(prev => ({ ...prev, rangeUnits: "nA", ymax: 2000, rangeYmax: 2000 }));
          }
          break;
        case 4:
          if (!(state.rangeUnits == "nA" && state.rangeYmax == 200)) {
            setState(prev => ({ ...prev, rangeUnits: "nA", ymax: 200, rangeYmax: 200 }));
          }
          break;
        case 5:
          if (!(state.rangeUnits == "nA" && state.rangeYmax == 20)) {
            setState(prev => ({ ...prev, rangeUnits: "nA", ymax: 20, rangeYmax: 20 }));
          }
          break;
        case 6:
          if (
            !(state.rangeUnits == "pA" && state.rangeYmax == 2000)
          ) {
            setState(prev => ({ ...prev, rangeUnits: "pA", ymax: 2000, rangeYmax: 2000 }));
          }
          break;
        default:
      }
    }
  };

  const handleInputValue = (inputValue, pvname, initialized, severity) => {
    if (initialized === true) {
      let dataPVs = state.dataPVs;
      let newArray = [];

      let max;
      if (typeof props.maxLength !== "undefined") {
        max = props.maxLength;
        newArray = dataPVs[pvname].value.concat(inputValue);
      } else {
        newArray = inputValue;
        max = inputValue.length;
      }

      dataPVs[pvname].initialized = initialized;
      dataPVs[pvname].severity = severity;

      let length = newArray.length;

      if (length > max) {
        newArray = newArray.slice(length - max);
      }

      let i = 0;
      let sample;
      let data = [];
      let n;
      for (n in newArray) {
        if (newArray[n] > 0) {
          sample = { x: wireSpacing[i], y: newArray[n] };
        } else {
          sample = { x: wireSpacing[i], y: state.ymin };
        }

        data[i] = sample;

        i++;
      }

      dataPVs[pvname].value = newArray;
      dataPVs[pvname].linedata = data;

      setState(prev => ({ ...prev, dataPVs: dataPVs }));
    } else {
      let dataPVs = state.dataPVs;
      dataPVs[pvname].initialized = false;

      let i;
      let sample;
      let data = [];

      for (i in wireSpacing) {
        sample = { x: wireSpacing[i], y: 0 };
        data[i] = sample;
      }

      dataPVs[pvname].linedata = data;

      setState(prev => ({ ...prev, dataPVs: dataPVs }));
    }
  };

  const handleMetadata = (pvname) => (metadata) => {
    let dataPVs = state.dataPVs;
    dataPVs[pvname].metadata = metadata;
    setState(prev => ({ ...prev, dataPVs: dataPVs }));
  };

  const handleInputValueLabel = (pvname) => (inputValue) => {
    let dataPVs = state.dataPVs;
    dataPVs[pvname].label = inputValue;
    setState(prev => ({ ...prev, dataPVs: dataPVs }));
  };

  const handleContextMenuClose = (event) => {
    setState(prev => ({ ...prev, openContextMenu: false }));
  };

  const handleToggleContextMenu = (event) => {
    event.persist();
    setState(prev => ({
      ...prev,
      openContextMenu: !prev.openContextMenu,
      x0: event.pageX,
      y0: event.pageY,
    }));
    event.preventDefault();
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
    setState(prev => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleWheel = (event) => {
    const adjust = state.ymax / 5;
    let ymax = state.ymax;
    if (event.deltaY < 0) {
      ymax = state.ymax - adjust;
    } else {
      ymax = state.ymax + adjust;
    }

    setState(prev => ({ ...prev, ymax: ymax }));

    changeOtherGraphYmax(ymax);
  };

  const changeOtherGraphYmax = (ymax) => {
    props.changeOtherGraphYmax(ymax);
  };
  
  const changeThisGraphYmax = (ymax) => {};

  const handleOnClick = (event) => {
    if (event.nativeEvent.which === 1) {
      setState(prev => ({ ...prev, ymax: prev.rangeYmax }));
      changeOtherGraphYmax(state.rangeYmax);
    }
  };

  const multipleDataConnections = () => {
    let pv;
    let DataConnections = [];
    for (pv in state.dataPVs) {
      DataConnections.push(
        <div key={pv.toString()}>
          <DataConnection
            key={"pv" + pv.toString()}
            pv={state.dataPVs[pv].pvname}
            handleInputValue={handleInputValue}
            handleMetadata={handleMetadata(state.dataPVs[pv].pvname)}
          />
          {props.usePvLabel === true && (
            <DataConnection
              pv={pv.toString() + ".DESC"}
              handleInputValue={handleInputValueLabel(
                state.dataPVs[pv].pvname
              )}
            />
          )}
          {props.usePvLabel === true
            ? state.dataPVs[pv].label + ": "
            : ""}
        </div>
      );
    }

    return DataConnections;
  };

  useEffect(() => {
    if (props.ymaxFromOtherGraph !== "undefined") {
      setState(prev => ({ ...prev, ymax: props.ymaxFromOtherGraph }));
    }
  }, [props.ymaxFromOtherGraph]);

  const ymax = state.ymax;

  return (
    <React.Fragment>
      {typeof props.rangePV !== "undefined" && (
        <DataConnection
          key={"pv" + props.rangePV.toString()}
          pv={props.rangePV}
          handleInputValue={handleRangeInputValue}
        />
      )}

      <HarpGraphY
        pvs={props.dataPVs}
        macros={props.macros}
        legend={props.legend}
        lineColor={["#e89b02"]}
        yAxisTitle={props.ylabel}
        xAxisTitle={"mm"}
        yUnits={state.rangeUnits}
        yMin={0}
        yMax={ymax}
        yTickFormat={""}
        onWheel={handleWheel}
        onClick={handleOnClick}
    
      />
    </React.Fragment>
  );
};

export default HarpGraph;

/* eslint-disable eqeqeq */
