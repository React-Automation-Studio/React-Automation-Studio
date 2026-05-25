import GraphXY from "./GraphXY";
import Slider from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: GraphXY,
  parameters: {
    docs: {
      description: {
        component:
          "Real-time XY plot built on Plotly. Each entry in `xPVs[i]` is paired with `yPVs[i]` to form one trace. Use `GraphY` if the X axis is time.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    xPVs: { table: { category: "PV binding" } },
    yPVs: { table: { category: "PV binding" } },
    macros: { table: { category: "PV binding" } },
    xAxisTitle: { table: { category: "Axes" } },
    yAxisTitle: { table: { category: "Axes" } },
    xMin: { table: { category: "Axes" } },
    xMax: { table: { category: "Axes" } },
    yMin: { table: { category: "Axes" } },
    yMax: { table: { category: "Axes" } },
    yScaleLog10: { table: { category: "Axes" } },
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
    updateMode: { table: { category: "Updates" } },
    usePolling: { table: { category: "Updates" } },
    pollingRate: { table: { category: "Updates" } },
    makeNewSocketIoConnection: { table: { category: "Updates" } },
    disableMobileStatic: { table: { category: "Behaviour" } },
    disableContextMenu: { table: { category: "Behaviour" } },
    disableProbe: { table: { category: "Behaviour" } },
    debug: { table: { category: "Diagnostics" } },
  },
} satisfies Meta<typeof GraphXY>;
export default meta;

type Story = StoryObj<typeof meta>;

const WithSliders = ({ ...args }) => (
  <div>
    <GraphXY {...args} />
    <br />
    <Slider
      pv="testIOC:BeamSweepSim:Amplitude"
      label="Circle Radius"
      usePvMinMax
    />
    <Slider
      pv="testIOC:BeamSweepSim:modAmp"
      label="Modulation Amplitude"
      usePvMinMax
    />
    <Slider
      pv="testIOC:BeamSweepSim:frequency"
      label="Frequency"
      min={0.1}
      max={1}
      step={0.1}
    />
  </div>
);

export const Overview: Story = {
  render: WithSliders,
  args: {
    xPVs: [
      "testIOC:BeamSweepSim:x.AVAL",
      "testIOC:BeamSweepSim:x1.AVAL",
      "testIOC:BeamSweepSim:x2.AVAL",
    ],
    yPVs: [
      "testIOC:BeamSweepSim:y.AVAL",
      "testIOC:BeamSweepSim:y1.AVAL",
      "testIOC:BeamSweepSim:y2.AVAL",
    ],
    xMax: 10000,
    yMax: 10000,
    xMin: -10000,
    yMin: -10000,
    showLegend: false,
    updateMode: "updateOnYChange",
    width: "50%",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Three beam-sweep traces. Move the sliders below to modulate radius, amplitude and frequency.",
      },
    },
  },
};

export const CustomLegend: Story = {
  render: WithSliders,
  args: {
    xPVs: ["testIOC:BeamSweepSim:x.AVAL"],
    yPVs: ["testIOC:BeamSweepSim:y.AVAL"],
    legend: ["Beam position"],
    lineColor: ["#82C3F8"],
    showLegend: true,
    xMin: -10000,
    xMax: 10000,
    yMin: -10000,
    yMax: 10000,
    width: "50%",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single trace with a custom legend label and trace colour.",
      },
    },
  },
};

export const Polling: Story = {
  render: WithSliders,
  args: {
    xPVs: ["testIOC:BeamSweepSim:x.AVAL"],
    yPVs: ["testIOC:BeamSweepSim:y.AVAL"],
    usePolling: true,
    pollingRate: 50,
    xMin: -10000,
    xMax: 10000,
    yMin: -10000,
    yMax: 10000,
    width: "50%",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Polling-mode update — the client samples the PVs every `pollingRate` ms instead of being pushed every change.",
      },
    },
  },
};
