import React, { useState } from "react";

import TextOutput from "../BaseComponents/TextOutput";
import TextInput from "../BaseComponents/TextInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import SelectionInput from "../BaseComponents/SelectionInput";
import ActionButton from "../BaseComponents/ActionButton";

import Stack from "@mui/system/Stack";
import { useTheme } from "@mui/system";
import { StyledTableCell } from "./TableStyles";
import { Typography } from "@mui/material";

const PluginsMore = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell align="left">Setting</StyledTableCell>
          <StyledTableCell align="left">Setpoint</StyledTableCell>
          <StyledTableCell align="left">Readback</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="left">asyn port</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)PortName_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">EPICS name</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <Typography>
              {`${props.macros["$(P)"]}${props.macros["$(R)"]}`}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Manufacturer</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)Manufacturer_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Model</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)Model_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Serial number</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)SerialNumber_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Firmware version</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)FirmwareVersion_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">SDK version</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)SDKVersion_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Driver version</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)DriverVersion_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">ADCore version</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ADCoreVersion_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Connection</TableCell>
          <TableCell align="left">
          <Stack direction="row" spacing={2}>
              <ActionButton
                actionString="Connect"
                actionValue="1"
                macros={props.macros}
                labelPlacement="top"
                pv="$(P)$(R)AsynIO.CNCT"
              />
              <ActionButton
                actionString="Disconnect"
                actionValue="0"
                macros={props.macros}
                labelPlacement="top"
                pv="$(P)$(R)AsynIO.CNCT"
              />
            </Stack>
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)AsynIO.CNCT"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
              useStringValue
            />
          </TableCell>
        </TableRow>
      
      </TableBody>
    </Table>
  );
};
export default PluginsMore;
