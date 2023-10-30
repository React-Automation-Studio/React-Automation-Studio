import  Slider  from './Slider';

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

