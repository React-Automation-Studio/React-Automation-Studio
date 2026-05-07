import Switch from "./Switch";
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

// Integration test: toggling the Switch flips the binary PV. Sibling TextInput
// seeds a known initial state (0) and acts as the ground truth monitor.
export const IocRoundtripTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:BO1" label="testIOC:BO1 monitor" />
      </div>
      <Switch pv="testIOC:BO1" label="testIOC:BO1" labelPlacement="end" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });
    // MUI 7's Switch uses ARIA role="switch" (the toggle-specific role)
    // rather than the generic "checkbox".
    const sw = await canvas.findByRole("switch");

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    await userEvent.click(sw);
    await waitFor(() => expect(parseFloat(input.value)).toBe(1), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
