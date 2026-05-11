import TextUpdateMultiplePVs from "./TextUpdateMultiplePVs";

export default {
  component: TextUpdateMultiplePVs,
  parameters: {
    docs: {
      description: {
        component:
          "Stack of read-only `<Typography>` lines, one per PV in the `pvs` array. Each line shows the PV's label (DESC) and current value. Use `TextUpdate` for a single PV.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pvs: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    useMetadata: { table: { category: "PV binding" } },
    usePvLabel: { table: { category: "Label" } },
    usePvUnits: { table: { category: "Formatting" } },
    useStringValue: { table: { category: "Formatting" } },
    numberFormat: { table: { category: "Formatting" } },
    alarmSensitive: { table: { category: "Alarm" } },
    tooltip: { table: { category: "Tooltip" } },
    showTooltip: { table: { category: "Tooltip" } },
    tooltipProps: { table: { category: "Tooltip" } },
    debug: { table: { category: "Diagnostics" } },
  },
};

export const Primary = {
  args: {
    pvs: [
      "testIOC:MTextUpdate1",
      "testIOC:MTextUpdate2",
      "testIOC:MTextUpdate3",
      "testIOC:MTextUpdate4",
      "testIOC:MTextUpdate5",
    ],
    usePvLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Five PVs stacked vertically with their labels from PV metadata.",
      },
    },
  },
};

export const AlarmAware = {
  args: {
    pvs: [
      "testIOC:MTextUpdate1",
      "testIOC:MTextUpdate2",
      "testIOC:MTextUpdate3",
    ],
    usePvLabel: true,
    alarmSensitive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Each line picks up its own PV's severity colour independently.",
      },
    },
  },
};

export const NumberFormat = {
  args: {
    pvs: [
      "testIOC:MTextUpdate1",
      "testIOC:MTextUpdate2",
      "testIOC:MTextUpdate3",
    ],
    usePvLabel: true,
    numberFormat: { notation: "engineering", precision: 3 },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Engineering notation applied across all lines via mathjs `numberFormat`.",
      },
    },
  },
};
