//This example is deprecated and will be removed in a future release
import React, { useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DataConnection from "../../SystemComponents/DataConnection";
import TextUpdate from "../../BaseComponents/TextUpdate";
import { Typography } from "@mui/material";

const ControlCenterTable = (props) => {
  const theme = useTheme();
  
  const initializeRowPVs = () => {
    let sys;
    let rowPVs = [];
    let id = 0;

    const systems = props.systems;

    for (sys in systems) {
      let displayName = systems[sys].displayName;
      let rowProps = systems[sys].props;
      let setpointPV = {
        initialized: false,
        pvname: "",
        value: "",
        char_value: "",
        alarmColor: "",
        lower_disp_limit: 0,
        upper_disp_limit: 10000,
        lower_warning_limit: 4000,
        upper_warning_limit: 6000,
        units: "V",
        precision: 0,
        metadata: {},
      };
      setpointPV.pvname =
        systems[sys].devices.device.deviceName +
        ":" +
        systems[sys].devices.device.setpoint;

      let readbackPV = {
        initialized: false,
        pvname: "",
        value: "",
        char_value: "",
        alarmColor: "",
        lower_disp_limit: 0,
        upper_disp_limit: 10000,
        lower_warning_limit: 4000,
        upper_warning_limit: 6000,
        units: "V",
        precision: 0,
        metadata: {},
      };

      readbackPV.pvname =
        systems[sys].devices.device.deviceName +
        ":" +
        systems[sys].devices.device.readback;

      let statusPV = {
        initialized: false,
        pvname: "",
        value: "",
        char_value: "",
        alarmColor: "",
        lower_disp_limit: 0,
        upper_disp_limit: 10000,
        lower_warning_limit: 4000,
        upper_warning_limit: 6000,
        units: "V",
        precision: 0,
        metadata: {},
      };

      statusPV.pvname =
        systems[sys].devices.device.deviceName +
        ":" +
        systems[sys].devices.device.statusText;
      rowPVs.push({
        id: id,
        displayName: displayName,
        setpointPV: setpointPV,
        readbackPV: readbackPV,
        statusPV: statusPV,
        rowProps,
      });
      id++;
    }
    return rowPVs;
  };

  const [rowPVs, setRowPVs] = useState(initializeRowPVs());

  const handleInputValue = useCallback((id, name) => (inputValue, pvname, initialized, severity) => {
    setRowPVs(prevRowPVs => {
      const newRowPVs = [...prevRowPVs];
      newRowPVs[id][name].value = inputValue;
      newRowPVs[id][name].initialized = initialized;
      newRowPVs[id][name].severity = severity;
      return newRowPVs;
    });
  }, []);

  const handleMetadata = useCallback((id, name) => (metadata) => {
    setRowPVs(prevRowPVs => {
      const newRowPVs = [...prevRowPVs];
      newRowPVs[id][name].metadata = metadata;
      return newRowPVs;
    });
  }, []);

  const handleOnClick = useCallback((id) => () => {
    props.handleOnSystemClick(props.systems[id]);
  }, [props]);

  const SystemsDataConnections = () => {
    let DataConnections = [];
    let id = 0;
    let row;
    let useStatus;

    for (row in rowPVs) {
      if (typeof rowPVs[row].rowProps !== "undefined") {
        if (typeof rowPVs[row].rowProps.useStatus !== "undefined") {
          useStatus = rowPVs[row].rowProps.useStatus;
        } else {
          useStatus = true;
        }
      } else {
        useStatus = false;
      }
      DataConnections.push(
        <DataConnection
          key={id.toString() + rowPVs[row].setpointPV.pvname}
          pv={rowPVs[row].setpointPV.pvname}
          handleInputValue={handleInputValue(id, "setpointPV")}
          handleMetadata={handleMetadata(id, "setpointPV")}
        />
      );

      DataConnections.push(
        <DataConnection
          key={id.toString() + rowPVs[row].readbackPV.pvname}
          pv={rowPVs[row].readbackPV.pvname}
          handleInputValue={handleInputValue(id, "readbackPV")}
          handleMetadata={handleMetadata(id, "readbackPV")}
        />
      );

      if (useStatus) {
        DataConnections.push(
          <DataConnection
            key={id.toString() + rowPVs[row].statusPV.pvname}
            pv={rowPVs[row].statusPV.pvname}
            handleInputValue={handleInputValue(id, "statusPV")}
            handleMetadata={handleMetadata(id, "statusPV")}
            useStringValue={true}
          />
        );
      }

      id++;
    }
    return DataConnections;
  };

  return (
    <React.Fragment>
      {SystemsDataConnections()}
      <Paper
        sx={{
          width: "100%",
          marginTop: theme.spacing(1) * 0,
          marginBottom: theme.spacing(4),
          overflowX: "auto",
        }}
        elevation={theme.palette.paperElevation}
      >
        <Table 
          sx={{
            padding: 1,
            minWidth: 700,
          }}
          size={"small"}
        >
          <TableHead 
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? theme.palette.primary.light : undefined,
            }}
          >
            <TableRow>
              <TableCell>Device Description</TableCell>
              <TableCell align="center">Setpoint</TableCell>
              <TableCell align="center">Readback</TableCell>
              <TableCell align="center">Saved Value</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowPVs.map((row) => (
              <TableRow key={row.id} onClick={handleOnClick(row.id)}>
                <TableCell
                  sx={{ width: "20%" }}
                  align="left"
                  component="th"
                  scope="row"
                >
                  <Typography variant={"body2"}>{row.displayName}</Typography>
                </TableCell>
                <TableCell sx={{ width: "20%" }} align="center">
                  <TextUpdate
                    pv={row.setpointPV.pvname}
                    usePrecision={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.usePrecision === "undefined"
                          ? undefined
                          : row.rowProps.usePrecision
                    }
                    prec={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.prec === "undefined"
                          ? undefined
                          : row.rowProps.prec
                    }
                    usePvUnits={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.usePvUnits === "undefined"
                          ? undefined
                          : row.rowProps.usePvUnits
                    }
                    units={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.units === "undefined"
                          ? "undefined"
                          : row.rowProps.units
                    }
                    alarmSensitive={true}
                  />
                </TableCell>
                <TableCell sx={{ width: "20%" }} align="center">
                  <TextUpdate
                    pv={row.readbackPV.pvname}
                    usePrecision={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.usePrecision === "undefined"
                          ? undefined
                          : row.rowProps.usePrecision
                    }
                    prec={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.prec === "undefined"
                          ? undefined
                          : row.rowProps.prec
                    }
                    usePvUnits={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.usePvUnits === "undefined"
                          ? undefined
                          : row.rowProps.usePvUnits
                    }
                    units={
                      typeof row.rowProps === "undefined"
                        ? undefined
                        : typeof row.rowProps.units === "undefined"
                          ? "undefined"
                          : row.rowProps.units
                    }
                    alarmSensitive={true}
                  />
                </TableCell>
                <TableCell sx={{ width: "20%" }} align="center">
                  {"N/A"}
                </TableCell>
                <TableCell sx={{ width: "20%" }} align="center">
                  {typeof row.rowProps === "undefined"
                    ? undefined
                    : typeof row.rowProps.useStatus === "undefined"
                      ? "-"
                      : row.rowProps.useStatus === true
                        ? row.statusPV.value
                        : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default ControlCenterTable;
