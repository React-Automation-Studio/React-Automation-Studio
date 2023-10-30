import { SliderRoot } from '@mui/material';
import  Slider  from './Slider';
import Grid from '@mui/material/Grid';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Slider',
  component: Slider,
  parameters: {
   
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    pv:'testIOC:test2',
    showValue:true,
    usePvMinMax:true,
    usePvLabel:true,
    step:1,
    usePvUnits:true
  }
};

export const ExtraMarks = {
  args: {
    pv:'testIOC:test2',
    marks:{0:0,2500:2500,5000:5000,7500:7500,10000:10000},
    showValue:true,
    usePvMinMax:true,
    usePvLabel:true,
    step:1,
    usePvUnits:true
  }
};

export const Vertical = {
  args: {
    vertical:true,
    pv:'testIOC:test2',
    showValue:true,
    maxPv:'testIOC:test2.HOPR',
    minPv:'testIOC:test2.LOPR',
    usePvMinMax:true,
    usePvLabel:false,
    step:1,
    usePvUnits:true,
    height:'60vh',
  }
};

// const meta: Meta<typeof Slider> = {
//   component: Slider,
//   decorators: [
//     (Story) => (
//       <div style={{ margin: '3em' }}>
//         {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
//         <Story />
//       </div>
//     ),
//   ],
// };

