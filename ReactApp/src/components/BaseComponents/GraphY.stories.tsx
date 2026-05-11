import GraphY from "./GraphY";
import Slider from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: GraphY,
  parameters: {
    docs: {
      description: {
        component:
          "Real-time strip chart of one or more PVs against a sample-index or timestamp X axis. Built on Plotly; each entry in `pvs` becomes one trace. Use `GraphXY` for parametric XY plots.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    pvs: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    xAxisTitle: { table: { category: "Axes" } },
    yAxisTitle: { table: { category: "Axes" } },
    xMin: { table: { category: "Axes" } },
    xMax: { table: { category: "Axes" } },
    yMin: { table: { category: "Axes" } },
    yMax: { table: { category: "Axes" } },
    yScaleLog10: { table: { category: "Axes" } },
    xUnits: { table: { category: "Axes" } },
    yUnits: { table: { category: "Axes" } },
    xNoOfTicks: { table: { category: "Axes" } },
    yNoOfTicks: { table: { category: "Axes" } },
    xTickFormat: { table: { category: "Axes" } },
    yTickFormat: { table: { category: "Axes" } },
    xTickValues: { table: { category: "Axes" } },
    xTickLabels: { table: { category: "Axes" } },
    yTickValues: { table: { category: "Axes" } },
    yTickLabels: { table: { category: "Axes" } },
    useTimeStamp: { table: { category: "Axes" } },
    yHoverFormat: { table: { category: "Axes" } },
    legend: { table: { category: "Traces" } },
    lineColor: { table: { category: "Traces" } },
    showLegend: { table: { category: "Traces" } },
    maxLength: { table: { category: "Traces" } },
    title: { table: { category: "Appearance" } },
    backgroundColor: { table: { category: "Appearance" } },
    width: { table: { category: "Appearance" } },
    height: { table: { category: "Appearance" } },
    aspectRatio: { table: { category: "Appearance" } },
    plotlyStyle: { table: { category: "Appearance" } },
    displayModeBar: { table: { category: "Appearance" } },
    updateRate: { table: { category: "Updates" } },
    usePolling: { table: { category: "Updates" } },
    pollingRate: { table: { category: "Updates" } },
    makeNewSocketIoConnection: { table: { category: "Updates" } },
    disableMobileStatic: { table: { category: "Behaviour" } },
    disableContextMenu: { table: { category: "Behaviour" } },
    disableProbe: { table: { category: "Behaviour" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof GraphY>;
export default meta;

type Story = StoryObj<typeof meta>;

const WithSlider = ({ ...args }) => (
  <div>
    <div style={{ height: "25vh" }}>
      <GraphY {...args} />
    </div>
    <br />
    <Slider pv="testIOC:amplitude" label="Sine Wave Amplitude" usePvMinMax />
  </div>
);

export const Overview: Story = {
  render: WithSlider,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Two-trace strip chart with a custom legend. Drag the slider to modulate the amplitude.",
      },
    },
  },
};

export const AlternateColors: Story = {
  render: WithSlider,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
    lineColor: ["red", "green"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom trace colours via `lineColor` (one entry per trace).",
      },
    },
  },
};

export const LogScale: Story = {
  render: WithSlider,
  args: {
    pvs: ["testIOC:test5"],
    legend: ["Sine Wave Amplitude"],
    yScaleLog10: true,
    yTickFormat: ".3e",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Log-scaled Y axis with engineering-notation tick labels (d3 `.3e` format).",
      },
    },
  },
};

export const PinnedRange: Story = {
  render: WithSlider,
  args: {
    title: "Custom yMin and yMax",
    pvs: ["testIOC:test5"],
    legend: ["Sine Wave Amplitude"],
    yMin: 3000,
    yMax: 6000,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pinned Y axis between 3000 and 6000 — the trace clips at the edges.",
      },
    },
  },
};

export const OneHundredThousandDataPoints: Story = {
  render: WithSlider,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
    maxLength: 100000,
  },
  parameters: {
    docs: {
      description: {
        story: "Rolling buffer capped at 100k points per trace.",
      },
    },
  },
};

export const OneMillionDataPoints: Story = {
  render: WithSlider,
  args: {
    pvs: ["testIOC:test4", "testIOC:test5"],
    legend: ["Modulated Sine Wave Amplitude", "Sine Wave Amplitude"],
    maxLength: 1000000,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Rolling buffer capped at 1M points — heavy, intended as a stress test for the update path.",
      },
    },
  },
};
