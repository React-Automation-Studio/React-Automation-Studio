import React from 'react';
import LoadSave from './LoadSave'; // Import your LoadSave component
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: LoadSave,
  parameters: {},
  title:"LoadSave/LoadSave",
  tags: [""],

  argTypes: {},
} as Meta;


const Template: StoryObj = {
    render: ({ ...args }) => {
      
      return (
  
    <LoadSave {...args} />
 
      )
    }
};


export const Overview = {
    ...Template,
    args: {
      host:'LOADSAVE_DATABASE',
      database:'testIOCSystems',
      macros:{ '$(systemName)': 'testIOC' },
      loadEnablePV:'$(systemName):loadSaveEnable',
      loadEnableLabel:'System On/Off',
      showLoadEnableButton:true,
      useLoadEnable:true,
 
}
};

