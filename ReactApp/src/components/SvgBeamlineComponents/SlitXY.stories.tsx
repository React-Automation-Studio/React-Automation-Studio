import type { Meta, StoryObj } from "@storybook/react";
import BeamLineCanvas from "./BeamLineCanvas";
import HorizontalBeamline from "./HorizontalBeamline";
import EditorSlitXY from "../ControlScreens/Components/EditorSlitXY";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SlitXY from "./SlitXY";
export default {
  component: SlitXY,
  parameters: {},
  title: "Beamline components/SlitXY",
  tags: ["autodocs"],
  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    const [displayEditor, setDisplayEditor] = useState(false);
    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} lg={12}>
          <div>Click on the slit to open the editor</div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <BeamLineCanvas width={"100%"} height={400}>
            <HorizontalBeamline x={0} y={50} width={"300px"} />

            <SlitXY
              handleOnClick={() => setDisplayEditor(true)}
              xGapPv={"$(IOC):$(device):X:Gap:Readback"}
              yGapPv={"$(IOC):$(device):Y:Gap:Readback"}
              xOffsetPv={"$(IOC):$(device):X:Offset:Readback"}
              yOffsetPv={"$(IOC):$(device):Y:Offset:Readback"}
              label="$(device)"
              macros={{
                "$(IOC)": "testIOC",
                "$(device)": "SLITXY1",
              }}
              x={50}
              y={50}
              usePvUnits={true}
              prec={3}
              alarmSensitive={true}
            />
          </BeamLineCanvas>
        </Grid>
        <Grid item xs={12} lg={6}>
          {displayEditor && (
            <EditorSlitXY
              system={{
                systemName: "$(IOC):$(device)",
                displayName: "$(device)",
                editorType: "editorSlitXY",
                xDriveOnPv: "$(IOC):$(device):X:Drive:On",
                yDriveOnPv: "$(IOC):$(device):Y:Drive:On",
                xGapReadbackPv: "$(IOC):$(device):X:Gap:Readback",
                yGapReadbackPv: "$(IOC):$(device):Y:Gap:Readback",
                xOffsetReadbackPv: "$(IOC):$(device):X:Offset:Readback",
                yOffsetReadbackPv: "$(IOC):$(device):Y:Offset:Readback",
                xGapSetpointPv: "$(IOC):$(device):X:Gap:Setpoint",
                yGapSetpointPv: "$(IOC):$(device):Y:Gap:Setpoint",
                xOffsetSetpointPv: "$(IOC):$(device):X:Offset:Setpoint",
                yOffsetSetpointPv: "$(IOC):$(device):Y:Offset:Setpoint",
                label: "$(device)",
                macros: {
                  "$(IOC)": "testIOC",
                  "$(device)": "SLITXY1",
                },
                disableLink: true,
              }}
              handleCloseEditor={() => setDisplayEditor(false)}
            />
          )}
        </Grid>
      </Grid>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    width: 600,
    height: 400,
  },
};
