import Gauge from "./Gauge";
import Slider from "./Slider";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

export default {
  component: Gauge,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <Gauge {...args} />
        <br />

        <Slider pv='$(device):test$(id)' macros={{'$(device)':'testIOC','$(id)':'2'}}   label='Value:' usePvMinMax={true} step={1}/>
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    pv:'$(device):test$(id)',
    macros:{'$(device)':'testIOC','$(id)':'2'},
    usePvMinMax:true
  },
};

// Integration test: Gauge's SVG exposes role=meter + aria-valuenow that must
// mirror the PV. Sibling TextInput seeds values; aria-valuenow is asserted.
export const IocPvDisplayTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div style={{ width: "50%", maxWidth: "250px" }}>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:test2" label="seed" />
      </div>
      <Gauge pv="testIOC:test2" usePvMinMax={true} />
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

    const meter = await canvas.findByRole("meter");

    await userEvent.clear(seed);
    await userEvent.type(seed, "5005{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5005), { timeout: 5000 });
    await waitFor(
      () => expect(parseFloat(meter.getAttribute("aria-valuenow") ?? "")).toBe(5005),
      { timeout: 5000 }
    );

    await userEvent.clear(seed);
    await userEvent.type(seed, "5000{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5000), { timeout: 5000 });
    await waitFor(
      () => expect(parseFloat(meter.getAttribute("aria-valuenow") ?? "")).toBe(5000),
      { timeout: 5000 }
    );
  },
};

