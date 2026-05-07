import CheckBox from "./CheckBox";
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

export default {
  component: CheckBox,
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
          label={"Custom Label"}
          useStringValue={true}
          usePvLabel={true}
        />

        <br />
        <CheckBox {...args} />
      </div>
    );
  },
};

export const Primary = {
  ...Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
  },
};

// Integration test: clicking the CheckBox flips the binary PV. Sibling
// TextInput seeds the initial state (0) and acts as the ground truth monitor.
export const IocRoundtripTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:BO1" label="testIOC:BO1 monitor" />
      </div>
      <CheckBox pv="testIOC:BO1" label="testIOC:BO1" labelPlacement="end" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });
    const checkbox = await canvas.findByRole("checkbox");

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    await userEvent.click(checkbox);
    await waitFor(() => expect(parseFloat(input.value)).toBe(1), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
