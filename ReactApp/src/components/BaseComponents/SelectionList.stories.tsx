import SelectionList from "./SelectionList";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: SelectionList,
  parameters: {
    docs: {
      description: {
        component:
          "Clickable list of choices bound to an MBBI / MBBO PV. Renders each enum string as a list row; clicking writes that string back to the PV. Supports horizontal and vertical layouts.",
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
    labelPlacement: { table: { category: "Label" } },
    custom_selection_strings: { table: { category: "Choices" } },
    horizontal: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
  },
} satisfies Meta<typeof SelectionList>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ marginBottom: 8 }}>
      <TextOutput
        pv="$(device):mbboTest$(id)"
        macros={{ "$(device)": "testIOC", "$(id)": "1" }}
        usePvLabel
        useStringValue
      />
    </div>
    <SelectionList {...args} />
  </div>
);

export const Horizontal: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    horizontal: true,
    usePvLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Items laid out left-to-right via `horizontal`.",
      },
    },
  },
};

export const Vertical: Story = {
  render: Template,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Default vertical layout — one item per row.",
      },
    },
  },
};

export const VerticalCustomSelection: Story = {
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
