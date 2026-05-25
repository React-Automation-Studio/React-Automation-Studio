import SelectionList from "./SelectionList";
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

// Integration test: clicking a SelectionList item writes the corresponding
// mbbo index to the IOC. Sibling TextInput (numeric) seeds the PV to 0 and
// acts as the ground truth monitor that the IOC accepted index 2.
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
      <SelectionList pv="testIOC:mbboTest1" usePvLabel={true} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    // SelectionList renders each enum string in an MUI ListItemButton.
    // findByText -> closest('[role="button"]') yields the click target.
    const item2Text = await canvas.findByText(/^text 2$/i);
    const item2 = item2Text.closest('[role="button"]') as HTMLElement;
    expect(item2).not.toBeNull();
    await userEvent.click(item2);
    await waitFor(() => expect(parseFloat(input.value)).toBe(2), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
