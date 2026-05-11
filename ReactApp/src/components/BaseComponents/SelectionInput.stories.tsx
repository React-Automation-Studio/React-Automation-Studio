import SelectionInput from "./SelectionInput";
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

// Integration test: choosing a SelectionInput option writes the corresponding
// mbbo index to the IOC. Sibling TextInput (numeric) seeds the PV to 0 and
// acts as the ground truth monitor that the IOC accepted the selection.
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
      <SelectionInput pv="testIOC:mbboTest1" usePvLabel={true} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // MUI Select's MenuItems render into a portal at document.body, not
    // inside canvasElement — query options through this scope.
    const body = within(canvasElement.ownerDocument.body);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    // MUI Select trigger has role="combobox". Click to open the dropdown.
    const trigger = await canvas.findByRole("combobox");
    await userEvent.click(trigger);

    const option2 = await body.findByRole("option", { name: /text 2/i });
    await userEvent.click(option2);

    await waitFor(() => expect(parseFloat(input.value)).toBe(2), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
