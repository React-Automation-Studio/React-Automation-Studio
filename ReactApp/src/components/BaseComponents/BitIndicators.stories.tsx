import BitIndicators from "./BitIndicators";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import Face from "@mui/icons-material/Face";
export default {
  component: BitIndicators,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div>
        <TextInput
          pv="$(device):test$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "2" }}
          label={"Byte Value"}
          labelPlacement={"top"}
        />
        <br />
        <BitIndicators {...args} />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Bits",
    labelPlacement: "top",
    bitLabelPlacement: "end",
  },
};

const Template2: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div>
        <TextInput
          pv="$(device):test$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "2" }}
          label={"Byte Value"}
          labelPlacement={"top"}
        />
        <br />
        <BitIndicators {...args}>
          <Face />
        </BitIndicators>
      </div>
    );
  },
};

export const CustomIcon = {
  ...Template2,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    
  },
};

export const CustomColors = {
  ...Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Bits",
    labelPlacement: "top",
    bitLabelPlacement: "end",
    onColor: "lime",
    offColor: "red",
  },
};
