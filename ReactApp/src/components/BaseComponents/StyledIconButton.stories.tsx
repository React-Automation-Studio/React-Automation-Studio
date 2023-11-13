import StyledIconButton from "./StyledIconButton";
import type { Meta, StoryObj } from "@storybook/react";
import Face from "@mui/icons-material/Face";
export default {
  component: StyledIconButton,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;
Face.displayName = "Face";
const Template: StoryObj = {
  render: ({ ...args }) => {
    return <StyledIconButton {...args} />;
  },
};

const Template2: StoryObj = {
  render: ({ ...args }) => {
    return (
      <StyledIconButton {...args}>
        <Face />
      </StyledIconButton>
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
    onColor: "secondary",
    // offColor: "red",
  },
};
export const CustomIcon = {
  ...Template2,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
    onColor: "error",
    // offColor: "red",
  },
};
