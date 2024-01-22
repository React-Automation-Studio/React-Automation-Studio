import type { Meta, StoryObj } from "@storybook/react";
import BeamLineCanvas from "./BeamLineCanvas";
import HorizontalBeamline from "./HorizontalBeamline";
import React from "react";

export default {
  component: HorizontalBeamline,
  parameters: {},
  title: "Beamline components/HorizontalBeamline",
  tags: ["autodocs"],
  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <BeamLineCanvas width={600} height={300}>
        <HorizontalBeamline
          x={0}
          y={50}
          pv={"testIOC:BeamlineA:BeamOn"}
          width={"113px"}
        />
        <HorizontalBeamline
          x={"113px"}
          y={50}
          pv={"testIOC:BeamlineB:BeamOn"}
          width={"148px"}
        />
        <HorizontalBeamline
          x={"261px"}
          y={50}
          pv={"testIOC:BeamlineC:BeamOn"}
          width={"150px"}
        />
      </BeamLineCanvas>
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
