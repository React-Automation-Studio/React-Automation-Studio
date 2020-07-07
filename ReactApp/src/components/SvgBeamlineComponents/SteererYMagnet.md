 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';
const  system={
            componentType: 'SteererYMagnet',
            systemName: '$(IOC):$(device)',
            displayName: '$(device)$(XorY)',
            editorType: 'editorSinglePS',
            setpointPv: '$(IOC):$(device):$(XorY):Setpoint',
            pv: '$(IOC):$(device):$(XorY):Readback',
            statusTextPv: '$(IOC):$(device):$(XorY):On',
            onOffPv: '$(IOC):$(device):$(XorY):On',
            macros: {
              '$(IOC)': 'pva://testIOC',
              '$(device)': 'STR2',
              '$(XorY)': 'Y'
          },
          };

<BeamLineCanvas width={600} height={300} >
       <HorizontalBeamline 
          x={0}
          y={50}
       
          pv={'pva://testIOC:BeamlineA:BeamOn'}
          width={'113px'}
      //    debugBorder={true}
        />
        <HorizontalBeamline 
          x={'113px'}
          y={50}
          pv={'pva://testIOC:BeamlineB:BeamOn'}
          width={'148px'}
     //     debugBorder={true}
        />
        <HorizontalBeamline 
          x={'261px'}
          y={50}
          pv={'pva://testIOC:BeamlineC:BeamOn'}
          width={'150px'}
    //      debugBorder={true}
        />
        <SteererYMagnet
         
          system={system}
          pv={'$(IOC):$(device):$(XorY):Readback'}
          label='STR2'
          macros= {{
              '$(IOC)': 'pva://testIOC',
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

```