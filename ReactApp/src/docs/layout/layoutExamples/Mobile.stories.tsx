import Mobile from "./Mobile";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: Mobile,
  title:"Documentation/Style Guide/Sample Layouts/Mobile",

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ maxWidth: "320px" }}>
        <Mobile {...args} />
      </div>
    );
  },
};

export const Primary = {
  ...Template,
  args: {},
};
