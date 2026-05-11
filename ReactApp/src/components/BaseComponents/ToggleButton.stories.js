import ToggleButton from "./ToggleButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

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
