import TextOutput from "./TextOutput";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TextOutput,
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
    macros: { "$(device)": "testIOC", "$(id)": "2" },
    usePvLabel: true,
    usePvPrecision: true,
    usePvUnits: true,
    usePvMinMax: true,
    alarmSensitive: true,
  },
};

export const EpicsAIOverides = {
  description: "test",
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
    useUnits: true,
  },
};

export const EpicsMBBOStringValue = {
  description: "test",
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    useStringValue: true,
    usePvUnits: true,
  },
};

export const EpicsMBBONumericalValue = {
  description: "test",
  args: {
    pv: "$(device):mbboTest$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    usePvUnits: true,
  },
};

export const NumberFormatExample = {
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
};
