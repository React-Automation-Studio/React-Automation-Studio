 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';
<BeamLineCanvas 
  width={600} 
  height={300} 
  //debugBorder={true}
  >
       <HorizontalBeamline 
          x={0}
          y={50}
       
          pv={'pva://testIOC:BeamlineA:BeamOn'}
          width={'600px'}
      //    debugBorder={true}
        />
      
        <QuadrapoleMagnet
       // handleOnClick={this.handleOnClick}
          x={50}
          y={50}
          system={{ systemName: '$(IOC):$(device)',
            displayName: 'Q3',
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
              '$(device)': 'PS3',
            },
            }}
        usePvUnits={true}
        usePvLabel={false}
        alarmSensitive={true}
        label='Q1'
        componentShadow={true}
        textShadow={false}
        componentGradient={true}
      />
        </BeamLineCanvas>

```