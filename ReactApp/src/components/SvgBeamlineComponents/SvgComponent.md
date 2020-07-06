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
      
        <SvgComponent
       // handleOnClick={this.handleOnClick}
          x={50}
          y={50}
          readbackPv={'$(IOC):$(device):Readback'}
          macros=
            {{
              '$(IOC)': 'pva://testIOC',
              '$(device)': 'PS3',
            }}
        usePvUnits={true}
        usePvLabel={false}
        alarmSensitive={true}
        label='C1'
        componentShadow={true}
        textShadow={false}
        componentGradient={true}
      >
         <svg width={50} height={50} viewBox="0 0 13.229 13.229" >
      <path
        d="M10.141 10.603l-3.398-1.67-3.303 1.854.538-3.749L1.195 4.47l3.731-.646L6.508.384l1.769 3.348 3.76.442L9.4 6.89z"
        fill="none"
        stroke="#000"
        strokeWidth={0.026}
      />
    </svg>
      </SvgComponent>
        </BeamLineCanvas>

```