import Tank from "./Tank";
import Slider from "./Slider";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

const meta = {
  component: Tank,
  parameters: {
    docs: {
      description: {
        component:
          "Vertical column level indicator that fills bottom-up from min to max — like a fluid tank. Supports alarm-aware colouring, optional tick + value labels, and a lockable aspect ratio.",
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
    showValue: { table: { category: "Appearance" } },
    showTicks: { table: { category: "Appearance" } },
    aspectRatio: { table: { category: "Appearance" } },
    lockAspectRatio: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof Tank>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div style={{ width: "50%", maxWidth: "250px" }}>
    <Tank {...args} />
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
    usePvUnits: true,
    usePvMinMax: true,
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Alarm-aware tank with PV-driven units and range. Drag the slider past the PV's warn/alarm thresholds to see the fill colour change.",
      },
    },
  },
};

export const WithTicks: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvUnits: true,
    usePvMinMax: true,
    showTicks: true,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tick labels (min/mid/max) and the current value rendered alongside the tank.",
      },
    },
  },
};

export const WideShort: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvUnits: true,
    usePvMinMax: true,
    aspectRatio: 0.5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Wider, shorter tank via a custom `aspectRatio` (height = width / aspectRatio).",
      },
    },
  },
};

export const Stretched: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvUnits: true,
    usePvMinMax: true,
    lockAspectRatio: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Aspect-ratio lock disabled — the tank's height follows its container.",
      },
    },
  },
};

// Integration test: Tank's SVG exposes role=meter + aria-valuenow that must
// mirror the PV. Sibling TextInput seeds values; aria-valuenow is asserted.
export const IocPvDisplayTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div style={{ width: "50%", maxWidth: "250px" }}>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:test2" label="seed" />
      </div>
      <Tank pv="testIOC:test2" usePvMinMax={true} />
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
