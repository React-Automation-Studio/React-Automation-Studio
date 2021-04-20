GraphXY2 EPICS variable example, drag the slider to modulate the amplitude of the Sine Wave:
```js
import Slider from './Slider';
<div>

  <GraphXY2  
    xPVs={
      ['pva://testIOC:BeamSweepSim:x.AVAL',
       'pva://testIOC:BeamSweepSim:x1.AVAL',
       'pva://testIOC:BeamSweepSim:x2.AVAL'
      ]
    }  
    yPVs={
      ['pva://testIOC:BeamSweepSim:y.AVAL',
       'pva://testIOC:BeamSweepSim:y1.AVAL',
       'pva://testIOC:BeamSweepSim:y2.AVAL'
      ]
   }  
    xMax={10000}
    yMax={10000}
    xMin={-10000}
    yMin={-10000}
    showLegend={false}
    updateMode={'updateOnYChange'}
    width={'25vh'}
    height={'25vh'}
   
  />

  <Slider  pv='pva://testIOC:BeamSweepSim:Amplitude'   label='Circle Radius' usePvMinMax={true}/>
  <Slider  pv='pva://testIOC:BeamSweepSim:modAmp'   label='Modulation Amplitude' usePvMinMax={true}/>
  <Slider  
    pv='pva://testIOC:BeamSweepSim:frequency'  
    label='Frequency'
    min={0.1}
    max={1}
    step={0.1}
  />
</div>
