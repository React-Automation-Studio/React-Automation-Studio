import LightPanel from "./LightPanel";
import Switch from "./Switch";
import RadioButtonGroup from "./RadioButtonGroup";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

export default {
  component: LightPanel,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ marginBottom: 8 }}>
        <Switch
          pv="$(device):BO$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "1" }}
          usePvLabel
          labelPlacement="end"
        />

        <br />
        <LightPanel {...args} />
      </div>
    );
  },
};

const Template2: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ marginBottom: 8 }}>
        <RadioButtonGroup
           pv="$(device):mbboTest$(id)"
           macros={{ "$(device)": "testIOC", "$(id)": "1" }}
           horizontal={true}
           usePvLabel={true}
        />

        <br />
        <LightPanel {...args} />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    colors:{ 0: "red", 1: "lime" },
    usePvLabel: true,
    labelPlacement: "end",
  },
};

export const MultiBinary = {
  ...Template2,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    colors:{
      0: "red",
      1: "lime",
      2: "deepskyblue",
      3: "orange",
      4: "deeppink",
    },
    usePvLabel: true,
    labelPlacement: "top",
    variant:"h4"
  },
};

// Integration test: LightPanel renders the PV's enum string ("Off"/"On" for
// testIOC:BO1). Sibling TextInput seeds 0 and 1 numerically, and the
// LightPanel's text content must reflect "Off" then "On" — proves it's
// genuinely subscribed to the PV's enum string broadcasts.
export const IocPvDisplayTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:BO1" label="seed" />
      </div>
      <LightPanel pv="testIOC:BO1" useStringValue={true} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const seed = await canvas.findByLabelText(/^seed$/i, undefined, {
      timeout: 5000,
    });

    await waitFor(
      () => expect(Number.isFinite(parseFloat(seed.value))).toBe(true),
      { timeout: 10000 }
    );

    // Seed 0 -> LightPanel text "Off" (ZNAM of testIOC:BO1).
    await userEvent.clear(seed);
    await userEvent.type(seed, "0{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(0), { timeout: 5000 });
    await canvas.findByText(/^Off$/i, undefined, { timeout: 5000 });

    // Seed 1 -> LightPanel text "On" (ONAM).
    await userEvent.clear(seed);
    await userEvent.type(seed, "1{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(1), { timeout: 5000 });
    await canvas.findByText(/^On$/i, undefined, { timeout: 5000 });

    // Reset to 0.
    await userEvent.clear(seed);
    await userEvent.type(seed, "0{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(0), { timeout: 5000 });
  },
};