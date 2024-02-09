import React from "react";
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
import { StyledTableCell } from "./TableStyles";

const Collect = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
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
          <TableCell align="left">Exposure time</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)AcquireTime"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)AcquireTime_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Acquire period</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)AcquirePeriod"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)AcquirePeriod_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"># Images</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)NumImages"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NumImages_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"># Images complete</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NumImagesCounter_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"># Exp./image</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)NumExposures"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NumExposures_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Image mode</TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)ImageMode"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ImageMode_RBV"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Trigger mode</TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)TriggerMode"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)TriggerMode_RBV"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Acquire</TableCell>
          <TableCell align="left">
            <Stack direction="row" spacing={2}>
              <ActionButton
                actionString="Start"
                actionValue="1"
                macros={props.macros}
                labelPlacement="top"
                pv="$(P)$(R)Acquire"
              />
              <ActionButton
                actionString="Stop"
                actionValue="0"
                macros={props.macros}
                labelPlacement="top"
                pv="$(P)$(R)Acquire"
              />
            </Stack>
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)Acquire"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"># Queued arrays</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NumQueuedArrays"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Wait for plugins</TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)WaitForPlugins"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Acquire busy</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)AcquireBusy"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="left">Detector state</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)DetectorState_RBV"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Time remaining</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)TimeRemaining_RBV"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Image counter</TableCell>
          <TableCell align="left">
            <TextInput
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
          <TableCell align="left">Image rate</TableCell>
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
          <TableCell align="left">Array callbacks</TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)ArrayCallbacks"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ArrayCallbacks_RBV"
              useStringValue
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default Collect;
