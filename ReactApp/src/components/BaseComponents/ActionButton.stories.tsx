import ActionButton from "./ActionButton";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ActionButton,
  parameters: {
    docs: {
      description: {
        component:
          "Write-only command button. Clicking writes the fixed `actionValue` to the bound `pv` (or to every PV in `pvs`). Wraps MUI `<Button>`; supports icons via `muiButtonProps` and palette colours via `color`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    pvs: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    initialLocalVariableValue: { table: { category: "PV binding" } },
    actionValue: { table: { category: "Action" } },
    actionString: { table: { category: "Action" } },
    useStringValue: { table: { category: "Action" } },
    label: { table: { category: "Label" } },
    usePvLabel: { table: { category: "Label" } },
    labelPlacement: { table: { category: "Label" } },
    color: { table: { category: "Appearance" } },
    muiButtonProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof ActionButton>;
export default meta;

type Story = StoryObj<typeof meta>;

const SinglePv = ({ ...args }) => (
  <div>
    <div style={{ marginBottom: 8 }}>
      <TextOutput pv="testIOC:BO1" label="Value of testIOC:BO1" />
    </div>
    <ActionButton {...args} actionValue="1" actionString="write 1 to testIOC:BO1" />
    <ActionButton {...args} actionValue="0" actionString="write 0 to testIOC:BO1" />
  </div>
);

const MultiPv = ({ ...args }) => (
  <div>
    <div style={{ marginBottom: 8 }}>
      <TextOutput pv="testIOC:BO1" label="Value of testIOC:BO1" />
    </div>
    <div style={{ marginBottom: 8 }}>
      <TextOutput pv="testIOC:BO2" label="Value of testIOC:BO2" />
    </div>
    <ActionButton {...args} actionValue="1" actionString="write 1 to all" />
    <ActionButton {...args} actionValue="0" actionString="write 0 to all" />
  </div>
);

export const Overview: Story = {
  render: SinglePv,
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1",
    labelPlacement: "top",
    tooltip: "Click button to write action value",
    showTooltip: true,
    tooltipProps: { placement: "top" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Two `ActionButton`s bound to the same Binary Output — one writes 1, the other writes 0.",
      },
    },
  },
};

export const Write1: Story = {
  render: ({ ...args }) => <ActionButton {...args} />,
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1",
    labelPlacement: "top",
    actionValue: "1",
    actionString: "write 1 to testIOC:BO1",
    tooltip: "Click button to write action value",
    showTooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Single button that writes 1 to the bound PV.",
      },
    },
  },
};

export const Write0: Story = {
  render: ({ ...args }) => <ActionButton {...args} />,
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1",
    labelPlacement: "top",
    actionValue: "0",
    actionString: "write 0 to testIOC:BO1",
    tooltip: "Click button to write action value",
    showTooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Single button that writes 0 to the bound PV.",
      },
    },
  },
};

export const WriteMultiple: Story = {
  render: MultiPv,
  args: {
    pvs: ["testIOC:BO1", "testIOC:BO2"],
    label: "Write to multiple PVs",
    labelPlacement: "top",
    tooltip: "Click button to write action value",
    showTooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Buttons that write the same value to every PV in `pvs` in one click.",
      },
    },
  },
};
