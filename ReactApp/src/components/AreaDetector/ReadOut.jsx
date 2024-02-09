import React from "react";
import TextOutput from "../BaseComponents/TextOutput";
import TextInput from "../BaseComponents/TextInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SelectionInput from "../BaseComponents/SelectionInput";
import { useTheme } from "@mui/system";
import { StyledTableCell } from "./TableStyles";

const ReadOut = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell align="left">Setting</StyledTableCell>
          <StyledTableCell align="left">X</StyledTableCell>
          <StyledTableCell align="left">Y</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="left">Sensor size</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)MaxSizeX_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)MaxSizeY_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)BinX_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)BinY_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Binning</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)BinX"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)BinY"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)MinX_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)MinY_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Region start</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)MinX"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)MinY"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)SizeX_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)SizeY_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Region size</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)SizeX"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)SizeY"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ReverseX_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ReverseY_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Reverse</TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)ReverseX"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)ReverseY"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Image size</TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ArraySizeX_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ArraySizeY_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Image size [Bytes]</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ArraySize_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="left">Gain</TableCell>
          <TableCell align="left">
            <TextInput
              pv="$(P)$(R)Gain"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)Gain_RBV"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Data type</TableCell>
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)DataType"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
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
          <TableCell align="left">
            <SelectionInput
              pv="$(P)$(R)ColorMode"
              macros={props.macros}
              muiTextFieldProps={muiTextFieldProps}
            />
          </TableCell>
          <TableCell align="left">
            <TextOutput
              pv="$(P)$(R)ColorMode_RBV"
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
export default ReadOut;
