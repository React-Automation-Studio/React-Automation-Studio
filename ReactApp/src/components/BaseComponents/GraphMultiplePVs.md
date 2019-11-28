DEPRECATED: PLEASE USE GraphY COMPONENT INSTEAD!
GraphMultiplePVs EPICS variable example, drag the slider to modulate the amplitude of the Sine Wave:
```js
import SimpleSlider from './SimpleSlider';
<div>
<div style={{height:'25vh'}}>
  <GraphMultiplePVs  
    pvs={['pva://testIOC:test4','pva://testIOC:test5']}  
    legend={['Modulated Sine Wave Amplitude','Sine Wave Amplitude']}
  />
</div>
  <SimpleSlider  pv='pva://testIOC:amplitude'   label='Sine Wave Amplitude' usePvMinMax={true}/>
</div>


```

GraphMultiplePVs EPICS variable example, alternate line colors:
```js
import SimpleSlider from './SimpleSlider';
<div>
<div style={{height:'25vh'}}>
  <GraphMultiplePVs  
    pvs={['pva://testIOC:test4','pva://testIOC:test5']}  
    legend={['Modulated Sine Wave Amplitude','Sine Wave Amplitude']}
    lineColor={['#3f51b5','#e91e63']}
  />
</div>
  <SimpleSlider  pv='pva://testIOC:amplitude'   label='Sine Wave Amplitude' usePvMinMax={true}/>
</div>


```






GraphMultiplePVs EPICS variable example:
```js


<div style={{height:'25vh'}}>
  <GraphMultiplePVs  

    pvs={[
      'pva://testIOC:MTextUpdate1',
      'pva://testIOC:MTextUpdate2',
      'pva://testIOC:MTextUpdate3',
      'pva://testIOC:MTextUpdate4',
      'pva://testIOC:MTextUpdate5'

    ]}
      maxLength={256}/>
  />
</div>




```
