import StyledIconIndicator from "./StyledIconIndicator";
import ToggleButton from "./ToggleButton";
import type { Meta, StoryObj } from "@storybook/react";
import Face from "@mui/icons-material/Face";

Face.displayName = "Face";

const meta = {
  component: StyledIconIndicator,
  parameters: {
    docs: {
      description: {
        component:
          "Read-only icon indicator bound to a binary PV. The icon picks up `onColor` when the PV is 1 and `offColor` when 0. Pass any MUI SvgIcon as a child to override the default.",
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
    offColor: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof StyledIconIndicator>;
export default meta;

type Story = StoryObj<typeof meta>;

const WithToggle = ({ ...args }) => (
  <div style={{ width: "50%", maxWidth: "250px" }}>
    <StyledIconIndicator {...args} />
    <br />
    <ToggleButton
      pv="$(device):BO$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      label="write '1' or '0'"
      labelPlacement="top"
    />
  </div>
);

const WithIcon = ({ ...args }) => (
  <div style={{ width: "50%", maxWidth: "250px" }}>
    <StyledIconIndicator {...args}>
      <Face />
    </StyledIconIndicator>
    <br />
    <ToggleButton
      pv="$(device):BO$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      label="write '1' or '0'"
      labelPlacement="top"
    />
  </div>
);

export const Overview: Story = {
  render: WithToggle,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default circle indicator. Click the toggle below to flip the PV and watch the icon colour change.",
      },
    },
  },
};

export const CustomColors: Story = {
  render: WithToggle,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
    onColor: "lime",
    offColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Traffic-light style colours (red / lime) overriding the default palette keys.",
      },
    },
  },
};

export const CustomIcon: Story = {
  render: WithIcon,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
    onColor: "lime",
    offColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom child icon (`<Face />`) with the same red / lime colour scheme.",
      },
    },
  },
};

export const LabelEnd: Story = {
  render: WithToggle,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "My Label",
    labelPlacement: "end",
    onColor: "yellow",
    offColor: "cyan",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label placed to the right of the icon via `labelPlacement='end'`.",
      },
    },
  },
};
