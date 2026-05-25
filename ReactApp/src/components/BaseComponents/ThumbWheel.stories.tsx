import ThumbWheel from "./ThumbWheel";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ThumbWheel,
  parameters: {
    docs: {
      description: {
        component:
          "Digit-by-digit incremental numeric input. Each digit position has up/down arrows; useful for precision setpoints where free-form typing is error-prone or where a touchscreen is the primary input.",
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
    prec_integer: { table: { category: "Digits" } },
    prec_decimal: { table: { category: "Digits" } },
    custom_increments: { table: { category: "Digits" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof ThumbWheel>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div>
    <TextOutput
      {...args}
      usePvLabel
      usePvUnits
      usePvMinMax
      alarmSensitive
    />
    <br />
    <ThumbWheel {...args} />
  </div>
);

export const Overview: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    prec_integer: 4,
    prec_decimal: 3,
    prec: 3,
    usePvMinMax: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard 4-integer / 3-decimal wheel layout paired with a `TextOutput` showing the live PV value.",
      },
    },
  },
};

export const CustomIncrements: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    prec: 1,
    usePvMinMax: true,
    custom_increments: [500, 50, 5, 0.5],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom step sizes (500 / 50 / 5 / 0.5) instead of the default decimal-place increments.",
      },
    },
  },
};
