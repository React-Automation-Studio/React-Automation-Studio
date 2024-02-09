import StyledIconIndicator from "./StyledIconIndicator";
import ToggleButton from "./ToggleButton";
import type { Meta, StoryObj } from "@storybook/react";
import Face from "@mui/icons-material/Face";
export default {
  component: StyledIconIndicator,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;
Face.displayName = "Face";
const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <StyledIconIndicator {...args} />
        <br />

        <ToggleButton
          pv="$(device):BO$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "1" }}
          label={"write '1' or '0'"}
          labelPlacement={"top"}
          custom_selection_strings={["OFF", "ON"]}
        />
      </div>
    );
  },
};

const Template2: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <StyledIconIndicator {...args}>
          <Face />
        </StyledIconIndicator>
        <br />

        <ToggleButton
          pv="$(device):BO$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "1" }}
          label={"write '1' or '0'"}
          labelPlacement={"top"}
          custom_selection_strings={["OFF", "ON"]}
        />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
  },
};

export const CustomColors = {
  ...Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
    onColor: "lime",
    offColor: "red",
  },
};
export const CustomIcon = {
  ...Template2,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
    onColor: "lime",
    offColor: "red",
  },
};
