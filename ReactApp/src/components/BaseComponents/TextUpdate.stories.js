import TextUpdate from "./TextUpdate";

export default {
  component: TextUpdate,
  parameters: {
    docs: {
      description: {
        component:
          "Read-only inline text display backed by a PV. Built on MUI `<Typography>`; supports an alarm-aware background gradient and any Typography variant. Use `TextOutput` for an outlined box.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    pvs: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    useMetadata: { table: { category: "PV binding" } },
    initialLocalVariableValue: { table: { category: "PV binding" } },
    label: { table: { category: "Label" } },
    labelPv: { table: { category: "Label" } },
    usePvLabel: { table: { category: "Label" } },
    units: { table: { category: "Formatting" } },
    unitsPv: { table: { category: "Formatting" } },
    usePvUnits: { table: { category: "Formatting" } },
    prec: { table: { category: "Formatting" } },
    precPv: { table: { category: "Formatting" } },
    usePvPrecision: { table: { category: "Formatting" } },
    numberFormat: { table: { category: "Formatting" } },
    useStringValue: { table: { category: "Formatting" } },
    alarmSensitive: { table: { category: "Alarm" } },
    alarmPv: { table: { category: "Alarm" } },
    stringSeverity: { table: { category: "Alarm" } },
    useStringSeverityMatch: { table: { category: "Alarm" } },
    variant: { table: { category: "Appearance" } },
    align: { table: { category: "Appearance" } },
    muiTypographyProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
};

export const Primary = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    label: "My value is ",
    units: "mA",
    usePvPrecision: true,
    prec: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom label, units, and precision overriding PV metadata.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Label sourced from the PV's DESC field via `usePvLabel`.",
      },
    },
  },
};

export const AlarmAware = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvUnits: true,
    usePvPrecision: true,
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Background gradient picks up `alarm.minor.dark` / `alarm.major.dark` when the PV severity crosses its warn/alarm thresholds.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Engineering notation via mathjs `numberFormat`.",
      },
    },
  },
};

export const LargeVariant = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvUnits: true,
    variant: "h5",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Typography variant set to `h5` for emphasis.",
      },
    },
  },
};
