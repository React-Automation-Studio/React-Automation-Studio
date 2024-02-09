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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const PluginsMore = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={2}>
            <Typography>
              {`${props.macros["$(P)"]}${props.macros["$(R)"]}`}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </TableCell>
        </TableRow>
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
          <TableCell align="left">Plugin Type</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)PluginType_RBV"
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
          <TableCell align="left">Plugin version</TableCell>
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
          <TableCell align="left">Array port</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)NDArrayPort"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NDArrayPort_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Array address</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)NDArrayAddress"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NDArrayAddress_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Enable</TableCell>
          <TableCell align="left">
            <SelectionInput
              // custom_selection_strings={["Enable", "Disable"]}
              pv="$(P)$(R)EnableCallbacks"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              // custom_selection_strings={["Enable", "Disable"]}
              pv="$(P)$(R)EnableCallbacks_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
              useStringValue
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Min. time</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)MinCallbackTime"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)MinCallbackTime_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Queue size/free</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)QueueSize"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)QueueSize_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Array counter</TableCell>
          <TableCell align="left">
            <ActionButton
              actionString="Reset to 0"
              actionValue="0"
              pv="$(P)$(R)ArrayCounter"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ArrayCounter_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Array rate</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ArrayRate_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Execution time</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ExecutionTime_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
              prec={4}
              units="ms"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Dropped arrays</TableCell>
          <TableCell align="left">
            <ActionButton
              actionString="Reset to 0"
              actionValue="0"
              pv="$(P)$(R)DroppedArrays"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)DroppedArrays_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="left"># dimensions</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NDimensions_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
              prec={4}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Array Size</TableCell>

          <TableCell align="left" colSpan={2}>
            <Stack direction="row" spacing={2}>
              <TextOutput
                pv="$(P)$(R)ArraySize0_RBV"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
              />
              <TextOutput
                pv="$(P)$(R)ArraySize1_RBV"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
              />
              <TextOutput
                pv="$(P)$(R)ArraySize2_RBV"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
              />
            </Stack>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Data type</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)DataType_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Color mode</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ColorMode_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Unique ID</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)UniqueId_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Time stamp</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)TimeStamp_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="left">Array callbacks</TableCell>
          <TableCell align="left">
            <SelectionInput
              // custom_selection_strings={["Enable", "Disable"]}
              pv="$(P)$(R)ArrayCallbacks"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              // custom_selection_strings={["Enable", "Disable"]}
              pv="$(P)$(R)ArrayCallbacks_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
              useStringValue
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Dropped arrays</TableCell>
          <TableCell align="left">
            <ActionButton
              actionString="Process"
              actionValue="1"
              pv="$(P)$(R)ProcessPlugin"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">More</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <Typography>For another day</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default PluginsMore;
