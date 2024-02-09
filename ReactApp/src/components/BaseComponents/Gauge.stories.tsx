import Gauge from "./Gauge";
import Slider from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: Gauge,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <Gauge {...args} />
        <br />

        <Slider pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}   label='Value:' usePvMinMax={true} step={1}/>
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv:'$(device):test$(id)',
    macros:{'$(device)':'testIOC','$(id)':'2'},
    usePvMinMax:true
  },
};

