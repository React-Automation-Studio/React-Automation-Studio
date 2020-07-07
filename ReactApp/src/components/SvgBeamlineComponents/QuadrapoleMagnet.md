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
          label='Q3'
          pv= '$(IOC):$(device):Readback'
          macros=
            {{
              '$(IOC)': 'pva://testIOC',
              '$(device)': 'PS3',
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