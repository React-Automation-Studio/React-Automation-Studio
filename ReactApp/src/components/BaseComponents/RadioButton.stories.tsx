import RadioButton from "./RadioButton";
import TextOutput from "./TextOutput";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: RadioButton,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div style={{ width: "50%", maxWidth: "250px" }}>
        <TextOutput
          pv="$(device):BO$(id)"
          macros={{ "$(device)": "testIOC", "$(id)": "1" }}
          label={"Custom Label"}
          useStringValue={true}
          usePvLabel={true}
        />

        <br />
        <RadioButton {...args} />
      </div>
    );
  },
};

export const Primary = {
  ...Template,
  args: {
    pv: "$(device):BO$(id)",
    macros: { "$(device)": "testIOC", "$(id)": "1" },
    usePvLabel: true,
    labelPlacement: "end",
  },
};

