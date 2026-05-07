import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import { within, userEvent, expect, waitFor } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TextOutput,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvPrecision: true,
    usePvUnits: true,
    usePvMinMax: true,
    alarmSensitive: true,
  },
};

export const EpicsAIOverides = {
  description: "test",
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Custom Label",
    usePvPrecision: true,
    prec: 5,
    units: "🍕",
    max: 5500,
    min: 4500,
    alarmSensitive: true,
    useUnits: true,
  },
};

export const EpicsMBBOStringValue = {
  description: "test",
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    useStringValue: true,
    usePvUnits: true,
  },
};

export const EpicsMBBONumericalValue = {
  description: "test",
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    usePvUnits: true,
  },
};

export const NumberFormatExample = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvPrecision: true,
    usePvUnits: true,
    usePvMinMax: true,
    prec: 3,
    alarmSensitive: true,
    numberFormat: { notation: "engineering", precision: 5 },
  },
};

// Integration test for output (read-only) components: write a value to the PV
// via a sibling TextInput and verify the TextOutput displays the same value.
// Both render as MUI TextField (role=textbox), so we disambiguate via label.
export const IocPvDisplayTest = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:test2" label="seed" />
      </div>
      <TextOutput pv="testIOC:test2" label="readback" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const seed = await canvas.findByLabelText(/^seed$/i, undefined, {
      timeout: 5000,
    });
    const readback = await canvas.findByLabelText(/^readback$/i, undefined, {
      timeout: 5000,
    });

    // Wait for PV to connect — both fields show the PV name string while
    // disconnected, then flip to the numeric value.
    await waitFor(
      () => expect(Number.isFinite(parseFloat(seed.value))).toBe(true),
      { timeout: 10000 }
    );

    // Seed the PV to a known value and verify the readback (TextOutput) reads
    // it back, proving it's actually wired to the same PV broadcast.
    await userEvent.clear(seed);
    await userEvent.type(seed, "5005{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5005), { timeout: 5000 });
    await waitFor(() => expect(parseFloat(readback.value)).toBe(5005), { timeout: 5000 });

    // Write a different value and re-verify so we know readback is genuinely
    // following PV updates (not just stuck at the first value it saw).
    await userEvent.clear(seed);
    await userEvent.type(seed, "5000{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5000), { timeout: 5000 });
    await waitFor(() => expect(parseFloat(readback.value)).toBe(5000), { timeout: 5000 });
  },
};
