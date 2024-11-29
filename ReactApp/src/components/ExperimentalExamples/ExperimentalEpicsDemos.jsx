import React from "react";
import withStyles from "@mui/styles/withStyles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import EpicsBinaryOutDebug from "../ExperimentalGroupedComponents/EpicsBinaryOutDebug";
import EpicsAnalogOutDebug from "../ExperimentalGroupedComponents/EpicsAnalogOutDebug";
import EpicsStringOutDebug from "../ExperimentalGroupedComponents/EpicsStringOutDebug";
import EpicsMbboDebug from "../ExperimentalGroupedComponents/EpicsMbboDebug";
import TextOutput from "../BaseComponents/TextOutput";
import Slider from "../BaseComponents/Slider";
import GraphY from "../BaseComponents/GraphY";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SideBar from "../SystemComponents/SideBar";
import MobileDemo2 from "./Mobile/MobileDemo2";
import { lime } from "@mui/material/colors";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 1 }}>
      {props.children}
    </Typography>
  );
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    padding: theme.spacing(2),
  },
});

class ExperimentalEpicsDemos extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static" color="default">
          <Grid
            container
            direction="row"
            item
            justifyContent="center"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={1}>
              <SideBar />
            </Grid>
            <Grid item xs={11}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                variant="scrollable"
                scrollButtons
                indicatorColor="primary"
                textColor="primary"
                allowScrollButtonsMobile
              >
                <Tab label="Main" />
                <Tab label="Analog PVs" />
                <Tab label="Binary PVs" />
                <Tab label="MBBO/I PVs" />
                <Tab label="Array PVs" />
                <Tab label="String PVs" />
              </Tabs>
            </Grid>
          </Grid>
        </AppBar>
        {value === 0 && <MobileDemo2 nosidebar />}
        {value === 1 && (
          <TabContainer key="TabContainer1">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug
                    macros={{ "$(device)": "testIOC:amplitude" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug
                    macros={{ "$(device)": "testIOC:test1" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug
                    macros={{ "$(device)": "testIOC:test2" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsAnalogOutDebug
                    macros={{ "$(device)": "testIOC:time" }}
                  />
                </Card>
              </Grid>
            </Grid>
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer key="TabContainer2">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsBinaryOutDebug
                    macros={{ "$(device)": "testIOC:BO1" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsBinaryOutDebug
                    macros={{ "$(device)": "testIOC:BO2" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}></Grid>
              <Grid item xs={12} sm={6} lg={3}></Grid>
            </Grid>
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer key="TabContainer3">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsMbboDebug
                    macros={{ "$(device)": "testIOC:mbboTest1" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsMbboDebug
                    macros={{ "$(device)": "testIOC:mbboTest1" }}
                    custom_selection_strings={["text 1", "text 4"]}
                  />
                </Card>
              </Grid>
            </Grid>
          </TabContainer>
        )}
        {value === 4 && (
          <TabContainer key="TabContainer4">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <div style={{ height: "25vh" }}>
                  <GraphY
                    pvs={["testIOC:test4", "testIOC:test5"]}
                    legend={["Sine Wave ", "Amplitude"]}
                    lineColor={[
                      this.props.theme.palette.secondary.main,
                      lime["400"],
                    ]}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ height: "25vh" }}>
                  <GraphY
                    pvs={["testIOC:test4"]}
                    legend={["Sine Wave"]}
                    lineColor={[this.props.theme.palette.secondary.main]}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{ height: "25vh" }}>
                  <GraphY
                    pvs={["testIOC:test5"]}
                    legend={["Amplitude of Sine Wave Circular Buffer"]}
                    lineColor={[lime["400"]]}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextOutput
                  pv="$(device):test4"
                  macros={{ "$(device)": "testIOC" }}
                  label={"Sine Wave Circular Buffer"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextOutput
                  pv="$(device):test5"
                  macros={{ "$(device)": "testIOC" }}
                  label={"Amplitude of Sine Wave Circular Buffer"}
                />
              </Grid>

              <Grid item xs={12}>
                <Slider
                  pv="$(device):amplitude"
                  macros={{ "$(device)": "testIOC" }}
                  usePvMinMax={true}
                  min={1000}
                  max={500}
                  usePvLabel={true}
                />
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </TabContainer>
        )}
        {value === 5 && (
          <TabContainer key="TabContainer5">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsStringOutDebug
                    macros={{ "$(device)": "testIOC:stringtest1" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                  <EpicsStringOutDebug
                    macros={{ "$(device)": "testIOC:stringtest2" }}
                  />
                </Card>
              </Grid>
            </Grid>
          </TabContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ExperimentalEpicsDemos);
