import Gauge from "./Gauge";
import Slider from "./Slider";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

const meta = {
  component: Gauge,
  parameters: {
    docs: {
      description: {
        component:
          "Half-circle dial gauge that binds to a PV and shows its value against a min/max range. The arc fills CW from min (left) to max (right) with a needle at the current value. Supports alarm-aware colouring, custom range/units/precision, and PV-metadata-driven values.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    useMetadata: { table: { category: "PV binding" } },
    initialLocalVariableValue: { table: { category: "PV binding" } },
    label: { table: { category: "Label" } },
    labelPv: { table: { category: "Label" } },
    usePvLabel: { table: { category: "Label" } },
    labelPlacement: { table: { category: "Label" } },
    min: { table: { category: "Range" } },
    max: { table: { category: "Range" } },
    minPv: { table: { category: "Range" } },
    maxPv: { table: { category: "Range" } },
    usePvMinMax: { table: { category: "Range" } },
    units: { table: { category: "Formatting" } },
    unitsPv: { table: { category: "Formatting" } },
    usePvUnits: { table: { category: "Formatting" } },
    prec: { table: { category: "Formatting" } },
    precPv: { table: { category: "Formatting" } },
    usePvPrecision: { table: { category: "Formatting" } },
    numberFormat: { table: { category: "Formatting" } },
    alarmSensitive: { table: { category: "Alarm" } },
    alarmPv: { table: { category: "Alarm" } },
    ringWidth: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof Gauge>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div style={{ width: "50%", maxWidth: "250px" }}>
    <Gauge {...args} />
    <br />
    <Slider
      pv="$(device):test$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "2" }}
      label="Value:"
      usePvMinMax
      step={1}
    />
  </div>
);

export const Overview: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvMinMax: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic gauge bound to a PV with min/max read from the PV's HOPR/LOPR metadata. Drag the slider below to update the value.",
      },
    },
  },
};

export const AlarmAware: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvMinMax: true,
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active end of the arc switches to `alarm.minor.dark` (orange) on minor severity and `alarm.major.dark` (red) on major severity. Move the slider past the PV's warn/alarm thresholds to trigger the colour change.",
      },
    },
  },
};

export const CustomRange: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    min: 0,
    max: 5000,
    units: " V",
    prec: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom min/max, units, and precision overriding PV metadata (no `usePvMinMax` / `usePvUnits` / `usePvPrecision`).",
      },
    },
  },
};

export const ThickRing: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvMinMax: true,
    ringWidth: 60,
  },
  parameters: {
    docs: {
      description: {
        story: "Thicker arc via the `ringWidth` prop.",
      },
    },
  },
};

export const LabelBottom: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Sine wave",
    usePvMinMax: true,
    labelPlacement: "bottom",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom label rendered below the gauge via `labelPlacement='bottom'`.",
      },
    },
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
