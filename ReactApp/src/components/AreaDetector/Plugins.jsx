import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextUpdate from "../BaseComponents/TextUpdate";
import { useTheme } from "@mui/system";
import { StyledTableCell } from "./TableStyles";
import RadioButton from "../BaseComponents/RadioButton";
import SettingsIcon from "@mui/icons-material/Settings";
const Plugins = (props) => {
  const {pluginTypes} = props;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell align="left">Plugin Name</StyledTableCell>
          <StyledTableCell align="left">Plugin Type</StyledTableCell>
          <StyledTableCell align="left">Port</StyledTableCell>
          <StyledTableCell align="left">Enable</StyledTableCell>
          <StyledTableCell align="left">RBV</StyledTableCell>
          <StyledTableCell align="left">Blocking</StyledTableCell>
          <StyledTableCell align="left">Dropped</StyledTableCell>
          <StyledTableCell align="left">Free</StyledTableCell>
          <StyledTableCell align="left">Rate</StyledTableCell>
          <StyledTableCell align="left">More</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pluginTypes.map((pluginType) => (
        <TableRow key={pluginType}>
          <TableCell align="left">
          <TextUpdate
              pv={`$(P)${pluginType}:PortName_RBV`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
          <TextUpdate
              pv={`$(P)${pluginType}:PluginType_RBV`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
            <TextUpdate
              pv={`$(P)${pluginType}:NDArrayPort`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
            <RadioButton
             pv={`$(P)${pluginType}:EnableCallbacks`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
            <TextUpdate
              pv={`$(P)${pluginType}:EnableCallbacks_RBV`}
              macros={props.macros}
              useStringValue
            />
          </TableCell>
          <TableCell align="left">
            <RadioButton
             pv={`$(P)${pluginType}:BlockingCallbacks`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
            <TextUpdate
              pv={`$(P)${pluginType}:DroppedArrays_RBV`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
            <TextUpdate
              pv={`$(P)${pluginType}:QueueFree`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
            <TextUpdate
              pv={`$(P)${pluginType}:ArrayRate_RBV`}
              macros={props.macros}
            />
          </TableCell>
          <TableCell align="left">
            <SettingsIcon/>
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default Plugins;
