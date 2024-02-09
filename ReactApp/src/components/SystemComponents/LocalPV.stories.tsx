import LocalPV from "./LocalPV";
import type { Meta, StoryObj } from "@storybook/react";
import React,{ useState } from "react";

export default {
  component: LocalPV,
  title:"Widgets/LocalPV",
  parameters: {},
  tags: [],
  argTypes: {},
} as Meta;



export const Primary = {
 
  args: {
   debug:true,
   pv:'loc://$(device):test$(id)',
    macros:{'$(device)':'testIOC','$(id)':'2'}
  },
};
