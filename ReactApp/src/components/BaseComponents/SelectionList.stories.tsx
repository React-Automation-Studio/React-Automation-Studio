import React from "react";
import SelectionList from "./SelectionList"; // Import your SelectionList component
import TextOutput from "./TextOutput"; // Import your TextOutput component
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: SelectionList,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 8 }}>
          <TextOutput
            pv="$(device):mbboTest$(id)"
            macros={{ "$(device)": "testIOC", "$(id)": "1" }}
            usePvLabel={true}
            useStringValue={true}
          />
        </div>

        <SelectionList {...args} />
      </div>
    );
  },
};

export const Horizontal = {
  ...Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    horizontal: true,
    usePvLabel: true,
  },
};

export const Vertical = {
  ...Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    vertical: true,
    usePvLabel: true,
  },
};

export const VerticalCustomSelection = {
  ...Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    vertical: true,
    usePvLabel: true,
    custom_selection_strings: ["text 1", "text 3"],
  },
};
