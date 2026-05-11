import ProgressBar from "./ProgressBar";
import Slider from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          "Horizontal bar that fills left-to-right from min to max, showing a PV's value as a coloured level against a grey base. Supports alarm-aware colouring, optional tick + value labels, and a lockable aspect ratio.",
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
} satisfies Meta<typeof ProgressBar>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div style={{ width: "50%", maxWidth: "250px" }}>
    <ProgressBar {...args} />
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

export const Primary: Story = {
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
          "Bar with PV-driven min/max + units and alarm-aware fill colour. Drag the slider past the PV's warn/alarm thresholds to see the colour change.",
      },
    },
  },
};

export const NoTicks: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvUnits: true,
    usePvMinMax: true,
    showTicks: false,
    showValue: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact bar with the value text and end-tick labels hidden.",
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
          "Aspect-ratio lock disabled — the bar's height follows its container.",
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
          "Custom min/max, units, and precision overriding PV metadata.",
      },
    },
  },
};
