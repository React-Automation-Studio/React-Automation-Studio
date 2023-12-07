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
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
const Shutter = (props) => {
  const muiTextFieldProps = { size: "small", variant: "standard" };
  return (
    <>
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
            <TableCell align="left">Shutter mode</TableCell>
            <TableCell align="left">
              <SelectionInput
                pv="$(P)$(R)ShutterMode"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
              />
            </TableCell>
            <TableCell align="left">
              <TextOutput
                pv="$(P)$(R)ShutterMode_RBV"
                useStringValue
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
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">
              <TextOutput
                pv="$(P)$(R)ShutterStatus_RBV"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
                useStringValue
                label={"Detector"}
              />
            </TableCell>
            <TableCell align="left">
              <TextOutput
                pv="$(P)$(R)ShutterStatusEPICS_RBV"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
                useStringValue
                label={"Epics"}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Delay</TableCell>
            <TableCell align="left">
              <TextInput
                pv="$(P)$(R)ShutterOpenDelay"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
                label={"Open"}
              />
            </TableCell>
            <TableCell align="left">
              <TextInput
                pv="$(P)$(R)ShutterCloseDelay"
                macros={props.macros}
                muiTextFieldProps={muiTextFieldProps}
                label={"Close"}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Accordion>
        <AccordionSummary
          sx={{ flexDirection: "row-reverse", mt: 2 }}
          expandIcon={<SettingsIcon />}
        >
          <Typography sx={{ pl: 1 }}>Shutter Setup</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Setting</StyledTableCell>
                <StyledTableCell align="left">Value</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">Open drive PV</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)ShutterOpenEPICS.OUT"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Close drive PV</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)ShutterCloseEPICS.OUT"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Open command</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)ShutterOpenEPICS.OCAL"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">Close command</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)ShutterCloseEPICS.OCAL"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Status PV</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)ShutterStatusEPICS_RBV.INP"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Open status</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)ShutterStatusEPICS_RBV.ONVL"
                    macros={props.macros}
                    muiTextFieldProps={muiTextFieldProps}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Close status</TableCell>
                <TableCell align="left">
                  <TextInput
                    pv="$(P)$(R)ShutterStatusEPICS_RBV.ZRVL"
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
export default Shutter;
