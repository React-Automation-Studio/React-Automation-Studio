import StyledIconButton from "./StyledIconButton";
import type { Meta, StoryObj } from "@storybook/react";
import Face from "@mui/icons-material/Face";

Face.displayName = "Face";

const meta = {
  component: StyledIconButton,
  parameters: {
    docs: {
      description: {
        component:
          "Two-state icon button bound to a binary PV. Click toggles the PV 0↔1; icon picks up `onColor` when 1 and `offColor` when 0. Pass any MUI SvgIcon as a child to override the default icon.",
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
} satisfies Meta<typeof StyledIconButton>;
export default meta;

type Story = StoryObj<typeof meta>;

const Default = ({ ...args }) => <StyledIconButton {...args} />;
const WithIcon = ({ ...args }) => (
  <StyledIconButton {...args}>
    <Face />
  </StyledIconButton>
);

export const Overview: Story = {
  render: Default,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default lens icon — click to toggle the Binary Output PV.",
      },
    },
  },
};

export const CustomColors: Story = {
  render: Default,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "Test Label",
    onColor: "secondary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom on-state colour using an MUI palette key.",
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
    onColor: "error",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom child icon (`<Face />` from @mui/icons-material) with a red on-state.",
      },
    },
  },
};
