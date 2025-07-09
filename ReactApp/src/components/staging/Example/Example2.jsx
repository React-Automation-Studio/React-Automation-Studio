import React from "react";
import TextInput from "../../../components/BaseComponents/TextInput";
import TextOutput from "../../../components/BaseComponents/TextOutput";
import Slider from "../../BaseComponents/Slider";
import GraphY from "../../../components/BaseComponents/GraphY";
import Grid from '@mui/material/GridLegacy';
import SideBar from "../../../components/SystemComponents/SideBar";
import { lime } from "@mui/material/colors";
import {useTheme} from "@mui/material/styles";
const Example2 = () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <SideBar />
      <div>
        <Grid
          style={{ padding: 8 }}
          container
          item
          direction="row"
          justifyContent="center"
          spacing={1}
          alignItems="stretch"
        >
          <Grid item xs={6}>
            <TextInput
              pv="$(device):amplitude"
              macros={{ "$(device)": "testIOC" }}
              usePvLabel={true}
              prec={3}
              alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutput
              pv="$(device):test3"
              macros={{ "$(device)": "testIOC" }}
              usePvLabel={true}
              prec={3}
              alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              pv="$(device):amplitude"
              macros={{ "$(device)": "testIOC" }}
              usePvLabel={true}
              prec={3}
              alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              pv="$(device):test3"
              macros={{ "$(device)": "testIOC" }}
              usePvLabel={true}
              prec={3}
              alarmSensitive={true}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              pv="$(device):amplitude"
              macros={{ "$(device)": "testIOC" }}
              usePvLabel={true}
              prec={3}
              alarmSensitive={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutput
              pv="$(device):test3"
              macros={{ "$(device)": "testIOC" }}
              usePvLabel={true}
              prec={3}
              alarmSensitive={true}
            />
          </Grid>

          <Grid item xs={12}>
            <div style={{ height: "50vh", width: "96vw" }}>
              <GraphY
                pvs={["testIOC:test4", "testIOC:test5"]}
                legend={["Sine Wave", "Amplitude"]}
                lineColor={[
                  theme.palette.secondary.main,
                  lime["400"],
                ]}
              />
            </div>
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
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Example2;
