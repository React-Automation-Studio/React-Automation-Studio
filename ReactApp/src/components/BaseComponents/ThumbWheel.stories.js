import  ThumbWheel  from './ThumbWheel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ThumbWheel',
  component: ThumbWheel,
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
    pv:'$(device):test$(id)',
    macros:{'$(device)':'testIOC','$(id)':'2'},
    prec_integer:4,
    prec_decimal:3,
    prec:3,
    usePvMinMax:true,
  },
};

