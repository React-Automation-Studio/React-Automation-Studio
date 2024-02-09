import LightPanel from "./LightPanel";
import Switch from "./Switch";
import RadioButtonGroup from "./RadioButtonGroup";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: LightPanel,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ marginBottom: 8 }}>
        <Switch
          pv="$(device):BO$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "1" }}
          usePvLabel
          labelPlacement="end"
        />

        <br />
        <LightPanel {...args} />
      </div>
    );
  },
};

const Template2: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ marginBottom: 8 }}>
        <RadioButtonGroup
           pv="$(device):mbboTest$(id)"
           macros={{ "$(device)": "testIOC", "$(id)": "1" }}
           horizontal={true}
           usePvLabel={true}
        />

        <br />
        <LightPanel {...args} />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    colors:{ 0: "red", 1: "lime" },
    usePvLabel: true,
    labelPlacement: "end",
  },
};

export const MultiBinary = {
  ...Template2,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    colors:{
      0: "red",
      1: "lime",
      2: "deepskyblue",
      3: "orange",
      4: "deeppink",
    },
    usePvLabel: true,
    labelPlacement: "top",
    variant:"h4"
  },
};