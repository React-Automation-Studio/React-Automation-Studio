import TextUpdate from "./TextUpdate";

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
