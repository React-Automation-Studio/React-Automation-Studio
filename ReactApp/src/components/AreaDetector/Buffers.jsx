import React from "react";

import TextOutput from "../BaseComponents/TextOutput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SelectionInput from "../BaseComponents/SelectionInput";
import ActionButton from "../BaseComponents/ActionButton";
import { useTheme } from "@mui/system";
import { StyledTableCell } from "./TableStyles";

const Buffers = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell align="left">Setting</StyledTableCell>
          <StyledTableCell align="left">Value</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="left">Buffers used</TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)PoolUsedBuffers"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Buffers alloc/free</TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)PoolAllocBuffers"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Memory max/used (MB)</TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)PoolMaxMem"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Buffer & memory polling</TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)PoolUsedMem.SCAN"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Empty free list</TableCell>
          <TableCell align="left">
          <ActionButton
                actionString="Empty"
                actionValue="1"
                macros={props.macros}
                labelPlacement="top"
                pv="$(P)$(R)EmptyFreeList"
              />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default Buffers;
