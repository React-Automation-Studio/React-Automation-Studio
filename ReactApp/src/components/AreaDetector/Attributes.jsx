import React from "react";

import TextOutput from "../BaseComponents/TextOutput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/system";
import { StyledTableCell } from "./TableStyles";

const Attributes = (props) => {
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
          <TableCell align="left">File</TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NDAttributesFile"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Macros</TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NDAttributesMacros"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Status</TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)NDAttributesStatus"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default Attributes;
