 ``` js
import BeamLineCanvas from './BeamLineCanvas';
import HorizontalBeamline from './HorizontalBeamline';
<BeamLineCanvas 
  width={600} 
  height={400}
  //debugBorder={true}
  >
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
        <BendingMagnet
       // handleOnClick={this.handleOnClick}
        x={50}
        y={50}
       label= 'BM1'
       readbackPv= '$(IOC):$(device):Readback'
        macros=
          {{
          '$(IOC)': 'pva://testIOC',
          '$(device)': 'PS4',
          }}
		    
        usePvUnits={true}
        usePvLabel={false}
        alarmSensitive={true}
          
        componentShadow={true}
        textShadow={false}
        componentGradient={true}
      />
        </BeamLineCanvas>

```