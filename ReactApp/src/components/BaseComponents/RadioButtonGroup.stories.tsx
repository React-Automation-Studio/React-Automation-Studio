import RadioButtonGroup from "./RadioButtonGroup";
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

// Integration test: clicking a radio writes the corresponding mbbo index to
// the IOC. Sibling TextInput (numeric) seeds the PV to 0 and acts as the
// ground truth monitor that the index actually flipped to 2 after the click.
export const IocRoundtripTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput
          pv="testIOC:mbboTest1"
          label="testIOC:mbboTest1 monitor"
        />
      </div>
      <RadioButtonGroup pv="testIOC:mbboTest1" label="testIOC:mbboTest1" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    // Seed to index 0 so the radio click below is a real change.
    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    // Click radio for mbbo index 2. findByLabelText pairs the FormControlLabel
    // text "text 2" with its <input type="radio"> — more precise than
    // findByRole({name}) which can match adjacent radios in MUI's RadioGroup
    // because of how it concatenates accessible-name sources.
    const radio2 = await canvas.findByLabelText(/^text 2$/i);
    await userEvent.click(radio2);
    await waitFor(() => expect(parseFloat(input.value)).toBe(2), { timeout: 5000 });

    // Reset to 0.
    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
