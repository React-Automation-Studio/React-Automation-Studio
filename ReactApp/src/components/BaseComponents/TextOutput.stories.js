import TextOutput from "./TextOutput";

export default {
  component: TextOutput,
  parameters: {
    docs: {
      description: {
        component:
          "Outlined read-only text field for PV values. Built on MUI `<TextField>`; supports alarm-aware background, custom number formatting, PV-metadata display, and timestamp display. Use `TextUpdate` for an inline (Typography) read-only display.",
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
    units: { table: { category: "Formatting" } },
    unitsPv: { table: { category: "Formatting" } },
    usePvUnits: { table: { category: "Formatting" } },
    prec: { table: { category: "Formatting" } },
    precPv: { table: { category: "Formatting" } },
    usePvPrecision: { table: { category: "Formatting" } },
    numberFormat: { table: { category: "Formatting" } },
    useStringValue: { table: { category: "Formatting" } },
    displayTimeStamp: { table: { category: "Formatting" } },
    displayMetaData: { table: { category: "Formatting" } },
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
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard read-only field bound to a PV with label/precision/units from PV metadata and alarm-aware background.",
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
    alarmSensitive: true,
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

export const MbboStringValue = {
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    useStringValue: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "MBBO PV displayed as its enum string (e.g. 'Off' / 'On') via `useStringValue`.",
      },
    },
  },
};

export const MbboNumericalValue = {
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Same MBBO PV displayed as its numerical state value (default).",
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

export const Timestamp = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Updated",
    displayTimeStamp: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays the PV's timestamp instead of its value via `displayTimeStamp`.",
      },
    },
  },
};

export const Metadata = {
  args: {
    pv: "$(device):test$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    label: "Precision",
    displayMetaData: "precision",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays a single PV metadata field via `displayMetaData='precision'`. Other valid options include `units`, `severity`, `host`, `upper_disp_limit`, etc.",
      },
    },
  },
};
