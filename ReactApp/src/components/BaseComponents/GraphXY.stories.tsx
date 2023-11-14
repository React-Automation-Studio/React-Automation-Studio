import GraphXY from "./GraphXY";
import Slider from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: GraphXY,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    return (
      <div >
        <GraphXY {...args}  />
        <br />

        <Slider  pv='testIOC:BeamSweepSim:Amplitude'   label='Circle Radius' usePvMinMax={true}/>
  <Slider  pv='testIOC:BeamSweepSim:modAmp'   label='Modulation Amplitude' usePvMinMax={true}/>
  <Slider  
    pv='testIOC:BeamSweepSim:frequency'  
    label='Frequency'
    min={0.1}
    max={1}
    step={0.1}
  />
      </div>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    xPVs:
      ['testIOC:BeamSweepSim:x.AVAL',
      'testIOC:BeamSweepSim:x1.AVAL',
      'testIOC:BeamSweepSim:x2.AVAL'
      ]
    ,  
    yPVs:
      ['testIOC:BeamSweepSim:y.AVAL',
      'testIOC:BeamSweepSim:y1.AVAL',
      'testIOC:BeamSweepSim:y2.AVAL'
      ]
   ,  
    xMax:10000,
    yMax:10000,
    xMin:-10000,
    yMin:-10000,
    showLegend:false,
    updateMode:'updateOnYChange',
    width:'50%',
    
  },
};

// export const AlternateColors = {
//   ...Template,
//   args: {
//     pvs:['testIOC:test4','testIOC:test5'], 
//     legend:['Modulated Sine Wave Amplitude','Sine Wave Amplitude'],
//     lineColor:['red','green']
    
//   },
// };
