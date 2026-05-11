import LightPanel from "./LightPanel";
import Switch from "./Switch";
import RadioButtonGroup from "./RadioButtonGroup";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

const meta = {
  component: LightPanel,
  parameters: {
    docs: {
      description: {
        component:
          "Read-only coloured status panel for a PV. Maps each PV value to a colour (and optionally a display string); works with binary, multi-state, and analog PVs.",
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
    colors: { table: { category: "Colours" } },
    onColor: { table: { category: "Colours" } },
    offColor: { table: { category: "Colours" } },
    useStringValue: { table: { category: "Value display" } },
    customValueStrings: { table: { category: "Value display" } },
    align: { table: { category: "Appearance" } },
    variant: { table: { category: "Appearance" } },
    muiTypographyProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof LightPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

const BinaryTemplate = ({ ...args }) => (
  <div style={{ marginBottom: 8 }}>
    <Switch
      pv="$(device):BO$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      usePvLabel
      labelPlacement="end"
    />
    <br />
    <LightPanel {...args} />
  </div>
);

const MultiBinaryTemplate = ({ ...args }) => (
  <div style={{ marginBottom: 8 }}>
    <RadioButtonGroup
      pv="$(device):mbboTest$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "1" }}
      usePvLabel
      muiRadioGroupProps={{ row: true }}
    />
    <br />
    <LightPanel {...args} />
  </div>
);

const AnalogTemplate = ({ ...args }) => (
  <div style={{ marginBottom: 8 }}>
    <TextInput
      pv="$(device):test$(id)"
      macros={{ "$(device)": "testIOC", "$(id)": "2" }}
      usePvLabel
      usePvPrecision
      usePvUnits
      usePvMinMax
    />
    <br />
    <LightPanel {...args} />
  </div>
);

export const Overview: Story = {
  render: BinaryTemplate,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    colors: { 0: "red", 1: "lime" },
    usePvLabel: true,
    labelPlacement: "end",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Binary status light — colour follows the bound PV (0 → red, 1 → lime).",
      },
    },
  },
};

export const MultiBinary: Story = {
  render: MultiBinaryTemplate,
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    colors: {
      0: "red",
      1: "lime",
      2: "deepskyblue",
      3: "orange",
      4: "deeppink",
    },
    usePvLabel: true,
    labelPlacement: "top",
    variant: "h4",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multi-state status light driven by an MBBO PV with a colour per state and a larger text variant.",
      },
    },
  },
};

export const AnalogCustomStrings: Story = {
  render: AnalogTemplate,
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    colors: { 0: "red", 1: "lime" },
    usePvLabel: true,
    labelPlacement: "top",
    useStringValue: false,
    customValueStrings: ["FOO", "BAR"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Analog PV mapped to custom display strings. Set the value to 0 or 1 to see `FOO` / `BAR` appear with the matching colour.",
      },
    },
  },
};

// Integration test: LightPanel renders the PV's enum string ("Off"/"On" for
// testIOC:BO1). Sibling TextInput seeds 0 and 1 numerically, and the
// LightPanel's text content must reflect "Off" then "On" — proves it's
// genuinely subscribed to the PV's enum string broadcasts.
export const IocPvDisplayTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:BO1" label="seed" />
      </div>
      <LightPanel pv="testIOC:BO1" useStringValue={true} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const seed = await canvas.findByLabelText(/^seed$/i, undefined, {
      timeout: 5000,
    });

    await waitFor(
      () => expect(Number.isFinite(parseFloat(seed.value))).toBe(true),
      { timeout: 10000 }
    );

    // Seed 0 -> LightPanel text "Off" (ZNAM of testIOC:BO1).
    await userEvent.clear(seed);
    await userEvent.type(seed, "0{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(0), { timeout: 5000 });
    await canvas.findByText(/^Off$/i, undefined, { timeout: 5000 });

    // Seed 1 -> LightPanel text "On" (ONAM).
    await userEvent.clear(seed);
    await userEvent.type(seed, "1{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(1), { timeout: 5000 });
    await canvas.findByText(/^On$/i, undefined, { timeout: 5000 });

    // Reset to 0.
    await userEvent.clear(seed);
    await userEvent.type(seed, "0{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(0), { timeout: 5000 });
  },
};
