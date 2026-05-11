import SelectionInput from "./SelectionInput";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: SelectionInput,
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown choice control for MBBI / MBBO PVs. Built on MUI `<TextField select>`. Lists the PV's enum strings and writes the selected string back to the PV.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    label: { table: { category: "Label" } },
    labelPv: { table: { category: "Label" } },
    usePvLabel: { table: { category: "Label" } },
    units: { table: { category: "Label" } },
    unitsPv: { table: { category: "Label" } },
    usePvUnits: { table: { category: "Label" } },
    custom_selection_strings: { table: { category: "Choices" } },
    variant: { table: { category: "Appearance" } },
    margin: { table: { category: "Appearance" } },
    muiTextFieldProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
  },
} satisfies Meta<typeof SelectionInput>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ marginBottom: 32 }}>
      <TextOutput
        pv="$(device):mbboTest$(id)"
        macros={{ "$(device)": "testIOC", "$(id)": "1" }}
        usePvLabel
        useStringValue
      />
    </div>
    <SelectionInput {...args} />
  </div>
);

export const Example: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Choices come from the MBBO PV's enum strings.",
      },
    },
  },
};

export const ExampleCustomSelection: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
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

export const Filled: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    variant: "filled",
  },
  parameters: {
    docs: {
      description: {
        story: "Filled TextField variant.",
      },
    },
  },
};
