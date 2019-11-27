GraphXY EPICS variable example, drag the slider to modulate the amplitude of the Sine Wave:
```js
import SimpleSlider from './SimpleSlider';
<div>
<div style={{height:'25vh'}}>
  <GraphMultiplePVs  
    xPVs={['pva://testIOC:test4','pva://testIOC:test5']}  
    yPVs={['pva://testIOC:test5','pva://testIOC:test4']}  

  />
</div>
  <SimpleSlider  pv='pva://testIOC:amplitude'   label='Sine Wave Amplitude' usePvMinMax={true}/>
</div>
