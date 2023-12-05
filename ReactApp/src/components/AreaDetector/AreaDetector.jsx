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
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import  SelectionInput  from '../BaseComponents/SelectionInput';
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
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const AreaDetector = (props) => {
  const [tabVal, setTabVal] = useState(0);
  const muiTextFieldProps = { size: "small", variant: "standard" };
  return (
    <Layout
      {...props.titleProps}
      denseAppBar
      tabs={["Main", " Setup"]}
      tabValue={tabVal}
      handleTabChange={(event, value) => setTabVal(value)}
    >
      {tabVal === 0 ? (
        <div>
          <TableContainer component={Paper}  sx={{maxWidth:600}}>
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
                    <TextInput pv="$(P)$(R)AcquireTime" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/>
                  </TableCell>
                  <TableCell align="left">
                    <TextOutput  pv="$(P)$(R)AcquireTime_RBV"  macros={props.macros}  muiTextFieldProps={muiTextFieldProps}    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Acquire period</TableCell>
                  <TableCell align="left">
                    <TextInput pv="$(P)$(R)AcquirePeriod" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/>
                  </TableCell>
                  <TableCell align="left">
                    <TextOutput  pv="$(P)$(R)AcquirePeriod_RBV"  macros={props.macros}  muiTextFieldProps={muiTextFieldProps}    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"># Images</TableCell>
                  <TableCell align="left">
                    <TextInput pv="$(P)$(R)NumImages" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/>
                  </TableCell>
                  <TableCell align="left">
                    <TextOutput  pv="$(P)$(R)NumImages_RBV"  macros={props.macros}  muiTextFieldProps={muiTextFieldProps}    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"># Images complete</TableCell>
                  <TableCell align="left">
                    {/* <TextInput pv="$(P)$(R)AcquireTime" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/> */}
                  </TableCell>
                  <TableCell align="left">
                    <TextOutput  pv="$(P)$(R)NumImagesCounter_RBV"  macros={props.macros}  muiTextFieldProps={muiTextFieldProps}    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"># Exp./image</TableCell>
                  <TableCell align="left">
                    <TextInput pv="$(P)$(R)NumExposures" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/>
                  </TableCell>
                  <TableCell align="left">
                    <TextOutput  pv="$(P)$(R)NumExposures_RBV"  macros={props.macros}  muiTextFieldProps={muiTextFieldProps}    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Image mode</TableCell>
                  <TableCell align="left">
                    <SelectionInput pv="$(P)$(R)ImageMode" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/>
                  </TableCell>
                  <TableCell align="left">
                    <TextOutput  pv="$(P)$(R)ImageMode_RBV" useStringValue macros={props.macros}  muiTextFieldProps={muiTextFieldProps}    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Trigger mode</TableCell>
                  <TableCell align="left">
                    <SelectionInput pv="$(P)$(R)TriggerMode" macros={props.macros} muiTextFieldProps={muiTextFieldProps}/>
                  </TableCell>
                  <TableCell align="left">
                    <TextOutput  pv="$(P)$(R)TriggerMode_RBV" useStringValue  macros={props.macros}  muiTextFieldProps={muiTextFieldProps}    />
                  </TableCell>
                </TableRow>
               

              </TableBody>
            </Table>
          </TableContainer>
         

        
        </div>
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
