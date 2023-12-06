import React, { useState } from "react";

import PropTypes from "prop-types";

import Layout from "../UI/Layout/ComposedLayouts/TraditionalLayout";
import TextOutput from "../BaseComponents/TextOutput";
import TextInput from "../BaseComponents/TextInput";
import TextUpdate from "../BaseComponents/TextUpdate";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import SelectionInput from "../BaseComponents/SelectionInput";
import ActionButton from "../BaseComponents/ActionButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import { useTheme } from "@mui/system";
import GraphY from "../BaseComponents/GraphY";
/**
 * This is a preview AreaDetector component. This component is built on a React Automation Studio based front end that connects
 * to an alarm server back end.
 *
 * The AreaDetector component is still in development and is not considered production ready. Follow the setup and user guides is the Style
 * Guide to deploy the AreaDetector for testing and experimentation.
 * <br/><br/>
 */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode == "light"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AreaDetector = (props) => {
  const [tabVal, setTabVal] = useState(0);
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  return (
    <Layout
      {...props.titleProps}
      denseAppBar
      tabs={["Main", " Setup"]}
      tabValue={tabVal}
      handleTabChange={(event, value) => setTabVal(value)}
    >
      {tabVal === 0 ? (
        <Box sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={12} md={6} lg={4}>
              <GraphY
                // makeNewSocketIoConnection
                legend={[
                  "Modulated Sine Wave Amplitude",
                  "Sine Wave Amplitude",
                ]}
                pvs={["ras:adsim:image1:ArrayData"]}
                style={{
                  height: "25vh",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}></Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TableContainer
                component={Paper}
                elevation={paperElevation}
                sx={{ p: 1 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} align="left" size="medium">
                        <Typography variant="h6">Collect</Typography>
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
                      <TableCell align="left">
                        {/* <TextInput pv="$(P)$(R)AcquireTime" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/> */}
                      </TableCell>
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
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div> setup </div>
      )}
    </Layout>
  );
};

AreaDetector.propTypes = {
  /** macros */
  macros: PropTypes.string,

  /** Props passed to the underlying TraditionalLayout component and style the title displayed in the app bar.
   * See TraditionalLayout component for more information.
   */
  titleProps: PropTypes.object,
};

AreaDetector.defaultProps = {
  titleProps: {},
};

export default React.memo(AreaDetector);
