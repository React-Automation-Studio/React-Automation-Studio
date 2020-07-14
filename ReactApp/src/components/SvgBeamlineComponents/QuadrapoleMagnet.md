
 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';
import EditorSinglePS from '../ControlScreens/Components/EditorSinglePS';
import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
const [displayEditor,setDisplayEditor]=useState(false);

  <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
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
        <QuadrapoleMagnet
          handleOnClick={()=>setDisplayEditor(true)}
          x={50}
          y={50}
          label='Q1'
          pv= '$(IOC):$(device):Readback'
          macros=
            {{
              '$(IOC)': 'pva://testIOC',
              '$(device)': 'PS1',
            }}
        usePvUnits={true}
        usePvLabel={false}
        alarmSensitive={true}
        tooltip={'Click on the icon to open the editor'}
        showTooltip={true}
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
              displayName: 'Q1',
              editorType: 'editorSinglePS',
              setpointPv: '$(IOC):$(device):Setpoint',
              readbackPv: '$(IOC):$(device):Readback',
              onOffPv: '$(IOC):$(device):On',
              statusTextPv: '$(IOC):$(device):On',
              scanPv: '$(IOC):$(device):SimReadback.SCAN',
              orocPv: '$(IOC):$(device):SimReadback.OROC',
              rampRatePv: '$(IOC):$(device):RampRate',
              macros:
              {
                '$(IOC)': 'pva://testIOC',
                '$(device)': 'PS1',
              },
              disableLink:true
          
          }
          }
          handleCloseEditor={() => setDisplayEditor(false)} 
        />}
      </Grid>
    </Grid>


```