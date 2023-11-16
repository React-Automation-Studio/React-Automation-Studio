import type { Meta, StoryObj } from "@storybook/react";
import BeamLineCanvas from "./BeamLineCanvas";
import HorizontalBeamline from "./HorizontalBeamline";
import EditorSteererXY from '../ControlScreens/Components/EditorSteererXY';
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SteererXYMagnet from "./SteererXYMagnet";
export default {
  component: SteererXYMagnet,
  parameters: {},
  title: "Beamline components/SteererXYMagnet",
  tags: ["autodocs"],
  argTypes: {},
} as Meta;

const Template: StoryObj = {
  render: ({ ...args }) => {
    const [displayEditor, setDisplayEditor] = useState(false);
    return (
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" >
      <Grid item xs={12} lg={12}>
        <div>Click on the magnet to open the editor</div>
      </Grid>
        <Grid item xs={12} lg={6}>
          <BeamLineCanvas 
            width={'100%'} 
            height={400}
           
          >
            <HorizontalBeamline 
              x={0}
              y={50}
              width={'300px'}
            />
            <SteererXYMagnet
              handleOnClick={()=>setDisplayEditor(true)}
              xPv={'$(IOC):$(device):X:Readback'}
              yPv={'$(IOC):$(device):Y:Readback'}  
              label='STRXY2'
              macros= {{
                  '$(IOC)': 'testIOC',
                  '$(device)': 'STR2',
                  
              }
              }
              x={50}
              y={50}
              usePvUnits={true}
              prec={3}
              
              alarmSensitive={true}
                />
            </BeamLineCanvas>
          </Grid>
          <Grid item xs={12} lg={6}>
            {displayEditor&&<EditorSteererXY  
              system={
                {
                systemName: '$(IOC):$(device)',
                displayName: '$(device)XY',
                editorType: 'editorSteererXY',
                ySetpointPv: '$(IOC):$(device):Y:Setpoint',
                yReadbackPv: '$(IOC):$(device):Y:Readback',
                yOnPv: '$(IOC):$(device):Y:On',
                xSetpointPv: '$(IOC):$(device):X:Setpoint',
                xReadbackPv: '$(IOC):$(device):X:Readback',
                xOnPv: '$(IOC):$(device):X:On',
                macros: {
                  '$(IOC)': 'testIOC',
                  '$(device)': 'STR2',
                },
                disableLink:true
              
              }
              }
              handleCloseEditor={() => setDisplayEditor(false)} 
            />}
          </Grid>
        </Grid>
    );
  },
};

export const Overview = {
  ...Template,
  args: {
    width: 600,
    height: 400,
  },
};
