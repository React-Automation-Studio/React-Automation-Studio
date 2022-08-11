

 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';
import EditorSinglePS from '../ControlScreens/Components/EditorSinglePS';
import React,{useState} from 'react';
import Grid from '@mui/material/Grid';
const [displayEditor,setDisplayEditor]=useState(false);

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
        <SteererYMagnet
          handleOnClick={()=>setDisplayEditor(true)}
          pv={'$(IOC):$(device):$(XorY):Readback'}
          label='$(device)$(XorY)'
          macros= {{
              '$(IOC)': 'testIOC',
              '$(device)': 'STR2',
              '$(XorY)': 'Y'
          }
          }
          x={50}
          y={50}
          usePvUnits={true}
          prec={3}
          
          alarmSensitive={true}
          labelOffsetY={0}
          labelOffsetX={0}
          valueOffsetY={0}
          valueOffsetX={0}
          componentShadow={true}
          textShadow={false}
          componentGradient={true}
            />
        </BeamLineCanvas>
      </Grid>
      <Grid item xs={12} lg={6}>
        {displayEditor&&<EditorSinglePS  
          system={
            {
            systemName: '$(IOC):$(device)',
            displayName: '$(device)$(XorY)',
            editorType: 'editorSinglePS',
            setpointPv: '$(IOC):$(device):$(XorY):Setpoint',
            readbackPv: '$(IOC):$(device):$(XorY):Readback',
            statusTextPv: '$(IOC):$(device):$(XorY):On',
            statusOnPv: '$(IOC):$(device):$(XorY):On',

            onOffPv: '$(IOC):$(device):$(XorY):On',
            macros: {
              '$(IOC)': 'testIOC',
              '$(device)': 'STR2',
              '$(XorY)': 'Y'
            },
            disableLink:true
          
          }
          }
          handleCloseEditor={() => setDisplayEditor(false)} 
        />}
      </Grid>
    </Grid>


```