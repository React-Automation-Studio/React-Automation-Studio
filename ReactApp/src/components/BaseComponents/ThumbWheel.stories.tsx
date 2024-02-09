import ThumbWheel from "./ThumbWheel";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: ThumbWheel,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    
    return (
      <div>
        <TextOutput
          {...args}
          usePvLabel={true}
          usePvUnits={true}
          usePvMinMax={true}
          alarmSensitive={true}
        />
        <br />
        <ThumbWheel {...args} />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    prec_integer: 4,
    prec_decimal: 3,
    prec: 3,
    usePvMinMax: true,
  },
};

export const Primary = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    prec_integer: 4,
    prec_decimal: 3,
    prec: 3,
    usePvMinMax: true,
  },
};
