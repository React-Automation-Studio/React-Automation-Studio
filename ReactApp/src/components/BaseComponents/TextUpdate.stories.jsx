import TextUpdate from "./TextUpdate";
import TextInput from "./TextInput";
import { within, userEvent, expect, waitFor } from "storybook/test";

export default {
  component: TextUpdate,
  parameters: {
    docs: {
      description: {
        component:
          "Read-only inline text display backed by a PV. Built on MUI `<Typography>`; supports an alarm-aware background gradient and any Typography variant. Use `TextOutput` for an outlined box.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    pvs: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    useMetadata: { table: { category: "PV binding" } },
    initialLocalVariableValue: { table: { category: "PV binding" } },
    label: { table: { category: "Label" } },
    labelPv: { table: { category: "Label" } },
    usePvLabel: { table: { category: "Label" } },
    units: { table: { category: "Formatting" } },
    unitsPv: { table: { category: "Formatting" } },
    usePvUnits: { table: { category: "Formatting" } },
    prec: { table: { category: "Formatting" } },
    precPv: { table: { category: "Formatting" } },
    usePvPrecision: { table: { category: "Formatting" } },
    numberFormat: { table: { category: "Formatting" } },
    useStringValue: { table: { category: "Formatting" } },
    alarmSensitive: { table: { category: "Alarm" } },
    alarmPv: { table: { category: "Alarm" } },
    stringSeverity: { table: { category: "Alarm" } },
    useStringSeverityMatch: { table: { category: "Alarm" } },
    variant: { table: { category: "Appearance" } },
    align: { table: { category: "Appearance" } },
    muiTypographyProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
};

export const Primary = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "My value is ",
    units: "mA",
    usePvPrecision: true,
    prec: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom label, units, and precision overriding PV metadata.",
      },
    },
  },
};

export const PvLabel = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    units: "mA",
    usePvPrecision: true,
    prec: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label sourced from the PV's DESC field via `usePvLabel`.",
      },
    },
  },
};

export const AlarmAware = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvUnits: true,
    usePvPrecision: true,
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Background gradient picks up `alarm.minor.dark` / `alarm.major.dark` when the PV severity crosses its warn/alarm thresholds.",
      },
    },
  },
};

export const NumberFormat = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "My value is ",
    units: "mA",
    usePvPrecision: true,
    prec: 2,
    numberFormat: { notation: "engineering", precision: 2 },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Engineering notation via mathjs `numberFormat`.",
      },
    },
  },
};

export const LargeVariant = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvUnits: true,
    variant: "h5",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Typography variant set to `h5` for emphasis.",
      },
    },
  },
};

// Integration test for TextUpdate (read-only Typography). Sibling TextInput
// ("seed") writes a value; the TextUpdate's rendered text must reflect it,
// proving it actually subscribes to the PV broadcast.
export const IocPvDisplayTest = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:test2" label="seed" />
      </div>
      {/* No label / units / prec so the text content is just the raw number. */}
      <TextUpdate pv="testIOC:test2" />
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

    // Write 5005 via the seed and confirm both the seed input and TextUpdate
    // (rendered as a Typography text node) display the new value.
    await userEvent.clear(seed);
    await userEvent.type(seed, "5005{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5005), { timeout: 5000 });
    // findByText matches the Typography's text content. The input's value
    // attribute is NOT text content, so this query unambiguously hits TextUpdate.
    await canvas.findByText(/5005/, undefined, { timeout: 5000 });

    // Switch to a different value to prove the readback follows updates.
    await userEvent.clear(seed);
    await userEvent.type(seed, "5000{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5000), { timeout: 5000 });
    await canvas.findByText(/5000/, undefined, { timeout: 5000 });
  },
};
