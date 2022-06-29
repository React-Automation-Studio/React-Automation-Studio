 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';


<BeamLineCanvas width={600} height={300} >
       <HorizontalBeamline 
          x={0}
          y={50}
       
          pv={'testIOC:BeamlineA:BeamOn'}
          width={'113px'}
      //    debugBorder={true}
        />
        <HorizontalBeamline 
          x={'113px'}
          y={50}
          pv={'testIOC:BeamlineB:BeamOn'}
          width={'148px'}
     //     debugBorder={true}
        />
        <HorizontalBeamline 
          x={'261px'}
          y={50}
          pv={'testIOC:BeamlineC:BeamOn'}
          width={'150px'}
    //      debugBorder={true}
        />
        <FC

          pv={'$(IOC):$(actuatorName)$(sim):put-outIn'}
          isMovingPv = {'$(IOC):$(actuatorName)$(sim):get-status.B5'}
          inLimitPv = {'$(IOC):$(actuatorName)$(sim):get-status.B6'}
          outLimitPv = {'$(IOC):$(actuatorName)$(sim):get-status.B7'}
          inLimitValue={1}
          outLimitValue={1}
          isMovingValue={1}
          maxFCsReached={false}
   
          label= {'$(actuatorName)'}

          macros= {{
              '$(IOC)': 'testIOC',
              '$(sim)':'sim',
              '$(actuatorName)': 'FC1',
             
          }
          }
          x={38}
          y={50}
          
          alarmSensitive={true}
         
          
          componentGradient={true}
        />

          <FC

          pv={'$(IOC):$(actuatorName)$(sim):put-outIn'}
          isMovingPv = {'$(IOC):$(actuatorName)$(sim):get-status.B5'}
          inLimitPv = {'$(IOC):$(actuatorName)$(sim):get-status.B6'}
          outLimitPv = {'$(IOC):$(actuatorName)$(sim):get-status.B7'}
          inLimitValue={1}
          outLimitValue={1}
          isMovingValue={1}
          maxFCsReached={false}
   
          label= {'$(actuatorName)'}

          macros= {{
              '$(IOC)': 'testIOC',
              '$(sim)':'sim',
              '$(actuatorName)': 'FC2',
             
          }
          }
          x={180}
          y={50}
          
          alarmSensitive={true}
         
        
          componentGradient={true}
        />
      
        </BeamLineCanvas>

```