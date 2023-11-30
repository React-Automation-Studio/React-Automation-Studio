import React from "react";
import ActionButton from "./ActionButton"; // Import your ActionButton component
import TextOutput from "./TextOutput"; // Import your TextOutput component
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: ActionButton,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div>
        <div style={{ marginBottom: 8 }}>
          <TextOutput pv="testIOC:BO1" label="Value of testIOC:BO1" />
        </div>

        <ActionButton
          {...args}
          actionValue="1"
          actionString="write 1 to testIOC:BO1"
        />
        <ActionButton
          {...args}
          actionValue="0"
          actionString="write 0 to testIOC:BO1"
        />
      </div>
    );
  },
};

const Template2: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div>
        <div style={{ marginBottom: 8 }}>
          <TextOutput pv="testIOC:BO1" label="Value of testIOC:BO1" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <TextOutput pv="testIOC:BO2" label="Value of testIOC:BO2" />
        </div>

        <ActionButton
          {...args}
          actionValue="1"
          actionString="write 1 to testIOC:BO1"
        />
        <ActionButton
          {...args}
          actionValue="0"
          actionString="write 0 to testIOC:BO1"
        />
      </div>
    );
  },
};
export const Overview = {
  ...Template,
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1",
    labelPlacement: "top",
    tooltip: "Click button to write action value",
    showTooltip: true,
    tooltipProps: { placement: "top" },
  },
};

export const Write1 = {
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1",
    labelPlacement: "top",
    actionValue: "1",
    actionString: "write 1 to testIOC:BO1",
    tooltip: "Click button to write action value",
    showTooltip: true,
    tooltipProps: { placement: "top" },
  },
};

export const Write0 = {
  args: {
    pv: "testIOC:BO1",
    label: "testIOC:BO1",
    labelPlacement: "top",
    actionValue: "0",
    actionString: "write 0 to testIOC:BO1",
    tooltip: "Click button to write action value",
    showTooltip: true,
    tooltipProps: { placement: "top" },
  },
};

export const WriteMultiple = {
  ...Template2,
  args: {
    pvs: ["testIOC:BO1", "testIOC:BO2"],
    label: "testIOC:BO1",
    labelPlacement: "top",
    tooltip: "Click button to write action value",
    showTooltip: true,
    tooltipProps: { placement: "top" },
  },
};
