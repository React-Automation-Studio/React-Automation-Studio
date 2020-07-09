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
        <Harp

          pv={'pva://$(IOC):$(actuatorName):put-outIn'}
          isMovingPv = {'pva://$(IOC):$(actuatorName):get-status.B5'}
          inLimitPv = {'pva://$(IOC):$(actuatorName):get-status.B6'}
          outLimitPv = {'pva://$(IOC):$(actuatorName):get-status.B7'}
          inLimitValue={1}
          outLimitValue={1}
          isMovingValue={1}
          maxHarpsReached={false}
   
          label= {'$(actuatorName)'}

          macros= {{
              '$(IOC)': 'testIOC',
              '$(actuatorName)': 'Harp2',
             
          }
          }
          x={50}
          y={50}
          
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