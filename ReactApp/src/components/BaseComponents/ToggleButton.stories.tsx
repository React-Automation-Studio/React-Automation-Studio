import ToggleButton from "./ToggleButton";
import TextInput from "./TextInput";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { within, userEvent, expect, waitFor } from "storybook/test";

export default {
  component: ToggleButton,
  parameters: {
    docs: {
      description: {
        component:
          "Button bound to a binary PV. Either toggles 0↔1 on click or, when `momentary` is set, writes 1 on press and 0 on release. Supports start/end icons via `muiButtonProps`.",
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
    units: { table: { category: "Label" } },
    unitsPv: { table: { category: "Label" } },
    momentary: { table: { category: "Behaviour" } },
    disableContextMenu: { table: { category: "Behaviour" } },
    onColor: { table: { category: "Appearance" } },
    offColor: { table: { category: "Appearance" } },
    muiButtonProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
};

export const Primary = {
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1 ",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard toggle — click to flip the PV between 0 and 1.",
      },
    },
  },
};

export const Momentary = {
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1 ",
    momentary: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Momentary button — writes 1 on press, 0 on release. Useful for soft-reset / pulse-style actions.",
      },
    },
  },
};

export const WithIcon = {
  args: {
    pv: "testIOC:BO1",
    label: "Power",
    muiButtonProps: { startIcon: <PowerSettingsNewIcon /> },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Add any MUI icon (or other Button props) via `muiButtonProps`.",
      },
    },
  },
};

export const TrafficLight = {
  args: {
    pv: "testIOC:BO1",
    label: "Beam",
    onColor: "success",
    offColor: "error",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Distinct on/off colours via `onColor` / `offColor` (MUI palette keys).",
      },
    },
  },
};

// Integration test: clicking the ToggleButton flips the binary PV. Sibling
// TextInput seeds a known initial state (0) and acts as the ground truth
// monitor that the IOC accepted the toggle (value flips to 1).
export const IocRoundtripTest = {
  tags: ["!dev", "!autodocs", "roundtrip-test"],
  render: () => (
    <div>
      <div style={{ marginBottom: 8 }}>
        <TextInput pv="testIOC:BO1" label="testIOC:BO1 monitor" />
      </div>
      <ToggleButton pv="testIOC:BO1" label="testIOC:BO1" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole("textbox", {}, { timeout: 5000 });
    const button = await canvas.findByRole("button");

    await waitFor(
      () => expect(Number.isFinite(parseFloat(input.value))).toBe(true),
      { timeout: 10000 }
    );

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });

    // ToggleButton writes (1 - currentValue) on click, so 0 -> 1.
    await userEvent.click(button);
    await waitFor(() => expect(parseFloat(input.value)).toBe(1), { timeout: 5000 });

    await userEvent.clear(input);
    await userEvent.type(input, "0{Enter}");
    await waitFor(() => expect(parseFloat(input.value)).toBe(0), { timeout: 5000 });
  },
};
