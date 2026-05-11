import TextInput from "./TextInput";

export default {
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          "Outlined writable text field for setting a PV's value. Built on MUI `<TextField>`; supports alarm-aware background, custom number formatting, and constrained input via min/max. Use `TextOutput` for a read-only equivalent.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pv: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    useMetadata: { table: { category: "PV binding" } },
    initialLocalVariableValue: { table: { category: "PV binding" } },
    label: { table: { category: "Label" } },
    labelPv: { table: { category: "Label" } },
    usePvLabel: { table: { category: "Label" } },
    min: { table: { category: "Range" } },
    max: { table: { category: "Range" } },
    minPv: { table: { category: "Range" } },
    maxPv: { table: { category: "Range" } },
    usePvMinMax: { table: { category: "Range" } },
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
    margin: { table: { category: "Appearance" } },
    muiTextFieldProps: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
};

export const Primary = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvPrecision: true,
    usePvUnits: true,
    usePvMinMax: true,
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Writable field bound to a PV with label, precision, units and range all from PV metadata. Background colour follows alarm severity.",
      },
    },
  },
};

export const Overrides = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Custom Label",
    usePvPrecision: true,
    prec: 5,
    units: "🍕",
    max: 5500,
    min: 4500,
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom label, precision, units, and range overriding PV metadata.",
      },
    },
  },
};

export const MbboStringValue = {
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    useStringValue: true,
    usePvUnits: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "MBBO PV — type the state's enum string (e.g. 'On' / 'Off') to write to the PV.",
      },
    },
  },
};

export const MbboNumericalValue = {
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    usePvUnits: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Same MBBO PV — write as the numerical state value.",
      },
    },
  },
};

export const NumberFormat = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvPrecision: true,
    usePvUnits: true,
    usePvMinMax: true,
    prec: 3,
    alarmSensitive: true,
    numberFormat: { notation: "engineering", precision: 5 },
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
