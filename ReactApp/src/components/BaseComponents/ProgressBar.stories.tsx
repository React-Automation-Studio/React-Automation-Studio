import ProgressBar from "./ProgressBar";
import Slider from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: ProgressBar,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <ProgressBar {...args} />
        <br />

        <Slider pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}   label='Value:' usePvMinMax={true} step={1}/>
      </div>
    );
  },
};

export const Primary = {
  ...Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvUnits: true,
    usePvMinMax: true,
    alarmSensitive:true,
  },
};

export const NoTicks = {
  ...Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvUnits: true,
    usePvMinMax: true,
    showTicks:false,
    showValue:false,
  },
};
