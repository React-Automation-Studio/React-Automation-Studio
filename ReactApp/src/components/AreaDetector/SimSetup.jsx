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
import { StyledTableCell } from "./TableStyles";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
const SimSetup = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
  return (
    <>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell align="left">
              <SelectionInput
                pv="$(P)$(R)SimMode"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
                label="Simulation mode"
              />
            </TableCell>
            <TableCell align="left">
              <ActionButton
                actionString="Reset"
                actionValue="1"
                macros={props.macros}
                labelPlacement="top"
                pv="$(P)$(R)Reset"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Accordion>
        <AccordionSummary
          sx={{ flexDirection: "row-reverse", mt: 2 }}
          expandIcon={<ExpandMore />}
        >
          <Typography sx={{ pl: 1 }}>Gain, Offset and Noise</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                <TableCell align="left">X</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainX"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainX_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Y</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainY"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainY_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Overall</TableCell>
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
                <TableCell align="left">Red</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainRed"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainRed_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Green</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainGreen"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainGreen_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Blue</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainBlue"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainBlue_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Offset</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)Offset"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)Offset_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Noise</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)Noise"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)Noise_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ flexDirection: "row-reverse", mt: 2 }}
          expandIcon={<ExpandMore />}
        >
          <Typography sx={{ pl: 1 }}>Gain, Offset and Noise</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                <TableCell align="left">X</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainX"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainX_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Y</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainY"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainY_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Overall</TableCell>
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
                <TableCell align="left">Red</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainRed"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainRed_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Green</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainGreen"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainGreen_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Blue</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)GainBlue"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)GainBlue_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Offset</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)Offset"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)Offset_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Noise</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)Noise"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextOutput
                    pv="$(P)$(R)Noise_RBV"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default SimSetup;
