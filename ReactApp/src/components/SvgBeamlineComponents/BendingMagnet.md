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
        system={{
          systemName: '$(IOC):$(device)',
          displayName: 'BM1',
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
          '$(device)': 'PS4',
          },
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