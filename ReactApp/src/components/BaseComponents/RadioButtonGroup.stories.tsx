import RadioButtonGroup from "./RadioButtonGroup";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: RadioButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          "Auto-generated radio-button group for an MBBI / MBBO PV. Each button corresponds to one of the PV's enum strings; clicking writes that string back to the PV.",
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
    bitLabelPlacement: { table: { category: "Label" } },
    custom_selection_strings: { table: { category: "Choices" } },
    onColor: { table: { category: "Appearance" } },
    muiRadioGroupProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof RadioButtonGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div style={{ width: "50%", maxWidth: "250px" }}>
    <TextOutput
      pv="$(device):mbboTest$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      label="Custom Label"
      useStringValue
      usePvLabel
    />
    <br />
    <RadioButtonGroup {...args} />
  </div>
);

export const Primary: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical radio group sourced from MBBO PV enum strings.",
      },
    },
  },
};

export const CustomSelectionStrings: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
    custom_selection_strings: ["text 1", "text 3"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Only a subset of the PV's enum strings is offered via `custom_selection_strings`.",
      },
    },
  },
};

export const Horizontal: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    muiRadioGroupProps: { row: true },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Radios in a row instead of a column via `muiRadioGroupProps={{ row: true }}`.",
      },
    },
  },
};
