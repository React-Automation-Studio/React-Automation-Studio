import type { Meta, StoryObj } from "@storybook/react";
import BeamLineCanvas from "./BeamLineCanvas";
import HorizontalBeamline from "./HorizontalBeamline";
import EditorSinglePS from "../ControlScreens/Components/EditorSinglePS";
import React, { useState } from "react";
import Grid from '@mui/material/GridLegacy';
import BendingMagnet from "./BendingMagnet";
export default {
  component: BendingMagnet,
  parameters: {},
  title: "Beamline components/BendingMagnet",
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
          <div>Click on the magnet to open the editor</div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <BeamLineCanvas width={"100%"} height={400}>
            <HorizontalBeamline x={0} y={50} width={"300px"} />
            <BendingMagnet
              handleOnClick={() => setDisplayEditor(true)}
              x={50}
              y={50}
              label="BM1"
              pv="$(IOC):$(device):Readback"
              macros={{
                "$(IOC)": "testIOC",
                "$(device)": "PS4",
              }}
              usePvUnits={true}
              usePvLabel={false}
              alarmSensitive={true}
              tooltip={"Click on the icon to open the editor"}
              showTooltip={true}
              componentShadow={true}
              textShadow={false}
              componentGradient={true}
            />
          </BeamLineCanvas>
        </Grid>
        <Grid item xs={12} lg={6}>
          {displayEditor && (
            <EditorSinglePS
              system={{
                systemName: "$(IOC):$(device)",
                displayName: "BM1",
                editorType: "editorSinglePS",
                setpointPv: "$(IOC):$(device):Setpoint",
                readbackPv: "$(IOC):$(device):Readback",
                onOffPv: "$(IOC):$(device):On",
                statusTextPv: "$(IOC):$(device):On",
                scanPv: "$(IOC):$(device):SimReadback.SCAN",
                orocPv: "$(IOC):$(device):SimReadback.OROC",
                rampRatePv: "$(IOC):$(device):RampRate",
                macros: {
                  "$(IOC)": "testIOC",
                  "$(device)": "PS4",
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
