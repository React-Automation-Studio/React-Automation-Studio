import React, { useState } from "react";

import PropTypes from "prop-types";

import Layout from "../UI/Layout/ComposedLayouts/TraditionalLayout";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/system";
import GraphHeatmap from "./GraphHeatmap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collect from "./Collect";
import Setup from "./Setup";
import ReadOut from "./ReadOut";
import Shutter from "./Shutter";
import SimSetup from "./SimSetup";
import Attributes from "./Attributes";
import Buffers from "./Buffers";
import Info from "./Info";
import Plugins from "./Plugins";
import CanvasPlot from "./CanvasPlot";
/**
 * This is a preview AreaDetector component. This component is built on a React Automation Studio based front end that connects
 * to an alarm server back end.
 *
 * The AreaDetector component is still in development and is not considered production ready. Follow the setup and user guides is the Style
 * Guide to deploy the AreaDetector for testing and experimentation.
 * <br/><br/>
 */

const AreaDetector = (props) => {
  const [tabVal, setTabVal] = useState(0);
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  return (
    <Layout
      {...props.titleProps}
      denseAppBar
      tabs={["Main", " Plugins Setup"]}
      tabValue={tabVal}
      handleTabChange={(event, value) => setTabVal(value)}
    >
      <Box sx={{ p: 2 }}>
        <Grid container>
          {tabVal === 0 && <Grid item xs={12} md={6} lg={1} />}
          {tabVal === 0 && (
            <Grid item xs={12} md={6} lg={5}>
              {/* <GraphHeatmap
                makeNewSocketIoConnection
                aspectRatio={0.8}
                pvs={["$(P)image1:ArrayData"]}
                macros={props.macros}
              /> */}
              <CanvasPlot
                makeNewSocketIoConnection
                aspectRatio={1}
                pv={"$(P)image1:ArrayData"}
                macros={props.macros}
              />
            </Grid>
          )}
          {tabVal === 0 && <Grid item xs={12} md={6} lg={1} />}
          {tabVal === 0 && (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ overflowY: "scroll", maxHeight: "85vh" }}
            >
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                elevation={paperElevation}
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Info</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Info macros={props.macros} acquirePeriod={0.5} />
                </AccordionDetails>
              </Accordion>
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                elevation={paperElevation}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Setup</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Setup macros={props.macros} />
                </AccordionDetails>
              </Accordion>

              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                elevation={paperElevation}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>ReadOut</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <ReadOut macros={props.macros} />
                </AccordionDetails>
              </Accordion>
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                elevation={paperElevation}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Simulation Setup</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <SimSetup macros={props.macros} />
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Shutter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Shutter macros={props.macros} />
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Collect</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Collect macros={props.macros} />
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Attributes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Attributes macros={props.macros} />
                </AccordionDetails>
              </Accordion>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Buffers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Buffers macros={props.macros} />
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
          {tabVal === 1 && (
            <Grid
              item
              xs={12}
              md={6}
              lg={8}
              sx={{ overflowY: "scroll", maxHeight: "85vh" }}
            >
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                elevation={paperElevation}
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Plugins</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Plugins
                    macros={props.macros}
                    pluginTypes={props.pluginTypes}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
        </Grid>
      </Box>
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
