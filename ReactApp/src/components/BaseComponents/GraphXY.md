GraphXY EPICS variable example, drag the slider to modulate the amplitude of the Sine Wave:
```js
import SimpleSlider from './SimpleSlider';
<div>
<div style={{height:'25vh',width:'25vh'}}>
  <GraphXY  
    xPVs={['pva://testIOC:BeamSweepSim:x.AVAL','pva://testIOC:BeamSweepSim:x1.AVAL',
      'pva://testIOC:BeamSweepSim:x2.AVAL']}  
    yPVs={['pva://testIOC:BeamSweepSim:y.AVAL','pva://testIOC:BeamSweepSim:y1.AVAL',
      'pva://testIOC:BeamSweepSim:y2.AVAL']}  
    xmax={10000}
    ymax={10000}
    xmin={-10000}
    ymin={-10000}
    updateMode={'updateOnYChange'}
  />
</div>
  <SimpleSlider  pv='pva://testIOC:BeamSweepSim:Amplitude'   label='Circle Radius' usePvMinMax={true}/>
  <SimpleSlider  pv='pva://testIOC:BeamSweepSim:modAmp'   label='Modulation Amplitude' usePvMinMax={true}/>
  <SimpleSlider  
  pv='pva://testIOC:BeamSweepSim:frequency'  
   label='Frequency'
   min={0.1}
   max={1}
   step={0.1} />
</div>
