import React, { useState } from "react";
import Layout from "../UI/Layout/ComposedLayouts/TraditionalLayout";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/system";
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
import PluginsMore from "./PluginsMore";
/**
 * This is a preview AreaDetector component. This component is built on a React Automation Studio based front end that connects
 * to an alarm server back end.
 *
 * The AreaDetector component is still in development and is not considered production ready. Follow the setup and user guides is the Style
 * Guide to deploy the AreaDetector for testing and experimentation.
 * <br/><br/>
 */

const AreaDetector = ({ titleProps = {}, ...props }: AreaDetectorProps) => {
  const [tabVal, setTabVal] = useState(0);
  const [morePluginsR, setMorePluginsR] = useState(null);
  const muiTextFieldProps = { size: "small", variant: "standard" };
  const theme = useTheme();
  const paperElevation = theme.palette.paperElevation;
  return (
    <Layout
      {...titleProps}
      denseAppBar
      tabs={["Main", " Plugins Setup"]}
      tabValue={tabVal}
      handleTabChange={(event, value) => setTabVal(value)}
    >
      <Box sx={{ p: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          {tabVal === 0 && (
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <CanvasPlot
                makeNewSocketIoConnection
                aspectRatio={1}
                pv={"$(P)image1:ArrayData"}
                macros={props.macros}
              />
            </Grid>
          )}

          {tabVal === 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={7}
              xl={4}
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
                  <Info macros={props.macros} acquirePeriod={0.1} />
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
              md={12}
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
                    handleMoreOnClick={(pluginType) => {
                      setMorePluginsR(pluginType);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
          {tabVal === 1 && (
            <Grid
              item
              xs={12}
              md={12}
              lg={4}
              sx={{ overflowY: "scroll", maxHeight: "85vh" }}
            >
              {morePluginsR && (
                <PluginsMore
                  macros={{
                    "$(P)": props.macros["$(P)"],
                    "$(R)": `${morePluginsR}:`,
                  }}
                  handleClose={() => {
                    setMorePluginsR(null);
                  }}
                />
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

interface AreaDetectorProps {
  /** macros */
  macros: object;

  /** Props passed to the underlying TraditionalLayout component and style the title displayed in the app bar.
   * See TraditionalLayout component for more information.
   */
  titleProps: object;
}

export default React.memo(AreaDetector);
