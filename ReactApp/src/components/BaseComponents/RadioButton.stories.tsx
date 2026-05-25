import RadioButton from "./RadioButton";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: RadioButton,
  parameters: {
    docs: {
      description: {
        component:
          "Single MUI `<Radio>` bound to a binary PV (selected when 1, deselected when 0). Use `RadioButtonGroup` for a PV-driven multi-choice group.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    initialLocalVariableValue: { table: { category: "PV binding" } },
    label: { table: { category: "Label" } },
    labelPv: { table: { category: "Label" } },
    usePvLabel: { table: { category: "Label" } },
    labelPlacement: { table: { category: "Label" } },
    onColor: { table: { category: "Appearance" } },
    muiRadioProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof RadioButton>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div style={{ width: "50%", maxWidth: "250px" }}>
    <TextOutput
      pv="$(device):BO$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      label="Custom Label"
      useStringValue
      usePvLabel
    />
    <br />
    <RadioButton {...args} />
  </div>
);

export const Primary: Story = {
  render: Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single radio bound to a Binary Output; label taken from the PV's DESC.",
      },
    },
  },
};

export const CustomColor: Story = {
  render: Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Enabled",
    onColor: "success",
    labelPlacement: "end",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom on-state colour via the `onColor` MUI palette key.",
      },
    },
  },
};
