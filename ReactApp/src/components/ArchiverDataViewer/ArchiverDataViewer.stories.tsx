import React from "react";
import ArchiverDataViewer from "./ArchiverDataViewer"; // Import your ArchiverDataViewer component
import type { Meta, StoryObj } from "@storybook/react";
import ToggleButton from "../../components/BaseComponents/ToggleButton";
import ThumbWheel from "../../components/BaseComponents/ThumbWheel";
export default {
  component: ArchiverDataViewer,
  parameters: {},
  title: "Archiver Data Viewer/ArchiverDataViewer",
  tags: [""],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div>
        <ArchiverDataViewer {...args} />
        <ToggleButton
          style={{ paddingTop: 32 }}
          usePvLabel={true}
          pv="testIOC:BO1"
        />
        <ToggleButton
          style={{ paddingTop: 32 }}
          usePvLabel={true}
          pv="testIOC:BO2"
        />
        <div style={{ paddingTop: 32 }}>
          <ThumbWheel
            usePvLabel={true}
            pv="testIOC:amplitude"
            usePvMinMax={true}
          />
        </div>
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    archiver: "DEMO_ARCHIVER",
    title: "Archived Data",
    showButtons: true,
    defaultButtonsExpanded: true,
    livePolling: true,
    fromTimeOffset: "1m",
    traces: [
      {
        pv: "testIOC:BO1",
        yAxis: 0,
      },
      { pv: "testIOC:amplitude", yAxis: 1 },
      { pv: "testIOC:BO2", yAxis: 2 },
    ],
    yAxes: [
      {
        title: "BO1",
      },
      {
        title: "Amplitude",
      },
      {
        title: "BO2",
      },
    ],
  },
};
