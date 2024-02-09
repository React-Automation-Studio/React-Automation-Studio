import RadioButtonGroup from "./RadioButtonGroup";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: RadioButtonGroup,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <TextOutput
          pv="$(device):mbboTest$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "1" }}
          label={"Custom Label"}
          useStringValue={true}
          usePvLabel={true}
        />

        <br />
        <RadioButtonGroup {...args} />
      </div>
    );
  },
};

export const Primary = {
  ...Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
  },
};

export const CustomSelectionStrings = {
  ...Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
    custom_selection_strings: ["text 1", "text 3"],
  },
};
