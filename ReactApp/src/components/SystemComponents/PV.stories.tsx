import PV from "./PV";
import type { Meta, StoryObj } from "@storybook/react";
import React,{ useState } from "react";

export default {
  component: PV,
  title:"Widgets/PV",
  parameters: {},
  tags: [],
  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    const [pv,setPv]=useState({initialized:false});
    const pvConnection=<PV
       pv='$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}} 
       pvData={setPv}
     />
    let {initialized}=pv;
    let value=initialized?pv.value:"value is not initialized";
    let content=<div>{value}</div>;
    return(   
      <React.Fragment>
       {pvConnection}
       {content}
      </React.Fragment>
     );
   
  },
};

export const Primary = {
  ...Template,
  args: {
   
  },
};
