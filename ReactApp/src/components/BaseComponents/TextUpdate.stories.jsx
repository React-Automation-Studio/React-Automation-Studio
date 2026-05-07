import TextUpdate from "./TextUpdate";
import TextInput from "./TextInput";
import { within, userEvent, expect, waitFor } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TextUpdate,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "My value is ",
    units: "mA",
    usePvPrecision: true,
    prec: 2,
  },
};
export const PvLabel = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    units: "mA",
    usePvPrecision: true,
    prec: 2,
  },
};
export const NumberFormat = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "My value is ",
    units: "mA",
    usePvPrecision: true,
    prec: 2,
    numberFormat: { notation: "engineering", precision: 2 },
  },
};

// Integration test for TextUpdate (read-only Typography). Sibling TextInput
// ("seed") writes a value; the TextUpdate's rendered text must reflect it,
// proving it actually subscribes to the PV broadcast.
export const IocPvDisplayTest = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:test2" label="seed" />
      </div>
      {/* No label / units / prec so the text content is just the raw number. */}
      <TextUpdate pv="testIOC:test2" />
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

    // Write 5005 via the seed and confirm both the seed input and TextUpdate
    // (rendered as a Typography text node) display the new value.
    await userEvent.clear(seed);
    await userEvent.type(seed, "5005{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5005), { timeout: 5000 });
    // findByText matches the Typography's text content. The input's value
    // attribute is NOT text content, so this query unambiguously hits TextUpdate.
    await canvas.findByText(/5005/, undefined, { timeout: 5000 });

    // Switch to a different value to prove the readback follows updates.
    await userEvent.clear(seed);
    await userEvent.type(seed, "5000{Enter}");
    await waitFor(() => expect(parseFloat(seed.value)).toBe(5000), { timeout: 5000 });
    await canvas.findByText(/5000/, undefined, { timeout: 5000 });
  },
};
