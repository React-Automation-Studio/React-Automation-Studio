import CheckBox from "./CheckBox";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: CheckBox,
  parameters: {
    docs: {
      description: {
        component:
          "Two-state toggle bound to a binary PV. Wraps MUI `<Checkbox>` with PV plumbing — toggles the PV between 0 and 1 on click. Use `Switch` for a slider-style toggle, or `LightPanel` for a read-only indicator.",
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
    muiCheckBoxProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof CheckBox>;
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
    <CheckBox {...args} />
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
          "Checkbox bound to a Binary Output with the PV's DESC field as the label.",
      },
    },
  },
};

export const CustomColor: Story = {
  render: Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Enable",
    onColor: "success",
    labelPlacement: "end",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom on-state colour using an MUI palette key (`primary`, `secondary`, `success`, `warning`, `error`, …).",
      },
    },
  },
};
