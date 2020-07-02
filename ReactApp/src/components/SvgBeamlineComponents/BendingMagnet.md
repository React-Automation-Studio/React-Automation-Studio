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
        pv={'pva://$(device):$(pv_suffix)'}
        macros={{'$(device)':'testIOC:PS4','$(pv_suffix)':'Readback'}}
        usePvUnits={true}
        usePvLabel={false}
        alarmSensitive={true}
        label='BM1'
        componentShadow={true}
        textShadow={false}
        componentGradient={true}
      />
        </BeamLineCanvas>

```