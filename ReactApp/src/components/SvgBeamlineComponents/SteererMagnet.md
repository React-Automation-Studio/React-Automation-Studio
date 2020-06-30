 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';
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
        <SteererMagnet

          system={{
            systemName:'testIOC:STR3',
            displayName:'STR3Y',
            editorType:'singlePS',
            devices:
            {
              device:{deviceName:'testIOC:STR3:Y',readback:'Readback',setpoint:'Setpoint'}

            }
          }}


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