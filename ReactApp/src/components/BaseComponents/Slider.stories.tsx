import Slider from "./Slider";

export default {
  component: Slider,
  parameters: {
    docs: {
      description: {
        component:
          "Bounded numeric setpoint with a draggable thumb. Built on MUI `<Slider>`. Supports horizontal or vertical orientation, custom step, custom marks, and flexible label/value placement.",
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
    labelPlacement: { table: { category: "Label" } },
    min: { table: { category: "Range" } },
    max: { table: { category: "Range" } },
    minPv: { table: { category: "Range" } },
    maxPv: { table: { category: "Range" } },
    usePvMinMax: { table: { category: "Range" } },
    step: { table: { category: "Range" } },
    marks: { table: { category: "Range" } },
    units: { table: { category: "Formatting" } },
    unitsPv: { table: { category: "Formatting" } },
    usePvUnits: { table: { category: "Formatting" } },
    prec: { table: { category: "Formatting" } },
    precPv: { table: { category: "Formatting" } },
    usePvPrecision: { table: { category: "Formatting" } },
    numberFormat: { table: { category: "Formatting" } },
    vertical: { table: { category: "Appearance" } },
    showValue: { table: { category: "Appearance" } },
    valuePlacement: { table: { category: "Appearance" } },
    width: { table: { category: "Appearance" } },
    height: { table: { category: "Appearance" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
};

export const Primary = {
  args: {
    pv: "testIOC:test2",
    showValue: true,
    usePvMinMax: true,
    usePvLabel: true,
    step: 1,
    usePvUnits: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal slider bound to a PV with label, range and units from PV metadata.",
      },
    },
  },
};

export const ExtraMarks = {
  args: {
    pv: "testIOC:test2",
    marks: { 0: 0, 2500: 2500, 5000: 5000, 7500: 7500, 10000: 10000 },
    showValue: true,
    usePvMinMax: true,
    usePvLabel: true,
    step: 1,
    usePvUnits: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Slider with custom mark labels at the given values.",
      },
    },
  },
};

export const Vertical = {
  args: {
    vertical: true,
    pv: "testIOC:test2",
    showValue: true,
    maxPv: "testIOC:test2.HOPR",
    minPv: "testIOC:test2.LOPR",
    usePvMinMax: true,
    usePvLabel: true,
    step: 1,
    usePvUnits: true,
    height: "60vh",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical slider — the parent container must have a fixed height (here 60vh).",
      },
    },
  },
};

export const CustomLabel = {
  args: {
    vertical: true,
    pv: "testIOC:test2",
    showValue: true,
    maxPv: "testIOC:test2.HOPR",
    minPv: "testIOC:test2.LOPR",
    usePvMinMax: true,
    usePvLabel: false,
    label: "A",
    step: 1,
    usePvUnits: true,
    height: "60vh",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical slider with a custom short label overriding the PV's DESC.",
      },
    },
  },
};

export const ValueBelow = {
  args: {
    vertical: true,
    pv: "testIOC:test2",
    showValue: true,
    usePvMinMax: true,
    usePvLabel: true,
    step: 1,
    usePvUnits: true,
    height: "60vh",
    valuePlacement: "bottom",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Value rendered below the thumb via `valuePlacement='bottom'`.",
      },
    },
  },
};

// TODO: Slider IocRoundtripTest deferred. RAS Slider is built on rc-slider
// which is hostile to @storybook/test-runner: its drag is initialised in an
// onMouseDown closure that listens via document.addEventListener for
// mousemove/mouseup, and synthetic events from headless Chromium don't reach
// those listeners (tried fireEvent + native dispatchEvent + keyDown). Revisit
// when rc-slider exposes a keyboard path or this is switched to MUI Slider
// (which has a hidden <input type="range"> we can drive via fireEvent.change).
