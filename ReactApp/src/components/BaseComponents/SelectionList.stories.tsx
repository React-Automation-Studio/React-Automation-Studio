import React from 'react';
import SelectionList from './SelectionList'; // Import your SelectionList component
import TextOutput from './TextOutput'; // Import your TextOutput component
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: SelectionList,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;


const Template: StoryObj = {
    render: ({ ...args }) => {
      
      return (
        <div style={{textAlign:'center'}}>
        <div style={{marginBottom:8}}>
          <TextOutput
          pv='$(device):mbboTest$(id)'
          macros={{'$(device)':'testIOC','$(id)':'1'}}
          usePvLabel={true}
          useStringValue={true}/>
        </div>

    <SelectionList {...args} />
   
  </div>
      )
    }
};

// const Template2: StoryObj = {
//     render: ({ ...args }) => {
      
//       return (
//   <div>
//      <div style={{marginBottom:8}}>
//     <TextOutput  pv='testIOC:BO1'   label='Value of testIOC:BO1'/>
//     </div>
//     <div style={{marginBottom:8}}>
//     <TextOutput  pv='testIOC:BO2'   label='Value of testIOC:BO2'/>
//   </div>

//     <SelectionList {...args} actionValue="1"  actionString="write 1 to testIOC:BO1"/>
//     <SelectionList {...args} actionValue="0" actionString="write 0 to testIOC:BO1"/>
//   </div>
//       )
//     }
// };
export const Horizontal = {
    ...Template,
    args: {
        pv:'$(device):mbboTest$(id)',
        macros:{'$(device)':'testIOC','$(id)':'1'},
        horizontal:true,  
        usePvLabel:true
}
};

export const Vertical = {
    ...Template,
    args: {
        pv:'$(device):mbboTest$(id)',
        macros:{'$(device)':'testIOC','$(id)':'1'},
        vertical:true,  
        usePvLabel:true
}
};

export const VerticalCustomSelection = {
    ...Template,
    args: {
        pv:'$(device):mbboTest$(id)',
        macros:{'$(device)':'testIOC','$(id)':'1'},
        vertical:true,  
        usePvLabel:true,
        custom_selection_strings:['text 1','text 3']
}
};

// export const Write1 = {
    
//     args: {pv:'testIOC:BO1',
//     label:"testIOC:BO1",
//     labelPlacement:"top",
//     actionValue:"1",
//     actionString:"write 1 to testIOC:BO1",
//     tooltip:'Click button to write action value',
//     showTooltip:true,
//     tooltipProps:{placement:'top'}
// }
// };

// export const Write0 = {
    
//     args: {pv:'testIOC:BO1',
//     label:"testIOC:BO1",
//     labelPlacement:"top",
//     actionValue:"0",
//     actionString:"write 0 to testIOC:BO1",
//     tooltip:'Click button to write action value',
//     showTooltip:true,
//     tooltipProps:{placement:'top'}
// }
// };

// export const WriteMultiple = {
//     ...Template2,
//     args: { pvs:['testIOC:BO1','testIOC:BO2'],
//     label:"testIOC:BO1",
//     labelPlacement:"top",
//     // actionValue:"1",
//     // actionString:"write 1 to testIOC:BO1",
//     tooltip:'Click button to write action value',
//     showTooltip:true,
//     tooltipProps:{placement:'top'}
// }
// };