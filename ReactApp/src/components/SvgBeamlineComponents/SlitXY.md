 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';
const  system={
            componentType: 'SlitXY',
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
        <SlitXY
         
          system={system}
          xGapPv={'$(IOC):$(device):X:Gap:Readback'}
          yGapPv={'$(IOC):$(device):Y:Gap:Readback'}  
          xOffsetPv={'$(IOC):$(device):X:Offset:Readback'}
          yOffsetPv={'$(IOC):$(device):Y:Offset:Readback'}  
          label='$(device)'
          macros= {{
              '$(IOC)': 'pva://testIOC',
              '$(device)': 'SLITXY1',
              
          }
          }
          x={50}
          y={50}
          usePvUnits={true}
          prec={3}
          
          alarmSensitive={true}
          
        />
      
        </BeamLineCanvas>

```