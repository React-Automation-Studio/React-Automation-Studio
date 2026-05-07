import React from "react";
import SelectionInput from "./SelectionInput"; // Import your SelectionInput component
import TextOutput from "./TextOutput"; // Import your TextOutput component
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

// Integration test: choosing a SelectionInput option writes the corresponding
// mbbo index to the IOC. Sibling TextInput (numeric) seeds the PV to 0 and
// acts as the ground truth monitor that the IOC accepted the selection.
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
      <SelectionInput pv="testIOC:mbboTest1" usePvLabel={true} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // MUI Select's MenuItems render into a portal at document.body, not
    // inside canvasElement — query options through this scope.
    const body = within(canvasElement.ownerDocument.body);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    // MUI Select trigger has role="combobox". Click to open the dropdown.
    const trigger = await canvas.findByRole("combobox");
    await userEvent.click(trigger);

    const option2 = await body.findByRole("option", { name: /text 2/i });
    await userEvent.click(option2);

    await waitFor(() => expect(parseFloat(input.value)).toBe(2), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
