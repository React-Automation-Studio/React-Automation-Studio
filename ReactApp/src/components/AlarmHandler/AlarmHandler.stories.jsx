import  AlarmHandler  from './AlarmHandler';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: AlarmHandler,
  title:"AlarmHandler/AlarmHandler Component",
  parameters: {
  
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    titleProps:{
      title: "Demo Alarm Handler",
      alignTitle: "center",
      titleVariant: "h6",
      titleTextStyle: { textTransform: 'uppercase' }
  },
  alarmDatabaseName:"demoAlarmDatabase",
   
    
  },
};