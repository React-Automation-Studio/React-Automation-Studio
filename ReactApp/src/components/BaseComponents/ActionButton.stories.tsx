import ActionButton from "./ActionButton";
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "storybook/test";

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

// Integration test: clicking the ActionButton must actually write to the IOC.
// We compose a sibling TextInput on the same PV — used to (a) seed a known
// initial value (0) before the click so the assertion isn't dependent on
// whatever the IOC happens to be at, and (b) act as the "ground truth"
// monitor that the IOC accepted the button's write (input value flips to 1).
// !dev/!autodocs hide the value flicker from the styleguide UI; the implicit
// 'test' tag still applies so test-runner picks it up by default.
export const IocRoundtripTest: StoryObj = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:BO1" label="testIOC:BO1 monitor" />
      </div>
      <ActionButton
        pv="testIOC:BO1"
        actionValue="1"
        actionString="write 1 to testIOC:BO1"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });
    // findByText finds the text node, .closest("button") walks up to the
    // actual <button> element. More robust than findByRole({name}) when MUI
    // wraps Buttons in FormControlLabel / Tooltip which can muddle the
    // computed accessible name.
    const buttonText = await canvas.findByText(/write 1 to testIOC:BO1/i);
    const button = buttonText.closest("button") as HTMLButtonElement;
    expect(button).not.toBeNull();

    // Wait for the PV to connect — input value flips from the PV name string
    // to a numeric value once data arrives.
    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    // Seed a known initial state of 0, so the post-click assertion that the
    // value is 1 is a real change, not a no-op.
    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(
      () => expect(parseFloat(input.value)).toBe(0),
      { timeout: 5000 }
    );

    // Click the button — this writes actionValue (1) via handleImmediateChange.
    await userEvent.click(button);

    // The TextInput is on the same PV; if the IOC accepted the write it'll
    // broadcast back and the input flips to 1.
    await waitFor(
      () => expect(parseFloat(input.value)).toBe(1),
      { timeout: 5000 }
    );

    // Reset to 0 so subsequent runs / users see the IOC's PINI=YES state.
    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(
      () => expect(parseFloat(input.value)).toBe(0),
      { timeout: 5000 }
    );
  },
};
