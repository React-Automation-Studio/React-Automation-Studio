import React from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Grid from '@mui/material/GridLegacy';
import TextInput from "../../BaseComponents/TextInput";
import TextOutput from "../../BaseComponents/TextOutput";
import Slider from "../../BaseComponents/Slider";
import SideBar from "../../SystemComponents/SideBar";
import AppBar from "@mui/material/AppBar";

const ExperimentalMobileDemo1 = (props) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  
  const [state, setState] = React.useState({
    value: 0,
    stateValue: 0,
    showAdvancedSettings: 0,
  });

  const handleChange = (event, value) => {
    setState(prevState => ({ ...prevState, value }));
  };

  const handleStateChange = (stateValue) => {
    setState(prevState => ({ ...prevState, stateValue }));
  };

  let graphVH;
  if (isXs) {
    graphVH = "25vh";
  } else if (isSm) {
    graphVH = "30vh";
  } else {
    graphVH = "30vh";
  }

  return (
    <React.Fragment>
      <AppBar
        style={{ position: "fixed", bottom: "auto", top: "0" }}
        color="inherit"
      >
        <Grid
          container
          direction="row"
          item
          justifyContent="center"
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={10}>
            <div style={theme.typography.body1}>Hooks debugging</div>
          </Grid>
        </Grid>
      </AppBar>

      <Grid container sx={{
        flexGrow: 1,
        padding: theme.spacing(1),
        overflowX: "hidden",
        overflowY: "hidden",
        marginTop: 40,
        marginBottom: 100,
      }} spacing={2}>
          <Grid item xs={6}>
            <TextInput
              pv="$(device):amplitude"
              macros={{ "$(device)": "testIOC" }}
              label={"edas"}
              usePvUnits={true}
              usePvLabel={true}
              usePvMinMax={true}
              prec={3}
              alarmSensitive={true}
              useMetadata={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutput
              pv="$(device):amplitude"
              macros={{ "$(device)": "testIOC" }}
              label={"edas"}
              units={"h"}
              usePvMinMax={true}
              prec={1}
              alarmSensitive={true}
              useMetadata={true}
            />
          </Grid>
          <Grid item xs={6}>
            <Slider
              pv="$(device):amplitude"
              macros={{ "$(device)": "testIOC" }}
              usePvMinMax={true}
              units={"V"}
              min={0}
              max={500}
              prec={3}
              useMetadata={true}
            />
          </Grid>
          <Grid item xs={6}>
            <Slider
              pv="$(device):amplitude"
              macros={{ "$(device)": "testIOC" }}
              units={"V"}
              min={2000}
              max={5000}
              prec={3}
              useMetadata={true}
            />
          </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ExperimentalMobileDemo1;
