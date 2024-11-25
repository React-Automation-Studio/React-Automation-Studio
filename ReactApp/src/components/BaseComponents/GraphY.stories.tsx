import GraphY from "./GraphY";
import Slider from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: GraphY,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div>
        <GraphY {...args} style={{ height: "25vh" }} />
        <br />

        <Slider
          pv="testIOC:amplitude"
          label="Sine Wave Amplitude"
          usePvMinMax={true}
        />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
  },
};

export const AlternateColors = {
  ...Template,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
    lineColor: ["red", "green"],
  },
};

export const OneHundredThousandDataPoints = {
  ...Template,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
    maxLength: 100000,
  },
};

export const OneMillionDataPoints = {
  ...Template,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
    maxLength: 1000000,
  },
};
