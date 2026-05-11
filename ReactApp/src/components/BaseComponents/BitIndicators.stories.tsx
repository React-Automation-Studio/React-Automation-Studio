import BitIndicators from "./BitIndicators";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import Face from "@mui/icons-material/Face";

const meta = {
  component: BitIndicators,
  parameters: {
    docs: {
      description: {
        component:
          "Renders the bits of an integer PV as a row or column of SVG icons. Each icon lights up when its corresponding bit is set. Useful for status-byte / interlock displays.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    initialLocalVariableValue: { table: { category: "PV binding" } },
    label: { table: { category: "Label" } },
    bitLabels: { table: { category: "Label" } },
    bitLabelPlacement: { table: { category: "Label" } },
    usePvBitLabels: { table: { category: "Label" } },
    numberOfBits: { table: { category: "Layout" } },
    horizontal: { table: { category: "Layout" } },
    reverseBits: { table: { category: "Layout" } },
    onColor: { table: { category: "Appearance" } },
    offColor: { table: { category: "Appearance" } },
    muiSvgIconProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof BitIndicators>;
export default meta;

type Story = StoryObj<typeof meta>;

const Template = ({ ...args }) => (
  <div>
    <TextInput
      pv="$(device):test$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "2" }}
      label="Byte Value"
      labelPlacement="top"
    />
    <br />
    <BitIndicators {...args} />
  </div>
);

const TemplateWithIcon = ({ ...args }) => (
  <div>
    <TextInput
      pv="$(device):test$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "2" }}
      label="Byte Value"
      labelPlacement="top"
    />
    <br />
    <BitIndicators {...args}>
      <Face />
    </BitIndicators>
  </div>
);

export const Overview: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Bits",
    labelPlacement: "top",
    bitLabelPlacement: "end",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default 8-bit vertical indicator. Type a value into the input above to toggle bits.",
      },
    },
  },
};

export const Horizontal: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Bits",
    horizontal: true,
    labelPlacement: "top",
    bitLabelPlacement: "end",
  },
  parameters: {
    docs: {
      description: {
        story: "Bits laid out left-to-right via `horizontal`.",
      },
    },
  },
};

export const CustomIcon: Story = {
  render: TemplateWithIcon,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom icon (any MUI SvgIcon) used for the bit cells — pass as a child.",
      },
    },
  },
};

export const CustomColors: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Bits",
    labelPlacement: "top",
    bitLabelPlacement: "end",
    onColor: "lime",
    offColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom on/off colours overriding the default primary / default palette.",
      },
    },
  },
};

export const SixteenBits: Story = {
  render: Template,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "16-bit word",
    labelPlacement: "top",
    bitLabelPlacement: "end",
    numberOfBits: 16,
    onColor: "lime",
    offColor: "red",
  },
  parameters: {
    docs: {
      description: {
        story:
          "16-bit indicator — handy for displaying full status words.",
      },
    },
  },
};
