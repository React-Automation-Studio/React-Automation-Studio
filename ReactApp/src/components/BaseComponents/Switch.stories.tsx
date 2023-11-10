import Switch from "./Switch";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: Switch,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <TextOutput
          pv="$(device):BO$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "1" }}
          usePvLabel={true}
          usePvPrecision={true}
          usePvUnits={true}
          usePvMinMax={true}
          alarmSensitive={false}
        />

        <br />
        <Switch {...args} />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
  },
};
