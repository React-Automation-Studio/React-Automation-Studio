GraphXY EPICS variable example, drag the slider to modulate the amplitude of the Sine Wave:
```js
import Slider from './Slider';
<div>

  <GraphXY  
    xPVs={
      ['testIOC:BeamSweepSim:x.AVAL',
      'testIOC:BeamSweepSim:x1.AVAL',
      'testIOC:BeamSweepSim:x2.AVAL'
      ]
    }  
    yPVs={
      ['testIOC:BeamSweepSim:y.AVAL',
      'testIOC:BeamSweepSim:y1.AVAL',
      'testIOC:BeamSweepSim:y2.AVAL'
      ]
   }  
    xMax={10000}
    yMax={10000}
    xMin={-10000}
    yMin={-10000}
    showLegend={false}
    updateMode={'updateOnYChange'}
    width={'50%'}
    
    
   
  />

  <Slider  pv='testIOC:BeamSweepSim:Amplitude'   label='Circle Radius' usePvMinMax={true}/>
  <Slider  pv='testIOC:BeamSweepSim:modAmp'   label='Modulation Amplitude' usePvMinMax={true}/>
  <Slider  
    pv='testIOC:BeamSweepSim:frequency'  
    label='Frequency'
    min={0.1}
    max={1}
    step={0.1}
  />
</div>
