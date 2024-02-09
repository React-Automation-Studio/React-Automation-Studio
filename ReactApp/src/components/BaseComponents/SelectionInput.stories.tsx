import React from "react";
import SelectionInput from "./SelectionInput"; // Import your SelectionInput component
import TextOutput from "./TextOutput"; // Import your TextOutput component
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: SelectionInput,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 32 }}>
          <TextOutput
            pv="$(device):mbboTest$(id)"
            macros={{ "$(device)": "testIOC", "$(id)": "1" }}
            usePvLabel={true}
            useStringValue={true}
          />
        </div>

        <SelectionInput {...args} />
      </div>
    );
  },
};

export const Example = {
  ...Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
  },
};

export const ExampleCustomSelection = {
  ...Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    custom_selection_strings: ["text 1", "text 3"],
  },
};
