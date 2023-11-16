import EpicsPV from "./EpicsPV";
import type { Meta, StoryObj } from "@storybook/react";
import React,{ useState } from "react";

export default {
  component: EpicsPV,
  title:"Widgets/EpicsPV",
  parameters: {},
  tags: [],
  argTypes: {},
} as Meta;



export const Primary = {
 
  args: {
   debug:true,
   pv:'$(device):test$(id)',
    macros:{'$(device)':'testIOC','$(id)':'2'}
  },
};
