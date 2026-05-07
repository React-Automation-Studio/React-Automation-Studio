import React from "react";
import SelectionList from "./SelectionList"; // Import your SelectionList component
import TextOutput from "./TextOutput"; // Import your TextOutput component
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

// Integration test: clicking a SelectionList item writes the corresponding
// mbbo index to the IOC. Sibling TextInput (numeric) seeds the PV to 0 and
// acts as the ground truth monitor that the IOC accepted index 2.
export const IocRoundtripTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput
          pv="testIOC:mbboTest1"
          label="testIOC:mbboTest1 monitor"
        />
      </div>
      <SelectionList pv="testIOC:mbboTest1" usePvLabel={true} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    // SelectionList renders each enum string in an MUI ListItemButton.
    // findByText -> closest('[role="button"]') yields the click target.
    const item2Text = await canvas.findByText(/^text 2$/i);
    const item2 = item2Text.closest('[role="button"]') as HTMLElement;
    expect(item2).not.toBeNull();
    await userEvent.click(item2);
    await waitFor(() => expect(parseFloat(input.value)).toBe(2), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
